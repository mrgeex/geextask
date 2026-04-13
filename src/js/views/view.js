export default class View {
  _parentElement = document.querySelector(".app");
  _data;
  _now = new Date();
  errorMessage;

  render(data) {
    if (!data) return;
    this._data = data;

    const markup = this._generateMarkup();
    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  loadAppHandler(handler) {
    window.addEventListener("load", handler);
  }
}
