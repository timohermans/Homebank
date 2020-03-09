import UploadIconButton from "./UploadIconButton";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { showUploadModal } from "../transactionsDuck";
import UploadModal from "./UploadModal";

export default function TransactionActionBar() {
  const dispatch = useDispatch();
  const isModalVisible = useSelector(
    ({ transactionState }) => transactionState.isUploadModalVisible
  );
  const uploadModal = isModalVisible ? <UploadModal /> : null;

  return (
    <React.Fragment>
      <div className="is-flex">
        <UploadIconButton onClick={() => dispatch(showUploadModal())} />
      </div>
      {uploadModal}
    </React.Fragment>
  );
}
