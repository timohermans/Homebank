import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { ApolloQueryResult } from 'apollo-client';
import { Transaction, TransactionQueryResult } from '../entities/transaction.model';
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

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  constructor(private apollo: Apollo) {}

  public getTransactions(): Observable<Transaction[]> {
    return this.apollo
      .watchQuery<TransactionQueryResult>({
        query: TransactionsQuery
      })
      .valueChanges.pipe(
        map((result: ApolloQueryResult<TransactionQueryResult>) => result.data.transactions)
      );
  }

  public uploadFrom(files: File[]): void {
    const formData = new FormData();
    for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
      const file = files[fileIndex];
      formData.append(`file-${fileIndex}`, file);
    }
  }
}
