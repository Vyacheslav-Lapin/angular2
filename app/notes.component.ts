import {Component} from '@angular/core';

interface Note {
    text: string;
}

@Component({
    selector: 'notes',
    template: `
        Notes list:
        <ul>
            <li *ngFor="let note of notes">
                {{note.text}}
            </li>
        </ul>
        <textarea [(ngModel)]="text"></textarea>
        <button (click)="add()">Add</button>`
})
export default class NotesComponent {

    text: string;

    notes: Array<Note> = [
        {text:"Note one"},
        {text:"Note two"},
    ];

    add() {
        let note = { text: this.text }
        this.notes.push(note);
        this.text = "";
    }
}
