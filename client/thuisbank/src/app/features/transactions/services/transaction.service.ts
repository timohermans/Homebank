import { Injectable } from '@angular/core';
import { TransactionUpdate, Transaction } from '../entities/transaction.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { AssignCategoryToTransactionModel } from '../entities/assign-category-to-transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  constructor(private httpClient: HttpClient) {}

  public getTransactions(): Observable<Transaction[]> {
    return this.httpClient.get<any[]>(`${environment.apiUrl}/transaction`);
  }

  public getForEditBy(id: string): Observable<Transaction> {
    return this.httpClient.get<Transaction>(`${environment.apiUrl}/transaction/${id}`);
  }

  public uploadFiles(files: File[] = []): Observable<any> {
    const formData = new FormData();
    formData.append('file', files[0]);

    return this.httpClient.post(`${environment.apiUrl}/transaction/upload`, formData);
  }

  // CRITICAL: Update a transaction (assign category)
  public update(transaction: TransactionUpdate): Observable<any> {
    return this.httpClient.put(`${environment.apiUrl}/transaction`, transaction);
  }

  public assignCategory(assignCategoryModel: AssignCategoryToTransactionModel): Observable<any> {
    return this.httpClient.put(
      `${environment.apiUrl}/transaction/${assignCategoryModel.id}/assign-category`,
      assignCategoryModel
    );
  }
}
