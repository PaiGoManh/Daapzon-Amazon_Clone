import React, { useState } from 'react';
import { ethers } from 'ethers';
import axios from 'axios'; 
import abifile from '../abi.json';

const contractAddress = '0xDB6794d0344B5cbF7A6BB3aaa5aC152172e782A9'; 

const AddItemForm = ({ onClose }) => {
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState(null); 
  const [imageUrl, setImageUrl] = useState(''); 
  const [loading, setLoading] = useState(false);
  const abi = abifile.abi;

  const uploadImageToIPFS = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
  
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        headers: {
          'pinata_api_key': 'f2c2eb5b64d31eebde0a',
          'pinata_secret_api_key': 'a57b183f94688bb91447d34cc438920533a44608ea1c68c1554b7f6f7b777a72',
          'Content-Type': 'multipart/form-data'
        },
      });
  
      if (res.status === 200 && res.data.IpfsHash) {
        return `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
      } else {
        throw new Error('Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let finalImageUrl = imageUrl;

      if (image) {
        finalImageUrl = await uploadImageToIPFS(image);
        if (!finalImageUrl) {
          throw new Error('Failed to upload image');
        }
        setImageUrl(finalImageUrl);
      }

      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const dappzon = new ethers.Contract(contractAddress, abi, signer);

        const tx = await dappzon.addItem(name, finalImageUrl, ethers.utils.parseEther(cost), quantity);
        await tx.wait();

        alert('Item added successfully!');
        onClose(); // Close the form on success
      } else {
        alert('MetaMask is required.');
      }
    } catch (err) {
      console.error('Error adding item to blockchain:', err);
      alert('Failed to add item.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-[500px]'>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Add New Product
      </h3>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div>
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[400px] p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>
        <div>
          <label htmlFor="cost" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Cost (ETH)</label>
          <input
            type="text"
            id="cost"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[400px] p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>
        <div>
          <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Quantity</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[400px] p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>
        <div>
          <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Image</label>
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[400px] p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          />
        </div>
        <button
          type="submit"
          className="w-[400px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default AddItemForm;
