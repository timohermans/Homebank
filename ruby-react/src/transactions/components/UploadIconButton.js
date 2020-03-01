import * as React from "react";
import IconButton from "../../shared/IconButton";
import { faDownload } from "@fortawesome/free-solid-svg-icons/faDownload";

import "./UploadIconButton.css";

export default function UploadIconButton(props) {
  return <IconButton onClick={props.onClick} className="upload-icon-button" icon={faDownload}>Upload transactions</IconButton>;
}
