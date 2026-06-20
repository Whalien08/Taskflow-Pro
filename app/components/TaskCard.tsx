"use client";

import {
  deleteTask,
  toggleTask,
  updateTask,
} from "@/app/actions";
import { useState } from "react";

type Task = {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  priority: string;
  dueDate?: Date | null;
};

export default function TaskCard({ task }: { task: Task }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(
    task.description || ""
  );

  const inputStyle = "w-full px-3 py-2 rounded-lg border border-zinc-700 bg-zinc-950 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-zinc-600";

  return (
    <div className={`p-5 rounded-xl border transition-all ${task.completed ? 'bg-zinc-950/50 border-zinc-800/50' : 'bg-zinc-900 border-zinc-800 shadow-sm hover:border-zinc-700'}`}>
      {isEditing ? (
        <div className="space-y-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputStyle}
            placeholder="Task title"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`${inputStyle} resize-none`}
            rows={2}
            placeholder="Task description"
          />

          <div className="flex gap-2 pt-2">
            <button
              onClick={() => {
                updateTask(task.id, title, description);
                setIsEditing(false);
              }}
              className="bg-blue-600 text-zinc-50 font-medium px-4 py-2 rounded-lg text-sm hover:bg-blue-500 transition-colors"
            >
              Save Changes
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-zinc-800 text-zinc-300 font-medium px-4 py-2 rounded-lg text-sm hover:bg-zinc-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-start justify-between gap-4 mb-2">
            <h2 className={`text-lg font-semibold ${task.completed ? "text-zinc-600 line-through" : "text-zinc-100"}`}>
              {task.title}
            </h2>
            
            {/* Priority Badge */}
            <span className={`shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
              task.priority === "High"
                ? "bg-red-500/10 text-red-400 border-red-500/20"
                : task.priority === "Medium"
                ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                : "bg-green-500/10 text-green-400 border-green-500/20"
            }`}>
              {task.priority}
            </span>
          </div>

          {task.description && (
            <p className={`text-sm mb-4 ${task.completed ? "text-zinc-600" : "text-zinc-400"}`}>
              {task.description}
            </p>
          )}

          <div className="flex items-center text-xs text-zinc-500 mb-5 font-medium">
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {task.dueDate
              ? new Date(task.dueDate).toISOString().slice(0, 10)
              : "No due date"}
          </div>
        </>
      )}

      {/* Action Buttons Container */}
      {!isEditing && (
        <div className="flex gap-2 pt-4 border-t border-zinc-800/50">
          <button
            onClick={() => toggleTask(task.id, task.completed)}
            className={`flex-1 font-medium px-3 py-2 rounded-lg text-sm transition-colors ${
              task.completed 
                ? "bg-zinc-800/50 text-zinc-500 hover:bg-zinc-800" 
                : "bg-green-500/10 text-green-400 hover:bg-green-500/20"
            }`}
          >
            {task.completed ? "Undo" : "Complete"}
          </button>

          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-zinc-800/50 text-zinc-300 hover:bg-zinc-800 font-medium rounded-lg text-sm transition-colors border border-zinc-700/50"
          >
            Edit
          </button>

          <button
            onClick={() => deleteTask(task.id)}
            className="px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 font-medium rounded-lg text-sm transition-colors"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}