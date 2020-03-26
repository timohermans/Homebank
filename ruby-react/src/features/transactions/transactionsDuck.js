import { call, put } from "redux-saga/effects";
import { uploadFile } from "./transactionsApi";
import filter from "lodash/filter";

// Actions
const SHOW_UPLOAD_MODAL = "homebank/transactions/SHOW_UPLOAD_MODAL";
const HIDE_UPLOAD_MODAL = "homebank/transactions/HIDE_UPLOAD_MODAL";
const FILE_ADDED = "homebank/transactions/FILE_ADDED";
const FILE_REMOVED = "homebank/transactions/FILE_REMOVED";
export const FILE_UPLOAD_REQUESTED =
  "homebank/transactions/FILE_UPLOAD_REQUESTED";
const FILE_UPLOAD_SUCCEEDED = "homebank/transactions/FILE_UPLOAD_SUCCEEDED";
const FILE_UPLOAD_FAILED = "homebank/transactions/FILE_UPLOAD_FAILED";

const initialState = {
  filesToUpload: [],
  isUploadModalVisible: false,
  isUploadingFile: false,
  uploadResult: null,
  errorMessage: null
};

// Reducer
export default function reducer(
  state = {
    filesToUpload: [],
    isUploadModalVisible: false,
    isUploadingFile: false,
    uploadResult: null,
    errorMessage: null
  },
  action = {}
) {
  switch (action.type) {
    case FILE_ADDED:
      return (state = {
        ...state,
        filesToUpload: [...state.filesToUpload, action.file]
      });
    case FILE_REMOVED:
      return (state = {
        ...state,
        filesToUpload: filter(
          state.filesToUpload,
          file => file.id !== action.file.id
        )
      });
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
        uploadResult: action.payload.result,
        filesToUpload: state.filesToUpload.map(file => {
          if (file.id !== action.payload.file.id) {
            return file;
          }

          return {
            ...file,
            isUploaded: true
          };
        })
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
export function addFile(file) {
  return { type: FILE_ADDED, file };
}

export function removeFile(file) {
  return { type: FILE_REMOVED, file };
}

export function showUploadModal() {
  return { type: SHOW_UPLOAD_MODAL };
}

export function hideUploadModal() {
  return { type: HIDE_UPLOAD_MODAL };
}

export function requestTransactionFileUpload(file) {
  return { type: FILE_UPLOAD_REQUESTED, file };
}

function transactionFileUploadSucceeded({ result, file }) {
  return { type: FILE_UPLOAD_SUCCEEDED, payload: { result, file } };
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
  let uploadResult;

  try {
    uploadResult = yield call(uploadFile, action.file.file);
  } catch (e) {
    yield put(transactionFileUploadFailed(e.message));
    return;
  }

  yield put(
    transactionFileUploadSucceeded({
      result: uploadResult,
      file: action.file
    })
  );
}
