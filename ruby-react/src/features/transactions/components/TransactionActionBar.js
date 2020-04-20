import UploadIconButton from "./UploadIconButton";
import * as React from "react";
import { useDispatch } from "react-redux";
import { showUploadModal } from "../transactionsDuck";
import UploadModal from "./UploadModal";
import styled from "styled-components";

const StyledTransactionActionBar = styled.div`
  margin-top: ${props => props.theme.spacing.s};
`;

export default function TransactionActionBar() {
  const dispatch = useDispatch();  

  return (
    <StyledTransactionActionBar>
      <div className="is-flex">
        <UploadIconButton onClick={() => dispatch(showUploadModal())} />
      </div>
      <UploadModal />
    </StyledTransactionActionBar>
  );
}
