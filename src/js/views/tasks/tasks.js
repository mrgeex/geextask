import View from "../view";

class Tasks extends View {
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

        handler(task, taskType);
        input.value = "";
      }
    });
  }

  _generateMarkup(data) {
    return `
        <div class="todo__inbox todo flex">
          <h2 class="todo__title">
            <label for="todo__inbox" class="todo__label">Inbox</label>
          </h2>
          <input
            type="text"
            name="todo__inbox"
            id="todo__inbox"
            placeholder="What's on your mind..."
          />
          <div class="tasks">${this._generateTasksMarkup(data["todo__inbox"])}</div>
        </div>
        <div class="todo__routines todo flex">
          <h2 class="todo__title">
            <label for="todo__routines" class="todo__label">Routines</label>
          </h2>
          <input
            type="text"
            name="todo__routines"
            id="todo__routines"
            placeholder="What's on your mind..."
          />
          <div class="tasks">${this._generateTasksMarkup(data["todo__routines"])}</div>
        </div>
        <div class="todo__goals todo flex">
          <h2 class="todo__title">
            <label for="todo__goals" class="todo__label">Goals</label>
          </h2>
          <input
            type="text"
            name="todo__goals"
            id="todo__goals"
            placeholder="What's on your mind..."
          />
          <div class="tasks">${this._generateTasksMarkup(data["todo__goals"])}</div>
        </div>
    `;
  }

  _generateTasksMarkup(tasks) {
    return `
    <ul>
      ${tasks
        .map((task, index) => {
          return `<li>
          <input type="checkbox" id="${index}" />
          <label for="${index}">${task}</label>
        </li>`;
        })
        .join("")}
    </ul>
    `;
  }
}

export default new Tasks();
