export const state = {
  tasks: {
    todo__inbox: [],
    todo__routines: [],
    todo__goals: [],
  },
  page: "tasks",
};

export function saveTask(task, taskType, routineCycle, date, dueDate) {
  if (!state.tasks[taskType].some((t) => t.task === task)) {
    const newTask = {
      id: taskType + "__" + state.tasks[taskType].length,
      task,
      date,
      ...(taskType.includes("routine") && { routineCycle: routineCycle }),
      ...(taskType.includes("goal") && { dueDate: dueDate }),
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

function getTaskType(taskID) {
  return taskID.split("__").slice(0, 2).join("__");
}

export function setTaskDone(taskID) {
  const taskType = getTaskType(taskID);
  const task = state.tasks[taskType].find((t) => t.id === taskID);
  task.taskDone = !task.taskDone;
  syncTasks();
}

export function deleteTask(taskID) {
  const taskType = getTaskType(taskID);
  const task = state.tasks[taskType].findIndex((t) => t.id === taskID);
  state.tasks[taskType].splice(task, 1);
  syncTasks();
}

export function editTask(taskID, taskContent, routineCycle) {
  const taskType = getTaskType(taskID);
  const task = state.tasks[taskType].find((t) => t.id === taskID);
  task.task = taskContent;
  if (routineCycle) task.routineCycle = routineCycle;
  syncTasks();
}

function init() {
  const storage = localStorage.getItem("tasks");
  if (storage) state.tasks = JSON.parse(storage);
}
init();
