import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import IconButton from "../common/IconButton";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";

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

function FileInput({ onChange }) {
  return (
    <div>
      <StyledFileInput id="upload-file" onChange={onChange} />
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
