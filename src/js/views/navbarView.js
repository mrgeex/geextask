import View from "./view";

class NavbarView extends View {
  _navList = document.querySelector(".nav ul");
  constructor() {
    super();
    this._currentPage = this._getPageUrl();
    this.switchPage(this._currentPage);
  }

  _getPageUrl() {
    const urlHash = window.location.hash;
    const allPages = Array.from(this._navList.children).map((item) => item.id);
    return allPages.includes(urlHash) ? urlHash : "#tasks";
  }

  navHandler() {
    this._navList.addEventListener("click", (event) => {
      const target = event.target;
      const selectedItem = target.closest(".nav ul li");
      this.switchPage(selectedItem.id);
    });
  }

  switchPage(selectedPage) {
    const selectedItem = document.getElementById(selectedPage);
    Array.from(this._navList.children).map((item) => {
      item.classList.remove("active__tab");
    });
    selectedItem.classList.add("active__tab");
  }
}

export default new NavbarView();
