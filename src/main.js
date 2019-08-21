import {getMenuTemplate} from './components/menu';
import {getSearchTemplate} from './components/searching';
import {getFiltersTemplate} from './components/filter';
import {getBoardContainer} from './components/board-container';
import {getLoadMoreButtonTemplate} from "./components/load-button";

import Card from './components/card';
import CardEdit from "./components/card-edit";

import {data, dataFilters} from "./data";

const onLoadCards = () => {
  if (data.length > boardTasksContainer.childElementCount) {
    renderCards(data.slice(boardTasksContainer.childElementCount));
    if (boardTasksContainer.childElementCount === data.length) {
      loadButton.classList.add(`visually-hidden`);
    }
  } else {
    loadButton.classList.add(`visually-hidden`);
  }
};

const renderComponent = (container, layout, position = `beforeend`) => {
  container.insertAdjacentHTML(position, layout);
};

const mainContainer = document.querySelector(`.main`);
const mainControlContainer = mainContainer.querySelector(`.main__control`);

renderComponent(mainControlContainer, getMenuTemplate());
renderComponent(mainContainer, getSearchTemplate());
renderComponent(mainContainer, getFiltersTemplate(dataFilters));
renderComponent(mainContainer, getBoardContainer());

const boardTasksContainer = mainContainer.querySelector(`.board__tasks`);
renderComponent(boardTasksContainer, getLoadMoreButtonTemplate(), `afterend`);


const loadButton = document.querySelector(`.load-more`);

const Position = {
  AFTER: `afterbegin`,
  BEFORE: `beforeend`,
};

const renderTemplate = (container, element, position) => {
  switch (position) {
    case Position.AFTER:
      container.append(element);
      break;
    case Position.BEFORE:
      container.prepend(element);
      break;
  }
};

const renderCards = (data) => {
  data.slice(0, 8).forEach((cardData) => {
    const Task = new Card(cardData);
    const TaskEdit = new CardEdit(cardData);
    Task.getElement().querySelector(`.card__btn--edit`)
      .addEventListener(`click`, () => {
        boardTasksContainer.replaceChild(TaskEdit.getElement(), Task.getElement());
      });
    TaskEdit.getElement().querySelector(`.card__save`)
      .addEventListener(`click`, () => {
        boardTasksContainer.replaceChild(Task.getElement(), TaskEdit.getElement());
      })
    renderTemplate(boardTasksContainer, Task.getElement(), Position.AFTER);
  });
};

loadButton.addEventListener(`click`, onLoadCards);


renderCards(data);


