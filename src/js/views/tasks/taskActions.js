import { Tasks } from "./tasks";

class TaskActions extends Tasks {
  //
  taskActionsHandler(handler) {
    ["click", "input"].forEach((eventType) => {
      document.addEventListener(eventType, (event) => {
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

        if (eventType === "input") this._editTaskContentHandler(handler);

        const dropDownOption = target.closest(".option");
        dropDownOption &&
          this._editRoutineCycleHandler(handler, dropDownOption);
      });
    });
  }

  _setTaskDoneHandler(handler) {
    this._taskContent.classList.toggle("task__Done");
    handler("done", this._taskContent.id);
  }

  _deleteTaskHandler(handler) {
    handler("delete", this._taskContent.id);
  }

  _editTaskContentHandler(handler) {
    handler(
      "editContent",
      this._taskContent.id,
      this._taskContent.value.trim(),
    );
  }

  _editRoutineCycleHandler(handler, dropDownOption) {
    const taskType = this._taskElement.dataset.taskType;
    let routineCycle;
    if (taskType.includes("routine")) {
      routineCycle = dropDownOption.dataset.value;
    }

    handler(
      "editRoutineCycle",
      this._taskContent.id,
      this._taskContent.value.trim(),
      routineCycle,
    );
  }

  routineCycleHandler() {
    document.addEventListener("click", (event) => {
      const dropDown = event.target.closest(".todo__routines__dropdown");
      if (!dropDown) return;

      const selected = dropDown.querySelector(".selected span");
      const dropDownOption = event.target.closest(
        ".todo__routines__dropdown .option",
      );
      if (!dropDownOption) return;
      selected.textContent = dropDownOption.textContent;
      selected.setAttribute("data-value", dropDownOption.dataset.value);
    });
  }

  editCountdownDueDateHandler(handler) {
    let datePicker;
    document.addEventListener("click", (event) => {
      const dueDateBtn = event.target.closest(".dueDate");
      if (!dueDateBtn) return;

      datePicker = this._taskElement.querySelector("#dueDate");
      datePicker.showPicker();
      datePicker.addEventListener("change", (event) => {
        dueDateBtn.querySelector("span").textContent = this.getScheduledString({
          dueDate: event.target.value,
        });

        handler(
          "editCountdownDueDate",
          this._taskContent.id,
          this._taskContent.value,
          undefined,
          datePicker.value,
        );
      });
    });
  }
}

export default new TaskActions();
