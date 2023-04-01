import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthRequest } from '../model/AuthRequest';
import { Note } from '../model/Note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getToken(){
    return sessionStorage.getItem("token");
  }
  private getHttpOptions(){
    let headers_obj = new HttpHeaders().set('Authorization', 'Bearer ' + this.getToken());
        const httpOptions = {
          headers: headers_obj
        };
        return httpOptions;
  }
  public authenticate(req: AuthRequest): Observable<string> {
    return this.http.post(`${this.apiServerUrl}/authentication`, req,{responseType: 'text'});
  }
  public getNotes():Observable<Note[]> {
    console.log("Inside getNotes");
    return this.http.get<Note[]>(`${this.apiServerUrl}/notes`, this.getHttpOptions());
  }
  public addNote(note: Note) :Observable<Note>{
    return this.http.post<Note>(`${this.apiServerUrl}/new-note`,note,this.getHttpOptions())
  }
  public updateNote(note: Note) :Observable<Note>{
    return this.http.post<Note>(`${this.apiServerUrl}/update-note`,note,this.getHttpOptions())
  }
  public deleteNote(noteId: number) :Observable<any>{
    return this.http.delete<void>(`${this.apiServerUrl}/delete-note/${noteId}`,this.getHttpOptions());
  }

}
