import { all, takeEvery } from "@redux-saga/core/effects";
import {
  FILE_UPLOAD_REQUESTED,
  uploadTransactionFile
} from "../features/transactions/transactionsDuck";

export default function* homebankSagas() {
  yield all([yield takeEvery(FILE_UPLOAD_REQUESTED, uploadTransactionFile)]);
}
