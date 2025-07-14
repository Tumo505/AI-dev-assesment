# 📝 Multi-Language To-Do App

A minimal, task management app built with **React**, allowing users to create to-do items and instantly translate them into various languages using the MyMemory Translation API.

---

## 🔧 Product Requirements Document (PRD)

### Product Overview
The Multi-Language To-Do App enables users to create, manage, and translate personal task lists across different languages. 

### Core Features
- ✅ Add new tasks
- ✅ Mark tasks as completed
- ✅ Translate tasks from English to a selected language
- ✅ Edit tasks and auto-translate updated text
- ✅ Delete tasks
- ✅ Responsive UI and simple animations

### Target Users
- International users needing multilingual task support
- Students or professionals learning new languages
- Productivity-focused users who want a lightweight task tool

### Technical Requirements
- ✅ Frontend: React + Inline CSS
- ✅ Animation: Framer Motion
- ✅ Icons: Lucide React Icons
- ✅ AI Integration: [MyMemory Translation API](https://mymemory.translated.net/)
- ✅ Deployment: Vercel

---

## 🚀 Live Demo

🔗 [View the Live App on Vercel](https://dev-assesment.vercel.app/)  

---

## 📖 User Guide

### ✨ Getting Started
1. Type a task into the input field.
2. Select a target translation language from the dropdown.
3. Click **+ Add** to add the task and auto-translate it.

### ✏️ Edit a Task
- Click the ✏️ icon next to a task.
- Modify the text.
- Click 💾 to save — the task will be re-translated.

### ✅ Mark as Complete
- Click the ✅ icon to mark a task as complete or revert it.

### 🗑️ Delete a Task
- Click the 🗑️ icon to permanently delete a task.

---

## 🛠 Developer Documentation

### 🧱 Project Structure

```
multi-language-todo-app/
├── public/
│   ├── index.html             # HTML template
│   └── favicon.ico            # App icon
│
├── src/
│   ├── components/
│   │   └── TodoApp.js         # Main To-Do app with inline styling and translation logic
│   │
│   ├── index.js               # React entry point
│   └── App.js                 # App wrapper 
│
├── package.json               # Project metadata and dependencies
├── README.md                  # Project documentation
└── .gitignore                 # Files to ignore in version control
```




### 📦 Tech Stack
| Tool                 | Purpose                              |
|----------------------|--------------------------------------|
| React                | Frontend Framework                   |
| MyMemory API         | AI-Powered Translation               |
| Framer Motion        | Smooth animation                     |
| Lucide React         | Icons (Check, Edit, Trash, etc.)     |
| Vercel               | Deployment                           |

---

### 🔧 Installation

```bash
git clone https://github.com/Tumo505/AI-dev-assesment.git
cd AI-dev-assessment
npm install
npm start
