import {Component} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

interface Note {
    text: string;
}

@Component({
    selector: 'notes',
    template: `
        Notes list:
        <ul>
            <li *ngFor="let note of notes; let i=index">
                {{note.text}}
                <button (click)="remove(i)">remove</button>
            </li>
        </ul>
        <textarea [(ngModel)]="text"></textarea>
        <button (click)="add()">Add</button>`
})
export default class NotesComponent {

    text: string;

    constructor(private http: Http) {
        this.getNotes().then(notes => {
            this.notes = notes;
            console.log(notes);
        });
    }


    notes: Array<Note> = [
        {text:"Note one"},
        {text:"Note two"},
    ];

    // URL to web api
    private notesUrl = 'http://localhost:8080/notes';

    getNotes(): Promise<Note[]> {
        return this.http.get(this.notesUrl)
            .toPromise()
            .then(response => response.json() as Note[]);
    }

    // keypress(keyEvent: KeyboardEvent) {
    //     console.log(keyEvent.code);
    //     if (keyEvent.code === '13')
    //         this.add();
    // }

    add() {
        let note = {text: this.text};
        this.notes.push(note);
        this.text = "";
    }

    remove(index) {
        this.notes.splice(index, 1);

    }
}
