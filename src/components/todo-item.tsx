import React from "react";
import { formatDate } from "@/lib/utils";
import { Todo } from "@/lib/types";
import { Button } from "./ui/button";
import { useTodoStore } from "@/lib/store";
import { useLanguage } from "@/lib/language-context";
import ResponsiveContainer from "./responsive-container";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { toggleTodo, deleteTodo } = useTodoStore();
  const { isRTL } = useLanguage();

  const handleToggle = () => {
    toggleTodo(todo.id);
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  // Define size badges with appropriate colors
  const sizeBadge = () => {
    const baseClasses = "px-2 py-1 text-xs font-semibold rounded-full";

    switch (todo.size) {
      case "small":
        return (
          <span
            className={`${baseClasses} bg-green-100 text-green-800 border border-green-200`}
          >
            {isRTL ? "صغير" : "Small"}
          </span>
        );
      case "medium":
        return (
          <span
            className={`${baseClasses} bg-yellow-100 text-yellow-800 border border-yellow-200`}
          >
            {isRTL ? "متوسط" : "Medium"}
          </span>
        );
      case "large":
        return (
          <span
            className={`${baseClasses} bg-red-100 text-red-800 border border-red-200`}
          >
            {isRTL ? "كبير" : "Large"}
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`p-4 mb-4 border rounded-lg shadow-sm transition-all duration-200 hover:shadow-md 
      ${
        todo.completed
          ? "bg-gray-50 border-gray-200"
          : "bg-white border-gray-200 hover:border-blue-200"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start">
          <div className="pt-0.5">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={handleToggle}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
            />
          </div>
          <div className={`flex-1 ${isRTL ? "mr-3" : "ml-3"}`}>
            <ResponsiveContainer className="flex justify-between items-center mb-1">
              <h3
                className={`text-lg font-medium ${
                  todo.completed
                    ? "line-through text-gray-500"
                    : "text-gray-900"
                }`}
              >
                {todo.title}
              </h3>
            </ResponsiveContainer>
            {todo.description && (
              <ResponsiveContainer className="mt-1">
                <p
                  className={`text-sm ${
                    todo.completed ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {todo.description}
                </p>
              </ResponsiveContainer>
            )}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-3 h-3"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z"
                    clipRule="evenodd"
                  />
                </svg>
                {formatDate(todo.createdAt)}
              </span>
              {sizeBadge()}
            </div>
          </div>
        </div>
        <div className={`flex gap-2 ${isRTL ? "mr-4" : "ml-4"}`}>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDelete}
            className="text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
