import { combineReducers } from "redux";
import transactionsReducer from "../features/transactions/transactionsDuck";

const rootReducer = combineReducers({
  transactions: transactionsReducer
});
export default rootReducer;
