import View from "../view";

class TaskSlider extends View {
  _taskContainers = this._parentElement.querySelectorAll(".todo");
  _maxSlides;
  _currentSlide = 0;
  _isSliderActive = false;
  _breakPoint = 1280;
  _phoneBreakPoint = 768;

  _enableSlider() {
    if (this._isSliderActive) return;

    // console.log("enabled");
    this._taskContainers = this._parentElement.querySelectorAll(".todo");
    this._maxSlides = this._taskContainers.length;
    this._isSliderActive = true;
    this._currentSlide = 0;
    this._goToSlide(this._currentSlide);
  }

  _disableSlider() {
    if (!this._isSliderActive) return;

    this._isSliderActive = false;
    this._currentSlide = 0;
    // console.log("disabled");
    Array.from(this._taskContainers).forEach((slide) => {
      slide.style.transform = "";
    });
  }

  sliderButtonsHandler() {
    document.addEventListener("click", (event) => {
      const target = event.target;

      if (target.classList.contains("btn__left")) this._nextSlide("left");
      if (target.classList.contains("btn__right")) this._nextSlide("right");
    });
  }

  _goToSlide(slideIndex) {
    // console.log("index", slideIndex);
    const taskContainers = document.querySelectorAll(".todo");
    taskContainers.forEach((taskContainer, index) => {
      if (window.innerWidth <= this._phoneBreakPoint)
        taskContainer.style.transform = `translateX(${100 * (index - slideIndex)}%)`;
      else
        taskContainer.style.transform = `translateX(${100 * (index - slideIndex) + index * 10}%)`;
    });
  }

  // Functionality
  _nextSlide(direction) {
    if (!this._isSliderActive) return;

    if (direction === "right") {
      if (this._currentSlide === this._maxSlides - 1) {
        this._currentSlide = 0;
        // console.log("last");
      } else ++this._currentSlide;
      // console.log("right");
    }
    if (direction === "left") {
      if (this._currentSlide === 0) {
        this._currentSlide = this._maxSlides - 1;
        // console.log("first");
      } else --this._currentSlide;
      // console.log("left");
    }

    this._goToSlide(this._currentSlide);
    // console.log("slide", this._currentSlide);
  }

  init() {
    ["load", "resize"].forEach((eventType) => {
      window.addEventListener(eventType, () => {
        if (window.innerWidth <= this._breakPoint) this._enableSlider();
        else this._disableSlider();
      });
    });
  }
}

export default new TaskSlider();
