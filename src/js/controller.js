import tasks from "./views/tasks/tasks";
import * as model from "./model";

function controlTasks(task, taskType) {
  //
  model.saveTask(task, taskType);
  tasks.render(model.getTasks(), taskType);
}

function init() {
  tasks.addTaskHandler(controlTasks);
}
init();
