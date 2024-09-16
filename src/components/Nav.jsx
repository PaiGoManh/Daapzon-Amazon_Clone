import React, { useEffect, useState } from 'react';
import DisplayItems from '../components/DisplayProduct';
import AddItemForm from '../components/AddProduct';
import logo from '../assets/logo.svg';

const Nav = () => {
  const [account, setAccount] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const selectedAccount = accounts[0];
        setAccount(selectedAccount);
        localStorage.setItem('account', selectedAccount); 
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    } else {
      alert("No Ethereum account found");
    }
  };

  useEffect(() => {
    const storedAccount = localStorage.getItem('account');
    if (storedAccount) {
      setAccount(storedAccount);
    }
  }, []);

  return (
    <>
      <div className='flex justify-center items-center text-white text-3xl  gap-[20%] w-screen h-20 bg-gray-900 pl-3 '>
        <div className='flex items-center'>
          <div className='mb-6'>
            <img src={logo} alt='logo'/>
          </div>
          <div className=''>Daapazon</div>
        </div>
        <input type='text' className='md:pt-[-10px] w-[400px] h-8 text-black text-l rounded-md pl-3' />
        <div className='text-xl p-2 h-10 bg-orange-600 pl-6 mr-[1%]'>
          {account ? (
            <span>{`${account.slice(0, 8)}...${account.slice(-4)}`}</span>
          ) : (
            <button onClick={connectWallet}>Connect</button>
          )}
        </div>
      </div>
      <div className="p-8">
        <button 
          onClick={() => setShowForm(!showForm)} 
          className="text-white bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg "
        >
          {showForm ? 'Close Form' : 'Add New Item'}
        </button>

        <DisplayItems/>

        {showForm && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-[500px] relative">
              <button 
                onClick={() => setShowForm(false)} 
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
              <AddItemForm onClose={() => setShowForm(false)} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Nav;
