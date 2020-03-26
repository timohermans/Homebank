import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import IconButton from "../common/IconButton";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import isEmpty from "lodash/isEmpty";
import FileToUpload from "./models/file-to-upload";
import uniqueId from "lodash/uniqueId";

const StyledFileInput = styled.input.attrs(props => ({ type: "file" }))`
  display: none;
`;

const StyledAddFileContainer = styled.div`
  border: 1px dashed ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.roundedM};
  display: flex;
  justify-content: center;
  margin: ${props => props.theme.spacing.sm};
  text-align: center;
  padding: ${props => props.theme.spacing.m};
`;

function FileInput({ onFilesChange }) {
  function handleFileChange(event) {
    const files = mapEventToFile(event);

    if (onFilesChange) {
      onFilesChange(files);
    }

    event.target.value = null;
  }

  function mapEventToFile(event) {
    const files = event.target.files;
    if (isEmpty(files)) {
      return [];
    }

    const filesMapped = [];
    for (var i = 0; i < files.length; i++) {
      filesMapped.push({
        id: uniqueId("fileToUpload_"),
        name: files[i].name,
        file: files[i],
        isUploaded: false
      });
    }

    return filesMapped;
  }

  return (
    <div>
      <StyledFileInput id="upload-file" onChange={handleFileChange} />
      <label htmlFor="upload-file">
        <StyledAddFileContainer>
          <IconButton icon={faPlus} backgroundColor="blue">
            Add file
          </IconButton>
        </StyledAddFileContainer>
      </label>
    </div>
  );
}

FileInput.propTypes = {
  onChange: PropTypes.func
};

export default FileInput;
