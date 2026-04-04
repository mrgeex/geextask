import { Tasks } from "./tasks";

class TaskActions extends Tasks {
  //
  modifyTaskHandler(handler) {
    document.addEventListener("click", (event) => {
      const doneBtn = event.target.closest(".todo__task__btn--done");
      const removeBtn = event.target.closest(".todo__task__btn--remove");

      if (!doneBtn && !removeBtn) return;
      const taskParent = event.target.closest(".todo__task");
      const task = taskParent.querySelector("input");
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

      handler("edit", taskContent.id, taskContent.value.trim());
    });
  }
}

export default new TaskActions();
