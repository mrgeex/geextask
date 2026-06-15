import View from "../view";
import {
  FIRST_TIMER_BREAK_MINUTE,
  FIRST_TIMER_MINUTE,
  SECOND_TIMER_BREAK_MINUTE,
  SECOND_TIMER_MINUTE,
} from "../../config";

class PomodoroView extends View {
  _pomo__parentEl;
  _timerEl;
  _controlsEl;
  _minutesEl;
  _secondsEl;

  pomodoroHandler(handler) {
    document.addEventListener("click", (event) => {
      const target = event.target;
      this._pomo__parentEl = target.closest(".pomodoro");
      if (!this._pomo__parentEl) return;

      this._timerEl = this._pomo__parentEl.querySelector(".timer");
      this._minutesEl = this._timerEl.querySelector(".minutes");
      this._secondsEl = this._timerEl.querySelector(".seconds");

      this._controlsEl = this._pomo__parentEl.querySelector(".control");

      handler(target);
    });
  }

  pomodoroSetTimer(time) {
    let [minutes, seconds] = time;
    // console.log("view updated");

    this._minutesEl.textContent = String(minutes).padStart(2, "0");
    this._secondsEl.textContent = String(seconds).padStart(2, "0");
  }

  toggleControls() {
    const startBtn = this._controlsEl.querySelector(".start__pomo");
    const pauseBtn = this._controlsEl.querySelector(".pause__pomo");
    const resetBtn = this._controlsEl.querySelector(".reset__pomo");

    startBtn.classList.toggle("hidden");
    pauseBtn.classList.toggle("hidden");
    resetBtn.classList.toggle("hidden");
  }

  _generateMarkup() {
    return `
          <div class="pomodoro">
            <div class="options flex">
              <button class="firstOption">${FIRST_TIMER_MINUTE}/${FIRST_TIMER_BREAK_MINUTE}</button>
              <button class="secondOption">${SECOND_TIMER_MINUTE}/${SECOND_TIMER_BREAK_MINUTE}</button>
            </div>
            <div class="timer flex">
              <div class="circle"></div>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="sub__time"
                viewBox="0 0 512 512"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="32"
                  d="M400 256H112"
                />
              </svg>
              <span>
                <span class="minutes">${FIRST_TIMER_MINUTE}</span> :
                <span class="seconds">00</span>
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="add__time"
                viewBox="0 0 512 512"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="32"
                  d="M256 112v288M400 256H112"
                />
              </svg>
            </div>

            <div class="control">
              <h3 class="pomo__title">Focus Session</h3>
              <div class="ctrl__btns flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="pause__pomo hidden"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M208 432h-48a16 16 0 01-16-16V96a16 16 0 0116-16h48a16 16 0 0116 16v320a16 16 0 01-16 16zM352 432h-48a16 16 0 01-16-16V96a16 16 0 0116-16h48a16 16 0 0116 16v320a16 16 0 01-16 16z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="start__pomo"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M133 440a35.37 35.37 0 01-17.5-4.67c-12-6.8-19.46-20-19.46-34.33V111c0-14.37 7.46-27.53 19.46-34.33a35.13 35.13 0 0135.77.45l247.85 148.36a36 36 0 010 61l-247.89 148.4A35.5 35.5 0 01133 440z"
                  />
                </svg>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="reset__pomo hidden"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M320 146s24.36-12-64-12a160 160 0 10160 160"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-miterlimit="10"
                    stroke-width="32"
                  />
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="32"
                    d="M256 58l80 80-80 80"
                  />
                </svg>
              </div>
            </div>
          </div>
    `;
  }
}

export default new PomodoroView();
