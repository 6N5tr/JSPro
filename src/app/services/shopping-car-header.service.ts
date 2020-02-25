import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCarHeaderService {
  private _url: string;

  constructor(
    private _httpClient: HttpClient
  ) {
    this._url = environment.backendUrl + '/shoppingCarHeader';
  }

  public registerShoppingCarHeader(shoppingCarHeader: any): Observable<any> {
    return this._httpClient.post(this._url, shoppingCarHeader);
  }

  public deleteShoppingCarHeader(shoppingCarHeader: number): Observable<any> {
    return this._httpClient.delete(this._url + `/${shoppingCarHeader}`);
  }

  public updateShoppingCarHeader(shoppingCarHeader: any, id: number): Observable<any> {
    return this._httpClient.put(this._url + `/${id}`, shoppingCarHeader);
  }
}
