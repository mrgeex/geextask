import { Tasks } from "./tasks";

class addNewTaskHandler extends Tasks {
  renderNewTask(data, taskType) {
    const parentElements = document.querySelectorAll(".todo");
    const parent = Array.from(parentElements).find((el) =>
      el.classList.contains(taskType),
    );
    const tasksElement = parent.querySelector(".tasks");

    const markup = this._generateTasksMarkup(data[taskType]);
    tasksElement.innerHTML = "";
    tasksElement.insertAdjacentHTML("afterbegin", markup);
  }

  addTaskHandler(handler) {
    document.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        const input = event.target.closest("input[type=text]");
        if (!input) return;

        const parentElement = input.closest(".todo");
        const taskType = parentElement.classList[0];
        const task = input.value.trim();
        if (!task) return;

        let routineCycle;
        if (taskType.includes("routine")) {
          routineCycle =
            event.target.parentElement.querySelector(".selected span").dataset
              .value;
          if (!routineCycle) return;
        }

        let dueDate;
        if (taskType.includes("countdown")) {
          dueDate = new Date(
            parentElement.querySelector("#countdown__date").value,
          );
          if (isNaN(dueDate.getDate())) return;
        }

        handler(task, taskType, routineCycle, dueDate);
        input.value = "";
      }
    });
  }
}

export default new addNewTaskHandler();
