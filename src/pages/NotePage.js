import React, { useState, useEffect } from "react";

// import notes from "../assets/data";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";

function NotePage({ match, history }) {
  let noteId = match.params.id;

  let [note, setNote] = useState(null);

  useEffect(() => {
    getNote();
  }, [noteId]);

  let getNote = async () => {
    if (noteId === "new") return;
    let response = await fetch(`http://localhost:5000/notes/${noteId}`);
    let data = await response.json();

    setNote(data);
  };

  //Create Note
  let createNote = async () => {
    await fetch(`http://localhost:5000/notes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...note, updated: new Date() }),
    });
  };

  let updateNote = async () => {
    await fetch(`http://localhost:5000/notes/${noteId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...note, updated: new Date() }),
    });
  };

  // Delete Note function
  let deleteNote = async () => {
    await fetch(`http://localhost:5000/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    //redirects to the homepage
    history.push("/");
  };

  //
  let handleSubmit = () => {
    //
    if (noteId != "new" && !note.body) {
      deleteNote();
    } else if (noteId !== "new") {
      updateNote();
    } else if (noteId === "new" && note !== null) {
      createNote();
    }
    // redirect the user to homepage
    history.push("/");
  };

  // let note = notes.find((note) => note.id == noteId);
  // finds the id of the note to the note id passed in the url
  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <Link to="/">
            <ArrowLeft onClick={handleSubmit} />
          </Link>
        </h3>

        {/* Checks if the note is new to show delete button
         if not change the button to the done button */}
        {noteId !== "new" ? (
          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={handleSubmit}>Done</button>
        )}
      </div>

      <textarea
        onChange={(e) => {
          setNote({ ...note, body: e.target.value });
        }}
        value={note?.body}
      ></textarea>
    </div>
  );
}

export default NotePage;
