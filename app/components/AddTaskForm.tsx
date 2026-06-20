"use client";

import { createTask } from "@/app/actions";
import { useState } from "react";

export default function AddTaskForm() {
  const [title, setTitle] = useState("");
  const [subtasks, setSubtasks] = useState("");

  async function generateSubtasks() {
    const res = await fetch("/api/ai", {
      method: "POST",
      body: JSON.stringify({ task: title }),
    });

    const data = await res.json();
    setSubtasks(data.subtasks);
  }

  const inputStyle = "w-full px-4 py-3 rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-zinc-600";

  return (
    <form action={createTask} className="space-y-5">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-zinc-100">Create New Task</h2>
        <p className="text-sm text-zinc-500">Add the details for your next task below.</p>
      </div>

      <input
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        className={inputStyle}
      />

      <textarea
        name="description"
        placeholder="Description"
        rows={3}
        className={`${inputStyle} resize-none`}
      />

      <div className="flex flex-col sm:flex-row gap-4">
        <select name="priority" className={inputStyle}>
          <option value="Low">Low Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="High">High Priority</option>
        </select>

        <input
          type="date"
          name="dueDate"
          className={inputStyle}
          style={{ colorScheme: "dark" }}
        />
      </div>

      {/* Buttons with modern spacing and hover states */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          type="button"
          onClick={generateSubtasks}
          className="flex-1 bg-purple-500/10 text-purple-400 font-medium px-5 py-3 rounded-xl border border-purple-500/20 hover:bg-purple-500/20 transition-colors"
        >
          Generate Subtasks with AI
        </button>

        <button className="flex-1 bg-blue-600 text-zinc-50 font-medium px-5 py-3 rounded-xl hover:bg-blue-500 transition-colors">
          Add Task
        </button>
      </div>

      {subtasks && (
        <div className="border border-indigo-500/20 p-5 rounded-xl bg-indigo-500/10 mt-6 transition-all">
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h2 className="font-semibold text-indigo-300">
              AI Suggested Subtasks
            </h2>
          </div>
          <p className="whitespace-pre-line text-sm text-indigo-200/80 leading-relaxed">
            {subtasks}
          </p>
        </div>
      )}
    </form>
  );
}