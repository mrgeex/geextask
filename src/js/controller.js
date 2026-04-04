import * as model from "./model";

import Tasks from "./views/tasks/tasks";
import addNewTask from "./views/tasks/addNewTask";
import routineRepeatCycle from "./views/tasks/routineRepeatCycle";
import taskActions from "./views/tasks/taskActions";

function controlLoadApp() {
  Tasks.render(model.getTasks());
}

function controlAddTasks(task, taskType, routineCycle) {
  //
  model.saveTask(task, taskType, routineCycle);
  addNewTask.renderNewTask(model.getTasks(), taskType);
}

function controlModifyTask(status, taskID, taskContent) {
  //
  if (status === "done") model.setTaskDone(taskID);
  if (status === "delete") {
    model.deleteTask(taskID);
    Tasks.render(model.getTasks());
  }
  if (status === "edit") {
    taskContent
      ? model.editTask(taskID, taskContent)
      : model.deleteTask(taskID);
  }
}

function init() {
  Tasks.loadAppHandler(controlLoadApp);
  addNewTask.addTaskHandler(controlAddTasks);
  taskActions.modifyTaskHandler(controlModifyTask);
  taskActions.editTaskContentHandler(controlModifyTask);
  routineRepeatCycle.cycleHandler();
}
init();
