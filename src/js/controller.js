import Tasks from "./views/tasks/tasks";
import * as model from "./model";

function controlLoadApp() {
  Tasks.render(model.getTasks());
  console.log(model.getTasks());
}

function controlAddTasks(task, taskType) {
  //
  model.saveTask(task, taskType);
  Tasks.renderNewTask(model.getTasks(), taskType);
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
  Tasks.addTaskHandler(controlAddTasks);
  Tasks.modifyTaskHandler(controlModifyTask);
  Tasks.editTaskContentHandler(controlModifyTask);
}
init();
