import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { BsInfoCircleFill } from "react-icons/bs";
import Function from "./Function";

function History() {
  const account = useAccount();
  const [functions, setFunctions] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/queryhistoricalfunctions/" + account.address);
        
        const data = await response.json();
        console.log({data});
        setFunctions(data);
      } catch {
        (e) => console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className=" mt-[1rem] 2xl:mt-[6rem] w-[550px] font-epilogue bg-[#0D111C] border-[1px] border-[#1b2133] p-4 rounded-[15px]">
        <div className="flex flex-row justify-between">
          <div className="text-3xl">My functions</div>
          <div className="hover:cursor-pointer">
            <BsInfoCircleFill />
          </div>
        </div>

        <div
          className="w-[90%]  flex text-[17px] md:text-xl p-2 md:p-4 hover:cursor-pointer border-[1px] border-[#5285F6] rounded-md"
        >
          My Historical Functions
          <p className="ml-3 text-[#5285F6] font-bold text-[17px]">
            {functions.length > 0 ? functions.length : <p>0</p>}
          </p>
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
            />
          ))}
      </div>
    </div>
  );
}

export default History;
