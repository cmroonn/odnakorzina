"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const bodyAddDisabled = () => {
    document.body.classList.add("disabled");
  };

  // Date picker
  {
    try {
      const button = document.getElementById("date-picker");
      const closeButton = document.querySelector(".date-pick .close-window");
      const datePicker = document.querySelector(".date-pick");
      const timeTabs = document.querySelectorAll(".date-pick-time .time-item");
      const inputsBlock = document.querySelector(".cart__data-date-inputs");
      const inputs = inputsBlock.querySelectorAll("input");
      const timeInput = document.getElementById("select_time");
      const editDate = document.getElementById("editDate");
      const confirm = document.querySelector(".date-pick__confirm");

      button.addEventListener("click", (e) => {
        e.preventDefault();
        datePicker.classList.add("show");
        inputsBlock.classList.add("show");
        button.style.display = "none";
        bodyAddDisabled();
      });

      closeButton.addEventListener("click", () => {
        datePicker.classList.remove("show");
        bodyRemoveDisabled();
      });

      confirm.addEventListener("click", () => {
        datePicker.classList.remove("show");
        bodyRemoveDisabled();
      });

      timeTabs.forEach((elem) => {
        elem.addEventListener("click", () => {
          timeTabs.forEach((el) => el.classList.remove("active")); // remove class active from all elems
          elem.classList.add("active");
          timeInput.setAttribute("value", `${elem.innerText}`); // set time in input
        });
      });

      editDate.addEventListener("click", (e) => {
        e.preventDefault();
        datePicker.classList.add("show"); // show date picker
        bodyAddDisabled();
      });

      datePicker.addEventListener("click", (e) => {
        let target = e.target;
        let children = datePicker.children;

        if (target == datePicker) {
          datePicker.classList.remove("show");
          bodyRemoveDisabled();
        }
      });

      inputs.forEach((input) => {
        input.addEventListener("click", () => {
          datePicker.classList.add("show");
        });
      });
    } catch {
      return false;
    }
  }
});
