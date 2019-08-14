
import noteTemplate from '../templates/notes.hbs';
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

<<<<<<< HEAD

export const createNotes = notes => notes.map(note => noteTemplate(note));
const markup = createNotes(localStorage.load('notes') || initialNotes).join('');
=======
export const createNote = notes => notes.map(note => noteTemplate(note));
const markup = createNote(localStorage.load('notes') || initialNotes).join('');
>>>>>>> c4f5b2441473f41a07b8e7d61986beae535e7a6e
refs.noteList.insertAdjacentHTML('beforeend', markup)
