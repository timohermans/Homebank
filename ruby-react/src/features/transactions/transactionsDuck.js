import { call, put } from "redux-saga/effects";

// Actions
const SHOW_UPLOAD_MODAL = "homebank/transactions/SHOW_UPLOAD_MODAL";
const HIDE_UPLOAD_MODAL = "homebank/transactions/HIDE_UPLOAD_MODAL";
export const FILE_UPLOAD_REQUESTED =
  "homebank/transactions/FILE_UPLOAD_REQUESTED";
const FILE_UPLOAD_SUCCEEDED = "homebank/transactions/FILE_UPLOAD_SUCCEEDED";
const FILE_UPLOAD_FAILED = "homebank/transactions/FILE_UPLOAD_FAILED";

const initialState = {
  isUploadModalVisible: false,
  isUploadingFile: false,
  uploadResult: null,
  errorMessage: null
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SHOW_UPLOAD_MODAL:
      return (state = {
        ...state,
        isUploadModalVisible: true
      });
    case HIDE_UPLOAD_MODAL:
      return (state = {
        ...state,
        isUploadModalVisible: false
      });
    case FILE_UPLOAD_REQUESTED:
      return (state = {
        ...state,
        isUploadingFile: true
      });
    case FILE_UPLOAD_SUCCEEDED:
      return (state = {
        ...state,
        isUploadingFile: false,
        uploadResult: action.result
      });
    case FILE_UPLOAD_FAILED:
      return (state = {
        ...state,
        isUploadingFile: false,
        errorMessage: action.message
      });
    default:
      return state;
  }
}

// Action Creators
export function showUploadModal() {
  return { type: SHOW_UPLOAD_MODAL };
}

export function hideUploadModal() {
  return { type: HIDE_UPLOAD_MODAL };
}

export function requestTransactionFileUpload(file) {
  return { type: FILE_UPLOAD_REQUESTED, payload: file };
}

function transactionFileUploadSucceeded(result) {
  return { type: FILE_UPLOAD_SUCCEEDED, result };
}

function transactionFileUploadFailed(message) {
  return { type: FILE_UPLOAD_FAILED, message };
}

// // side effects, only as applicable
// // e.g. thunks, epics, etc
// export function getWidget() {
//   return dispatch =>
//     get("/widget").then(widget => dispatch(updateWidget(widget)));
// }

export function* uploadTransactionFile(action) {
  try {
    const uploadResult = yield call(uploadFile, action.payload);
    yield put(transactionFileUploadSucceeded(uploadResult));
  } catch (e) {
    yield put(transactionFileUploadFailed(e.message));
  }
}

async function uploadFile(file) {
  const form = new FormData();
  form.append("file", file);

  await fetch("http://localhost:4000/transactions/upload", {
    method: "POST",
    body: form
  });
}
