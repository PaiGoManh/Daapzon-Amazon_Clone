async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
  
    const Dappzon = await ethers.getContractFactory("Dappzon"); 
    const dappzon = await Dappzon.deploy();
  
    console.log("Dappzon deployed to:", dappzon.address);
}
  
main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
