import React from "react";
import { Link } from "react-router-dom";

// Get title function
let getTitle = (note) => {
  // Split notes by lines
  const title = note.body.split("\n")[0];

  // make a list of all the lines then we will pull the first line
  if (title.length > 45) {
    return title.slice(0, 45);
  }

  return title;
};

// format date function
let getTime = (note) => {
  return new Date(note.updated).toLocaleDateString();
};

// preview of the note
let getContent = (note) => {
  // get the content after the title
  let title = getTitle(note);
  // removing the next line with an empty space
  let content = note.body.replaceAll("\n", "");
  // remove the title from the content
  content = content.replaceAll(title, "");

  // Checks the length of the text
  if (content.length > 45) {
    return content.slice(0, 45) + "...";
  } else {
    return content;
  }
};

export const ListItem = ({ note }) => {
  return (
    <Link to={`/note/${note.id}`}>
      <div className="notes-list-item">
        <h3>{getTitle(note)}</h3>
        <p>
          <span>{getTime(note)}</span>
          {getContent(note)}
        </p>
      </div>
    </Link>
  );
};

export default ListItem;
