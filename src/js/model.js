export const state = {
  tasks: {
    todo__inbox: [],
    todo__routines: [],
    todo__goals: [],
  },
};

export function saveTask(task, taskType) {
  if (!state.tasks[taskType].includes(task)) state.tasks[taskType].push(task);
}

export function getTasks() {
  return state.tasks;
}
