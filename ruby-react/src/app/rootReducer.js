import { combineReducers } from "redux";
import transactionsReducer from "../features/transactions/transactionsDuck";

const rootReducer = combineReducers({
  transactionState: transactionsReducer
});
export default rootReducer;
