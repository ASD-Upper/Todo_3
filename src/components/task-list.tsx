import React, { useState } from "react";
import { Todo } from "@/lib/types";
import TodoItem from "./todo-item";
import { useLanguage } from "@/lib/language-context";
import { useTodoStore } from "@/lib/store";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableTodoItem } from "./sortable-todo-item";

interface TaskListProps {
  todos: Todo[];
}

const TaskList: React.FC<TaskListProps> = ({ todos }) => {
  const { isRTL } = useLanguage();
  const { reorderTodos } = useTodoStore();
  
  // Sort todos by order property
  const sortedPendingTodos = [...todos.filter((todo) => !todo.completed)]
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    
  const completedTodos = todos.filter((todo) => todo.completed)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  // Configure sensors for drag detection
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const activeId = active.id as string;
      const overId = over.id as string;
      
      const activeIndex = sortedPendingTodos.findIndex(todo => todo.id === activeId);
      const overIndex = sortedPendingTodos.findIndex(todo => todo.id === overId);
      
      if (activeIndex !== -1 && overIndex !== -1) {
        // Get userId from the first todo (they all have the same userId)
        const userId = sortedPendingTodos[0]?.userId;
        if (userId) {
          reorderTodos(userId, activeIndex, overIndex);
        }
      }
    }
  };

  return (
    <div>
      {sortedPendingTodos.length > 0 && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {isRTL ? "المهام المعلقة" : "Pending Tasks"} (
              {sortedPendingTodos.length})
            </h3>
          </div>
          
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext 
              items={sortedPendingTodos.map(todo => todo.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-3">
                {sortedPendingTodos.map((todo) => (
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
