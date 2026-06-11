import * as model from "./model";

import {
  FIRST_TIMER_MINUTE,
  FIRST_TIMER_BREAK_MINUTE,
  SECOND_TIMER_MINUTE,
  SECOND_TIMER_BREAK_MINUTE,
  MODIFY_TIME_MINUTE,
} from "./config";

import Tasks from "./views/tasks/tasks";
import addNewTask from "./views/tasks/addNewTask";
import taskActions from "./views/tasks/taskActions";
import renderDate from "./views/renderDateView";
import switchTheme from "./views/switchThemeView";
import taskSlider from "./views/tasks/taskSlider";
import navbarView from "./views/navbarView";
import tasks from "./views/tasks/tasks";
import pomodoroView from "./views/pomo/pomodoroView";
import musicPlayerView from "./views/music/musicPlayerView";

function controlToggleTheme(theme) {
  model.switchTheme(theme);
}

function controlSwitchPage(pageID) {
  if (model.state.theme === "light") switchTheme.toggleTheme();
  navbarView.switchPage(pageID);

  if (pageID === "#tasks") tasks.render(model.getTasks());

  if (pageID === "#pomodoro") pomodoroView.render(1);

  if (pageID === "#music") musicPlayerView.render(1);
}

function controlAddTasks(...taskData) {
  //
  const taskType = taskData[1];
  model.saveTask(taskData);
  Tasks.UpdateCurrentTasks(model.getTasks(), taskType);
}

function controlModifyTask(status, taskID, taskContent, routineCycle, dueDate) {
  //
  if (status === "done") model.setTaskDone(taskID);
  if (status === "delete") {
    model.deleteTask(taskID);
    Tasks.UpdateCurrentTasks(model.getTasks(), model.getTaskType(taskID));
  }
  if (status === "editContent")
    taskContent
      ? model.editTask(taskID, taskContent)
      : model.deleteTask(taskID);

  if (status === "editRoutineCycle")
    model.editTask(taskID, taskContent, routineCycle);

  if (status === "editCountdownDueDate")
    model.editTask(taskID, taskContent, undefined, dueDate);
}

function controlPomodoro(target) {
  // console.log(target.closest(".control"));
  let timeBlock = Math.floor(model.state.pomodoro.secondsLeft / 60);

  if (target.closest(".firstOption")) {
    timeBlock = FIRST_TIMER_MINUTE;
  }

  if (target.closest(".secondOption")) {
    timeBlock = SECOND_TIMER_MINUTE;
  }

  if (target.closest(".add__time")) {
    timeBlock += MODIFY_TIME_MINUTE;
  }

  if (target.closest(".sub__time")) {
    timeBlock =
      timeBlock > MODIFY_TIME_MINUTE
        ? (timeBlock -= MODIFY_TIME_MINUTE)
        : timeBlock;
    console.log(timeBlock);
  }

  if (
    target.closest(".firstOption") ||
    target.closest(".secondOption") ||
    target.closest(".add__time") ||
    target.closest(".sub__time")
  ) {
    model.state.pomodoro.secondsLeft = timeBlock * 60;
    pomodoroView.pomodoroSetTimer([timeBlock, 0]);
  }

  if (target.closest(".start__pomo") || target.closest(".pause__pomo"))
    pomodoroView.toggleControls();

  if (target.closest(".start__pomo")) {
    // console.log("timeBlock is " + timeBlock);
    model.setPomoTimer(timeBlock);
    model.pomodoroTimerStart(
      true,
      pomodoroView.pomodoroSetTimer.bind(pomodoroView),
    );
  }
  if (target.closest(".pause__pomo")) {
    model.pomodoroTimerStart(false);
  }

  if (target.closest(".reset__pomo")) {
    console.log("reset");
  }
}

function init() {
  switchTheme.switchThemeHandler(controlToggleTheme);
  navbarView.navHandler(controlSwitchPage);
  renderDate.render();
  addNewTask.addNewTaskHandler(controlAddTasks);
  taskActions.taskActionsHandler(controlModifyTask);
  taskSlider.init();
  taskSlider.sliderButtonsHandler();
  pomodoroView.pomodoroHandler(controlPomodoro);
}
init();
