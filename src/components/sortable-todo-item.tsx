import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Todo } from "@/lib/types";
import TodoItem from "./todo-item";
import { useLanguage } from "@/lib/language-context";

interface SortableTodoItemProps {
  todo: Todo;
}

export function SortableTodoItem({ todo }: SortableTodoItemProps) {
  const { isRTL } = useLanguage();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: todo.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 100 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative touch-manipulation select-none rounded-lg transition-all duration-200 ${
        isDragging ? "shadow-lg border-2 border-blue-400" : ""
      }`}
    >
      <TodoItem todo={todo} />
      
      {/* Drag handle positioned at the top-right */}
      <div 
        {...attributes}
        {...listeners}
        className={`absolute ${isRTL ? 'left-4' : 'right-4'} top-4 flex items-center justify-center p-2 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-grab active:cursor-grabbing transform hover:scale-105 transition-all duration-150`}
        title={isRTL ? "اسحب لإعادة الترتيب" : "Drag to reorder"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-600 dark:text-gray-300"
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
