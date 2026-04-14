export const state = {
  tasks: {
    todo__inbox: [],
    todo__routines: [],
    todo__countdown: [],
  },
  page: "tasks",
};

export function saveTask(taskData) {
  const [task, taskType, routineCycle, dueDate] = taskData;

  if (!state.tasks[taskType].some((t) => t.task === task)) {
    const newTask = {
      id:
        taskType +
        "__" +
        Math.floor(Math.random() * 10000 * state.tasks[taskType].length),
      task,
      date: getNowDate(),
      ...(taskType.includes("routine") && { routineCycle: routineCycle }),
      ...(taskType.includes("routine") && {
        cycleDate: getNewRoutineCycleDate(routineCycle),
      }),
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

  if (
    taskType.includes("routine") &&
    new Date(...getNowDate()).getTime() ===
      new Date(...task.cycleDate).getTime()
  )
    task.cycleDate = getNewRoutineCycleDate(task.routineCycle);

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
  if (routineCycle) task.cycleDate = getNewRoutineCycleDate(routineCycle);
  if (dueDate) task.dueDate = dueDate;
  syncTasks();
}

function getNowDate() {
  const time = new Date();
  return [time.getFullYear(), time.getMonth(), time.getDate()];
}

export function getNewRoutineCycleDate(routineCycle) {
  //
  let cycleDate = new Date(...getNowDate());
  if (routineCycle === "Daily")
    cycleDate = new Date(cycleDate.setDate(cycleDate.getDate() + 1));
  if (routineCycle === "Weekly")
    cycleDate = new Date(cycleDate.setDate(cycleDate.getDate() + 7));
  if (routineCycle === "Monthly")
    cycleDate = new Date(cycleDate.setDate(cycleDate.getDate() + 30));

  return [cycleDate.getFullYear(), cycleDate.getMonth(), cycleDate.getDate()];
}

export function resetAllTaskRepeatCycles() {
  //
  state.tasks["todo__routines"].map((taskData) => {
    const now = new Date(...getNowDate());
    const taskCycleDate = new Date(...taskData.cycleDate);

    if (taskCycleDate.getTime() === now.getTime()) {
      taskData.taskDone = false;
      taskData.cycleDate = getNewRoutineCycleDate(taskData.routineCycle);
      syncTasks();
    }
  });
}

function init() {
  const storage = localStorage.getItem("tasks");
  if (storage) state.tasks = JSON.parse(storage);
}
init();
