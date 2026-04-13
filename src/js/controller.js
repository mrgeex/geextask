import * as model from "./model";

import Tasks from "./views/tasks/tasks";
import addNewTask from "./views/tasks/addNewTask";
import routineRepeatCycle from "./views/tasks/routineRepeatCycle";
import taskActions from "./views/tasks/taskActions";
import renderDate from "./views/renderDate";

function controlLoadApp() {
  Tasks.render(model.getTasks());
}

function controlAddTasks(task, taskType, routineCycle, dueDate) {
  //
  model.saveTask(task, taskType, routineCycle, new Date(), dueDate);
  addNewTask.renderNewTask(model.getTasks(), taskType);
}

function controlModifyTask(status, taskID, taskContent, routineCycle, dueDate) {
  //
  if (status === "done") model.setTaskDone(taskID);
  if (status === "delete") {
    model.deleteTask(taskID);
    Tasks.render(model.getTasks());
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

function init() {
  renderDate.render();
  Tasks.loadAppHandler(controlLoadApp);
  addNewTask.addTaskHandler(controlAddTasks);
  taskActions.modifyTaskHandler(controlModifyTask);
  taskActions.editTaskContentHandler(controlModifyTask);
  routineRepeatCycle.cycleHandler();
  taskActions.editRoutineCycleHandler(controlModifyTask);
  taskActions.editCountdownDueDateHandler(controlModifyTask);
}
init();
