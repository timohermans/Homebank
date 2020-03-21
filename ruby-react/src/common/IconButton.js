import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";

import "./IconButton.css";

export default function IconButton(props) {
  return (
    <div onClick={props.onClick} className={props.className + " icon-button"}>
      <div className="icon-button-icon">
        <FontAwesomeIcon icon={props.icon} />
      </div>
      {props.children}
    </div>
  );
}