import React, { useEffect, useState } from 'react';
import DisplayProduct from '../components/DisplayProduct';

const Nav = () => {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const selectedAccount = accounts[0];
        setAccount(selectedAccount);
        localStorage.setItem('account', selectedAccount); // Store account in localStorage
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
      <div className='flex justify-center text-white text-3xl pt-7  gap-[20%] w-screen h-20 bg-gray-900'>
        <div>
          Daapazon
        </div>
        <input type='text' className='md:pt-[-10px] w-[400px] h-8 text-black text-l rounded-md pl-3'>
        </input>
        <div className='text-xl p-2 h-10 bg-orange-600 pl-6'>
          {account ? (
            <span>{`${account.slice(0, 8)}...${account.slice(-4)}`}</span>
          ) : (
            <button onClick={connectWallet}>Connect</button>
          )}
        </div>
      </div>
      <DisplayProduct />
    </>
  );
};

export default Nav;
