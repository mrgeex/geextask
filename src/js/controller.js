import Tasks from "./views/tasks/tasks";
import * as model from "./model";
import routineRepeatCycle from "./views/tasks/routineRepeatCycle";

function controlLoadApp() {
  Tasks.render(model.getTasks());
}

function controlAddTasks(task, taskType, routineCycle) {
  //
  model.saveTask(task, taskType, routineCycle);
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
  routineRepeatCycle.cycleHandler();
}
init();
