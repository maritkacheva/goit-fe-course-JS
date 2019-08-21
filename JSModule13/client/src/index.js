import './sass/main.scss';

import { refs } from "./js/view";
import * as handler from "./js/app";


refs.openEditorBtn.addEventListener('click', handler.handleOpenModal)
refs.form.addEventListener('submit', handler.handleNoteAdd);
refs.searchFormInput.addEventListener('input', handler.handleFilter);
refs.noteList.addEventListener('click', handler.handleNoteDelete);

