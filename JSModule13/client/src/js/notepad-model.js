import * as api from './services/api'

export default class Notepad {

  constructor(notes = []) {
    this._notes = notes;
  }

  get notes() {
    return api.getNotes().then(serverNotes => {
      return this._notes = serverNotes;
    });
  }

  findNoteById(id) {
    return this._notes.find(el => el.id === id);
  }

  saveNote(note) {
    return api.saveNote(note).then(newNote => {
      this._notes.push(newNote);
      return newNote;
    });
  }

  deleteNote(id) {
    return api.deleteNote(id).then(() => {
      const note = this.findNoteById(id);
      this._notes.splice(this._notes.indexOf(note), 1);
      // return this._notes;
    });
  }

  updateNoteContent(id, updatedContent) {
    return api.updateNote(id, updatedContent).then(updateNote => {
      const note = this.findNoteById(id);
      if (!note) return;
      Object.assign(note, updatedContent);
      return updateNote;
    });
  }

  updatePriority(id, newPriority) {
    return api.updateNote(id, priority).then(updateNote => {
      const note = this.findNoteById(id);
      if (!note) return;
      note.priority = newPriority;
      return updateNote;
    });
  }

  filterNotesByQuery(query) {   
    return new Promise((resolve) => {
    api.getNotes().then(serverNotes => {
      setTimeout(() => {
        const queryArr = [];
        for (const note of serverNotes) {
          const queryBody = note.body.toLowerCase();
          const queryTitle = note.title.toLowerCase();
          console.log(query);
          if (
            queryBody.includes(query.toLowerCase()) || 
            queryTitle.includes(query.toLowerCase())
            )
            queryArr.push(note);
        }
        return resolve(queryArr);
      }, 300)});
    });
    
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
};
