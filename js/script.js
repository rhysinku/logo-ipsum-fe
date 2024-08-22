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

  // Make caret function
  //   const handleCaretClick = () => {
  //     const windowWidth = window.innerWidth;
  //     const menuItem = document.querySelectorAll(".menu__card");

  //     menuItem.forEach((item) => {
  //       const caretButton = item.querySelector(".menu__item span");
  //       const subMenu = item.querySelector(".sub__menu_con");

  //       function handleClick(e) {
  //         e.preventDefault();

  //         document.querySelectorAll(".sub__menu_con").forEach((item) => {
  //           if (item !== subMenu) {
  //             item.classList.remove("active");
  //           }
  //         });

  //         subMenu.classList.toggle("active");
  //       }

  //       caretButton.removeEventListener("click", handleClick);
  //       if (windowWidth <= 1024) {
  //         caretButton.addEventListener("click", handleClick);
  //       }
  //     });
  //   };

  function handleClick(e) {
    e.preventDefault();

    const subMenu = e.target
      .closest(".menu__card")
      .querySelector(".sub__menu_con");

    // Close all other submenus
    document.querySelectorAll(".sub__menu_con").forEach((item) => {
      if (item !== subMenu) {
        item.classList.remove("active");
      }
    });

    // Toggle the active class on the clicked submenu
    subMenu.classList.toggle("active");
  }

  function updateMenuHandlers() {
    const windowWidth = window.innerWidth;
    const menuItems = document.querySelectorAll(".menu__card");

    menuItems.forEach((item) => {
      const caretButton = item.querySelector(".menu__item span");

      // Remove the click event listener to prevent duplication

      // Add the click event listener if the window width is 1024px or less
      if (windowWidth <= 1024) {
        caretButton.addEventListener("click", handleClick);
      } else {
        caretButton.removeEventListener("click", handleClick);
        document.querySelectorAll(".sub__menu_con").forEach((item) => {
          item.classList.remove("active");
        });
      }
    });
  }

  // Initial setup on page load
  updateMenuHandlers();

  // Update handlers on window resize
  window.addEventListener("resize", updateMenuHandlers);

  // Add event listener for window resize
  document.getElementById("overlay").addEventListener("click", toggleOverlay);
});
