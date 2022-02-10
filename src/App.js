import "./App.css";
import connectors from "./connectors.ts";
import { useWeb3React } from "@web3-react/core";
import React, { useState } from "react";
import landscape from './landscape.jpeg'

function App() {
  const [userDomain, setUserDomain] = useState("");

  const [transactionsReady, setTransactionsReady] = useState(false);

  const { active, activate, deactivate } = useWeb3React();

  function createConnectHandler(connectorId) {
    return async () => {
      try {
        const connector = connectors[connectorId];

        if (connector.walletConnectProvider?.wc?.uri) {
          connector.walletConnectProvider = undefined;
        }

        await activate(connector);

        setUserDomain(connector.uauth.store.storage["uauth-default-username"]);
        setTransactionsReady(true);
      } catch (error) {
        console.error(error);
      }
    };
  }

  async function handleDisconnect() {
    try {
      console.log("logout");
      deactivate();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="App">
      {!active && (

        <div>
          {/* <Home /> */}
          <div className="bg-indigo-900 relative overflow-hidden h-screen">
            <img src={landscape} className="absolute h-full w-full object-cover" />
            <div className="inset-0 bg-black opacity-25 absolute">
            </div>
            <header className="absolute top-0 left-0 right-0 z-20">
              <nav className="container mx-auto px-6 md:px-12 py-4">
                <div className="md:flex justify-center items-center">
                  <div className="flex justify-between items-center">
                    <div className="md:hidden">
                      <button className="text-white focus:outline-none">
                        <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                          </path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="hidden md:flex items-center">
                    <a className="text-lg uppercase mx-3 text-white cursor-pointer hover:text-gray-300">
                      Home
                    </a>
                    <a className="text-lg uppercase mx-3 text-white cursor-pointer hover:text-gray-300">
                      About Us
                    </a>
                    <a className="text-lg uppercase mx-3 text-white cursor-pointer hover:text-gray-300">
                      Contact Us
                    </a>
                  </div>
                </div>
              </nav>
            </header>
            <div className="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 xl:py-40">
              <div className="w-full flex flex-col items-center relative z-10">
                <h1 className="font-extrabold text-7xl text-center sm:text-8xl text-white leading-tight mt-4">
                  Get Your On Chain Trust Score Now !
                </h1>

                <button className="block bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 py-3 px-4 text-lg text-white font-bold uppercase mt-10"
                  onClick={() => {
                    createConnectHandler(Object.keys(connectors)[2])();
                  }}>
                  Login With Unstopable Domain
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {active && (
        <>
          <div className="bg-indigo-900 relative overflow-hidden h-screen">
            <img src={landscape} className="absolute h-full w-full object-cover" />
            <div className="inset-0 bg-black opacity-25 absolute">
            </div>
            <header className="absolute top-0 left-0 right-0 z-20">
              <nav className="container mx-auto px-6 md:px-12 py-4">
                <div className="md:flex justify-center items-center">
                  <div className="flex justify-between items-center">
                    <div className="md:hidden">
                      <button className="text-white focus:outline-none">
                        <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                          </path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="hidden md:flex items-center">
                    <a className="text-lg uppercase mx-3 text-white cursor-pointer hover:text-gray-300">
                      Home
                    </a>
                    <a className="text-lg uppercase mx-3 text-white cursor-pointer hover:text-gray-300">
                      About Us
                    </a>
                    <a className="text-lg uppercase mx-3 text-white cursor-pointer hover:text-gray-300">
                      Contact Us
                    </a>
                  </div>
                </div>
              </nav>
            </header>
            <div className="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 xl:py-40">
              <div className="w-full flex flex-col items-center relative z-10">
                <h1 className="font-extrabold text-7xl text-center sm:text-8xl text-white leading-tight mt-4">
                  Your Trust Score Is : 73.65%
                </h1>
                <h1 className="font-extrabold bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 text-3xl text-center sm:text-2xl text-white leading-tight mt-4">
                  Username : {userDomain}
                </h1>
                <button className="block bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 py-3 px-4 text-lg text-white font-bold uppercase mt-10"
                  onClick={() => {
                    handleDisconnect();
                  }}>
                  Logout
                </button>
                <br />
                <h1 className="font-extrabold text-1xl text-center sm:text-1xl text-white leading-tight mt-4 ">
                  Our Site Is In Development Phase, We will let you know when are ready...
                </h1>

              </div>
            </div>
          </div>
        </>
      )
      }
    </div >
  );
}

export default App;
