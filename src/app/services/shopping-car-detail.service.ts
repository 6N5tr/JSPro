import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCarDetailService {
  private _url: string;

  constructor(
    private _httpClient: HttpClient
  ) {
    this._url = environment.backendUrl + '/shoppingCarDetail';
  }

  public getShoppingCarDetails(shoppingCarHeader: any): Observable<any> {
    return this._httpClient.get(this._url + `?shoppingCarHeader=${shoppingCarHeader}`);
  }

  public registerShoppingCarDetail(shoppingCarDetail: any): Observable<any> {
    return this._httpClient.post(this._url, shoppingCarDetail);
  }

  public deleteShoppingCarDetail(shoppingCarDetail: number): Observable<any> {
    return this._httpClient.delete(this._url + `/${shoppingCarDetail}`);
  }
}
