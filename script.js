// ---------- 1. Select Elements ----------
const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const errorMessage = document.querySelector("#error-message");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");

// Our array to hold the note objects
let notes = [];

// ---------- 2. Render Function (Task 3) ----------
function render() {
  // Clear the current list
  notesList.innerHTML = "";

  // Loop through notes and build HTML for each
  notes.forEach((note) => {
    const li = document.createElement("li");
    li.classList.add("note");
    // Add the specific category class for the colored border (Task 2 styling)
    li.classList.add(`category-${note.category}`);

    // Header div for category and date
    const headerDiv = document.createElement("div");
    headerDiv.classList.add("note-header");

    const categorySpan = document.createElement("span");
    categorySpan.classList.add("note-category");
    categorySpan.textContent = note.category;

    const dateSpan = document.createElement("span");
    dateSpan.classList.add("note-date");
    dateSpan.textContent = note.createdAt;

    headerDiv.appendChild(categorySpan);
    headerDiv.appendChild(dateSpan);

    // Note text (using textContent for security!)
    const textP = document.createElement("p");
    textP.classList.add("note-text");
    textP.textContent = note.text;

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "Delete";
    // Closure: this button remembers the specific note.id it belongs to
    deleteBtn.addEventListener("click", () => deleteNote(note.id));

    // Assemble the note card
    li.appendChild(headerDiv);
    li.appendChild(textP);
    li.appendChild(deleteBtn);
    notesList.appendChild(li);
  });

  // Update the count message (Task 4)
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }
}

// ---------- 3. Add Note with Validation (Tasks 3 & 4) ----------
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Stop page reload

  const text = input.value.trim();
  const category = categorySelect.value;

  // Validation 1: Empty check
  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return; // Stop the function here
  }

  // Validation 2: Length check
  if (text.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return; // Stop the function here
  }

  // If we pass validation, clear any old errors
  errorMessage.textContent = "";

  // Create the note object
  const newNote = {
    id: Date.now(), // Unique ID based on current millisecond
    text: text,
    category: category,
    createdAt: new Date().toLocaleString(), // Readable date and time
  };

  // Add to array, clear input, and re-render
  notes.push(newNote);
  input.value = "";
  input.focus();
  render();
});

// ---------- 4. Delete Note (Task 4) ----------
function deleteNote(id) {
  // Keep only the notes that do NOT match the deleted ID
  notes = notes.filter((note) => note.id !== id);
  render(); // Re-render to update the screen and the count
}

// ---------- 5. Initial Render ----------
render();