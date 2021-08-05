const { expect } = require("chai");

//destructuring the first 3 accounts, the first one is the default owner.


describe("Token Contract", function(){

    // this is so we can access these vars in the deployment phase.!!!
    let Color, color, owner, alice, bob;
    
    beforeEach(async function() {
        Color = await ethers.getContractFactory("Color");
        color = await Color.deploy("Color", "CLR");
        [owner, alice, bob] = await ethers.getSigners();
    })

    describe('deployment', () => {
        it("should retrieve basic information", async function() {
            expect(await color.name()).to.equal("Color");
            expect(await color.symbol()).to.equal("CLR");
        });
    
        it("should create a new color and get its tokenURI", async function() {
            const tokenURL = "https://google.com"
            await color.createCollectible("#FFFFF", tokenURL)                
            expect(await color.tokenURI(0)).to.equal(tokenURL)
        });
    
        it("should successfully appprove and transfer one color to alice", async function(){
            const tokenURL = "https://vitalik.ca" 
            const aliceAddress = await alice.getAddress();
            await color.createCollectible("#FFFFF", tokenURL)
            await color.connect(owner).approve(alice.getAddress(), 0)
            await color.connect(alice).transferFrom(owner.getAddress(), alice.getAddress(), 0)
            expect(await color.ownerOf(0)).to.equal(aliceAddress)
        });

    })
    
    
  
    

})