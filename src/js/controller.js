import Tasks from "./views/tasks/tasks";
import * as model from "./model";

function controlAddTasks(task, taskType) {
  //
  model.saveTask(task, taskType);
  Tasks.render(model.getTasks(), taskType);
}

function init() {
  Tasks.addTaskHandler(controlAddTasks);
}
init();
