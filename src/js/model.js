export const state = {
  tasks: {
    todo__inbox: [],
    todo__routines: [],
    todo__countdown: [],
  },
  page: "tasks",
};

export function saveTask(taskData) {
  const [task, taskType, routineCycle, date, dueDate, cycleDate] = taskData;

  if (!state.tasks[taskType].some((t) => t.task === task)) {
    const newTask = {
      id:
        taskType +
        "__" +
        Math.floor(Math.random() * 10000 * state.tasks[taskType].length),
      task,
      date,
      ...(taskType.includes("routine") && { routineCycle: routineCycle }),
      ...(taskType.includes("routine") && { cycleDate: cycleDate }),
      ...(taskType.includes("countdown") && { dueDate: dueDate }),
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

export function editTask(taskID, taskContent, routineCycle, dueDate) {
  const taskType = getTaskType(taskID);
  const task = state.tasks[taskType].find((t) => t.id === taskID);
  task.task = taskContent;
  if (routineCycle) task.routineCycle = routineCycle;
  if (dueDate) task.dueDate = dueDate;
  syncTasks();
}

export function routineRepeatCycle() {
  const time = new Date();
  const now = new Date(time.getFullYear(), time.getMonth(), time.getDate());

  state.tasks["todo__routines"].map((task) => {
    const taskCycleDate = new Date(task.cycleDate);
    if (taskCycleDate.getTime() === now.getTime()) {
      task.taskDone = false;
      syncTasks();
    }
    console.log(task);
  });
}

function init() {
  const storage = localStorage.getItem("tasks");
  if (storage) state.tasks = JSON.parse(storage);
}
init();
