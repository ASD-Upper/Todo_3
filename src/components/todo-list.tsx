import React from "react";
import { useTodoStore } from "@/lib/store";
import TodoItem from "./todo-item";

interface TodoListProps {
  userId: string;
}

const TodoList: React.FC<TodoListProps> = ({ userId }) => {
  const { todos } = useTodoStore();
  const userTodos = todos.filter((todo) => todo.userId === userId);

  const completedTodos = userTodos.filter((todo) => todo.completed);
  const pendingTodos = userTodos.filter((todo) => !todo.completed);

  if (userTodos.length === 0) {
    return (
      <div className="p-8 text-center bg-gray-50 border rounded-lg">
        <h3 className="text-lg font-medium text-gray-500 mb-1">
          No tasks yet!
        </h3>
        <h3 className="text-lg font-medium text-gray-500 mb-2 rtl">
          لا توجد مهام بعد!
        </h3>
        <p className="mt-2 text-gray-400 mb-1">
          Start by adding your first task above.
        </p>
        <p className="mt-2 text-gray-400 rtl">
          ابدأ بإضافة مهمتك الأولى أعلاه.
        </p>
      </div>
    );
  }

  return (
    <div>
      {pendingTodos.length > 0 && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-medium text-gray-900">
              Pending Tasks ({pendingTodos.length})
            </h2>
            <h2 className="text-lg font-medium text-gray-900 rtl">
              المهام المعلقة ({pendingTodos.length})
            </h2>
          </div>
          {pendingTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      )}

      {completedTodos.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-medium text-gray-900">
              Completed Tasks ({completedTodos.length})
            </h2>
            <h2 className="text-lg font-medium text-gray-900 rtl">
              المهام المكتملة ({completedTodos.length})
            </h2>
          </div>
          {completedTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList;
