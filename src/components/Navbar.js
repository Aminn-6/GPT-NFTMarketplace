import {Link} from "react-router-dom";
import { SiMarketo } from "react-icons/si";
import { FaClipboardList } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

function Navbar() {

const [connected, toggleConnect] = useState(false);
const location = useLocation();
const [currAddress, updateAddress] = useState('0x');

async function getAddress() {
  const ethers = require("ethers");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const addr = await signer.getAddress();
  updateAddress(addr);
}

function updateButton() {
  const ethereumButton = document.querySelector('.enableEthereumButton');
  ethereumButton.textContent = "Connected";
  ethereumButton.classList.remove("hover:bg-blue-70");
  ethereumButton.classList.remove("bg-blue-500");
  ethereumButton.classList.add("hover:bg-green-70");
  ethereumButton.classList.add("bg-green-500");
}

async function connectWebsite() {

    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    if(chainId !== '0x5')
    {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x5' }],
     })
    }  
    await window.ethereum.request({ method: 'eth_requestAccounts' })
      .then(() => {
        updateButton();
        console.log("here");
        getAddress();
        window.location.replace(location.pathname)
      });
}

  useEffect(() => {
    if(window.ethereum == undefined)
      return;
    let val = window.ethereum.isConnected();
    if(val)
    {
      console.log("here");
      getAddress();
      toggleConnect(val);
      updateButton();
    }

    window.ethereum.on('accountsChanged', function(accounts){
      window.location.replace(location.pathname)
    })
  });

    return (
      <nav className="w-screen">
      <div className='py-3 text-white pr-5'>
      <div className="fixed top-0 right-0 z-50 w-full h-16 border-t bg-[#8968F5] border-gray-200 dark:border-gray-600">
        <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
          {location.pathname === "/" ? 
              <button type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                <Link to="/">
                  <SiMarketo className="w-5 h-5 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-500"/>
                  <span className="text-sm group-hover:text-blue-600 dark:group-hover:text-blue-500">
                    Home
                  </span>
                </Link>
              </button>
              :
              <button type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                <Link to="/">
                <SiMarketo className="w-5 h-5 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-500"/>
                  <span className="text-sm group-hover:text-blue-600 dark:group-hover:text-blue-500">
                    Home
                  </span>
                </Link>
              </button>             
          }
          {location.pathname == "/sellNFT" ? 
              <button type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                <Link to="/sellNFT">
                <FaClipboardList className="w-5 h-5 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-500"/>
                  <span className="text-sm group-hover:text-blue-600 dark:group-hover:text-blue-500">
                    List Of NFT
                  </span>
                </Link>
              </button>
              :
              <button type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                <Link to="/sellNFT">
                <FaClipboardList className="w-5 h-5 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-500"/>
                  <span className="text-sm group-hover:text-blue-600 dark:group-hover:text-blue-500">
                    List Of NFT
                  </span>
                </Link>
              </button>             
          }
          {location.pathname == "/profile" ? 
              <button type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                <Link to="/profile">
                <CgProfile className="w-5 h-5 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-500"/>
                  <span className="text-sm group-hover:text-blue-600 dark:group-hover:text-blue-500">
                    Profile
                  </span>
                </Link>
              </button>
              :
              <button type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                <Link to="/profile">
                <CgProfile className="w-5 h-5 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-500"/>
                  <span className="text-sm group-hover:text-blue-600 dark:group-hover:text-blue-500">
                   Profile
                  </span>
                </Link>
              </button>             
          }
          <button className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm" onClick={connectWebsite} >{connected? "Connected":"Connect Wallet"}</button>
        </div>
        <div className='text-white text-bold text-right mr-10 text-sm'>
          {currAddress !== "0x" ? "Connected to":"Not Connected. Please login to view NFTs"} {currAddress !== "0x" ? (currAddress.substring(0,15)+'...'):""}
        </div>
      </div>
      </div>
      </nav>
    );
  }

  export default Navbar;


  