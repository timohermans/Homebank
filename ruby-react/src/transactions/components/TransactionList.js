import UploadIconButton from "./UploadIconButton";
import * as React from "react";

export default function TransactionList() {
  return (
    <div className="is-flex">
      <UploadIconButton onClick={() => alert("hallo")} />
    </div>
  );
}
