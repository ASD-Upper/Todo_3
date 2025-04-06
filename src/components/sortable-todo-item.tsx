import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Todo } from "@/lib/types";
import TodoItem from "./todo-item";

interface SortableTodoItemProps {
  todo: Todo;
}

export function SortableTodoItem({ todo }: SortableTodoItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
    position: "relative" as const,
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative touch-manipulation"
    >
      <div
        className={`${isDragging ? "border-2 border-blue-500 rounded-lg" : ""}`}
      >
        <TodoItem todo={todo} />
      </div>

      {/* Visible drag handle icon */}
      <div className="absolute top-4 right-4 flex items-center justify-center transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-500 hover:text-gray-700"
        >
          <circle cx="8" cy="8" r="1" />
          <circle cx="8" cy="16" r="1" />
          <circle cx="16" cy="8" r="1" />
          <circle cx="16" cy="16" r="1" />
        </svg>
      </div>
    </div>
  );
}
