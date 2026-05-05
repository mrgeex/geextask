import View from "./view";

class switchThemeView extends View {
  _body = document.querySelector("body");
  _parentElement = document.querySelector(".theme__switch");
  _lightBtn = document.querySelector(".theme__switch .light");
  _darkBtn = document.querySelector(".theme__switch .dark");

  switchThemeHandler(handler) {
    this._parentElement.addEventListener("click", () => {
      this.toggleTheme();

      const currentTheme = this._body.classList.contains("light")
        ? "light"
        : "dark";
      handler(currentTheme);
    });
  }

  toggleTheme() {
    this._body.classList.toggle("light");
    this._darkBtn.classList.toggle("hidden");
    this._lightBtn.classList.toggle("hidden");
  }
}

export default new switchThemeView();
