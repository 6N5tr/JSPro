import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SonService {
  private _url: string;

  constructor(
    private _httpClient: HttpClient
  ) {
    this._url = environment.backendUrl + '/son';
  }

  public registerSon(son: any): Observable<any> {
    return this._httpClient.post(this._url, son);
  }

  public deleteFather(son: number): Observable<any> {
    return this._httpClient.delete(this._url + `/${son}`);
  }
}
