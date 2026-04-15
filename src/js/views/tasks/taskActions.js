import { Tasks } from "./tasks";

class TaskActions extends Tasks {
  //
  taskActionsHandler(handler) {
    document.addEventListener("click", (event) => {
      const target = event.target;
      this._taskElement = target.closest(".todo__task");
      if (!this._taskElement) return;

      this._taskContent = this._taskElement.querySelector(
        ".todo__task--content input",
      );

      const doneBtn = target.closest(".todo__task__btn--done");
      doneBtn && this._setTaskDoneHandler(handler);
      const removeBtn = target.closest(".todo__task__btn--remove");
      removeBtn && this._deleteTaskHandler(handler);
    });
  }

  _setTaskDoneHandler(handler) {
    this._taskContent.classList.toggle("task__Done");
    handler("done", this._taskContent.id);
  }

  _deleteTaskHandler(handler) {
    handler("delete", this._taskContent.id);
  }

  editTaskContentHandler(handler) {
    document.addEventListener("input", (event) => {
      const taskContent = event.target.closest(".todo__task--content input");
      if (!taskContent) return;

      handler("editContent", taskContent.id, taskContent.value.trim());
    });
  }

  editRoutineCycleHandler(handler) {
    document.addEventListener("click", (event) => {
      const dropDown = event.target.closest(".todo__routines__dropdown");
      if (!dropDown) return;

      const parentElement = event.target.closest(".todo__task");
      if (!parentElement) return;
      const taskType =
        parentElement.parentElement.parentElement.parentElement.classList[0];
      const input = parentElement.querySelector("input");
      const task = input.value.trim();
      if (!task) return;

      let routineCycle;
      if (taskType === "todo__routines") {
        routineCycle = dropDown.querySelector(".selected span").dataset.value;
      }

      handler("editRoutineCycle", input.id, task, routineCycle);
    });
  }

  editCountdownDueDateHandler(handler) {
    let datePicker;
    document.addEventListener("click", (event) => {
      const dueDateBtn = event.target.closest(".dueDate");
      if (!dueDateBtn) return;

      const taskEl = dueDateBtn.parentElement;
      const task = taskEl.querySelector(".todo__task--content input");
      datePicker = taskEl.querySelector("#dueDate");
      datePicker.showPicker();
      datePicker.addEventListener("change", (event) => {
        dueDateBtn.querySelector("span").textContent = this.getScheduledString({
          dueDate: event.target.value,
        });

        handler(
          "editCountdownDueDate",
          task.id,
          task.value,
          undefined,
          datePicker.value,
        );
      });
    });
  }
}

export default new TaskActions();
