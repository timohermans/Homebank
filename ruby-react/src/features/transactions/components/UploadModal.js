import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  hideUploadModal,
  requestTransactionFileUpload
} from "../transactionsDuck";
import { useEffect } from "react";

export default function UploadModal() {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const isUploadingFile = useSelector(
    ({ transactionState }) => transactionState.isUploadingFile
  );
  useEffect(() => {
    console.log(isUploadingFile);
  }, [isUploadingFile]);

  function fileChange(event) {
    setFile(event.target.files[0]);
  }

  function uploadFile() {
    dispatch(requestTransactionFileUpload(file));
  }

  return (
    <div>
      <label htmlFor="uploadFile">select</label>
      <input id="uploadFile" type="file" onChange={fileChange} />
      <button type="button" onClick={uploadFile}>
        Upload
      </button>
    </div>
  );
}
