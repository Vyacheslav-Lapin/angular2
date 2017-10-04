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
        </ul>`
})
export default class NotesComponent {
    notes: Array<Note> = [
        {text:"Note one"},
        {text:"Note two"},
    ];
}
