import { PRIORITY_TYPES, ICON_TYPES, NOTE_ACTIONS } from "./utils/constants";

export const refs = {
  noteList: document.querySelector('.note-list'),
  submitForm: document.querySelector('.note-editor'),
  submitFormTitle: document.querySelector('input[name="note_title"]'),
  submitFormBody: document.querySelector('textarea[name="note_body"]'),
  searchForm: document.querySelector('.search-form'),
}

const createNoteContent = note => {
  const noteContentDiv = document.createElement('div');
  noteContentDiv.classList.add('note__content');

  const noteTitle = document.createElement('h2');
  noteTitle.classList.add('note__title');
  noteTitle.textContent = note.title;

  const noteBody = document.createElement('p');
  noteBody.classList.add('note__body');
  noteBody.textContent = note.body;

  noteContentDiv.append(noteTitle, noteBody);

  return noteContentDiv;
};

const createActionButton = () => {
  const actionButton = document.createElement('button');
  actionButton.classList.add('action');
  return actionButton;
};

const createNoteSection = () => {
  const noteSection = document.createElement('section');
  noteSection.classList.add('note__section');
  return noteSection;
};

const createIcon = () => {
  const icon = document.createElement('i');
  icon.classList.add('material-icons');
  icon.classList.add('action__icon');
  return icon;
};

const createNoteFooter = note => {
  const noteFooter = document.createElement('footer');
  noteFooter.classList.add('note__footer');

  const sectionExpand = createNoteSection();

  const btnDecrease = createActionButton();
  btnDecrease.dataset.action = NOTE_ACTIONS.DECREASE_PRIORITY;
  const iconExpMore = createIcon();
  iconExpMore.textContent = ICON_TYPES.ARROW_DOWN;

  const btnIncrease = createActionButton();
  btnIncrease.dataset.action = NOTE_ACTIONS.INCREASE_PRIORITY;
  const iconExpLess = createIcon();
  iconExpLess.textContent = ICON_TYPES.ARROW_UP;

  const notePriority = document.createElement('span');
  notePriority.classList.add('note__priority');
  notePriority.textContent = note.priority;

  const sectionEdit = createNoteSection();

  const btnEdit = createActionButton();
  btnEdit.dataset.action = NOTE_ACTIONS.EDIT;
  const iconEdit = createIcon();
  iconEdit.textContent = ICON_TYPES.EDIT;

  const btnDelete = createActionButton();
  btnDelete.dataset.action = NOTE_ACTIONS.DELETE;
  const iconDelete = createIcon();
  iconDelete.textContent = ICON_TYPES.DELETE;

  btnDecrease.append(iconExpMore);
  btnIncrease.appendChild(iconExpLess);
  btnEdit.appendChild(iconEdit);
  btnDelete.appendChild(iconDelete);

  sectionExpand.append(btnDecrease, btnIncrease);

  sectionEdit.append(btnEdit, btnDelete)

  noteFooter.append(sectionExpand, notePriority, sectionEdit);

  return noteFooter;

};

const createListItem = note => {
  const noteListItem = document.createElement('li');
  noteListItem.classList.add('note-list__item');
  noteListItem.dataset.id = note.id;

  const noteDiv = document.createElement('div');
  noteDiv.classList.add('note');

  const noteContent = createNoteContent(note);
  const noteFooter = createNoteFooter(note);

  noteDiv.append(noteContent, noteFooter);

  noteListItem.appendChild(noteDiv);

  return noteListItem;
};

export const renderNoteList = (listRef, notes) => {
  const noteListItems = notes.map(note => createListItem(note));
  listRef.innerHTML = '';
  listRef.append(...noteListItems);
};

export const addListItem = (listRef, note) => {

  const listItem = createListItem(note);
  listRef.appendChild(listItem);
}