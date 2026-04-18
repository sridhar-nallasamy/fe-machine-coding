import { useMemo, useState } from 'react';

import styles from './style.module.css';

type TaskProps = { id: string; title: string; status: string };
type ColumnProps = { key: string; title: string };

const initialTasks: TaskProps[] = [
  { id: '1', title: 'Setup project', status: 'todo' },
  { id: '2', title: 'Build UI', status: 'todo' },
  { id: '3', title: 'Add Drag & Drop', status: 'inprogress' },
  { id: '4', title: 'Write tests', status: 'done' },
];

const columns: ColumnProps[] = [
  { key: 'todo', title: 'Todo' },
  { key: 'inprogress', title: 'In Progress' },
  { key: 'done', title: 'Done' },
];

const KanbanBoard = () => {
  const [tasks, setTasks] = useState<TaskProps[]>(initialTasks);
  const [dragged, setDragged] = useState<{ taskId: string } | null>(null);

  const tasksByColumn = useMemo(() => {
    const map: Record<string, TaskProps[]> = {
      todo: [],
      inprogress: [],
      done: [],
    };
    for (const task of tasks) {
      map[task.status].push(task);
    }
    return map;
  }, [tasks]);

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onDragStart = (taskId: string) => {
    setDragged({ taskId });
  };

  const onDropOverColumn = (columnId: string) => {
    if (!dragged) return;

    setTasks((prev) => {
      return prev.map((t) => {
        if (t.id === dragged.taskId) {
          return { ...t, status: columnId };
        }
        return t;
      });
    });

    setDragged(null);
  };

  const onDropOverTask = (targetTask: TaskProps) => {
    if (!dragged) return;

    const sourceTaskId = dragged.taskId;

    if (sourceTaskId === targetTask.id) return;

    setTasks((prev) => {
      const sourceTask = prev.find((t) => t.id === sourceTaskId);
      if (!sourceTask) return prev;

      const updated = prev.map((t) =>
        t.id === sourceTaskId ? { ...t, status: targetTask.status } : t,
      );

      const sourceIdx = updated.findIndex((t) => t.id === sourceTaskId);
      const targetIdx = updated.findIndex((t) => t.id === targetTask.id);

      const clone = [...updated];
      const [removed] = clone.splice(sourceIdx, 1);
      clone.splice(targetIdx, 0, removed);

      return clone;
    });

    setDragged(null);
  };

  return (
    <div className={styles.container}>
      <h3 style={{ margin: '1rem 0' }}>Kanban Board</h3>
      <div className={styles.boardColumnContainer}>
        {columns.map(({ key, title }) => (
          <div
            key={key}
            className={styles.taskColumn}
            onDragOver={onDragOver}
            onDrop={() => onDropOverColumn(key)}
          >
            <h4>{title}</h4>
            {tasksByColumn[key].map((task) => (
              <div
                key={task.id}
                className={styles.taskCard}
                draggable
                onDragOver={onDragOver}
                onDragStart={() => onDragStart(task.id)}
                onDrop={() => onDropOverTask(task)}
              >
                {task.title}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
