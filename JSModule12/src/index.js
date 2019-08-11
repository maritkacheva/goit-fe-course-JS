import './sass/main.scss';

import { refs } from "./js/view";
import { handleOpenModal, handleNoteAdd, handleFilter, handleNoteDelete, handleStorageNoteEditor  } from "./js/app";


refs.openEditorBtn.addEventListener('click', handleOpenModal)
refs.form.addEventListener('submit', handleNoteAdd);
refs.searchFormInput.addEventListener('input', handleFilter);
refs.noteList.addEventListener('click', handleNoteDelete);
refs.form.addEventListener('keyup', handleStorageNoteEditor) 