import * as api from './services/api'

export default class Notepad {

  constructor(notes = []) {
    this._notes = notes;
  };

  async getNotes() {
    try{
      const notes = await api.getNotes();
      this._notes = notes;

      return  this._notes;
    } catch(error){
      throw error;
    }
  };

  findNoteById(id) {
    return this._notes.find(el => el.id === id);
  };

   async saveNote(note) {
     try {
       const newNote = await api.saveNote(note);
       this._notes.push(newNote);

       return newNote
     } catch(error){
       throw error;
     }
  };

  async deleteNote(id) {
    try{
      await api.deleteNote(id);
      const note = this.findNoteById(id);
      this._notes.splice(this._notes.indexOf(note), 1);
    } catch(error){
      throw error;
    }
  };

  async updateNoteContent(id, updatedContent) {
    try{
      const updatedNote = await api.updateNote(id, updatedContent);
      const note = this.findNoteById(id);
      if(!note) return;
      Object.assign(note, updatedNote);

      return updatedNote;
    } catch(error){
      throw error;
    }
  };

  async updatePriority(id, newPriority) {
    try{
      const updatedNote = await api.updateNote(id, newPriority);
      const note = this.findNoteById(id);
      if (!note) return;
      note.priority = updatedNote.newPriority;
      return note;
    } catch(error){
      throw error;
    }
  };

  filterNotesByQuery(query) {   
    return new Promise((resolve) => {
    api.getNotes().then(serverNotes => {
      setTimeout(() => {
        const queryArr = [];
        for (const note of serverNotes) {
          const queryBody = note.body.toLowerCase();
          const queryTitle = note.title.toLowerCase();
        
          if (
            queryBody.includes(query.toLowerCase()) || 
            queryTitle.includes(query.toLowerCase())
            )
            queryArr.push(note);
        }
        return resolve(queryArr);
      }, 300)});
     });
  };

  filterNotesByPriority(priority) {
    const priorityArr = [];
    for (const note of this.notes) {
      if (note.priority === priority) {
        priorityArr.push(note);
      }
    }
    return priorityArr;
  };

  get notes() {
    return this._notes;
  }
};
