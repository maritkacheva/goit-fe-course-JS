'use strict';

const PRIORITY_TYPES = {
  LOW: 'Priority: Low',
  NORMAL: 'Priority: Normal',
  HIGH: 'Priority: High'
};

const ICON_TYPES = {
  EDIT: 'edit',
  DELETE: 'delete',
  ARROW_DOWN: 'expand_more',
  ARROW_UP: 'expand_less',
};

const NOTE_ACTIONS = {
  DELETE: 'delete-note',
  EDIT: 'edit-note',
  INCREASE_PRIORITY: 'increase-priority',
  DECREASE_PRIORITY: 'decrease-priority',
};

const initialNotes = [
  {
    id: 'id-1',
    title: 'JavaScript essentials',
    body:
      'Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc',
    priority: PRIORITY_TYPES.HIGH,
  },
  {
    id: 'id-2',
    title: 'Refresh HTML and CSS',
    body:
      'Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.',
    priority: PRIORITY_TYPES.NORMAL,
  },
  {
    id: 'id-3',
    title: 'Get comfy with Frontend frameworks',
    body:
      'First should get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.',
    priority: PRIORITY_TYPES.NORMAL,
  },
  {
    id: 'id-4',
    title: 'Winter clothes',
    body:
      "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sport wear as well so I'll be able to do some exercises in the park.",
    priority: PRIORITY_TYPES.LOW,
  },
];

//MODEL

class Notepad {
  constructor(notes = []) {
    this._notes = notes;
  }
  get notes() {
    return this._notes;
  }
  findNoteById(id) {
    for (const note of this.notes) {
      if (note.id === id) return note;
    }
  }
  saveNote(note) {
    return this.notes.push(note);
  }
  deleteNote(id) {
    const note = this.findNoteById(id);
    this.notes.splice(this.notes.indexOf(note), 1);
  }
  updateNoteContent(id, updatedContent) {
    const note = this.findNoteById(id);
    if (!note) return;
    Object.assign(note, updatedContent);
    return note;
  }
  updatePriority(id, priority) {
    const note = this.findNoteById(id);
    if (!note) return;
    note.priority = priority;
    return note;
  }
  filterNotesByQuery(query) {
    const queryArr = [];
    for (const note of this.notes) {
      const queryBody = note.body.toLowerCase();
      const queryTitle = note.title.toLowerCase();
      if (queryBody.includes(query.toLowerCase()) || queryTitle.includes(query.toLowerCase()))
        queryArr.push(note);
    }
    return queryArr;
  }
  filterNotesByPriority(priority) {
    const priorityArr = [];
    for (const note of this.notes) {
      if (note.priority === priority) {
        priorityArr.push(note);
      }
    }
    return priorityArr;
  }
  static Priority = {
    LOW: 0,
    NORMAL: 1,
    HIGH: 2,
  }
  static generateUniqueId = () =>
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15);
};

const notepad = new Notepad(initialNotes);

//REFS

const refs = {
  noteList: document.querySelector('.note-list'),
  submitForm: document.querySelector('.note-editor'),
  submitFormTitle: document.querySelector('input[name="note_title"]'),
  submitFormBody: document.querySelector('textarea[name="note_body"]'),
  searchForm: document.querySelector('.search-form'),
}

//UI

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
}

const createActionButton = () => {
  const actionButton = document.createElement('button');
  actionButton.classList.add('action');
  return actionButton;
}

const createNoteSection = () => {
  const noteSection = document.createElement('section');
  noteSection.classList.add('note__section');
  return noteSection;
}

const createIcon = () => {
  const icon = document.createElement('i');
  icon.classList.add('material-icons');
  icon.classList.add('action__icon');
  return icon;
}

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

}

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
}

const renderNoteList = (listRef, notes) => {
  const noteListItems = notes.map(note => createListItem(note));
  listRef.innerHTML = '';
  listRef.append(...noteListItems);
};

// ADD/DELETE NOTE

const addListItem = (listRef, note) => {

  const listItem = createListItem(note);
  listRef.appendChild(listItem);
}

const removeListItem = target =>{
  const deleteListItem = target.closest('li');
  const id = deleteListItem.dataset.id;
  notepad.deleteNote(id);
  deleteListItem.remove();
};

//HANDLERS

const handleNoteEditor = event => {
  event.preventDefault();
  const titleInput = refs.submitFormTitle.value;
  const bodyInput = refs.submitFormBody.value;

  if (titleInput.trim() === '' || bodyInput.trim() === '') return alert('Необходимо заполнить все поля');

  const submitNoteForm = {
    id: Notepad.generateUniqueId(),
    title: titleInput,
    body: bodyInput,
    priority: PRIORITY_TYPES.LOW,
  };
  console.log(submitNoteForm);

  notepad.saveNote(submitNoteForm);

  addListItem(refs.noteList, submitNoteForm);

  refs.submitForm.reset();
}

const handleFilterChange = event => {
  console.log(event.target.value);
  const searchFormInput = event.target.value;
  const filteredItems = notepad.filterNotesByQuery(searchFormInput);

  renderNoteList(refs.noteList, filteredItems);
}

const handleNoteDelete = event => {

  const action = event.target.closest('button').dataset.action;

  if (event.target.nodeName === 'I' && action === 'delete-note') {
    removeListItem(event.target);
  }
}

renderNoteList(refs.noteList, notepad.notes);

// EVENTLISTENERS

refs.submitForm.addEventListener('submit', handleNoteEditor);
refs.searchForm.addEventListener('input', handleFilterChange);
refs.noteList.addEventListener('click', handleNoteDelete)























