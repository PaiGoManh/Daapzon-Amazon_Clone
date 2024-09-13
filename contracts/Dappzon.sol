// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Dappzon {
    struct Item {
        uint id;
        string name;
        string imageUrl; 
        uint cost;
        address owner;
        uint quantity;
    }

    mapping(uint => Item) public items;
    uint public itemCount;
    address public admin;
    bool private locked;

    event ItemAdded(uint id, string name, uint cost, uint quantity, string imageUrl);
    event ItemPurchased(uint id, address buyer, uint quantityRemaining);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier noReentrancy() {
        require(!locked, "Reentrancy detected");
        locked = true;
        _;
        locked = false;
    }

    constructor() {
        admin = msg.sender;
    }

    // Add item by admin
    function addItem(string memory _name, string memory _imageUrl, uint _cost, uint _quantity) public onlyAdmin {
        require(_cost > 0, "Cost must be greater than 0");
        require(_quantity > 0, "Quantity must be greater than 0");

        itemCount++;
        items[itemCount] = Item(itemCount, _name, _imageUrl, _cost, address(0), _quantity);

        emit ItemAdded(itemCount, _name, _cost, _quantity, _imageUrl);
    }

    // Purchase an item
    function purchaseItem(uint _id) public payable noReentrancy {
        Item storage item = items[_id];
        require(item.id > 0 && item.id <= itemCount, "Item does not exist");
        require(msg.value >= item.cost, "Incorrect amount sent");
        require(item.quantity > 0, "Item out of stock");

        item.quantity--;
        if (item.quantity == 0) {
            item.owner = msg.sender;
        }

        if (msg.value > item.cost) {
            payable(msg.sender).transfer(msg.value - item.cost);
        }

        payable(admin).transfer(item.cost);
        emit ItemPurchased(_id, msg.sender, item.quantity);
    }

    // View a specific item
    function getItem(uint _id) public view returns (Item memory) {
        return items[_id];
    }
}
