class Tasks {
  errorMessage;
  _parentElement = document.querySelector(".todo__inbox");

  render(data) {
    const tasksElement = (this._parentElement.closest(".tasks").innerHTML = "");
    const markup = this._generateMarkup(data);
    tasksElement.insertAdjacentHTML("afterbegin", markup);
  }

  getTask() {
    return this._parentElement.closest("input");
  }

  addTaskHandler(handler) {
    this._parentElement.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        const input = event.target.closest("#todo__inbox");
        if (!input) return;

        const task = input.value;
        if (!task) return;
        handler(task);
      }
    });
  }

  _generateMarkup() {
    return `
    <ul>
      <li>
        <input type="checkbox" id="one" />
        <label for="one">one</label>
      </li>
    </ul>
    `;
  }
}

export default new Tasks();
