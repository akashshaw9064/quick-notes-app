import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { NoteUser } from '../model/NoteUser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}
  public addNoteUser(user: NoteUser): Observable<NoteUser> {
    return this.http.post<NoteUser>(`${this.apiServerUrl}/new-user`, user);
  }
}
