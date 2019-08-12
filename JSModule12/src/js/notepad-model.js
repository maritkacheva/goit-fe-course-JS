
export default class Notepad {
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
    return new Promise(resolve => {
      setTimeout(() => {
        this.notes.push(note);
        return resolve(note);
      }, 300)
    })

  };
  deleteNote(id) {
    return new Promise(resolve => {
      setTimeout(() => {
        const note = this.findNoteById(id);

        this.notes.splice(this.notes.indexOf(note), 1);

        return resolve(this.notes);
      }, 400);
    });
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
    return new Promise(resolve => {
      setTimeout(() => {
        const queryArr = [];

        for (const note of this.notes) {
          const queryBody = note.body.toLowerCase();
          const queryTitle = note.title.toLowerCase();

          if (queryBody.includes(query.toLowerCase()) || queryTitle.includes(query.toLowerCase()))
            queryArr.push(note);
        }

        return resolve(queryArr);
      }, 300);
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
