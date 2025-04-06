import React from "react";
import { Todo } from "@/lib/types";
import TodoItem from "./todo-item";
import { useLanguage } from "@/lib/language-context";

interface TaskListProps {
  todos: Todo[];
}

const TaskList: React.FC<TaskListProps> = ({ todos }) => {
  const { isRTL } = useLanguage();

  const completedTodos = todos.filter((todo) => todo.completed);
  const pendingTodos = todos.filter((todo) => !todo.completed);

  return (
    <div>
      {pendingTodos.length > 0 && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {isRTL ? "المهام المعلقة" : "Pending Tasks"} (
              {pendingTodos.length})
            </h3>
          </div>
          <div className="space-y-3">
            {pendingTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        </div>
      )}

      {completedTodos.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {isRTL ? "المهام المكتملة" : "Completed Tasks"} (
              {completedTodos.length})
            </h3>
          </div>
          <div className="space-y-3">
            {completedTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
