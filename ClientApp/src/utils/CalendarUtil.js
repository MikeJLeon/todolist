export function createCalendar() {
  let startDate = new Date();
  let endDate = new Date();
  endDate.setFullYear(startDate.getFullYear() + 2);
  let currentDate = startDate;
  let dateArray = new Array();
  console.log(currentDate, endDate);
  let container = document.getElementsByClassName("calendarContainer")[0];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  while (currentDate <= endDate) {
    dateArray.push(currentDate);
    let newDiv = document.createElement("div");
    newDiv.classList.add("CalendarDate");
    let newP = document.createElement("p");
    newP.innerText =
      currentDate.getFullYear() +
      " " +
      currentDate.getDate() +
      " " +
      months[currentDate.getDay()];
    newDiv.append(newP);
    container.appendChild(newDiv);
    currentDate.setDate(currentDate.getDate() + 1);
    newDiv.addEventListener("click", () => dateActive(newDiv));
  }
  function dateActive(newDiv){
    console.log(document.getElementsByClassName("dateActive")[0], newDiv)
    if(document.getElementsByClassName("dateActive").length > 0 && newDiv == document.getElementsByClassName("dateActive")[0]){
      newDiv.classList.remove("dateActive");
    }else if(document.getElementsByClassName("dateActive").length > 0){
      document.getElementsByClassName("dateActive")[0].classList.remove("dateActive");
      newDiv.classList.add("dateActive");
    }else{
        newDiv.classList.add("dateActive");
      }
    }
    console.log(dateArray);
  }
