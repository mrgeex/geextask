class RenderDate {
  _parentElement = document.querySelector(".logo");
  _formattedDate = new Date()
    .toLocaleDateString(navigator.language, {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    })
    .split(",");

  render() {
    const markup = this._generateMarkup();
    this._parentElement.insertAdjacentHTML("afterend", markup);
  }

  _generateMarkup() {
    return `<div class="date">${this._formattedDate[0]}<br><span>${this._formattedDate.slice(1).join("")}</span></div>`;
  }
}

export default new RenderDate();
