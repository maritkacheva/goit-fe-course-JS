
import { Notyf }  from 'notyf';
import MicroModal from 'micromodal';
import notesTemplate from "../templates/notes.hbs";
import initialNotes from '../assets/notes.json';
import { refs } from './view';
import Notepad from './notepad-model';
import { PRIORITY_TYPES, NOTIFICATION_MESSAGES, SHORTID } from "./utils/constants";
import "notyf/notyf.min.css";
import '../sass/libs/micromodal.scss'

const notyf = new Notyf();

MicroModal.init();

export const notepad = new Notepad(initialNotes);

export const addListItem = (listRef, note) => {
  const listItem  = notesTemplate(note);
  listRef.insertAdjacentHTML("beforeend", listItem);
}

export const handleOpenModal = ()=>{
  MicroModal.show('note-editor-modal')
}

export const handleNoteEditor = event => {
  event.preventDefault();
  const titleInput = refs.submitFormTitle.value;
  const bodyInput = refs.submitFormBody.value;

  if (titleInput.trim() === '' || bodyInput.trim() === '')
   return notyf.error(NOTIFICATION_MESSAGES.EDITOR_FIELDS_EMPTY);

  const submitNoteForm = {
    id: SHORTID.generate(),
    title: titleInput,
    body: bodyInput,
    priority: PRIORITY_TYPES.LOW,
  };

  notepad.saveNote(submitNoteForm);

  addListItem(refs.noteList, submitNoteForm);
  notyf.success(NOTIFICATION_MESSAGES.NOTE_ADDED_SUCCESS);

  refs.submitForm.reset();
  MicroModal.close('note-editor-modal');
}

export const handleFilterChange = event => {
  const searchFormInput = event.target.value;
  const filteredItems = notepad.filterNotesByQuery(searchFormInput);
  const filteredNotes = notesTemplate(filteredItems);
  refs.noteList.innerHTML = '';

  refs.noteList.insertAdjacentHTML('beforeend', filteredNotes)
}

const removeListItem = target =>{
  const deleteListItem = target.closest('li');
  const id = deleteListItem.dataset.id;
  notepad.deleteNote(id);
  deleteListItem.remove();
};

export const handleNoteDelete = event => {

  const action = event.target.closest('button').dataset.action;

  if (event.target.nodeName === 'I' && action === 'delete-note') {
    removeListItem(event.target);
  }
  notyf.success(NOTIFICATION_MESSAGES.NOTE_DELETED_SUCCESS);
}

