import {getMenuTemplate} from './components/menu';
import {getSearchTemplate} from './components/searching';
import {getFiltersTemplate} from './components/filter';
import {getBoardContainer} from './components/board-container';
import {getCardEditFormTemplate} from './components/card-edit';
import {getCardTemplate} from './components/card';
import {getLoadMoreButtonTemplate} from "./components/load-button";

import {data} from "./data";

const onLoadCards = () => {
  if (data.length > boardTasksContainer.childElementCount) {
    renderCards(data.slice(boardTasksContainer.childElementCount));
    if (boardTasksContainer.childElementCount === data.length) {
      loadButton.classList.add('visually-hidden');
    }
  } else {
    loadButton.classList.add('visually-hidden');
  }
}

const renderComponent = (container, layout, position = `beforeend`) => {
  container.insertAdjacentHTML(position, layout);
}

const mainContainer = document.querySelector('.main');
const mainControlContainer = mainContainer.querySelector('.main__control');

renderComponent(mainControlContainer, getMenuTemplate());
renderComponent(mainContainer, getSearchTemplate());
renderComponent(mainContainer, getFiltersTemplate());
renderComponent(mainContainer, getBoardContainer());

const boardTasksContainer = mainContainer.querySelector('.board__tasks');
renderComponent(boardTasksContainer, getLoadMoreButtonTemplate(), `afterend`);
renderComponent(boardTasksContainer, getCardEditFormTemplate(data[0]));

const loadButton = document.querySelector('.load-more');

const renderCards = (data) => {
    data.slice(0, 8).forEach(card => renderComponent(boardTasksContainer, getCardTemplate(card)));
};

loadButton.addEventListener('click', onLoadCards);


renderCards(data);


