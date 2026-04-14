import View from "../view";

export class Tasks extends View {
  _taskElement;
  //
  getScheduledString(task) {
    const dueDate = new Date(task.dueDate);
    if (isNaN(dueDate.getTime())) return;
    const isFuture = dueDate > this._now;

    const start = isFuture ? this._now : dueDate;
    const end = isFuture ? dueDate : this._now;

    let dueDays = end.getDate() - start.getDate();
    let dueMonths = end.getMonth() - start.getMonth();
    let dueYears = end.getFullYear() - start.getFullYear();

    if (dueDays < 0) {
      --dueMonths;
      const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
      dueDays += prevMonth.getDate();
    }

    if (dueMonths < 0) {
      --dueYears;
      dueMonths += 12;
    }

    let unit, duration, scheduled;
    if (dueYears > 0) {
      unit = "Year";
      duration = dueYears;
    } else if (dueMonths > 0) {
      unit = "Month";
      duration = dueMonths;
    } else {
      unit = "Day";
      duration = dueDays;
    }

    scheduled = `${duration} ${unit}${duration > 1 ? "s" : ""} ${isFuture ? "Until" : "Ago"}`;
    if (duration === dueDays && duration === 0) scheduled = `Today`;
    if (duration === dueDays && duration === 1) scheduled = `Yesterday`;
    if (duration === dueDays && duration === 1 && isFuture)
      scheduled = `Tomorrow`;

    return scheduled;
  }

  _generateMarkup() {
    return `
        <div class="todo__inbox todo flex">
          <h2 class="todo__title">
            <label for="todo__inbox" class="todo__label">Inbox</label>
          </h2>
          <div class="todo__input">
          <input
              title="Write it down before it slips your mind!"
              type="text"
              name="todo__inbox"
              id="todo__inbox"
              placeholder="What's on your mind..."
            />
            
          </div>  
          <div class="tasks">${this._generateTasksMarkup(this._data["todo__inbox"])}</div>
        </div>
        <div class="todo__routines todo flex">
          <h2 class="todo__title">
            <label for="todo__routines" class="todo__label">Routines</label>
          </h2>
          <div class="todo__input flex">
            <input
              title="Write it down before it slips your mind!"
              type="text"
              name="todo__routines"
              id="todo__routines"
              placeholder="What's on your mind..."
            />
                    
          <div class="todo__routines__dropdown flex">
            <div class="selected flex">
              <span>Repeat Cycle</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
            <div class="options__list">
              <div class="option" data-value="Daily">Daily</div>
              <div class="option" data-value="Weekly">Weekly</div>
              <div class="option" data-value="Monthly">Monthly</div>
            </div>
          </div>
          </div>
          <div class="tasks">${this._generateTasksMarkup(this._data["todo__routines"])}</div>
        </div>
        <div class="todo__countdown todo flex">
          <h2 class="todo__title">
            <label for="todo__countdown" class="todo__label">Countdown</label>
          </h2>
          <div class="todo__input flex">
            <input
              title="Write it down before it slips your mind!"
              type="text"
              name="todo__countdown"
              id="todo__countdown"
              placeholder="What's on your mind..."
            />
            <input type="date" name="countdown__date" id="countdown__date" title="Due Date" />
          </div>          
          <div class="tasks">${this._generateTasksMarkup(this._data["todo__countdown"])}</div>
        </div>
    `;
  }

  _generateTasksMarkup(tasks) {
    return `
    <ul>
      ${tasks
        .map((task) => {
          const formattedDate = new Date(...task.date).toLocaleDateString(
            navigator.language,
            {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            },
          );

          return `<li class="todo__task flex" title="Created on ${formattedDate}">

          ${
            task.id.includes("countdown")
              ? `<div class="dueDate">
                  <input type="date" name="" id="dueDate" style="visibility: hidden; position: absolute"/>
                  <span>${this.getScheduledString(task)}</span>
                </div>
                `
              : ""
          }
          <div class="todo__task--content">
            <input type="text" id="${task.id}" class="${task.taskDone ? "task__Done" : ""}" value="${task.task}"/>
          </div>
          
          ${
            task.id.includes("routine")
              ? `<div class="todo__routines__dropdown flex">
                  <div class="selected cycle flex">
                    <span>${task.routineCycle}</span>
                  </div>
                  <div class="options__list">
                    <div class="option" data-value="Daily">Daily</div>
                    <div class="option" data-value="Weekly">Weekly</div>
                    <div class="option" data-value="Monthly">Monthly</div>
                  </div>
                </div>
                `
              : ""
          }
          <div class="todo__task--btn flex">
            <svg class="todo__task__btn--done" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>Done</title><path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm108.25 138.29l-134.4 160a16 16 0 01-12 5.71h-.27a16 16 0 01-11.89-5.3l-57.6-64a16 16 0 1123.78-21.4l45.29 50.32 122.59-145.91a16 16 0 0124.5 20.58z"/></svg>
            <svg class="todo__task__btn--remove" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>Remove</title><path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm75.31 260.69a16 16 0 11-22.62 22.62L256 278.63l-52.69 52.68a16 16 0 01-22.62-22.62L233.37 256l-52.68-52.69a16 16 0 0122.62-22.62L256 233.37l52.69-52.68a16 16 0 0122.62 22.62L278.63 256z"/></svg>
          </div>
          
        </li>`;
        })
        .join("")}
    </ul>
    `;
  }
}

export default new Tasks();
