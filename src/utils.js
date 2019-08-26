export const createElement = (template) => {
  const element = document.createElement(`div`);
  element.innerHTML = template;
  return element.firstChild;
};

export const Position = {
  AFTER: `afterbegin`,
  BEFORE: `beforeend`,
};

export const render = (container, element, position) => {
  switch (position) {
    case Position.AFTER:
      container.append(element);
      break;
    case Position.BEFORE:
      container.prepend(element);
      break;
  }
};
