document.addEventListener("DOMContentLoaded", function () {
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

  // Check is Mobile Screen

  const isMobile = () => {
    const windowWidth = window.innerWidth;

    return windowWidth <= 767;
  };

  // Check if burger is open
  const isBurgerOpen = () => {
    return document.body.classList.contains("burgerIsOpen");
  };

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
      document.body.classList.add("burgerIsOpen");
      document.body.classList.add("overflow-hidden");
    });

    burgerClose.addEventListener("click", () => {
      navigation.classList.toggle("burger--active");
      document.body.classList.remove("burgerIsOpen");
      document.body.classList.remove("overflow-hidden");
    });
  };

  //   Reset Burger Effect when resizing
  const resetBurgerStyle = () => {
    // const windowWidth = window.innerWidth;
    if (!isMobile() && isBurgerOpen()) {
      document
        .querySelector(".navigation__holder")
        .classList.remove("burger--active");
      document.body.classList.remove("overflow-hidden");
      document.body.classList.remove("burgerIsOpen");
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

  // Select State Handler
  const activeState = (e) => {
    const stateItem = document.querySelectorAll(".state__item");
    const stateLocation = document.querySelectorAll(".svg__location");

    // Reset the active class
    stateItem.forEach((item) => {
      item.classList.remove("active");
    });
    stateLocation.forEach((item) => {
      item.classList.remove("active");
    });

    // Check the click event
    const clickedItem = e.currentTarget;
    const clickItem = clickedItem.classList[1];

    // Add Active Class
    clickedItem.classList.add("active");

    // Check the name of the clicked item
    const getLocation = clickItem.replace("select--", "loc--");

    const locationItem = document.querySelector(`.${getLocation}`);

    if (locationItem) {
      locationItem.classList.add("active");
    }
  };

  const handleStateClick = () => {
    const buttons = document.querySelectorAll(".state__item");
    buttons.forEach((button) => {
      button.addEventListener("click", activeState);
    });
  };
  // Hover State in State
  const addActiveClassOnHover = (e) => {
    const stateItems = document.querySelectorAll(".state__item");

    stateItems.forEach((item) => {
      item.addEventListener("mouseover", (e) => {
        const hoveredItem = e.currentTarget;
        const hoveredClass = hoveredItem.classList[1]; // Assumes the second class is used for identification

        // Add 'active' class to the hovered item
        hoveredItem.classList.add("active");

        // Derive the corresponding location class from the hovered item's class
        const locationClass = hoveredClass.replace("select--", "loc--");

        // Select the corresponding location element and add 'active' class
        const locationItem = document.querySelector(`.${locationClass}`);
        if (locationItem) {
          locationItem.classList.add("active");
        }
      });

      item.addEventListener("mouseout", (e) => {
        const hoveredItem = e.currentTarget;
        const hoveredClass = hoveredItem.classList[1]; // Assumes the second class is used for identification

        // Remove 'active' class from the hovered item
        hoveredItem.classList.remove("active");

        // Derive the corresponding location class from the hovered item's class
        const locationClass = hoveredClass.replace("select--", "loc--");

        // Select the corresponding location element and remove 'active' class
        const locationItem = document.querySelector(`.${locationClass}`);
        if (locationItem) {
          locationItem.classList.remove("active");
        }
      });
    });
  };

  const reponsiveFunction = () => {
    const windowWidth = window.innerWidth;

    const stateItems = document.querySelectorAll(".state__item");
    stateItems.forEach((item) => {
      item.replaceWith(item.cloneNode(true)); // This line removes all event listeners from the element
    });

    if (windowWidth <= 1024) {
      handleStateClick();
    } else {
      addActiveClassOnHover();
    }
  };

  // Initial setup on page load
  updateMenuHandlers();
  burgerClick();
  swapElement();
  resetBurgerStyle();
  searchButtonOnClick();
  // addActiveClassOnHover();
  // handleStateClick();
  reponsiveFunction();

  // Update handlers on window resize
  window.addEventListener("resize", updateMenuHandlers);
  window.addEventListener("resize", swapElement);
  window.addEventListener("resize", resetBurgerStyle);
  window.addEventListener("resize", reponsiveFunction);

  // Add event listener for window resize
  document.getElementById("overlay").addEventListener("click", toggleOverlay);
});
