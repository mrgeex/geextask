import { Tasks } from "./tasks";

class TaskActions extends Tasks {
  //
  taskActionsHandler(handler) {
    ["click", "input"].forEach((eventType) => {
      document.addEventListener(eventType, (event) => {
        const target = event.target;
        this._taskElement = target.closest(".todo__task");
        this._taskContent = this._taskElement?.querySelector(
          ".todo__task--content input",
        );

        const doneBtn = target.closest(".todo__task__btn--done");
        doneBtn && this._setTaskDoneHandler(handler);
        const removeBtn = target.closest(".todo__task__btn--remove");
        removeBtn && this._deleteTaskHandler(handler);

        if (eventType === "input") this._editTaskContentHandler(handler);

        const dropDown = target.closest(".todo__routines__dropdown");
        const dropDownOption = target.closest(".option");
        dropDownOption &&
          this._editRoutineCycleHandler(handler, dropDown, dropDownOption);

        const dueDateBtn = event.target.closest(".dueDateBtn");
        dueDateBtn && this._editCountdownDueDateHandler(handler);
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
    if (!this._taskElement) return;
    handler(
      "editContent",
      this._taskContent.id,
      this._taskContent.value.trim(),
    );
  }

  _editRoutineCycleHandler(handler, dropDown, dropDownOption) {
    const selected = dropDown.querySelector(".selected span");
    selected.textContent = dropDownOption.textContent;
    selected.setAttribute("data-value", dropDownOption.dataset.value);

    if (!this._taskElement) return;
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

  _editCountdownDueDateHandler(handler) {
    const datePicker = this._taskElement.querySelector("#dueDate");
    datePicker.showPicker();
    datePicker.addEventListener("change", (event) => {
      this._taskElement.querySelector(".dueDateBtn span").textContent =
        this.getScheduledString({
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
  }
}

export default new TaskActions();
