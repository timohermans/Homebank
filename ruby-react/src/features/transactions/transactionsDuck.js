// Actions
const SHOW_UPLOAD_MODAL = "homebank/transactions/SHOW_UPLOAD_MODAL";
const HIDE_UPLOAD_MODAL = "homebank/transactions/HIDE_UPLOAD_MODAL";

const initialState = {
  isUploadModalVisible: false
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

// // side effects, only as applicable
// // e.g. thunks, epics, etc
// export function getWidget() {
//   return dispatch =>
//     get("/widget").then(widget => dispatch(updateWidget(widget)));
// }
