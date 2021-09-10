import React from "react";

import notes from "../assets/data";

function NotePage({ match }) {
  let noteId = match.params.id;

  // finds the id of the note to the note id passed in the url
  let note = notes.find((note) => note.id == noteId);
  return (
    <div>
      {/* '?' this states to only output if it exists */}
      <p>{note?.body}</p>
    </div>
  );
}

export default NotePage;
