import Tasks from "./views/tasks/tasks";
import * as model from "./model";

function controlAddTasks(task, taskType) {
  //
  console.log(task, taskType);
  model.saveTask(task, taskType);
  Tasks.renderNewTask(model.getTasks(), taskType);
}

function controlLoadApp() {
  Tasks.render(model.getTasks());
  console.log("loaded");
}

function init() {
  Tasks.loadAppHandler(controlLoadApp);
  Tasks.addTaskHandler(controlAddTasks);
}
init();
