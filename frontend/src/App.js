import React, { useEffect, useState, Provider } from "react";
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers, Signer } from "ethers";



function App() {
  const [accounts, setAccounts] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [colorContract, setColorContract] = useState(null);


  useEffect(() => {
    getWeb3();
    getColorContract();
  }, []);

  async function getWeb3() {
    

    
    if (Window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)

      console.log(provider)
    
      setProvider(provider)
      getColorContract()

    } else {
      console.error('No Ethereum Provider')
    }
  }

  async function getColorContract() {
    let provider = new ethers.providers.JsonRpcProvider(['http://localhost:8545'])
    const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const abi = [
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_symbol",
            "type": "string"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "approved",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "Approval",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "operator",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "bool",
            "name": "approved",
            "type": "bool"
          }
        ],
        "name": "ApprovalForAll",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "Transfer",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "approve",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "balanceOf",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "colorHex",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_tokenURI",
            "type": "string"
          }
        ],
        "name": "createCollectible",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "getApproved",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "operator",
            "type": "address"
          }
        ],
        "name": "isApprovedForAll",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "name",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "ownerOf",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "_data",
            "type": "bytes"
          }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "operator",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "approved",
            "type": "bool"
          }
        ],
        "name": "setApprovalForAll",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes4",
            "name": "interfaceId",
            "type": "bytes4"
          }
        ],
        "name": "supportsInterface",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "symbol",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "tokenCounter",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "tokenURI",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "transferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ]
    const signer = await provider.getSigner('0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266')
    setSigner(signer)
    
    
    signer.getAddress().then((result)=>{
      setAccounts([result])
    })

    const colorToken = new ethers.Contract(address, abi, provider);
    setColorContract(colorToken);
    
  }

  async function handleLogin() {
    const accountsReceivable = await provider.request({ method: 'eth_requestAccounts' })
    
    
    setAccounts(accountsReceivable);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(colorContract)
    const hex = e.target[0].value;
    const uri = e.target[1].value;
    

    //ethersjs method
    const contractName = await signer.call(colorContract.name())
    // colorContract.createCollectible(hex, uri)

    await signer.call(colorContract.createCollectible(hex, uri))
    
    console.log(contractName)
    //metamask method
    // params: [
    //   {
    //     from: accounts[0],
    //     to: '0x5FbDB2315678afecb367f032d93F642f64180aa3' ,//address of the color contract once deployed
    //     data:'0x0', //hash of the method and the parameters
      

        
    //   }
    // ]

    // provider.request({ 
    //   method: 'eth_sendTransaction',
    //   params,
    
    // })

    console.log('submitting the new NFT')

  }

  return (
    <div className="App">
      <header className="App-header">

        <div className="Navbar">
          <h2>Color Token</h2>
          <button onClick={() => { handleLogin() }}>Login</button>

        </div>
        <hr></hr>
        <div className="Dashboard">

          <h2>Dashboard</h2>

          <div>
            <p> {accounts ? accounts[0] : "account address here"}  </p>
            <p>Carousel of owned colors</p>
          </div>

        </div>


        <hr></hr>


        <div className="Add New">

          <h2> Create New Color Collectible</h2>


          <form onSubmit={(e) => handleSubmit(e)}>
            <ul>
              <div>
                <label for="hex">Hex</label>
                <input type="text" name="hex" id="hex"></input>
              </div>
              <div>
                <label for="tokenuri">tokenURI</label>
                <input type="text" name="tokenuri"></input>
              </div>
            </ul>
            <button type="submit"> Submit </button>
          </form>

        </div>

        <hr></hr>

      </header>
    </div>
  );
}

export default App;
