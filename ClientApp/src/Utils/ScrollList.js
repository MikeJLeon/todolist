export function watchScroll(state, setCurrentDates) {
  console.log(window.pageYOffset);
  let dates = document.getElementsByClassName("dateContainer");
  trackHeight(dates);
  window.addEventListener("scroll", (e) =>
    modifyDates(e, state, setCurrentDates)
  );
}
var scrolling = false;
function trackHeight(dates) {
  let calendar = document.getElementsByClassName("calendarContainer")[0];
  let totalHeight = 0;
  for (let date of dates) {
    totalHeight += date.getBoundingClientRect().height;
  }
  calendar.style.height = totalHeight + "px";
}
function modifyDates(e, state, setCurrentDates) {
  if (!scrolling) {
    setTimeout(() => {
      let max = state["max"];
      let min = state["min"];
      if (window.pageYOffset > state["currentView"]) {
        max = max + 1;
        min = min + 1;
      } else if (window.pageYOffset < state["currentView"]) {
        max = max - 1;
        min = min - 1;
      } else {
        max = 12;
        min = 0;
      }
      if (min === 0) {
        state["currentDates"] = state["dates"].slice(0, max);
      }
      state["currentView"] = window.pageYOffset;
      state["min"] = min;
      state["max"] = max;
      console.log(min, max);
      setCurrentDates(state);
      scrolling = false;
    }, 100);
    scrolling = true;
  }
}
