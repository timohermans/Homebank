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

// <div class="d-flex action" data-test-id="import" (click)="openImportModal()">
//     <div class="d-flex justify-content-center align-items-center icon rounded-circle mr-2">
//     <fa-icon icon="file-csv"></fa-icon>
// </div>
// <div class="align-self-center">Import</div>
// </div>
