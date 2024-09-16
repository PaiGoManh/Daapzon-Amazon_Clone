import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import abifile from '../abi.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const contractAddress = '0xAd1D670725c7912F64d25Eaf163Ab46de4c1d9d7'; 

const DisplayItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const abi = abifile.abi;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(contractAddress, abi, provider.getSigner());

  const fetchItems = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const dappzon = new ethers.Contract(contractAddress, abi, provider);

        const count = await dappzon.itemCount();
        const itemsArray = [];

        for (let i = 1; i <= count; i++) {
          const item = await dappzon.getItem(i);
          itemsArray.push(item);
        }

        // Filter out items where the quantity is zero
        const filteredItems = itemsArray.filter(item => item.quantity > 0);

        setItems(filteredItems);
      } else {
        toast.error('MetaMask is required.');
      }
    } catch (err) {
      console.error('Error fetching items:', err);
    } finally {
      setLoading(false);
    }
  };

  const purchaseItem = async (itemId, itemCost) => {
    try {
      if (!provider || !contract) return;

      const currentUser = await provider.getSigner().getAddress();
      const item = await contract.getItem(itemId);

      if (item.owner === currentUser) {
        toast.error('You cannot buy your own product.');
        return;
      }

      const tx = await contract.purchaseItem(itemId, { value: itemCost });
      await tx.wait();
      console.log('Transaction successful:', tx);

      await fetchItems(); // Refresh items after purchase
    } catch (error) {
      console.error('Error handling buy:', error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  if (loading) {
    return <div>Loading items...</div>;
  }

  return (
    <div className='space-y-4 mt-7'>
      <ToastContainer />
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Available Products</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map(item => (
          <div key={item.id.toString()} className="bg-white p-4 rounded-lg shadow-lg">
            <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover rounded-lg mb-4" />
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{item.name}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Cost: {ethers.utils.formatEther(item.cost.toString())} ETH
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Quantity: {item.quantity.toString()}
            </p>
            <button onClick={() => purchaseItem(item.id, item.cost)} className='w-[50px] h-6 rounded-md mt-2 bg-blue-600'>
              Buy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayItems;
