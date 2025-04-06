import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Todo } from "@/lib/types";
import TodoItem from "./todo-item";

interface SortableTodoItemProps {
  todo: Todo;
}

export function SortableTodoItem({ todo }: SortableTodoItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "grab",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative group"
    >
      <TodoItem todo={todo} />

      {/* Drag handle icon */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
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
          className="text-gray-500"
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
