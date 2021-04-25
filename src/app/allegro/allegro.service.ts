import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';
import {Category} from './model/category.model';
import {User} from '../user/user.model';
import {AllegroResponse} from './model/allegroresponse.model';

const API_URL = 'http://localhost:8080/allegro';
// const API_URL = 'http://pleczycki.pl/allegro/items';
// const API_URL = 'http://localhost:8080/test/1';

@Injectable({
  providedIn: 'root'
})
export class AllegroService {

  categories: Category[] = null;

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  getCategories(): Observable<any> {
    return this.http.get<Category[]>(API_URL + '/categories');
  }

  getToken(code: string): Observable<any> {
    return this.http
      .post(
        API_URL + '/auth',
        {
          code
        }
      ).pipe(tap(resData => {
        const allegroResponse: AllegroResponse = resData;

        this.handleAuthentication(
          allegroResponse.access_token,
          allegroResponse.expires_in
        );
      }));
  }

  private handleAuthentication(
    accessToken: string,
    expiresIn: number
  ): void {
    let tempUser: User;
    tempUser = this.authService.user.getValue();
    tempUser.setAllegroToken(accessToken);
    tempUser.setAllegroExpirationTime(expiresIn);
    this.authService.user.next(tempUser);
    localStorage.setItem('userData', JSON.stringify(tempUser));
  }
}
