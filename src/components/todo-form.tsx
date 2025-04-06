import React, { useState } from "react";
import { useTodoStore } from "@/lib/store";
import { useLanguage } from "@/lib/language-context";
import { Button } from "./ui/button";
import { TodoSize } from "@/lib/types";

interface TodoFormProps {
  userId: string;
}

const TodoForm: React.FC<TodoFormProps> = ({ userId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState<TodoSize>("medium");
  const { addTodo } = useTodoStore();
  const { isRTL } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    addTodo({
      title: title.trim(),
      description: description.trim() || undefined,
      completed: false,
      userId,
      size,
    });

    // Reset form
    setTitle("");
    setDescription("");
    setSize("medium");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 p-5 bg-white border border-gray-200 rounded-xl shadow-sm"
    >
      <div className="mb-5">
        <div className="flex justify-between items-center mb-2">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            {isRTL ? "عنوان المهمة" : "Task Title"}{" "}
            <span className="text-red-500">*</span>
          </label>
        </div>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          placeholder={isRTL ? "أضف مهمة جديدة..." : "Add a new task..."}
          required
        />
      </div>

      <div className="mb-5">
        <div className="flex justify-between items-center mb-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            {isRTL ? "الوصف (اختياري)" : "Description (optional)"}
          </label>
        </div>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          placeholder={
            isRTL ? "أضف تفاصيل حول مهمتك..." : "Add details about your task..."
          }
          rows={3}
        />
      </div>

      <div className="mb-5">
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">
            {isRTL ? "حجم المهمة" : "Task Size"}
          </label>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <SizeButton
            type="small"
            currentSize={size}
            onClick={() => setSize("small")}
          />
          <SizeButton
            type="medium"
            currentSize={size}
            onClick={() => setSize("medium")}
          />
          <SizeButton
            type="large"
            currentSize={size}
            onClick={() => setSize("large")}
          />
        </div>
      </div>

      <div className="flex justify-center">
        <Button type="submit" variant="primary" size="lg" className="px-6">
          <span className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
            </svg>
            {isRTL ? "إضافة مهمة" : "Add Task"}
          </span>
        </Button>
      </div>
    </form>
  );
};

interface SizeButtonProps {
  type: TodoSize;
  currentSize: TodoSize;
  onClick: () => void;
}

const SizeButton: React.FC<SizeButtonProps> = ({
  type,
  currentSize,
  onClick,
}) => {
  const isActive = type === currentSize;
  const { isRTL } = useLanguage();

  const baseClasses =
    "py-2 px-3 text-sm rounded-lg font-medium w-full text-center transition-all";

  const types = {
    small: {
      active: "bg-green-600 text-white border-green-600 shadow-sm",
      inactive:
        "bg-white text-gray-600 border-gray-300 hover:bg-green-50 hover:text-green-700 hover:border-green-300",
    },
    medium: {
      active: "bg-yellow-600 text-white border-yellow-600 shadow-sm",
      inactive:
        "bg-white text-gray-600 border-gray-300 hover:bg-yellow-50 hover:text-yellow-700 hover:border-yellow-300",
    },
    large: {
      active: "bg-red-600 text-white border-red-600 shadow-sm",
      inactive:
        "bg-white text-gray-600 border-gray-300 hover:bg-red-50 hover:text-red-700 hover:border-red-300",
    },
  };

  const labels = {
    small: isRTL ? "صغير (1 نقطة)" : "Small (1pt)",
    medium: isRTL ? "متوسط (3 نقاط)" : "Medium (3pts)",
    large: isRTL ? "كبير (5 نقاط)" : "Large (5pts)",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseClasses} ${
        isActive ? types[type].active : types[type].inactive
      } border`}
    >
      {labels[type]}
    </button>
  );
};

export default TodoForm;
