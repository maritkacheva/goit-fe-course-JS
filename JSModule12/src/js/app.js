
import { Notyf } from 'notyf';
import MicroModal from 'micromodal';
import notesTemplate from "../templates/notes.hbs";
import initialNotes from '../assets/notes.json';
import { refs, createNote } from './view';
import Notepad from './notepad-model';
import { PRIORITY_TYPES, NOTIFICATION_MESSAGES, SHORTID } from "./utils/constants";
import localStorage from "./localStorage";
import "notyf/notyf.min.css";
import '../sass/libs/micromodal.scss'

const localStorageNotes = localStorage.load('notes');
const startNotes = localStorageNotes || initialNotes;

const notyf = new Notyf();

MicroModal.init();

export const notepad = new Notepad(startNotes);

export const addListItem = (listRef, note) => {
  const listItem = notesTemplate(note);
  listRef.insertAdjacentHTML("beforeend", listItem);
}

export const handleOpenModal = () => {
  MicroModal.show('note-editor-modal')
}

export const handleNoteAdd = event => {
  event.preventDefault();
  const titleInput = refs.formTitle.value;
  const bodyInput = refs.formBody.value;

  if (titleInput.trim() === '' || bodyInput.trim() === '')
    return notyf.error(NOTIFICATION_MESSAGES.EDITOR_FIELDS_EMPTY);

  const submitNoteForm = {
    id: SHORTID.generate(),
    title: titleInput,
    body: bodyInput,
    priority: PRIORITY_TYPES.LOW,
  };

  notepad.saveNote(submitNoteForm)
    .then(() => {
      addListItem(refs.noteList, submitNoteForm);
      notyf.success(NOTIFICATION_MESSAGES.NOTE_ADDED_SUCCESS);
      refs.form.reset();
      MicroModal.close('note-editor-modal');
      localStorage.save('notes', notepad.notes);
      localStorage.remove('note-title');
      localStorage.remove('note-body')
    })

}

export const handleFilter = event => {
  const searchFormInput = event.target.value;

  notepad.filterNotesByQuery(searchFormInput)
    .then(filteredItems => {
      const filteredNotes = filteredItems.reduce((acc, el) => acc + notesTemplate(el), '')
    
      refs.noteList.innerHTML = '';
      refs.noteList.insertAdjacentHTML('beforeend', filteredNotes)
    });
}

const removeListItem = target => {
  const deleteListItem = target.closest('li');
  const id = deleteListItem.dataset.id;
  
  deleteListItem.remove();

  return notepad.deleteNote(id)
    .then(notes => {
      localStorage.save('notes', notes);
      notyf.success(NOTIFICATION_MESSAGES.NOTE_DELETED_SUCCESS);
    });
};

export const handleNoteDelete = event => {
  const action = event.target.closest('button').dataset.action;

  if (event.target.nodeName === 'I' && action === 'delete-note') {
    removeListItem(event.target);
  }
}

export const handleStorageNoteEditor = event => {
  const [title, body] = refs.form.elements;

  if (event.target === title) {
    localStorage.save('note-title', title.value);
  }
  if (event.target === body) {
    localStorage.save('note-body', body.value);
  }
}

const localStorageNoteTitle = localStorage.load('note-title');
const localStorageNoteBody = localStorage.load('note-body');
if (localStorageNoteTitle || localStorageNoteBody) {
  refs.form.elements[0].value = localStorageNoteTitle;
  refs.form.elements[1].value = localStorageNoteBody;
}


