import { combineReducers } from "redux";
import transactionsReducer from "../features/transactions/transactionsDuck";

console.log(transactionsReducer);

const rootReducer = combineReducers({
  transactionState: transactionsReducer
});
export default rootReducer;
