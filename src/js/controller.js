import * as model from "./model";

import Tasks from "./views/tasks/tasks";
import addNewTask from "./views/tasks/addNewTask";
import taskActions from "./views/tasks/taskActions";
import renderDate from "./views/renderDate";

function controlLoadApp() {
  model.resetAllTaskRepeatCycles();
  Tasks.render(model.getTasks());
}

function controlAddTasks(...taskData) {
  //
  const taskType = taskData[1];
  model.saveTask(taskData);
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
  addNewTask.addNewTaskHandler(controlAddTasks);
  taskActions.taskActionsHandler(controlModifyTask);
  taskActions.editTaskContentHandler(controlModifyTask);
  taskActions.routineCycleHandler();
  taskActions.editRoutineCycleHandler(controlModifyTask);
  taskActions.editCountdownDueDateHandler(controlModifyTask);
}
init();
