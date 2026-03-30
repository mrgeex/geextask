export default class View {
  _appElement = document.querySelector(".app");
  errorMessage;

  render(data) {
    const markup = this._generateMarkup(data);
    this._appElement.innerHTML = "";
    this._appElement.insertAdjacentHTML("afterbegin", markup);
  }

  loadAppHandler(handler) {
    window.addEventListener("load", handler);
  }
}
