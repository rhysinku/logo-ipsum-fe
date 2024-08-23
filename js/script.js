document.addEventListener("DOMContentLoaded", function () {
  const windowWidth = window.innerWidth;
  function toggleOverlay() {
    const overlayDiv = document.getElementById("overlay");

    // Toggle the 'overlay' class on the body
    document.body.classList.toggle("overlay");

    // Update the inner text based on the current state
    if (document.body.classList.contains("overlay")) {
      overlayDiv.innerText = "Hide";
    } else {
      overlayDiv.innerText = "Show";
    }
  }

  function handleClick(e) {
    e.preventDefault();

    const subMenu = e.target
      .closest(".menu__card")
      .querySelector(".sub__menu_con");

    const menuItem = e.target
      .closest(".menu__card")
      .querySelector(".menu__item");

    // Close all other submenus
    document.querySelectorAll(".sub__menu_con").forEach((item) => {
      if (item !== subMenu) {
        item.classList.remove("active");
      }
    });
    // Close all other menu items
    document.querySelectorAll(".menu__item").forEach((item) => {
      if (item !== menuItem) {
        item.classList.remove("active");
      }
    });

    // Toggle the active class on the clicked submenu
    subMenu.classList.toggle("active");
    menuItem.classList.toggle("active");
  }

  function updateMenuHandlers() {
    const menuItems = document.querySelectorAll(".menu__card");
    const windowWidth = window.innerWidth;
    menuItems.forEach((item) => {
      const caretButton = item.querySelector(".menu__item span");

      // Add the click event listener if the window width is 1024px or less
      if (windowWidth <= 1024) {
        caretButton.addEventListener("click", handleClick);
      } else {
        // Remove the click event listener to prevent duplication
        caretButton.removeEventListener("click", handleClick);
        document.querySelectorAll(".sub__menu_con").forEach((item) => {
          item.classList.remove("active");
        });

        document.querySelectorAll(".menu__item").forEach((item) => {
          item.classList.remove("active");
        });
      }
    });
  }

  const burgerClick = () => {
    const burgerOpen = document.getElementById("burger__open");
    const burgerClose = document.getElementById("burger__close");
    const navigation = document.querySelector(".navigation__holder");

    burgerOpen.addEventListener("click", () => {
      navigation.classList.toggle("burger--active");
      document.body.classList.toggle("overflow-hidden");
    });

    burgerClose.addEventListener("click", () => {
      navigation.classList.toggle("burger--active");
      document.body.classList.toggle("overflow-hidden");
    });
  };

  //   Reset Burger Effect when resizing
  const resetBurgerStyle = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth > 767) {
      document
        .querySelector(".navigation__holder")
        .classList.remove("burger--active");
      document.body.classList.remove("overflow-hidden");
      console.log("outside of 767");
    } else {
      console.log("inside 767");
    }
  };

  // Click Event for the Search Button
  const searchButtonOnClick = () => {
    const openButton = document.querySelector("#header__search_btn");
    const closeButton = document.querySelector("#close__search");
    const searchBar = document.querySelector("#search__form");

    openButton.addEventListener("click", () => {
      searchBar.classList.toggle("show");
      document.body.classList.add("overflow-hidden");
    });

    closeButton.addEventListener("click", () => {
      searchBar.classList.toggle("show");
      document.body.classList.remove("overflow-hidden");
    });
  };

  //   Swap the header button to the  after the navigation menu in mobile
  const swapElement = () => {
    const windowWidth = window.innerWidth;
    const headerButton = document.querySelector(".header__button");
    const headerSearch = document.querySelector(".header__search");
    const headerInfo = document.querySelector(".header__info");
    const navigationMenu = document.querySelector(".navigation__menu");
    if (windowWidth <= 767) {
      navigationMenu.insertAdjacentElement("afterend", headerButton);
    } else {
      headerInfo.insertBefore(headerButton, headerSearch.nextSibling);
    }
  };

  // Initial setup on page load
  updateMenuHandlers();
  burgerClick();
  swapElement();
  resetBurgerStyle();
  searchButtonOnClick();
  // Update handlers on window resize
  window.addEventListener("resize", updateMenuHandlers);
  window.addEventListener("resize", swapElement);
  window.addEventListener("resize", resetBurgerStyle);

  // Add event listener for window resize
  document.getElementById("overlay").addEventListener("click", toggleOverlay);
});
