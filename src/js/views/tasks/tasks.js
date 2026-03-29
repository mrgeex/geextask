class Tasks {
  errorMessage;
  _parentElements = document.querySelectorAll(".todo");

  render(data, taskType) {
    const parent = Array.from(this._parentElements).find((el) =>
      el.classList.contains(taskType),
    );
    const tasksElement = parent.querySelector(".tasks");
    tasksElement.innerHTML = "";
    const markup = this._generateMarkup(data[taskType]);
    tasksElement.insertAdjacentHTML("afterbegin", markup);
  }

  addTaskHandler(handler) {
    this._parentElements.forEach((parentElement) => {
      parentElement.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          const input = event.target.closest("input[type=text]");
          if (!input) return;

          const taskType = parentElement.classList[0];
          const task = input.value;
          if (!task) return;
          handler(task, taskType);
        }
      });
    });
  }

  _generateMarkup(tasks) {
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
