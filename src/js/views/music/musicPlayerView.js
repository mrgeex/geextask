import View from "../view";

class musicPlayerView extends View {
  _generateMarkup() {
    return `<div class="music flex">Music</div>`;
  }
}

export default new musicPlayerView();
