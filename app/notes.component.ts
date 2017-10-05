import {Component} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

interface Note {
    text: string;
    _id: string
}

@Component({
    selector: 'notes',
    template: `
        Notes list:
        <ul>
            <li *ngFor="let note of notes">
                {{note.text}}
                <button (click)="remove(note._id)">remove</button>
            </li>
        </ul>
        <textarea [(ngModel)]="text"></textarea>
        <button (click)="add()">Add</button>`
})
export default class NotesComponent {

    text: string;

    constructor(private http: Http) {
        this.readNotes();
    }

    private readNotes() {
        this.getNotes()
            .then(notes => {
                this.notes = notes;
                console.log(notes);
            });
    }

    notes: Array<Note> = [];

    // URL to web api
    private notesUrl = '/notes';

    getNotes(): Promise<Note[]> {
        return this.http.get(this.notesUrl)
            .toPromise()
            .then(response => response.json() as Note[]);
    }

    add() {
        let note = {text: this.text};
        // this.notes.push(note);
        this.addNote(this.text);
        this.text = "";
    }

    addNote(note: string) {
        this.http.post(this.notesUrl, note)
            .toPromise()
            .then(response => response.json() as Note)
            .then(note => this.notes.push(note))
        // .then(note =>
        //     console.log("note sent, response", response));
    }

    remove(id: string) {
        const params: URLSearchParams = new URLSearchParams();
        params.set('id', id);
        this.http.delete(this.notesUrl, {search: params})
            .toPromise()
            .then(response => {
                console.log(
                    `note with id ${id} removed, response`, response);
                this.readNotes();
            });
    }
}
