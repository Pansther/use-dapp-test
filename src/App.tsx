import React from "react";
import { useEtherBalance, useEthers, useContractFunction } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import { utils, Contract } from "ethers";

export function App() {
  const abi = [
    {
      inputs: [],
      name: "retrieve",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "num", type: "uint256" }],
      name: "store",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  const contractInterface = new utils.Interface(abi);
  const contract = new Contract(
    "0x364a93FA436C7d8a967B151cb76f8Be2b2D4f6f5",
    contractInterface
  );

  const { activateBrowserWallet, deactivate, account } = useEthers();
  const userBalance = useEtherBalance(account);
  const { send: retrieve } = useContractFunction(contract, "retrieve");
  const { send: store } = useContractFunction(contract, "store");

  async function sendRetrieve() {
    const res = await retrieve();
    console.log("res", res);
  }

  function sendStore() {
    store(1);
  }

  return (
    <div>
      {!account && (
        <button onClick={() => activateBrowserWallet()}> Connect </button>
      )}
      {account && (
        <>
          <button onClick={deactivate}> Disconnect </button>
          <p>Account: {account}</p>
          {userBalance && <p>Balance: {formatEther(userBalance)} BNB</p>}
          <button onClick={sendRetrieve}>Retrieve</button>
          <button onClick={sendStore}>Store</button>
        </>
      )}
    </div>
  );
}

export default App;
