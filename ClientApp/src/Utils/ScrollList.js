export function watchScroll(state, setCurrentDates) {
  console.log(window.pageYOffset);

  window.addEventListener("scroll", (e) =>
    modifyDates(e, state, setCurrentDates)
  );
}
var scrolling = false;
function modifyDates(e, state, setCurrentDates) {
  if (!scrolling) {
    scrolling = true;
    let max = state["max"];
    let min = state["min"];
    console.log(window.pageYOffset, state["currentView"]);
    console.log(window.pageYOffset > state["currentView"]);
    console.log(window.pageYOffset < state["currentView"]);

    if (window.pageYOffset > state["currentView"]) {
      max = max + 1;
      min = min + 1;
    } else if (window.pageYOffset < state["currentView"]) {
      max = max - 1;
      min = min - 1;
    }else{
      max = 12;
      min = 0;
    }
    if(min === 0){
      state["currentDates"] = state["dates"].slice(0, max);
    }else{
      state["currentDates"] = state["dates"].slice(min - 1, max);
    }
    state["currentView"] = window.pageYOffset;
    state["min"] = min;
    state["max"] = max;
    setTimeout(function(){
      scrolling=false;
      console.log(min, max);
      setCurrentDates(state);
    }, 200)
  }
}
