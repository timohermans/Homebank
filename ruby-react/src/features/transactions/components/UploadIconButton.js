import * as React from "react";
import IconButton from "../../../common/IconButton";
import { faDownload } from "@fortawesome/free-solid-svg-icons/faDownload";
import { theme } from "../../../app/theme";

export default function UploadIconButton(props) {
  return (
    <IconButton
      onClick={props.onClick}
      icon={faDownload}
      backgroundColor={theme.colors.primary}
      backgroundHoverColor={theme.colors.primary2}
    >
      Add transactions
    </IconButton>
  );
}
