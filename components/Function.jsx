import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import {
  MdElectricCar,
  MdAttachMoney,
  MdOutlineElectricBolt,
} from "react-icons/md";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { BiCurrentLocation } from "react-icons/bi";

function Function(props) {
  const account = useAccount();
  const [isopen, setIsopen] = useState(false);

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await fetch("/api/queryhistoricaloffers/" + account.address);
    //     const data = await response.json();
    //     setOffers(data.boughtOffers);
    //     setListings(data.soldOffers);
    //   } catch {
    //     (e) => console.log(e);
    //   }
    // };
    // fetchData();
  }, []);

  function formatWallet(wallet) {
    return `${wallet.substr(0, 4)}...${wallet.substr(-4)}`;
  }

  function handleDeleteFunc() {
    console.log("Deleting current function...")
  }

  function handleExecuteFunc() {
    console.log("Executing current function...")
  }

  return (
    <div>
      {!isopen && (
        <div
          onClick={() => setIsopen(!isopen)}
          className="p-2 flex justify-between bg-[#0f1421] rounded-[10px] border-[1px] border-[#26365A] text-[15px] md:text-[18px] font-kanit hover:cursor-pointer mt-3"
        >
          <div className="flex">
            <MdElectricCar className="mt-[4px] text-[24px] mr-1 md:mr-2 text-blue-500" />
            <p className="mr-1 md:mr-2 ">{formatWallet(props.id)}</p>
          </div>
          <div className="flex">
            <p className="mr-1 md:mr-2">{props.filename}</p>
            <BsChevronDown className="text-blue-500 text-[24px] mt-[3px]" />
          </div>
        </div>
      )}
      {isopen && (
        <div className="p-2 justify-between bg-[#0f1421] rounded-[10px] border-[1px] border-[#26365A] text-[15px] md:text-[18px] font-kanit hover:cursor-pointer mt-3">
          <div>
            <div
              className="flex justify-between "
              onClick={() => setIsopen(!isopen)}
            >
              <div className="flex">
                <MdElectricCar className="mt-[4px] mr-1 md:mr-2 text-blue-500  text-[24px]" />
                <p className="text-[18px] flex mt-[2px]">
                  <p className="font-bold mr-2 underline">ID:</p> {formatWallet(props.id)}
                </p>
              </div>
              <BsChevronUp className="text-blue-500 mt-[1px]  text-[24px]" />
            </div>
          </div>
          <div className="flex mt-2">
            <MdAttachMoney className="mt-[4px] mr-1 md:mr-2 text-blue-500  text-[24px]" />
            <p className="text-[18px] flex mt-[2px]">
              <p className="font-bold mr-2 underline">File Name:</p> 
              {props.filename}
            </p>
          </div>
          <div className="flex mt-2">
            <MdAttachMoney className="mt-[4px] mr-1 md:mr-2 text-blue-500  text-[24px]" />
            <p className="text-[18px] flex mt-[2px]">
              <p className="font-bold mr-2 underline">Account:</p>
              {props.account}
            </p>
          </div>
          <div className="flex mt-2">
            <BiCurrentLocation className="mt-[4px] mr-1 md:mr-2 text-blue-500  text-[24px]" />
            <p className="text-[18px] flex mt-[2px]">
              <p className="font-bold mr-2 underline">UploadTime: {props.uploadTime}</p>
            </p>
          </div>

          <div className="flex justify-between px-1 mt-4">
            <div className="flex mt-2">
              <p className="text-xl font-bold flex ">Function:</p>
              <p className="text-xl font-bold text-blue-500 ml-2 ">
                {props.functionStr} 
              </p>
            </div>
          </div>
          <div className="flex justify-between mt-6 mx-2">
            <div 
              onClick={handleDeleteFunc}
              className="p-2  bg-red-600 text-white  rounded-[10px] mb-1">
              Delete
            </div>
            <div 
              // disable={!writeConfirm}
              onClick={() => handleExecuteFunc()}
              className="p-2  bg-[#26365A] text-blue-400 hover:text-[#5285F6] rounded-[10px] mb-1">
              Execute
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Function;
