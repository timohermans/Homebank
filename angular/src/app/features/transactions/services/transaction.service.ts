import {Injectable} from '@angular/core';
import {TransactionUpdate, Transaction} from '../entities/transaction.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {tap} from 'rxjs/operators';
import {IsLoadingService} from '@service-work/is-loading';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private transactionStore = new BehaviorSubject<Transaction[]>([]);

  constructor(private httpClient: HttpClient, private loadingService: IsLoadingService) {
  }

  public loadTransactions(): void {
    this.loadingService.add(this.httpClient.get<any[]>(`${environment.apiUrl}/transaction`)
      .subscribe((transactions: Transaction[]) => {
        this.transactionStore.next(transactions);
      }), {key: 'transactions'});
  }

  public getTransactions(): Observable<Transaction[]> {
    return this.transactionStore.asObservable();
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
    return this.httpClient.put(`${environment.apiUrl}/transaction/${transaction.id}`, transaction);
  }
}
