// ---------- 1. Select Elements ----------
const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const errorMessage = document.querySelector("#error-message");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const searchInput = document.querySelector("#search-input"); // NEW for Task 5

const STORAGE_KEY = "quicknotes-app-data"; // NEW for Task 5

// ---------- 2. Load and Save Data (Task 5 Persistence) ----------
function loadNotes() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

// Initialize notes from localStorage
let notes = loadNotes();

// ---------- 3. Render Function ----------
function render() {
  notesList.innerHTML = "";
  
  // Get search term and make it lowercase for case-insensitive search
  const searchTerm = searchInput.value.toLowerCase().trim();

  // Filter notes based on search
  const filteredNotes = notes.filter((note) => 
    note.text.toLowerCase().includes(searchTerm)
  );

  // Show "No notes match" message if search finds nothing
  if (filteredNotes.length === 0 && searchTerm !== "") {
    const noResults = document.createElement("li");
    noResults.textContent = "No notes match your search.";
    noResults.style.color = "#777";
    noResults.style.fontStyle = "italic";
    notesList.appendChild(noResults);
  }

  // Loop through filtered notes and build HTML
  filteredNotes.forEach((note) => {
    const li = document.createElement("li");
    li.classList.add("note", `category-${note.category}`);

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

    const textP = document.createElement("p");
    textP.classList.add("note-text");
    textP.textContent = note.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteNote(note.id));

    li.appendChild(headerDiv);
    li.appendChild(textP);
    li.appendChild(deleteBtn);
    notesList.appendChild(li);
  });

  // Update count
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }
}

// ---------- 4. Add Note with Validation ----------
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = input.value.trim();
  const category = categorySelect.value;

  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }

  if (text.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  errorMessage.textContent = "";

  const newNote = {
    id: Date.now(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleString(),
  };

  notes.push(newNote);
  saveNotes(); // Save to localStorage
  input.value = "";
  input.focus();
  render();
});

// ---------- 5. Delete Note ----------
function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes(); // Save to localStorage
  render();
}

// ---------- 6. Search Event Listener (Task 5) ----------
searchInput.addEventListener("input", render);

// ---------- 7. Initial Render ----------
render();