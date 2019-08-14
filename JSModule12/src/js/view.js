
import noteTemplate from "../templates/notes.hbs";
import initialNotes from '../assets/notes.json';
import localStorage from "./localStorage";

export const refs = {
  noteList: document.querySelector('.note-list'),
  form: document.querySelector('.note-editor'),
  formTitle: document.querySelector('input[name="note_title"]'),
  formBody: document.querySelector('textarea[name="note_body"]'),
  searchForm: document.querySelector('.search-form'),
  saveNoteBtn: document.querySelector('.modal__btn[form="note-editor-form"]'),
  openEditorBtn: document.querySelector('button[data-action="open-editor"]'),
  searchFormInput: document.querySelector('.search-form__input')
}


export const createNote = notes => notes.map(note => noteTemplate(note));
const markup = createNote(localStorage.load('notes') || initialNotes).join('');
refs.noteList.insertAdjacentHTML('beforeend', markup)
