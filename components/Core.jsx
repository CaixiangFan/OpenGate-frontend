import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import FormatWallet from "../utils/FormatWallet";
import TXHistory from "./TXHistory";

function Core(props) {
  const account = useAccount();

  function handleSelectChangeToken(selectedOption) {
    setToken(selectedOption.value);
  }

  const formattedWallet = account.address
    ? FormatWallet(account.address)
    : "None";

  return (
    <div className="flex justify-center text-xl px-3 lg:px-0 pb-6">
      {props.step == "TH" && <TXHistory />}
    </div>
  );
}

export default Core;
