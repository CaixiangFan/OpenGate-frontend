import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { BiTime } from "react-icons/bi";
import { TbScript } from "react-icons/tb";
import { DiJavascript1 } from "react-icons/di";
import { RiErrorWarningLine } from "react-icons/ri";

function Function(props) {
  const account = useAccount();
  const [isopen, setIsopen] = useState(false);
  const [isExecuteVisible, setIsExecuteVisible] = useState(false);
  const [transferAmount, setTransferAmount] = useState(10);

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

  const formatWallet = (wallet) => {
    return `${wallet.substr(0, 6)}...${wallet.substr(-6)}`;
  }

  const handleDeleteFunc = () => {
    console.log("Deleting current function...")
  }

  const handleExecuteFunc = () => {
    console.log("Executing current function...");
    setIsExecuteVisible(!isExecuteVisible);
  }

  const handleTransfer = () => {
    console.log(`Transfer ${transferAmount} tokens to execute this function...`);
  }

  return (
    <div>
      {!isopen && (
        <div
          onClick={() => setIsopen(!isopen)}
          className="p-2 flex justify-between bg-[#0f1421] rounded-[10px] border-[1px] border-[#26365A] text-[15px] md:text-[18px] font-kanit hover:cursor-pointer mt-3"
        >
          <div className="flex">
            <DiJavascript1 className="mt-[4px] text-[24px] mr-1 md:mr-2 text-blue-500" />
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
                <DiJavascript1 className="mt-[4px] mr-1 md:mr-2 text-blue-500  text-[24px]" />
                <p className="mr-1 md:mr-2">
                  {formatWallet(props.id)}
                </p>
              </div>
              <div className="flex">
                <p className="mr-1 md:mr-2">{props.filename}</p>
                <BsChevronUp className="text-blue-500 mt-[1px]  text-[24px]" />
              </div>
            </div>
          </div>
          <div className="flex mt-2">
            <BiTime className="mt-[4px] mr-1 md:mr-2 text-blue-500  text-[24px]" />
            <p className="text-[18px] flex mt-[2px]">
              <p className="mr-2 underline">CreatedAt: </p>
              <p>{props.uploadTime}</p>
            </p>
          </div>

          <div className="flex justify-between px-1 mt-4">
            <div className="flex mt-2">
              <p className="text-xl font-bold flex ">Function:</p>
              <p className="ml-2 ">
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
            {isExecuteVisible && account.status == "connected" && (
              <div
                className="fixed z-10 top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 backdrop-blur-md flex justify-center items-center"
              >
                <div className="p-4 bg-[#1A1B1F] rounded-[15px] text-white  border-[0.1px] border-[#28292e] min-w-[340px]">
                  <div className="flex justify-between">
                    <p className="text-xl font-bold font-kanit">
                      Transfer Execution Fee
                    </p>
                    <AiFillCloseCircle className="text-[22px] mt-[-1px] hover:cursor-pointer" onClick={() => setIsExecuteVisible(!isExecuteVisible)}/>
                  </div>
                  <div className="flex flex-col mt-4 ">
                    <div className=" flex flex-row text-blue-500 mt-[1px]  text-[24px]">
                      <RiErrorWarningLine />
                      <p>Note:</p>
                    </div>
                    <div>
                      <p> Function will be executed after transfer finalized on L2!</p>
                    </div>
                  </div>
                  <div className="flex mt-4 ">
                    <label htmlFor="amount" className="text-xl font-bold mt-2">Amount DAI:</label> 
                    
                  </div>
                  <div className="flex justify-between mt-4 ">
                    <input type="number" id="amount" value={transferAmount} onChange={() => {setTransferAmount(document.getElementById("amount").value)}} className="mt-1 rounded-md indent-2 placeholder-slate-400 text-black"/>
                    {/* <p className="text-xl font-bold mt-2">
                      Estimated value
                    </p> */}
                    <button className="bg-[#26365A] text-blue-400 hover:text-[#5285F6] rounded-[10px]" onClick={handleTransfer}>Transfer</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Function;
