require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-etherscan');

module.exports = {
  solidity: "0.8.20",
  networks: {
    infura: {
      url: `https://sepolia.infura.io/v3/129df6e60dba4464831b233b9bdd3a00`,
      accounts: [`9fdafbea5f9a2c0412427a77c5127734f384ba995a1767eac047aee2001ca9b9`]
    }
  },
  etherscan: {
    apiKey: '9QH2X6C4FAE9ATVUQSA9KXIRKFQDQ5HV1R'
  }
};
