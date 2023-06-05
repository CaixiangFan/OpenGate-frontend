import React, { useState } from "react";
import styles from "../../styles/DropZone.module.css";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import {BsUpload} from "react-icons/bs";
import { useAccount } from "wagmi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DropZone = ({ data, dispatch }) => {
  const account = useAccount();
  const { openConnectModal } = useConnectModal();
  const [estimatedCostReady, setEstimatedCostReady] = useState(false);
  const [estimatedCost, setEstimatedCost] = useState(0);
  // onDragEnter sets inDropZone to true
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true });
  };

  // onDragLeave sets inDropZone to false
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
  };

  // onDragOver sets inDropZone to true
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // set dropEffect to copy i.e copy of the source item
    e.dataTransfer.dropEffect = "copy";
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true });
  };

  const notify = (opt, msg) => {
    const notifyObj = {
      position: "top-center",
      text: "19px",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    };
    
    switch (opt) {
      case "success":
        toast.success(
          msg,
          {
            ...notifyObj,
            theme: "light",
          }
        );
        break;
      case "error":
        // alert(msg);
        toast.error(msg, notifyObj);
        break;
    }
  };

  // onDrop sets inDropZone to false and adds files to fileList
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // get files from event on the dataTransfer object as an array
    let files = [...e.dataTransfer.files];

    // ensure a file or files are dropped
    if (files && files.length > 0) {
      // loop over existing files
      const existingFiles = data.fileList.map((f) => f.name);
      // check if file already exists, if so, don't add to fileList
      // this is to prevent duplicates
      files = files.filter((f) => !existingFiles.includes(f.name));

      // dispatch action to add droped file or files to fileList
      dispatch({ type: "ADD_FILE_TO_LIST", files });
      // reset inDropZone to false
      dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
    }
  };

  // handle file selection via input element
  const handleFileSelect = (e) => {
    // get files from event on the input element as an array
    let files = [...e.target.files];

    // ensure a file or files are selected
    if (files && files.length > 0) {
      // loop over existing files
      const existingFiles = data.fileList.map((f) => f.name);
      // check if file already exists, if so, don't add to fileList
      // this is to prevent duplicates
      files = files.filter((f) => !existingFiles.includes(f.name));

      // dispatch action to add selected file or files to fileList
      dispatch({ type: "ADD_FILE_TO_LIST", files });
    }
  };

  // to handle file uploads
  const uploadFiles = async () => {
    // get the files from the fileList as an array
    let files = data.fileList;
    // initialize formData object
    const formData = new FormData();
    // loop over files and add to formData
    files.forEach((file) => formData.append("files", file));
    // formData.append("id", "source-code-id-2");
    formData.append("account", account.address);
    // Upload the files as a POST request to the server using fetch
    const response = await fetch("/api/fileupload", {
      method: "POST",
      body: formData,
    });
    
    //successful file upload
    if (response.ok) {
      // notify("success", "Files uploaded successfully");
      alert("Files uploaded successfully");
      
      const fileReader = new FileReader();
      fileReader.readAsText(files[0], "UTF-8");
      fileReader.onload = async (e) => {
        const contentSource = e.target.result;
        // get estimate cost in USD/DAI from api according to sourceId
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              source: contentSource,
              args: ["1", "bitcoin", "btc-bitcoin", "btc", "1000000", "450"],
              secrets: { apiKey: "HDsofnsofnwofenwejf2840250mvsd" }
            })
          };
        const estimatedCostResponse = await fetch("/api/estimatecost", requestOptions);
        const estimatedCost = await estimatedCostResponse.json();
        setEstimatedCostReady(true);
        setEstimatedCost(estimatedCost);
      };
    } else {
      // unsuccessful file upload
      notify("error", "Error uploading files");
      // alert("Error uploading files");
      setEstimatedCostReady(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <ToastContainer position="top-left"/>
      <div
        className={styles.dropzone}
        onDrop={(e) => handleDrop(e)}
        onDragOver={(e) => handleDragOver(e)}
        onDragEnter={(e) => handleDragEnter(e)}
        onDragLeave={(e) => handleDragLeave(e)}
      >
        <BsUpload size={50}/>
        <input
          id="fileSelect"
          type="file"
          className={styles.files}
          onChange={(e) => handleFileSelect(e)}
        />
        <label htmlFor="fileSelect">Select one .JS file</label>

        <h3 className="mt-4">
          or drag &amp; drop your file here
        </h3>
      </div>
      {/* Pass the selectect or dropped files as props */}
      {data.fileList.map((f) => {
          return (
              <ol key={f.lastModified}>
                <li className={styles.fileList}>
                  {/* display the filename and type */}
                  <div key={f.name} className={styles.fileName}>
                    {f.name}
                  </div>
                </li>
              </ol>
          );
        })}
      {/* Only show upload button after selecting at least 1 file */}
      {data.fileList.length > 0 && account.status === "connected" && (
        <button className="mt-2 hover:bg-[#1E2132] hover:cursor-pointer py-3 px-4 rounded-[15px] bg-[#272933]" onClick={uploadFiles}>
          Upload
        </button>
      )}
      {data.fileList.length > 0 && account.status != "connected" &&(
        <button className="mt-2 hover:bg-[#1E2132] hover:cursor-pointer py-3 px-4 rounded-[15px] bg-[#272933]" onClick={openConnectModal}>Connect Wallet</button>
      )}
      {estimatedCostReady && (
        <div className="mt-2">
          <p>EstimatedCost: {estimatedCost} USD.</p>
        </div>
      )}
    </div>
  );
};

export default DropZone;