const navigationList = document.querySelector(".navigation");
navigationList.addEventListener("click", event => {
  const { target } = event;
  let element;
  if (target.tagName === "A") element = target.parentElement;
  if (target.tagName === "LI") {
    element = target;
    element.children[0].click();
  }

  [...navigationList.children].forEach(child => {
    child.classList.remove("selected");
  });
  element.classList.add("selected");
});
