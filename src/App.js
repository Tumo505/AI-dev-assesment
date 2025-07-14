import React, { useState } from "react";
import { Check, Trash2, Languages } from "lucide-react";
import { motion } from "framer-motion";

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
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [selectedLang, setSelectedLang] = useState("es");

  const addTodo = async () => {
    if (!task.trim()) return;
    const translatedText = await translateText(task, selectedLang);
    setTodos([
      ...todos,
      { id: Date.now(), text: task, translated: translatedText, completed: false }
    ]);
    setTask("");
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const translateText = async (text, lang) => {
    const res = await fetch("https://api.mymemory.translated.net/get?q=" + encodeURIComponent(text) + "&langpair=en|" + lang);
    const data = await res.json();
    return data.responseData.translatedText;
  };

  const completedCount = todos.filter(t => t.completed).length;

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(to bottom right, #ebf8ff, #e0e7ff)", padding: "2rem", fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: "640px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "800", textAlign: "center", color: "#1f2937", marginBottom: "0.5rem" }}>Multi-Language To-Do App</h1>
        <p style={{ textAlign: "center", color: "#4b5563", marginBottom: "2rem" }}>Organize your tasks and translate them into different languages</p>

        <div style={{ background: "white", borderRadius: "1rem", padding: "1rem", marginBottom: "1.5rem", textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <p style={{ fontWeight: "500", color: "#374151" }}>{completedCount} of {todos.length} tasks completed</p>
          <div style={{ background: "#e5e7eb", height: "0.5rem", borderRadius: "9999px", marginTop: "0.5rem", overflow: "hidden" }}>
            <div style={{
              background: "#3b82f6",
              height: "100%",
              width: `${(completedCount / todos.length) * 100 || 0}%`,
              transition: "width 0.3s ease"
            }} />
          </div>
        </div>

        <div style={{ background: "white", borderRadius: "1rem", padding: "1.5rem", marginBottom: "2rem", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <input
              style={{
                flex: 1,
                border: "1px solid #d1d5db",
                borderRadius: "0.5rem",
                padding: "0.5rem 1rem",
                fontSize: "1rem",
                outline: "none"
              }}
              placeholder="Add a new task..."
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Languages size={16} style={{ color: "#6b7280" }} />
              <label style={{ fontSize: "0.9rem", color: "#6b7280" }}>Translation language:</label>
              <select
                value={selectedLang}
                onChange={(e) => setSelectedLang(e.target.value)}
                style={{
                  borderRadius: "0.5rem",
                  border: "1px solid #d1d5db",
                  padding: "0.5rem",
                  fontSize: "1rem",
                  outline: "none"
                }}
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>{lang.name}</option>
                ))}
              </select>
              <button
                onClick={addTodo}
                style={{
                  background: "#2563eb",
                  color: "white",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.5rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                }}
              >
                + Add
              </button>
            </div>
          </div>
        </div>

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
              style={{ marginBottom: "1rem" }}
            >
              <div style={{
                padding: "1rem",
                borderRadius: "1rem",
                border: `1px solid ${todo.completed ? "#86efac" : "#e5e7eb"}`,
                background: todo.completed ? "#d1fae5" : "white",
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                transition: "all 0.3s ease"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <p style={{
                      fontSize: "1.125rem",
                      fontWeight: "500",
                      textDecoration: todo.completed ? "line-through" : "none",
                      color: todo.completed ? "#6b7280" : "#111827",
                      marginBottom: "0.25rem"
                    }}>
                      {todo.text}
                    </p>
                    <p style={{ fontSize: "0.875rem", color: "#6b7280", fontStyle: "italic", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                      <Languages size={14} /> {todo.translated}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.25rem" }}>
                    <button onClick={() => toggleComplete(todo.id)} style={{ color: "#16a34a", cursor: "pointer" }}>
                      <Check />
                    </button>
                    <button onClick={() => deleteTodo(todo.id)} style={{ color: "#dc2626", cursor: "pointer" }}>
                      <Trash2 />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
