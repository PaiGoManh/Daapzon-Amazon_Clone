import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import abifile from '../abi.json';
import AddItemForm from './AddProduct'; 
const ItemsList = () => {
  const [items, setItems] = useState([]);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');
  const [loading, setLoading] = useState(true); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const contractAddress = '0xa967B79a88b70Fc7B4F44a5992d7C688170664eC';
  const abi = abifile.abi;

  const fetchItems = async () => {
    try {
      if (!provider || !contract) {
        console.log('Provider or contract is not set up.');
        return;
      }
  
      setLoading(true); 

      const itemCount = await contract.itemCount();
      console.log('Item count:', itemCount.toString());
  
      const itemsArray = [];
      for (let i = 1; i <= itemCount; i++) {
        const item = await contract.getItem(i);
        itemsArray.push(item);
      }
      console.log('Fetched items:', itemsArray);
      setItems(itemsArray);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        if (!window.ethereum) {
          console.error('MetaMask is not installed.');
          return;
        }

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, abi, provider.getSigner());
        const accounts = await provider.send('eth_requestAccounts', []);
        setProvider(provider);
        setContract(contract);
        setAccount(accounts[0]);
        console.log('Account:', accounts[0]);

        await fetchItems();
      } catch (error) {
        console.error('Error initializing provider and contract:', error);
      }
    };

    init();
  }, []);

  const handleBuy = async (itemId, itemCost) => {
    try {
      if (!provider || !contract) return;
  
      const currentUser = await provider.getSigner().getAddress();
      const item = await contract.getItem(itemId);
  
      if (item.owner === currentUser) {
        alert('You cannot buy your own product.');
        return;
      }
  
      const tx = await contract.purchaseItem(itemId, { value: itemCost });
      await tx.wait();
      console.log('Transaction successful:', tx);
  
      await fetchItems(); 
    } catch (error) {
      console.error('Error handling buy:', error);
    }
  };

  return (
    <div className="flex flex-col p-6">


      {isModalOpen && (
        <div
          id="authentication-modal"
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-md max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <AddItemForm onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-6">
        {loading ? (
          <div className="w-full text-center py-6">
            <p className="text-gray-700">Loading...</p>
          </div>
        ) : items.length > 0 ? (
          items.map((item) => (
            <div
              key={item.id.toString()}
              className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <img className="rounded-t-lg" src={item.imageUrl} alt={item.name} />
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {item.name}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Description</p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {ethers.utils.formatEther(item.cost.toString())} ETH
                </p>
                <a
                  onClick={() => handleBuy(item.id.toString(), item.cost.toString())}
                  href="#"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Buy
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full text-center py-6">
            <p className="text-gray-700">No items available.</p>
          </div>
        )}
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-4 text-black border border-1 border-black w-[200px] h-[350px] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        <span className='text-9xl'> +</span>
      </button>
      </div>
    </div>
  );
};

export default ItemsList;
