import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Note } from 'src/app/model/Note';
import { NoteUser } from 'src/app/model/NoteUser';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  alert :boolean = false;
  constructor(private userService :UserService) { }

  ngOnInit(): void {
  }
  onSubmit(registerForm : NgForm): void{
    const data  = registerForm.value;
    const noteUser :NoteUser = new NoteUser(data.userName,data.password,data.name, new Array<Note>);
    console.log(noteUser);
    this.userService.addNoteUser(noteUser).subscribe({
      next: (response: NoteUser) => {
        console.log(response);
        this.alert = true;
        registerForm.reset();
      },
      error: (err: HttpErrorResponse)=> console.error(err.message)
    });
  }
}
