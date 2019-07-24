

import { refs, renderNoteList, addListItem } from './view';
import Notepad from './notepad-model';
import initialNotes from '../assets/notes.json';
import { PRIORITY_TYPES , SHORTID} from "./utils/constants";

export const notepad = new Notepad(initialNotes);

export const handleNoteEditor = event => {
  event.preventDefault();
  const titleInput = refs.submitFormTitle.value;
  const bodyInput = refs.submitFormBody.value;

  if (titleInput.trim() === '' || bodyInput.trim() === '') return alert('Необходимо заполнить все поля');

  const submitNoteForm = {
    id: SHORTID.generate(),
    title: titleInput,
    body: bodyInput,
    priority: PRIORITY_TYPES.LOW,
  };
  console.log(submitNoteForm);

  notepad.saveNote(submitNoteForm);

  addListItem(refs.noteList, submitNoteForm);

  refs.submitForm.reset();
}

export const handleFilterChange = event => {
  const searchFormInput = event.target.value;
  const filteredItems = notepad.filterNotesByQuery(searchFormInput);

  renderNoteList(refs.noteList, filteredItems);
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
}




