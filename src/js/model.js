export const state = {
  tasks: [],
};

export function saveTask(task) {
  state.tasks.push(task);
}

export function getTasks() {
  return state.tasks;
}
