"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const bodyAddDisabled = () => {
    document.body.classList.add("disabled");
  };

  const bodyRemoveDisabled = () => {
    document.body.classList.remove("disabled");
  };

  const telMask = IMask(document.querySelector(".telMask"), {
    mask: "+{7}(000)000-00-00",
  });

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

  if (window.innerWidth > 1170) {
    const header = document.querySelector(".header");
    const dataSide = document.querySelector(".cart__data");
    window.addEventListener("scroll", () => {
      console.log(pageYOffset);
      if (pageYOffset > 106) {
        header.classList.add("header-minimize");
        dataSide.classList.add("minimize");
        header
          .querySelector(".header__bottom")
          .classList.add("header__bottom_scrolled");
      } else {
        header.classList.remove("header-minimize");
        dataSide.classList.remove("minimize");
        header
          .querySelector(".header__bottom")
          .classList.remove("header__bottom_scrolled");
      }
    });
  }

  {
    $(".anchor").on("click", function (event) {
      //отменяем стандартную обработку нажатия по ссылке
      event.preventDefault();
      //забираем идентификатор бока с атрибута href
      var id = $(this).attr("href"),
        //узнаем высоту от начала страницы до блока на который ссылается якорь
        top = $(id).offset().top;
      //анимируем переход на расстояние - top за ВРЕМЯ мс
      $("body,html").animate(
        {
          scrollTop: top - 130,
        },
        700
      );
    });

    const toFillData = document.querySelector(".fixed_btn");

    window.addEventListener("scroll", () => {
      let scrollY = window.pageYOffset;

      if (scrollY > 650) {
        toFillData.classList.remove("show");
      } else {
        if (!toFillData.classList.contains("show")) {
          toFillData.classList.add("show");
        }
      }
    });
  }

  // Choose city settings
  {
    const cityBtn = document.getElementById("usersCity");
    const modal = document.querySelector(".choose-city");
    const submit = document.getElementById("citySubmit");
    const popup = document.querySelector(".choose-city_popup");
    const openPopupBtn = document.getElementById("chooseCity");
    const popupDesk = document.querySelector(".choose-city_popup-desk");
    const popupMob = document.querySelector(".choose-city_popup-mob");
    const closeButtons = document.querySelectorAll(
      ".choose-city_popup-desk .close, .choose-city_popup-mob .close "
    );

    cityBtn.addEventListener("click", () => {
      modal.classList.toggle("show");
      setPosition(cityBtn);
    });

    const setPosition = (elem) => {
      let position = elem.getBoundingClientRect(); // get position of elem
      modal.style.top = position.top + 35 + "px";
      modal.style.left = position.left - 85 + "px";
    };

    submit.addEventListener("click", (e) => {
      e.preventDefault();
      modal.classList.remove("show");
    });

    openPopupBtn.addEventListener("click", (e) => {
      e.preventDefault();
      modal.classList.remove("show");
      popup.classList.add("show");
      bodyAddDisabled();
    });

    popup.addEventListener("click", (e) => {
      if (e.target == popup) {
        popup.classList.remove("show");
        bodyRemoveDisabled();
      }
    });

    closeButtons.forEach((el) => {
      el.addEventListener("click", () => {
        el.parentElement.parentElement.classList.remove("show");
        bodyRemoveDisabled();
      });
    });

    document.body.addEventListener("click", (e) => {
      let target = e.target;
      if (!modal.contains(target) && target !== cityBtn) {
        modal.classList.remove("show");
      }
    });
  }
});
