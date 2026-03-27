import tasks from "./views/tasks/tasks";
import * as model from "./model";

function controlTasks(task) {
  model.saveTask(task);
  tasks.render(model.state.tasks);
}

function init() {
  tasks.addTaskHandler(controlTasks);
}
init();
