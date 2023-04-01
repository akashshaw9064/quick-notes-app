import { Note } from "./Note";

export class NoteUser {
    private username: string;
    private password: string;
    private name: string;
    private notes: Array<Note>;
    
    constructor(username :string, password :string, name :string, notes :Note[]){
        this.username = username;
        this.password = password;
        this.name = name;
        this.notes = notes;
    }
    
}