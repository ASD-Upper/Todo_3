import React, { useState, useEffect } from "react";
import { Todo } from "@/lib/types";
import TodoItem from "./todo-item";
import { useLanguage } from "@/lib/language-context";
import { useTodoStore } from "@/lib/store";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { SortableTodoItem } from "./sortable-todo-item";

interface TaskListProps {
  todos: Todo[];
}

const TaskList: React.FC<TaskListProps> = ({ todos }) => {
  const { isRTL } = useLanguage();
  const { reorderTodos } = useTodoStore();
  const [localTodos, setLocalTodos] = useState<Todo[]>(todos);

  // Update local todos when the prop changes
  useEffect(() => {
    setLocalTodos(todos);
  }, [todos]);

  // Get and sort todos
  const pendingTodos = localTodos
    .filter((todo) => !todo.completed)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const completedTodos = localTodos
    .filter((todo) => todo.completed)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  // Configure sensors with appropriate activation constraints
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 10 }, // Require 10px of movement before dragging starts
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 250, tolerance: 8 }, // Wait 250ms and 8px movement for touch
    })
  );

  // Handle drag end event
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    try {
      const activeId = String(active.id);
      const overId = String(over.id);

      // Find the indices of the dragged items
      const oldIndex = pendingTodos.findIndex((todo) => todo.id === activeId);
      const newIndex = pendingTodos.findIndex((todo) => todo.id === overId);

      if (oldIndex === -1 || newIndex === -1) {
        console.error("Invalid indices during drag", { oldIndex, newIndex });
        return;
      }

      // Update UI immediately for better user experience
      const newPendingTodos = arrayMove(pendingTodos, oldIndex, newIndex);

      // Update the order properties
      const updatedTodos = newPendingTodos.map((todo, index) => ({
        ...todo,
        order: index,
      }));

      // Set new local state that includes completed todos + reordered pending todos
      setLocalTodos([...completedTodos, ...updatedTodos]);

      // Get the user ID from the first todo (all todos in this list should belong to the same user)
      const userId = pendingTodos[0]?.userId;

      if (userId) {
        // Update the store
        reorderTodos(userId, oldIndex, newIndex);
      }
    } catch (error) {
      console.error("Error during drag operation:", error);
    }
  };

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

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={pendingTodos.map((todo) => todo.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-3">
                {pendingTodos.map((todo) => (
                  <SortableTodoItem key={todo.id} todo={todo} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
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
