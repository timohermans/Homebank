import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { hideUploadModal } from "../transactionsDuck";

export default function UploadModal() {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);

  async function uploadFile() {
    const form = new FormData();
    form.append("file", file);

    await fetch({
      url: "http://localhost:4000/transactions/upload",
      method: "POST",
      body: form
    });

    dispatch(hideUploadModal());
  }

  function fileChange(event) {
    setFile(event.target.files[0]);
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
