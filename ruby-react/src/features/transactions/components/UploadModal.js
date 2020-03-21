import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  requestTransactionFileUpload,
  hideUploadModal
} from "../transactionsDuck";
import Modal from "../../../common/Modal";

export default function UploadModal() {
  const isModalVisible = useSelector(
    ({ transactionState }) => transactionState.isUploadModalVisible
  );
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  function fileChange(event) {
    setFile(event.target.files[0]);
  }

  function uploadFile() {
    dispatch(requestTransactionFileUpload(file));
  }

  function hideModal() {
    dispatch(hideUploadModal());
  }

  return (
    <Modal hideModal={hideModal} isModalVisible={isModalVisible}>
      <label htmlFor="uploadFile">select</label>
      <input id="uploadFile" type="file" onChange={fileChange} />
      <button type="button" onClick={uploadFile}>
        Upload
      </button>
    </Modal>
  );
}
