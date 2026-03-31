import Tasks from "./views/tasks/tasks";
import * as model from "./model";

function controlAddTasks(task, taskType) {
  //
  model.saveTask(task, taskType);
  Tasks.renderNewTask(model.getTasks(), taskType);
}

function controlLoadApp() {
  Tasks.render(model.getTasks());
  console.log(model.getTasks());
}

function controlModifyTask(status, taskID) {
  //
  if (status === "done") model.setTaskDone(taskID);
  if (status === "delete") model.deleteTask(taskID);
}

function init() {
  Tasks.loadAppHandler(controlLoadApp);
  Tasks.addTaskHandler(controlAddTasks);
  Tasks.modifyTaskHandler(controlModifyTask);
}
init();
