import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _url: string;

  constructor(
    private _httpClient: HttpClient
  ) {
    this._url = environment.backendUrl + '/user';
  }

  public getUser(username: string, role: string): Observable<any> {
    return this._httpClient.get(`${this._url}?username=${username}&role=${role}`);
  }

  public registerUser(user): Observable<any> {
    return this._httpClient.post(this._url, user);
  }
}
