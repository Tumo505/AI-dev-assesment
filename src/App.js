import React, { useState } from "react";
import { Check, Trash2, Languages } from "lucide-react"; // Icons
import { motion } from "framer-motion"; // Animation library

// Supported languages for translation
const languages = [
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "zh", name: "Chinese" },
  { code: "hi", name: "Hindi" },
  { code: "ar", name: "Arabic" },
  { code: "ru", name: "Russian" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "pt", name: "Portuguese" },
  { code: "it", name: "Italian" },
  { code: "nl", name: "Dutch" },
  { code: "pl", name: "Polish" },
];

export default function TodoApp() {
  // State: current task input
  const [task, setTask] = useState("");

  // State: list of all to-do items
  const [todos, setTodos] = useState([]);

  // State: selected translation language
  const [selectedLang, setSelectedLang] = useState("es");

  // State: editing logic
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // Function to translate text using MyMemory API
  const translateText = async (text, lang) => {
    const res = await fetch(
      "https://api.mymemory.translated.net/get?q=" +
        encodeURIComponent(text) +
        "&langpair=en|" +
        lang
    );
    const data = await res.json();
    return data.responseData.translatedText;
  };

  // Add new task and translate it
  const addTodo = async () => {
    if (!task.trim()) return;
    const translatedText = await translateText(task, selectedLang);
    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: task,
        translated: translatedText,
        completed: false,
      },
    ]);
    setTask(""); // Clear input
  };

  // Toggle task completion status
  const toggleComplete = (id) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // Delete a task
  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  // Start editing a task
  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  // Save an edited task and re-translate
  const saveEdit = async (id) => {
    const translated = await translateText(editText, selectedLang);
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              text: editText,
              translated,
              completed: todo.completed, // Keep the same status
            }
          : todo
      )
    );
    setEditingId(null);
    setEditText("");
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  // Count completed tasks
  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #eff6ff, #e0e7ff)",
        padding: "2.5rem 1rem",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ maxWidth: "640px", margin: "0 auto" }}>
        {/* Title and Description */}
        <h1
          style={{
            fontSize: "2.25rem",
            fontWeight: "800",
            textAlign: "center",
            color: "#1f2937",
            marginBottom: "0.5rem",
          }}
        >
          Multi-Language To-Do App
        </h1>
        <p
          style={{
            textAlign: "center",
            color: "#4b5563",
            marginBottom: "2rem",
          }}
        >
          Organize your tasks and translate them into different languages
        </p>

        {/* Progress Tracker */}
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "1rem",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            padding: "1rem",
            textAlign: "center",
            marginBottom: "1.5rem",
          }}
        >
          <p style={{ color: "#374151", fontWeight: "500" }}>
            {completedCount} of {todos.length} tasks completed
          </p>
          <div
            style={{
              width: "100%",
              backgroundColor: "#e5e7eb",
              height: "0.5rem",
              borderRadius: "9999px",
              marginTop: "0.5rem",
            }}
          >
            <div
              style={{
                backgroundColor: "#3b82f6",
                height: "100%",
                borderRadius: "9999px",
                width: `${(completedCount / todos.length) * 100 || 0}%`,
                transition: "width 0.3s ease",
              }}
            ></div>
          </div>
        </div>

        {/* Input + Controls */}
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "1rem",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            padding: "1.5rem",
            marginBottom: "2rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            {/* Task Input */}
            <input
              style={{
                flex: 1,
                border: "1px solid #d1d5db",
                borderRadius: "0.5rem",
                padding: "0.5rem 1rem",
                outline: "none",
                fontSize: "1rem",
              }}
              placeholder="Add a new task..."
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />

            {/* Language Selection + Add */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <Languages size={16} style={{ color: "#6b7280" }} />
              <label style={{ fontSize: "0.875rem", color: "#4b5563" }}>
                Translation language:
              </label>
              <select
                value={selectedLang}
                onChange={(e) => setSelectedLang(e.target.value)}
                style={{
                  borderRadius: "0.5rem",
                  border: "1px solid #d1d5db",
                  padding: "0.5rem",
                  fontSize: "0.875rem",
                }}
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
              <button
                onClick={addTodo}
                style={{
                  backgroundColor: "#2563eb",
                  color: "#fff",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.5rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                }}
              >
                + Add
              </button>
            </div>
          </div>
        </div>

        {/* Task List */}
        {todos.length === 0 ? (
          <div style={{ textAlign: "center", color: "#6b7280" }}>
            <p style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📝</p>
            <p>No tasks yet. Add one above to get started!</p>
          </div>
        ) : (
          todos.map((todo) => (
            <motion.div
              key={todo.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ marginBottom: "0.75rem" }}
            >
              <div
                style={{
                  backgroundColor: todo.completed ? "#dcfce7" : "#ffffff",
                  border: `1px solid ${
                    todo.completed ? "#bbf7d0" : "#e5e7eb"
                  }`,
                  padding: "1rem",
                  borderRadius: "1rem",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                }}
              >
                <div>
                  {/* Editable Text Field */}
                  {editingId === todo.id ? (
                    <input
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      style={{
                        width: "100%",
                        fontSize: "1.125rem",
                        fontWeight: "500",
                        padding: "0.25rem 0.5rem",
                        border: "1px solid #d1d5db",
                        borderRadius: "0.5rem",
                        marginBottom: "0.5rem",
                      }}
                    />
                  ) : (
                    <p
                      style={{
                        fontSize: "1.125rem",
                        fontWeight: "500",
                        textDecoration: todo.completed
                          ? "line-through"
                          : "none",
                        color: todo.completed ? "#6b7280" : "#111827",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {todo.text}
                    </p>
                  )}

                  {/* Translated Text */}
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "#6b7280",
                      fontStyle: "italic",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                    }}
                  >
                    <Languages size={14} /> {todo.translated}
                  </p>
                </div>

                {/* Actions */}
                <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.25rem" }}>
                  {editingId === todo.id ? (
                    <>
                      <button
                        onClick={() => saveEdit(todo.id)}
                        style={{ color: "#10b981", cursor: "pointer" }}
                      >
                        💾
                      </button>
                      <button
                        onClick={cancelEdit}
                        style={{ color: "#6b7280", cursor: "pointer" }}
                      >
                        ❌
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => toggleComplete(todo.id)}
                        style={{ color: "#16a34a", cursor: "pointer" }}
                      >
                        <Check />
                      </button>
                      <button
                        onClick={() => startEdit(todo)}
                        style={{ color: "#3b82f6", cursor: "pointer" }}
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        style={{ color: "#dc2626", cursor: "pointer" }}
                      >
                        <Trash2 />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        )}

        {/* Footer */}
        <footer
          style={{
            textAlign: "center",
            fontSize: "0.875rem",
            color: "#9ca3af",
            marginTop: "2.5rem",
          }}
        >
          Translation powered by AI, Built by Tumo
        </footer>
      </div>
    </div>
  );
}
