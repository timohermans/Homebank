import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable, of } from 'rxjs';
import { ApolloQueryResult } from 'apollo-client';
import {
  Transaction,
  TransactionCollectionQueryResult,
  TransactionUpdate,
  TransactionQueryResult
} from '../entities/transaction.model';
import { map, tap } from 'rxjs/operators';

const TransactionsQuery = gql`
  query FetchTransactions {
    transactions {
      id
      date
      payee
      memo
      inflow
      outflow
      isBankTransaction
      isInflowForBudgeting
      category {
        id
        name
      }
    }
  }
`;

const TransactionForEditQuery = gql`
  query FetchTransactionForEdit {
    transaction(id: $transactionId) {
      id
      payee
      memo
      category {
        id
        name
      }
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  constructor(private apollo: Apollo) {}

  public getTransactions(): Observable<Transaction[]> {
    return this.apollo
      .watchQuery<TransactionCollectionQueryResult>({
        query: TransactionsQuery
      })
      .valueChanges.pipe(
        map(
          (result: ApolloQueryResult<TransactionCollectionQueryResult>) => result.data.transactions
        )
      );
  }

  public getForEditBy(id: string): Observable<Transaction> {
    return this.apollo
      .watchQuery<TransactionQueryResult>({
        query: TransactionForEditQuery,
        variables: {
          transactionId: id
        }
      })
      .valueChanges.pipe(
        map((result: ApolloQueryResult<TransactionQueryResult>) => result.data.transaction)
      );
  }

  public uploadFrom(files: File[]): void {
    const formData = new FormData();
    for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
      const file = files[fileIndex];
      formData.append(`file-${fileIndex}`, file);
    }
  }

  public update(transaction: TransactionUpdate): Observable<any> {
    // TODO: implement
    return of({});
  }
}
