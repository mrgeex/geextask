import View from "./view";

class NavbarView extends View {
  constructor() {
    super();
    this._currentPage = this._getPageUrl();
    if (!this._currentPage) return;
    console.log(this._currentPage);
  }

  _getPageUrl() {
    return window.location.hash.slice(1);
  }

  selectPageHandler() {
    document.addEventListener("click", (event) => {
      const clickedLink = event.target.closest("a[href]");
      if (!clickedLink) return;
      const navItem = clickedLink.parentElement;

      const navList = navItem.parentElement;
      Array.from(navList.children).map((item) => {
        item.classList.remove("active__tab");
      });
      navItem.classList.add("active__tab");

      console.log("clicked");
    });
  }

  switchPage() {}
}

export default new NavbarView();
