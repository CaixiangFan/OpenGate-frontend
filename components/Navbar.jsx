import React, { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "../assets/logo.png";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { getAccount, fetchBalance } from "@wagmi/core";
import Balancebtn from "./Buttons/Balancebtn";
import { GiHamburgerMenu } from "react-icons/gi";

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
    <div className="font-epilogue mx-[1rem] my-4 2xl:mx-[4rem]">
      <div className="flex flex-row justify-between">
        <div className="flex space-x-20">
          <div>
            <Image
              src={Logo}
              alt="chainlink-funcs"
              width={"55"}
              height={""}
              className="mt-2"
            />
          </div>
          <div className="hidden 2xl:flex space-x-2 text-md lg:text-xl font-kanit mt-3 ">
            <p
              className={`hover:bg-[#1E2132] hover:cursor-pointer py-3 px-4 rounded-[15px] ${
                props.step == "Upload" ? "text-white" : "text-gray-400"
              }`}
              onClick={() => props.setStep("Upload")}
            >
              Upload
            </p>
            <p
              className={`hover:bg-[#1E2132] hover:cursor-pointer py-3 px-4 rounded-[15px] ${
                props.step == "History" ? "text-white" : "text-gray-400"
              }`}
              onClick={() => props.setStep("History")}
            >
              History
            </p>
            
          </div>
        </div>
        <div className="mt-4 flex">
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
      </div>
      <div className="flex justify-center">
        <div
          onClick={() => setVisible(!visible)}
          className="hover:bg-[#1E2132] hover:cursor-pointer bg-[#0D111C] p-3 border-[1px] border-[#1b2133] rounded-[10px] mt-8 2xl:hidden w-[550px] flex justify-between font-kanit text-xl px-6"
        >
          Browse menu
          <div className="mt-1">
            <GiHamburgerMenu />
          </div>
        </div>
      </div>
      {visible && (
        <div className="flex justify-center">
          <div className="bg-[#0D111C] p-3 border-[1px] border-[#1b2133] rounded-[10px] mt-1 2xl:hidden w-[550px]  font-kanit text-xl px-6">
            <p className="hover:cursor-pointer mt-2" onClick={() => props.setStep("Upload")}>
              Upload
            </p>
            <p className="hover:cursor-pointer mt-2" onClick={() => props.setStep("History")}>
              History
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
