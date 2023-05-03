import React, { useReducer } from "react";
import DropZone from "./Uploads/DropZone";
import styles from "../styles/Home.module.css";

function Upload() {
  // reducer function to handle state changes
  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_IN_DROP_ZONE":
        return { ...state, inDropZone: action.inDropZone };
      case "ADD_FILE_TO_LIST":
        return { ...state, fileList: state.fileList.concat(action.files) };
      default:
        return state;
    }
  };

  // destructuring state and dispatch, initializing fileList to empty array
  const [data, dispatch] = useReducer(reducer, {
    inDropZone: false,
    fileList: [],
  });

  return (
    <div className={styles.container}>

        <DropZone data={data} dispatch={dispatch} />

    </div>
  );
}

export default Upload;