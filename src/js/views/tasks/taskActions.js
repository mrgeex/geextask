import { Tasks } from "./tasks";

class TaskActions extends Tasks {
  //
  modifyTaskHandler(handler) {
    document.addEventListener("click", (event) => {
      // debugger;
      const doneBtn = event.target.closest(".todo__task__btn--done");
      const removeBtn = event.target.closest(".todo__task__btn--remove");

      if (!doneBtn && !removeBtn) return;
      const taskParent = event.target.closest(".todo__task");
      const task = taskParent.querySelector(".todo__task--content input");
      let status;
      // 1 - identify done/remove
      if (doneBtn) {
        task.classList.toggle("task__Done");
        status = "done";
      }
      if (removeBtn) {
        status = "delete";
      }
      // 2 - call handler for done/remove
      handler(status, task.id);
    });
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

  editDueDateGoalsHandler(handler) {
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
          "editGoalDueDate",
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
