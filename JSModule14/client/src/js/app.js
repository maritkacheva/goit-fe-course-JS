
import { Notyf } from 'notyf';
import MicroModal from 'micromodal';
import noteTemplate from "../templates/notes.hbs";
import { refs } from './view';
import Notepad from './notepad-model';
import { PRIORITY_TYPES, NOTIFICATION_MESSAGES } from "./utils/constants";
import "notyf/notyf.min.css";
import '../sass/libs/micromodal.scss'

const notepad = new Notepad();

const notyf = new Notyf();

MicroModal.init();

export const handleOpenModal = () => MicroModal.show('note-editor-modal')

export const handleNoteAdd = async (event) => {
  try {
    event.preventDefault();

    if (refs.formTitle.value.trim() === '' || refs.formBody.value.trim() === '')
      return notyf.error(NOTIFICATION_MESSAGES.EDITOR_FIELDS_EMPTY);

    const submitNoteForm = {
      title: refs.formTitle.value,
      body: refs.formBody.value,
      priority: PRIORITY_TYPES.LOW,
    };

    await notepad.saveNote(submitNoteForm)
      .then(() => {
        addListItem(refs.noteList, submitNoteForm);
        notyf.success(NOTIFICATION_MESSAGES.NOTE_ADDED_SUCCESS);
        refs.form.reset();
        MicroModal.close('note-editor-modal');
      })
  } catch (error) {
    console.log(error);
  }
}
const addListItem = (listRef, newNote) => {
  const listItem = noteTemplate(newNote);
  listRef.insertAdjacentHTML("beforeend", listItem);
}

export const handleFilter = event => {
  const searchFormInput = event.target.value;

  notepad.filterNotesByQuery(searchFormInput)
    .then((filteredItems) => {
      const filteredNotes = filteredItems.reduce((acc, el) => acc + noteTemplate(el), '')

      refs.noteList.innerHTML = '';
      refs.noteList.insertAdjacentHTML('beforeend', filteredNotes)
    })
    .catch(console.log);
}

const removeListItem = async (target) => {
  try {
    const deleteListItem = target.closest('li');
    const id = deleteListItem.dataset.id;

    deleteListItem.remove();

    return await notepad.deleteNote(id)
      .then(() => {
        notyf.success(NOTIFICATION_MESSAGES.NOTE_DELETED_SUCCESS);
      });
  } catch(error){
    console.log(error);
  }
  
};

export const handleNoteDelete = event => {
  const action = event.target.closest('button').dataset.action;

  if (event.target.nodeName === 'I' && action === 'delete-note') {
    removeListItem(event.target);
  }
}
