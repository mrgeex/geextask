class routineRepeatCycle {
  cycleHandler() {
    document.addEventListener("click", (event) => {
      const dropDown = event.target.closest(".todo__routines__dropdown");
      if (!dropDown) return;

      const selected = dropDown.querySelector(".selected span");
      const dropDownOption = event.target.closest(
        ".todo__routines__dropdown .option",
      );
      if (!dropDownOption) return;
      selected.textContent = dropDownOption.textContent;
      selected.setAttribute("data-value", dropDownOption.dataset.value);
    });
  }
}

export default new routineRepeatCycle();
