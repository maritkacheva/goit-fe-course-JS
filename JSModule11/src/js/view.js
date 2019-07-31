
import noteTemplate from "../templates/notes.hbs";
import initialNotes from '../assets/notes.json';

export const refs = {
  noteList: document.querySelector('.note-list'),
  submitForm: document.querySelector('.note-editor'),
  submitFormTitle: document.querySelector('input[name="note_title"]'),
  submitFormBody: document.querySelector('textarea[name="note_body"]'),
  searchForm: document.querySelector('.search-form'),
  saveNoteBtn: document.querySelector('.modal__btn[form="note-editor-form"]'),
  openEditorBtn: document.querySelector('button[data-action="open-editor"]'),
}


export const createNote = notes => notes.map(note=>noteTemplate(note));
const markup = createNote(initialNotes).join('');
refs.noteList.insertAdjacentHTML('beforeend', markup)
