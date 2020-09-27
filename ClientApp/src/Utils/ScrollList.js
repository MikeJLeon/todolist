export function watchScroll(state, setCurrentDates) {
  console.log(window.pageYOffset);

  window.addEventListener("scroll", (e) =>
    modifyDates(e, state, setCurrentDates)
  );
}
function modifyDates(e, state, setCurrentDates) {
  let max = state["max"];
  let min = state["min"];
  console.log(window.pageYOffset > state["currentView"]);
  console.log(window.pageYOffset < state["currentView"]);

  if (window.pageYOffSet > state["currentView"]) {
    max = max + 1;
    min = min + 1;
    console.log("1");
  } else if (window.pageYOffSet < state["currentView"]) {
    max = max - 1;
    min = min - 1;
    console.log("2");
  }
  console.log(max, min);
  state["currentDates"] = state["dates"].slice(min, max);
  state["currentView"] = window.pageYOffset;
  state["min"] = min;
  state["max"] = max;
  setCurrentDates(state);
  console.log(window.pageYOffset);
  console.log(state);
}
