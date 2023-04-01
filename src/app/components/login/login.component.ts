import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRequest } from 'src/app/model/AuthRequest';
import { NoteService } from 'src/app/service/note.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  failedLogin :boolean = false;
  constructor(private router :Router, private noteService :NoteService) { }

  ngOnInit(): void {
  }
  onSubmit(authreq: any){
    const req :AuthRequest = new AuthRequest(authreq.userName,authreq.password);
    this.noteService.authenticate(req).subscribe({
      next: (response) => {
        console.log('Login successful');
        console.log(response);
        sessionStorage.setItem('token',response);
        this.router.navigate(['/dashboard']);
      },
      error: (err)=> {
        this.failedLogin = true;
        console.error(err.message)}
    });
    
  }

}
