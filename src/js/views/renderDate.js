import View from "./view";

class RenderDate extends View {
  _parentElement = document.querySelector(".info");
  _formattedDate = this._now
    .toLocaleDateString(navigator.language, {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    })
    .split(",");

  render() {
    const markup = this._generateMarkup();
    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }

  _generateMarkup() {
    return `<div class="date" title="Make it count!">${this._formattedDate[0]}<br><span>${this._formattedDate.slice(1).join("")}</span></div>`;
  }
}

export default new RenderDate();
