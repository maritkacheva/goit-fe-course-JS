import './sass/main.scss';

import { refs } from "./js/view";
import { handleOpenModal, handleNoteEditor, handleFilterChange, handleNoteDelete  } from "./js/app";


refs.openEditorBtn.addEventListener('click', handleOpenModal)
refs.submitForm.addEventListener('submit', handleNoteEditor);
refs.inputForm.addEventListener('input', handleFilterChange);
refs.noteList.addEventListener('click', handleNoteDelete)