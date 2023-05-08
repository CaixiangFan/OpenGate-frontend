import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import FormatWallet from "../utils/FormatWallet";
import Upload from "./Upload";
import History from "./History";

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
      {props.step == "Upload" && <Upload />}
      {props.step == "History" && <History />}
    </div>
  );
}

export default Core;
