

const Priority = {
  LOW: 0,
  NORMAL: 1,
  HIGH: 2,
};

class Notepad {
  constructor(notes = []) {
    this._notes = notes;
  }
  static Priority = {
    LOW: 0,
    NORMAL: 1,
    HIGH: 2,
  }
  get notes() {
    return this._notes;
  }
  findNoteById(id) {
    return this._notes.find(note => note.id === id);
  }
  saveNote(note) {
    return this._notes.push(note);
  }
  deleteNote(id) {
    const note = this.findNoteById(id);
    this._notes.splice(this._notes.indexOf(note), 1)
  }
  updateNoteContent(id, updatedContent) {
    const note = this.findNoteById(id);
    if (!note) return;
    Object.assign(note, updatedContent);
    return note;
  }
  updateNotePriority(id, priority) {
    const note = this.findNoteById(id);
    if (!note) return;
    note.priority = priority;
    return note;
  }
  filterNotesByQuery(query) {
    const queryArr = [];
    for (const note of this._notes) {
      const queryBody = note.body.toLowerCase();
      const queryTitle = note.title.toLowerCase();
      if (queryBody.includes(query.toLowerCase()) || queryTitle.includes(query.toLowerCase())) {
        queryArr.push(note);
      }
    }
    return queryArr;
  }
  filterNotesByPriority(priority) {
    const priorityArr = [];
    for (const note of this._notes) {
      if (note.priority === priority) {
        priorityArr.push(note);
      }
    }
    return priorityArr;
  }
};
