import './sass/main.scss';
import { renderNoteList, refs } from "./js/view";
import { notepad, handleNoteEditor, handleFilterChange, handleNoteDelete  } from "./js/app";

renderNoteList(refs.noteList, notepad.notes);

refs.submitForm.addEventListener('submit', handleNoteEditor);
refs.searchForm.addEventListener('input', handleFilterChange);
refs.noteList.addEventListener('click', handleNoteDelete)
