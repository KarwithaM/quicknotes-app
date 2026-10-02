# QuickNotes

QuickNotes is a clean, responsive, and persistent note-taking web application designed to help users capture ideas, tasks, and reminders instantly. Built with vanilla HTML, CSS, and JavaScript, it allows users to categorize notes, search through them in real-time, and ensures that data is never lost even if the browser is closed.

## Features

- **Add Notes:** Create notes with text and assign them to categories (Personal, Work, Study).
- **Validation:** Prevents empty notes and enforces a 200-character limit with clear error messages.
- **Search:** Instantly filter notes as you type in the search bar.
- **Persistence:** Notes are automatically saved to the browser's Local Storage, so they survive page refreshes.
- **Responsive Design:** Looks great on both desktop monitors and mobile phones.
- **Category Styling:** Each category has a unique color-coded border for easy visual scanning.

## How to Run Locally

1. Clone or download this repository to your computer.
2. Open the `index.html` file in any modern web browser (Chrome, Firefox, Safari).
3. Alternatively, use a local server extension like "Live Server" in VS Code for the best experience.

## What I Learned

Building QuickNotes was a fantastic journey into full-stack front-end development. Here are three key things I learned:

1. **The Power of the DOM:** I learned how to use `document.createElement` and `textContent` to dynamically build HTML from JavaScript data safely, avoiding security risks like XSS.
2. **State Management and Rendering:** I discovered the "Single Source of Truth" pattern. By keeping the `notes` array as the source of truth and re-rendering the UI whenever it changes, the code stays clean and predictable.
3. **Browser Memory:** I learned how to use `localStorage` along with `JSON.stringify()` and `JSON.parse()` to pack and unpack JavaScript objects so they can be saved as text in the browser.
