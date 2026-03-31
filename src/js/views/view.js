export default class View {
  _appElement = document.querySelector(".app");
  _data;
  errorMessage;

  render(data) {
    if (!data) return;
    this._data = data;

    const markup = this._generateMarkup();
    this._appElement.innerHTML = "";
    this._appElement.insertAdjacentHTML("afterbegin", markup);
  }

  loadAppHandler(handler) {
    window.addEventListener("load", handler);
  }
}
