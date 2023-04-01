import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Note } from 'src/app/model/Note';
import { NoteService } from 'src/app/service/note.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public notes!: Note[];
  public editNote!: Note;
  public deleteNote!: Note;

  constructor(private noteService :NoteService) { }
  ngOnInit(): void {
    this.getNotes();
  }
  public getNotes(): void{
    this.noteService.getNotes().subscribe({
      next: (response :Note[])=>{this.notes = response},
      error: (err :HttpErrorResponse)=>{
        console.log("It wasn't a success")
        console.error(err.message)}
    });
  }

  public onAddNote(addForm: NgForm): void {
    document.getElementById('add-note-form')!.click();
    let data :Note = addForm.value;
    this.noteService.addNote(data).subscribe({
      next: (response: Note) => {
        console.log(response);
        this.getNotes();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    }
      
    );
  }

  public onUpdateNote(note: Note): void {
    this.noteService.updateNote(note).subscribe(
      (response: Note) => {
        console.log(response);
        this.getNotes();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteNote(noteId: number): void {
    this.noteService.deleteNote(noteId).subscribe(
      (response: void) => {
        console.log(response);
        this.getNotes();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchNotes(key: string): void {
    console.log(key);
    const results: Note[] = [];
    for (const note of this.notes) {
      if (note.getTitle().toLowerCase().indexOf(key.toLowerCase()) !== -1
      || note.getDesc().toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(note);
      }
    }
    this.notes = results;
    if (results.length === 0 || !key) {
      this.getNotes();
    }
  }


  public onOpenModal(mode: string, note?: Note): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addNoteModal');
    }
    if (mode === 'edit' && note) {
      this.editNote = note;
      button.setAttribute('data-target', '#updateNoteModal');
    }
    if (mode === 'delete' && note) {
      this.deleteNote = note;
      button.setAttribute('data-target', '#deleteNoteModal');
    }
  
    container!.appendChild(button);
    button.click();
  }
}
