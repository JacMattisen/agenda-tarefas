import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface UserRegisterPayload {
  name: string;
  email: string;
  password: string;
  enderecos?: [
    {
      street: string;
      number: string;
      complement: string;
      city: string;
      state: string;
      zip: string;
    }
  ];
  phones?: [
    {
      number: string;
      ddd: string;
    }
  ];
}

interface UserRegisterResponse {
  name: string;
  email: string;
  password: string;
  enderecos?: [
    {
      street: string;
      number: string;
      complement: string;
      city: string;
      state: string;
      zip: string;
    }
  ];
  phones:
    | [
        {
          number: string;
          ddd: string;
        }
      ]
    | null;
}

export interface UserLoginPayload {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8083/';

  constructor(private http: HttpClient) {}

  register(body: UserRegisterPayload): Observable<UserRegisterResponse> {
    return this.http.post<UserRegisterResponse>(
      `${this.apiUrl}/register`,
      body
    );
  }
  login(body: UserLoginPayload): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/register/login`, body, {
      responseType: 'text' as 'json',
    });
  }
}
