import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons/faFileAlt";

const StyledFileRow = styled.div`
  display: flex;
  align-items: center;
  margin: ${props => props.theme.spacing.s};
`;

const StyledIcon = styled.div`
  font-size: 30px;
  color: ${props => props.theme.colors.secondary};
  margin-right: ${props => props.theme.spacing.s};
`;

const StyledProgress = styled.div`
  background-color: ${props => {
    return !props.isUploaded
      ? props.theme.colors.inProgress
      : props.theme.colors.success;
    }
  };
  flex: 1;
  border-radius: ${props => props.theme.roundedL};
  height: 30px;
  margin-right: ${props => props.theme.spacing.s};
  text-align: center;
  color: ${props => props.theme.colors.white};
  line-height: 30px;
`;

export default function FileListItem({ file, name, removeFile }) {
  function handleRemoveFile() {
    removeFile(file);
  }

  return (
    <div>
      <div>
        <StyledFileRow>
          <StyledIcon>
            <FontAwesomeIcon icon={faFileAlt}></FontAwesomeIcon>
          </StyledIcon>
          <div>{file.name}</div>
        </StyledFileRow>
        <StyledFileRow>
          <StyledProgress isUploaded={file.isUploaded}>
            {file.isUploaded ? "Success" : "Uploading..."}
          </StyledProgress>
          <button name={name} type="button" onClick={handleRemoveFile}>
            x
          </button>
        </StyledFileRow>
      </div>
    </div>
  );
}
