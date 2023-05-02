import React, { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "../assets/logo.png";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { getAccount, fetchBalance } from "@wagmi/core";
import Balancebtn from "./Buttons/Balancebtn";
// import { GiHamburgerMenu } from "react-icons/gi";

function Navbar(props) {
  const [connected, setConnected] = useState(false);
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(0);
  const account = getAccount();

  useEffect(() => {
    if (account && account.status === "connected") {
      setConnected(true);
    } else {
      setConnected(false);
    }
  }, [account.status]);

  function handleclick() {}

  return (
    // <div className="font-epilogue mx-[1rem] my-4 2xl:mx-[4rem]">
      <div className="flex flex-row justify-between ms-auto topcorner">
        <div className="mr-3">
          <Balancebtn />
        </div>
        <div className="">
          <ConnectButton
            accountStatus={{
              smallScreen: "avatar",
              largeScreen: "full",
            }}
            showBalance={{
              smallScreen: false,
              largeScreen: false,
            }}
          />
        </div>
      </div>    
    // </div>
  );
}

export default Navbar;
