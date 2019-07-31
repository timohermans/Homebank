import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Transaction} from '../entities/transaction.model';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private readonly transactionUrl = `${environment.apiUrl}/transactions`;
  constructor(private http: HttpClient) {}

  public fetchAll(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.transactionUrl);
  }

  public upload(formData: FormData): Observable<any> {
    return this.http.post(this.transactionUrl, formData);
  }
}
