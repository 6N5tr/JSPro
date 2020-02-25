import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FatherService {
  private _url: string;

  constructor(
    private _httpClient: HttpClient
  ) {
    this._url = environment.backendUrl + '/father';
  }

  public registerFather(father: any): Observable<any> {
    return this._httpClient.post(this._url, father);
  }

  public deleteFather(father: number): Observable<any> {
    return this._httpClient.delete(this._url + `/${father}`);
  }

  public getFathers(): Observable<any> {
    return this._httpClient.get(this._url);
  }
}
