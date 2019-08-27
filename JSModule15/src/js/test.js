import Notepad from "./notepad-model";

const initialNotes = [
  {
    id: "id-1",
    title: "JavaScript essentials",
    body:
      "Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc",
    priority: Notepad.Priority.HIGH
  },

  {
    id: "id-2",
    title: "Refresh HTML and CSS",
    body:
      "Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.",
    priority: Notepad.Priority.NORMAL
  },

  {
    id: 'id-3',
    title: 'Get comfy with Frontend frameworks',
    body:
      'First must get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.',
    priority: Notepad.Priority.NORMAL,
  },
  
  {
    id: 'id-4',
    title: 'Winter clothes',
    body:
      "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
    priority: Notepad.Priority.LOW,
  }
];

describe("Notepad testing", () => {
  it("should have initial notes", () => {
    const notepad = new Notepad(initialNotes);

    expect(notepad.notes).toEqual(initialNotes);
  });

  it("should find note by id", () => {
    const notepad = new Notepad(initialNotes);
    const note = notepad.findNoteById("id-1");

    expect(note.id).toBe("id-1");
  });

  it("should save note", () => {
    const notepad = new Notepad(initialNotes);
    const newNote = {
      id: "id-3",
      title: "Hello notepad!",
      body: "I am a new note!",  
      priority: Notepad.Priority.LOW
    };

    notepad.saveNote(newNote);

    expect(notepad.notes).toContain(newNote);
  });

  it("should delete note by id", () => {
    const notepad = new Notepad(initialNotes);
    const deletedNote = notepad.findNoteById("id-1");

    notepad.deleteNote(deletedNote.id);

    expect(notepad.notes).not.toContain(deletedNote);
  });

  it("should update note content by id", () => {
    const notepad = new Notepad(initialNotes);
    const newContent = {
      title: "Updated title!"
    };
    const updatedNote = notepad.findNoteById("id-3");

    notepad.updateNoteContent("id-3", newContent);

    expect(updatedNote.title).toBe("Updated title!");
  });

  it("should update note priority by id", () => {
    const notepad = new Notepad(initialNotes);
    
    notepad.updateNotePriority("id-2", Notepad.Priority.HIGH)
    
    const updatePriorNote = notepad.findNoteById("id-2");
    
    expect(updatePriorNote.priority).toBe(2);
  });

  it("should filter notes by query and return filtered notes", () => {
    const notepad = new Notepad(initialNotes);

    const filteredNotes = notepad.filterNotesByQuery("html");
    
    expect(filteredNotes).toContain(notepad.findNoteById("id-2"));
  });

  it("should filter notes by priority and return filtered notes", () => {
    const notepad = new Notepad(initialNotes);
    
    const filteredNotesByPrior = notepad.filterNotesByPriority(0);

    expect(filteredNotesByPrior).toContain(notepad.findNoteById("id-4"));
  });

});