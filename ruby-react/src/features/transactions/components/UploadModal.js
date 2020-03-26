import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  requestTransactionFileUpload,
  hideUploadModal,
  addFile,
  removeFile as removeFileAction
} from "../transactionsDuck";
import Modal from "../../../common/Modal";
import FileInput from "../../../common/FileInput";
import styled from "styled-components";
import FileList from "../../../common/FileList";

const StyledButtonActionRow = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default function UploadModal() {
  const isModalVisible = useSelector(
    ({ transactions }) => transactions.isUploadModalVisible
  );
  const files = useSelector(({ transactions }) => transactions.filesToUpload);
  const dispatch = useDispatch();

  function uploadFile(files) {
    dispatch(addFile(files[0]));
    dispatch(requestTransactionFileUpload(files[0]));
  }

  function removeFile(fileToRemove) {
    dispatch(removeFileAction(fileToRemove));
  }

  function hideModal() {
    dispatch(hideUploadModal());
  }

  return (
    <Modal hideModal={hideModal} isModalVisible={isModalVisible}>
      <FileInput id="uploadFile" type="file" onFilesChange={uploadFile} />
      <FileList files={files} removeFile={removeFile}></FileList>
      <StyledButtonActionRow>
        <button type="button" onClick={hideModal}>
          Close
        </button>
      </StyledButtonActionRow>
    </Modal>
  );
}
