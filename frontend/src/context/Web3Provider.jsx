import React, { createContext, useEffect, useState } from "react";
import Web3 from "web3";
import SupplyChainABI from "../../../build/contracts/SupplyChain.json";

export const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const loadBlockchainData = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3Instance.eth.getAccounts();
        const contractInstance = new web3Instance.eth.Contract(
          SupplyChainABI.abi,
          import.meta.env.VITE_CONTRACT_ADDRESS
        );

        setWeb3(web3Instance);
        setContract(contractInstance);
        setAccount(accounts[0]);
      }
    };

    loadBlockchainData();
  }, []);

  return (
    <Web3Context.Provider value={{ web3, contract, account }}>
      {children}
    </Web3Context.Provider>
  );
};