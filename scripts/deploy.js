
//deploys the contract using the hardhat run command

async function main() {
    const Color = await ethers.getContractFactory("Color");
    const color = await Color.deploy("Rainbow", "RAIN");

    console.log("Color was deployed to:", color.address);

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })