import React, { useEffect } from 'react'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { requestTransactionFileUpload } from "../transactionsDuck";
import styled from "styled-components";

const StyledOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const StyledUploadModal = styled.div`
  background-color: ${props => props.theme.colors.section};  
  transition: all 0.5s ease-in;

  @media ${props => props.theme.device.desktop} {
    opacity: 0;
    max-width: 500px;
    margin: 1.75rem auto;
    transition-property: opacity, transform;
    transform: translate(0,-50px);
    width: auto;

    &.show {
      transform: none;
      opacity: 1;
    }
  }

  @media ${props => props.theme.device.mobile} {
    width: 100%;
    height: 100%;
    opacity: 1;
  }
`;

export default function UploadModal() {
  const [file, setFile] = useState(null);
  const [modalClasses, setModalClasses] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setModalClasses(['show']);    
  }, []);

  function fileChange(event) {
    setFile(event.target.files[0]);
  }

  function uploadFile() {
    dispatch(requestTransactionFileUpload(file));
  }

  return (
    <StyledOverlay>
      <StyledUploadModal className={modalClasses}>
        <label htmlFor="uploadFile">select</label>
        <input id="uploadFile" type="file" onChange={fileChange} />
        <button type="button" onClick={uploadFile}>
          Upload
        </button>
      </StyledUploadModal>
    </StyledOverlay>
  );
}
