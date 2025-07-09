# 📊 Spreadsheet UI - React Prototype

This project is a **static, front-end-only spreadsheet interface** built with **React**, **TypeScript**, and **Tailwind CSS**, mimicking a Google Sheets-like experience. 

## 🚀 Live Demo
🔗 [Live URL](#) — *(https://spreadsheet-ui-9p3e-two.vercel.app/)*

---

## 🛠️ Tech Stack

- **React 18** (with Vite)
- **TypeScript** (strict mode enabled)
- **Tailwind CSS** for utility-first styling
- **React Icons**, **FontAwesome** for UI elements
- **No external table libraries** — custom minimal spreadsheet/grid implementation
- **No global state libraries** — local component state only

---

## ✅ Features

- 📐 **Pixel-perfect layout**
- ⌨️ **Keyboard navigation** (Tab/Arrow keys) between cells
- 🧮 **Editable spreadsheet cells** with custom input behavior  
- 📁 **Column toggling, resizing**, and **dynamic column addition**
- 🧭 **Top, middle, and bottom tab bars** for navigation and actions
- 📤 **Export/Import/Share** buttons (log actions to console)
- 📌 **Status, priority & currency** handling with contextual styling
- ✅ All interactive elements are functional (log or change state)
- 🔍 **Search, Notifications, User Avatar** in the top right
- 🧾 **Organized clean code**, strictly typed, and well-structured

## ⚠️ Trade-offs & Limitations

- No data persistence — edits are lost on reload.
- No backend integration (purely front-end UI prototype).

## 🧑‍💻 Getting Started

```bash
# Clone the repo
git clone https://github.com/yourusername/spreadsheet-ui.git

# Navigate into the project
cd spreadsheet-ui

# Install dependencies
npm install

# Run the development server
npm run dev

The app will be available at http://localhost:5173.

