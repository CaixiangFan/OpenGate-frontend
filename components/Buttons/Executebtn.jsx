import React, { useState, useEffect } from "react";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { getAccount } from "@wagmi/core";
import { Polybase } from "@polybase/client";

function Executebtn() {
  const [connected, setConnected] = useState(false);
  const account = getAccount();
  const { openConnectModal } = useConnectModal();
  const db = new Polybase({
    defaultNamespace: process.env.NEXT_PUBLIC_POLYBASE_NAME_SPACE ?? '',
  });
  const collectionReference = db.collection("Function");

  useEffect(() => {
    if (account.status == "connected") {
      setConnected(true);
    } else {
      setConnected(false);
    }
  }, [account.status]);

  const handleExecute = async() => {
    const { data, block } = await collectionReference.record("source-code-id-1").get();
    console.log(data.functionStr)
  }

  return (
    <button>
      {connected ? (
        <p onClick={handleExecute}>Execute</p>
      ) : (
        <div onClick={openConnectModal}>Connect Wallet</div>
      )}
    </button>
  );
}

export default Executebtn;
