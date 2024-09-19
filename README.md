# Daapzon App

Welcome to **Daapzon** 🛒 – a decentralized e-commerce platform inspired by Amazon! With Daapzon, you can securely buy, sell, and review products using Ethereum. Built using Solidity, Hardhat, React, Vite, and Tailwind CSS, Daapzon offers a seamless and decentralized shopping experience.

## 🚀 Features

- **Browse Products**: Explore a wide range of products with detailed descriptions, pricing, and availability.
- **Responsive Design**: A modern and user-friendly interface optimized for any device.
- **MetaMask Integration**: Connect your MetaMask wallet to securely purchase items with Ethereum.
- **Blockchain-Powered Transactions**: Ensure all purchases and reviews are secure, transparent, and tamper-resistant, powered by the Ethereum blockchain.

## 🛠️ Technologies Used

- **Solidity**: For smart contracts to manage product listings and transactions on Ethereum.
- **Hardhat**: For development, testing, and deploying smart contracts.
- **React**: For building a dynamic user interface.
- **Vite**: For fast and efficient development.
- **Tailwind CSS**: For a beautiful and responsive design.
- **Ethers.js**: For interacting with the Ethereum blockchain.

## 📦 Getting Started

### Prerequisites

Before you get started, make sure you have the following:

- 🖥 [Node.js](https://nodejs.org/)
- 📦 [npm](https://www.npmjs.com/) (usually installed with Node.js)
- 🔐 [MetaMask](https://metamask.io/)
- 💰 Ethereum wallet with testnet ETH

### Installation

1. **Clone the repository**:

   ```
   git clone https://github.com/PaiGoManh/Daapzon-Amazon_Clone.git
   cd Daapzon
   
   ```
2. **install dependencies**
   
   ```
   npm install
   ```
4. **Compile Solidity Contracts:**

   ```
   npm i hardhat
   npx hardhat compile
   ```
5. **Add an ``.env`` file**
   
   ```
   INFURA_URL=your infura url
   PRIVATE_KEY=your metmask private key
   ETHERSCAN_API_KEY= your etherscan private key
   PINATA_API_KEY=your pinata api key
   PINATA_SECRET_API_KEY=your pinata secret key
   ```
6. **Start Local Blockchain Node:**

   ```
   npx hardhat node
   ```
7. **Deploy Contracts:**

   Open another terminal:

   ```
   npx hardhat run ./scripts/deploy.js --network infura
   ```
8. **update the contract address in frontend**

   Here in src/components you have two jsx files,
      1. AddProduct.jsx
      2. DisplayProduct.jsx
   
   after the deploy you have to get the abi from artifacts/contracts/Dappzon.sol/Dappzon.json
   - copy the file and paste into our src frontend folder (you can give anyname to your abifile)
   - import abi to the two jsx files.
   - also add the deployed contract address and update the jsx files
        were you can see
           ```
              contract address =
           ```
        in the jsx files
     
9. **Run Frontend:**

    ```
    npm run dev
    ```
10. Connect MetaMask:

      Open the app in your browser.
      Connect MetaMask and make transactions.
      Securely buy, sell, or review products.

## 📜 License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)


## 🙌 Contributing
   
   Contributions are welcome! Please fork the repository and submit a pull request with your proposed changes.
   
   Thank you for checking out the Daapzon App. We hope you enjoy exploring and purchasing products in a       
   decentralized marketplace! 🎉
   
   Happy Shopping! 🛍️

