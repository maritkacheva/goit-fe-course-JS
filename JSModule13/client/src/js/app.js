
import { Notyf } from 'notyf';
import MicroModal from 'micromodal';
import noteTemplate from "../templates/notes.hbs";
//import initialNotes from '../assets/notes.json';
import { refs, createNote, sortNotes } from './view';
import Notepad from './notepad-model';
import { PRIORITY_TYPES, NOTIFICATION_MESSAGES } from "./utils/constants";
import "notyf/notyf.min.css";
import '../sass/libs/micromodal.scss'

const notepad = new Notepad();

const notyf = new Notyf();

MicroModal.init();

export const addListItem = (listRef, newNote) => {
  const listItem = noteTemplate(newNote);
  listRef.insertAdjacentHTML("beforeend", listItem);
}

export const handleOpenModal = () => {
  MicroModal.show('note-editor-modal')
}

export const handleNoteAdd = event => {
  event.preventDefault();

  if (refs.formTitle.value.trim() === '' || refs.formBody.value.trim() === '')
    return notyf.error(NOTIFICATION_MESSAGES.EDITOR_FIELDS_EMPTY);

  const submitNoteForm = {
    title: refs.formTitle.value,
    body: refs.formBody.value,
    priority: PRIORITY_TYPES.LOW,
  };

  notepad.saveNote(submitNoteForm)
    .then(() => {
      addListItem(refs.noteList, submitNoteForm);
      notyf.success(NOTIFICATION_MESSAGES.NOTE_ADDED_SUCCESS);
      refs.form.reset();
      MicroModal.close('note-editor-modal');
    })

}

export const handleFilter = event => {
  const searchFormInput = event.target.value;

  notepad.filterNotesByQuery(searchFormInput)
    .then((filteredItems) => {
      const filteredNotes = filteredItems.reduce((acc, el) => acc + notesTemplate(el), '')
    
      refs.noteList.innerHTML = '';
      refs.noteList.insertAdjacentHTML('beforeend', filteredNotes)
    })
    .catch(console.log);
}

const removeListItem = target => {
  const deleteListItem = target.closest('li');
  const id = deleteListItem.dataset.id;
  
  deleteListItem.remove();

  return notepad.deleteNote(id)
    .then(() => {
      notyf.success(NOTIFICATION_MESSAGES.NOTE_DELETED_SUCCESS);
    });
};

export const handleNoteDelete = event => {
  const action = event.target.closest('button').dataset.action;

  if (event.target.nodeName === 'I' && action === 'delete-note') {
    removeListItem(event.target);
  }
}
