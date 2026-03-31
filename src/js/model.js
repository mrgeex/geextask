export const state = {
  tasks: {
    todo__inbox: [],
    todo__routines: [],
    todo__goals: [],
  },
  newTasks: [],
  page: "tasks",
};

export function saveTask(task, taskType) {
  if (!state.tasks[taskType].some((t) => t.task === task)) {
    const newTask = {
      id: taskType + "__" + state.tasks[taskType].length,
      task,
    };
    state.tasks[taskType].push(newTask);
    syncTasks();
  }
}

export function getTasks() {
  return state.tasks;
}

function syncTasks() {
  localStorage.setItem("tasks", JSON.stringify(state.tasks));
}

export function setTaskDone(taskID) {
  const taskType = taskID.split("__").slice(0, 2).join("__");
  state.tasks[taskType].find((t) => t.id === taskID).taskDone = true;
  syncTasks();
}

export function deleteTask(taskID) {}

function init() {
  const storage = localStorage.getItem("tasks");
  if (storage) state.tasks = JSON.parse(storage);
}
init();
