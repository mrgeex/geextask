import { FIRST_TIMER_FOCUS_MINUTE, FIRST_TIMER_BREAK_MINUTE } from "./config";

export const state = {
  tasks: {
    todo__inbox: [],
    todo__routines: [],
    todo__countdown: [],
  },
  pomodoro: {
    timerID: null,
    focused: true,
    focus_minutes: 0,
    break_minutes: 0,

    secondsLeft: 0,
    _minutes: 0,
    _seconds: 0,
  },
  currentPage: "tasks",
  theme: "",
};

export function switchTheme(theme) {
  state.theme = theme;
  localStorage.setItem("theme", JSON.stringify(theme));
}
// make a generic syncData function
function syncTasks() {
  localStorage.setItem("tasks", JSON.stringify(state.tasks));
}

function syncPomodoro() {
  localStorage.setItem("pomodoro", JSON.stringify(state.pomodoro));
}

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

export function getTaskType(taskID) {
  return taskID.split("__").slice(0, 2).join("__");
}

export function setTaskDone(taskID) {
  const taskType = getTaskType(taskID);
  const task = state.tasks[taskType].find((t) => t.id === taskID);
  task.taskDone = !task.taskDone;

  if (
    taskType.includes("routine") &&
    new Date(...getNowDate()).getTime() >= new Date(...task.cycleDate).getTime()
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
  if (routineCycle) {
    task.routineCycle = routineCycle;
    task.cycleDate = getNewRoutineCycleDate(routineCycle);
  }
  if (dueDate) task.dueDate = dueDate;
  syncTasks();
}

function getNowDate() {
  const now = new Date();
  return [now.getFullYear(), now.getMonth(), now.getDate()];
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

    if (now.getTime() >= taskCycleDate.getTime()) {
      taskData.taskDone = false;
      taskData.cycleDate = getNewRoutineCycleDate(taskData.routineCycle);
      syncTasks();
    }
  });
}

export function setPomodoro(focus_minute, break_minute) {
  state.pomodoro.focused = true;
  state.pomodoro.focus_minutes = focus_minute;
  state.pomodoro.break_minutes = break_minute;
  state.pomodoro.secondsLeft = focus_minute * 60;
  syncPomodoro();
}

export function getPomodoro() {
  const minutes = Math.floor(state.pomodoro.secondsLeft / 60);
  const seconds = state.pomodoro.secondsLeft % 60;

  return [minutes, seconds];
}

export function togglePomoFocus() {
  state.pomodoro.focused = !state.pomodoro.focused;
  if (state.pomodoro.focused) {
    state.pomodoro.secondsLeft = state.pomodoro.focus_minutes * 60;
    state.pomodoro._minutes = state.pomodoro.focus_minutes;
  } else {
    state.pomodoro.secondsLeft = state.pomodoro.break_minutes * 60;
    state.pomodoro._minutes = state.pomodoro.break_minutes;
  }
  this.pomodoroTimerStop();
}

export function setPomoTimer(minutes) {
  if (state.pomodoro.secondsLeft === 0)
    state.pomodoro.secondsLeft = minutes * 60;
}

export function pomodoroTimerStart(updateView) {
  if (state.pomodoro.timerID === null) {
    // console.log("started", state.pomodoro.secondsLeft);

    state.pomodoro.timerID = setInterval(() => {
      if (state.pomodoro.secondsLeft > 0) {
        --state.pomodoro.secondsLeft;
        state.pomodoro._minutes = Math.floor(state.pomodoro.secondsLeft / 60);
        state.pomodoro._seconds = state.pomodoro.secondsLeft % 60;
      } else this.togglePomoFocus();

      updateView([state.pomodoro._minutes, state.pomodoro._seconds]);
      syncPomodoro();
    }, 1000);
  }
}

export function pomodoroTimerStop() {
  clearInterval(state.pomodoro.timerID);
  state.pomodoro.timerID = null;
  syncPomodoro();
  // console.log("stopped");
}

function init() {
  const tasks = localStorage.getItem("tasks");
  if (tasks) state.tasks = JSON.parse(tasks);

  const theme = localStorage.getItem("theme");
  if (theme) state.theme = JSON.parse(theme);

  const pomodoro = localStorage.getItem("pomodoro");
  if (pomodoro) {
    state.pomodoro = JSON.parse(pomodoro);
    state.pomodoro.timerID = null;
  }
  if (!state.pomodoro.secondsLeft)
    setPomodoro(FIRST_TIMER_FOCUS_MINUTE, FIRST_TIMER_BREAK_MINUTE);

  resetAllTaskRepeatCycles();
}
init();
