import {initialState, State, transactionAdapter} from './transaction-store.state';
import {Actions, ActionTypes} from './transaction-store.actions';

export function transactionReducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.SET_ALL_TRANSACTIONS:
      return transactionAdapter.addAll(action.payload.transactions, {...state});
    default:
      return state;
  }
}
