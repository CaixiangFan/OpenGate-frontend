import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { BsInfoCircleFill } from "react-icons/bs";
import Function from "./Function";

function History() {
  const account = useAccount();
  const [functions, setFunctions] = useState("");
  const [functionNum, setFunctionNum] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/queryhistoricalfunctions/" + account.address);
        const data = await response.json();
        setFunctions(data);
        setFunctionNum(data.length)
      } catch {
        (e) => console.log(e);
      }
    };
    fetchData();
  }, []);

  // const changeFuncNum = (newNum) => {
  //   setFunctionNum(newNum);
  // }

  return (
    <div>
      <div className=" mt-[1rem] 2xl:mt-[6rem] w-[550px] font-epilogue bg-[#0D111C] border-[1px] border-[#1b2133] p-4 rounded-[15px]">
        <div className="flex flex-row justify-between">
          <div className="text-3xl">Historical Functions</div>
          <div className="text-3xl text-[#5285F6] font-bold text-[17px]">
            {functionNum}
          </div>
          <div className="hover:cursor-pointer">
            <BsInfoCircleFill />
          </div>
        </div>

        
        {functions == "" && (
          <div className="p-2 px-4 flex justify-center bg-[#0f1421] mt-6 py-8 rounded-[10px] border-[1px] border-[#26365A]">
            <p className="text-sm md:text-lg">You have no historical functions.</p>
          </div>
        )}

        {functions &&
          functions.map((func, index) => (
            <Function
              key={index}
              id={func.data.id}
              filename = {func.data.filename}
              account={func.data.account}
              uploadTime={func.data.uploadTime}
              functionStr={func.data.functionStr}
              // functionNum={functionNum}
              // changeFunctionNum={changeFuncNum}
            />
          ))}
      </div>
    </div>
  );
}

export default History;
