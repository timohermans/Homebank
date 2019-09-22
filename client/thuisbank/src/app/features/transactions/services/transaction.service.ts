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
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

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
  constructor(private apollo: Apollo, private httpClient: HttpClient) {}

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

  public uploadFiles(files: File[] = []): Observable<any> {
    const formData = new FormData();

    if (files.length > 1) {
      alert(`I'm sorry but I only support one file at a time right now :(`);
    }

    const uploadUrlSegment = 'graphql?mutation=mutation+UploadTransaction{uploadTransactions}';
    formData.append('file', files[0]);
    formData.append(
      'operations',
      JSON.stringify({
        query: 'mutation ($file: Upload!) { uploadTransactions(file: $file) }',
        variables: { file: null }
      })
    );
    formData.append('map', JSON.stringify({ file: ['variables.file'] }));

    return this.httpClient.post(`${environment.apiUrl}/${uploadUrlSegment}`, formData);
  }

  public update(transaction: TransactionUpdate): Observable<any> {
    // FEATURE: Update a transaction (assign category)
    return of({});
  }
}
