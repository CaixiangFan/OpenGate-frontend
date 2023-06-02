import React, { useState, useEffect } from "react";
import {RotatingLines} from "react-loader-spinner";
import { 
  usePrepareContractWrite, 
  useContractWrite, 
  useWaitForTransaction,
  useNetwork,
  useAccount 
} from "wagmi";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsChevronDown, BsChevronUp, BsInputCursor } from "react-icons/bs";
import { BiTime, BiKey } from "react-icons/bi";
import { TbScript } from "react-icons/tb";
import { DiJavascript1 } from "react-icons/di";
import { RiErrorWarningLine } from "react-icons/ri";
import { Polybase } from "@polybase/client";
import useDebounce from "../utils/useDebounce";
import * as DONconsumerAbi from "../src/DONconsumer.json";

function Function(props) {
  const account = useAccount();
  const [isopen, setIsopen] = useState(false);
  const [isExecuteVisible, setIsExecuteVisible] = useState(false);
  const [transferAmount, setTransferAmount] = useState(10);
  const [args, setArgs] = useState("arg1, arg2, arg3");
  const [secrets, setSecrets] = useState("{\"apiKey\": \"HDsofnsofnwofenwejf2840250mvsd\"}");
  const [estimatecost, setEstimatecost] = useState(0);
  const [loading, setLoading] = useState(false);
  const [transferSuccess, setTransferSuccess] = useState(true);
  const [response, setResponse] = useState("default: 0x0000000000000000000000000002431");
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const debSource = useDebounce(props.functionStr);
  const debSubId = useDebounce(+process.env.NEXT_PUBLIC_SUB_ID);
  const debGasLimit = useDebounce(+process.env.NEXT_PUBLIC_GAS_LIMIT);

  const db = new Polybase({
    defaultNamespace: process.env.NEXT_PUBLIC_POLYBASE_NAME_SPACE ?? '',
  });

  const formatWallet = (wallet) => {
    return `${wallet.substr(0, 6)}...${wallet.substr(-6)}`;
  }
  useEffect(() => {
    if (deleteSuccess) {
      alert("Deleted successful!");
      // props.changeFuncNum(props.functionNum - 1)
    }
  });

  const { config: executeConfig, error: executeConfigError } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_CONSUMER_CONTRACT_ADDRESS,
    abi: DONconsumerAbi.abi,
    chainId: 1337,
    functionName: 'executeRequest',
    args: [debSource, secrets, args.split(", "), debSubId, debGasLimit],
    enabled: Boolean(debSource),
  });

  const { data: executeData, write: executeWrite, isError: executeIsError } = useContractWrite(executeConfig);
  console.log({executeConfigError})
  const { isLoading: executeIsLoading, isSuccess: executeIsSuccess } = useWaitForTransaction({
  hash: executeData?.hash,
  });

  const requestEstimateCost = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source: props.functionStr,
        args: args.split(", "),
        secrets: JSON.parse(secrets)
      })
    };
    const estimatedCostResponse = await fetch("/api/estimatecost", requestOptions);
    const estimatedCost = await estimatedCostResponse.json();
    return estimatedCost;
  }

  const handleDeleteFunc = async (funcId) => {
    console.log(`Deleting current function ${funcId} ...`);
    const collectionReference = db.collection("Function");
    try{
      const delResult = await collectionReference.record(funcId).call('del', [account.address]);
      if(delResult.data == null) setDeleteSuccess(true);
    } catch(error) {
      console.log(error);
    }
  }

  const handleExecuteFunc = async () => {
    console.log("Executing current function...");
    const estimation = await requestEstimateCost();
    setEstimatecost(estimation);
    setTransferAmount(Math.ceil(estimation));
    setIsExecuteVisible(!isExecuteVisible);
  }

  const handleTransfer = async () => {
    setLoading(true);
    console.log(`Transfer ${transferAmount} tokens to execute this function...`);
    console.log("Executing request after BesuDAI transfer is confirmed...");

    // execute request through api
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source: props.functionStr,
        args: ["1", "bitcoin", "btc-bitcoin", "btc", "1000000", "450"],
        secrets: { apiKey: "HDsofnsofnwofenwejf2840250mvsd" }
      })
    };
    const latestResponse = await fetch("/api/executerequest", requestOptions);
    const latestResponseHex = await latestResponse.text();
    console.log({latestResponseHex});
    setResponse(latestResponseHex);
    setLoading(false);
  }
// ToDo: 1. add parameter input (args, secrets) form to a function card
// 2. execute to get an updated estimatedCost and display on prompt diag
// 3. Transfer token to execute the function and get the latest response
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
            <BsChevronDown className="text-blue-500 text-[24px] hover:cursor-pointer mt-[3px]" />
          </div>
        </div>
      )}
      {isopen && !deleteSuccess && (
        <div className="p-2 justify-between bg-[#0f1421] rounded-[10px] border-[1px] border-[#26365A] text-[15px] md:text-[18px] font-kanit mt-3">
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
                <BsChevronUp className="text-blue-500 mt-[1px] hover:cursor-pointer text-[24px]" />
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
          <div className="flex mt-2">
            <BsInputCursor className="mt-[4px] mr-1 md:mr-2 text-blue-500  text-[24px]" />
            <p className="text-[18px] flex mt-[2px]">
              <p className="mr-2 underline">Arguments: </p>
              <input type="string" id="args" value={args} 
              onChange={() => {setArgs(document.getElementById("args").value)}} 
              className="mt-1 rounded-md indent-2 placeholder-slate-400 text-black"/>
            </p>
          </div>
          <div className="flex justify mt-2">
            <BiKey className="mt-[4px] mr-1 md:mr-2 text-blue-400  text-[24px]" />
            <p className="text-[18px] flex mt-[2px]">
              <p className="mr-2 underline">Secrets(opt): </p>
              <input type="string" id="secrets" value={secrets} 
              onChange={() => {setSecrets(document.getElementById("secrets").value)}} 
              className="mt-1 rounded-md indent-2 placeholder-slate-400 text-black"/>
            </p>
          </div>
          <div className="flex justify-between px-1 mt-4">
            <div className="flex flex-col mt-2">
              <p className="text-xl font-bold flex ">Function:</p>
              <p className="text-xs">
                {props.functionStr} 
              </p>
            </div>
          </div>
          <div className="flex justify-between mt-6 mx-2">
            <div 
              onClick={() => handleDeleteFunc(props.id)}
              className="p-2  bg-red-600 text-white hover:text-[#dcdee2] hover:cursor-pointer rounded-[10px] mb-1">
              Delete
            </div>
            <div 
              // disable={!writeConfirm}
              onClick={handleExecuteFunc}
              className="p-2  bg-[#26365A] text-blue-400 hover:text-[#5285F6] hover:cursor-pointer rounded-[10px] mb-1">
              Execute
            </div>
            {isExecuteVisible && account.status == "connected" && (
              <div
                className="flex fixed z-10 top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 backdrop-blur-md justify-center items-center"
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
                      <p className="text-[18px] flex mt-[2px]">
                        <p className="mr-2 underline">Estimated Cost: </p>
                        <p className="text-blue-500">{estimatecost} USD</p>
                      </p>
                    </div>
                  </div>
                  <div className="flex mt-4 ">
                    <label htmlFor="amount" className="text-lg font-bold mt-2">Amount BesuDAI:</label> 
                    
                  </div>
                  <div className="flex justify-between mt-4 ">
                    <input type="number" id="amount" value={transferAmount} onChange={() => {setTransferAmount(document.getElementById("amount").value)}} className="mt-1 rounded-md indent-2 placeholder-slate-400 text-black"/>
                    {/* <p className="text-xl font-bold mt-2">
                      Estimated value
                    </p> */}
                    <button className="bg-[#26365A] text-blue-400 hover:text-[#5285F6] rounded-[10px]" onClick={handleTransfer}>Transfer</button>
                  </div>
                  { transferSuccess && (
                    <div className="flex flex-col">
                      <div className="flex justify-between mt-4">
                        <div className=" text-xl font-bold font-kanit">Latest Response</div>
                        <RotatingLines
                          strokeColor="grey"
                          strokeWidth="5"
                          animationDuration="0.75"
                          width="30"
                          visible={loading}
                        />
                      </div>

                      {/* <div className="mt-3 p-2 flex bg-[#0f1421] rounded-[5px] border-[1px] border-[#26365A] text-[10px] md:text-[14px] text-slate-500 font-kanit">
                        {response}
                      </div> */}
                      <textarea value={response} readonly="readonly" className="mt-3 p-2 flex bg-[#0f1421] rounded-[5px] border-[1px] border-[#26365A] text-[10px] md:text-[14px] text-slate-500 font-kanit" />
                      <div className="flex flex-row justify-between">
                        <p className="ml-8 mt-2  text-blue-400 hover:text-[#5285F6] hover: cursor-pointer ">L2 TxLink </p>
                        <p className="mr-8 mt-2  text-blue-400 hover:text-[#5285F6] hover: cursor-pointer ">L1 TxLink </p>
                      </div>
                    </div>
                  )}
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
