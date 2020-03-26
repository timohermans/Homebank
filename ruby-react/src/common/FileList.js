import React from "react";
import FileListItem from "./FileListItem";

export default function FileList({ files, removeFile }) {
  return (
    <div>
      {files.map((file, index) => (
        <FileListItem
          file={file}
          key={file.id}
          name={`remove-file-${index}`}
          removeFile={removeFile}
        ></FileListItem>
      ))}
    </div>
  );
}
