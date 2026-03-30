export const state = {
  tasks: {
    todo__inbox: [],
    todo__routines: [],
    todo__goals: [],
  },
};

export function saveTask(task, taskType) {
  if (!state.tasks[taskType].includes(task)) {
    state.tasks[taskType].push(task);
    syncTasks();
  }
}

function syncTasks() {
  localStorage.setItem("tasks", JSON.stringify(state.tasks));
}

export function getTasks() {
  return state.tasks;
}

function init() {
  const storage = localStorage.getItem("tasks");
  if (storage) state.tasks = JSON.parse(storage);
}
init();
