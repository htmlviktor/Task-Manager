import {getMenuTemplate} from './components/menu';
import {getSearchTemplate} from './components/searching';
import {getFiltersTemplate} from './components/filter';
import {getBoardContainer} from './components/board-container';
import {getCardEditFormTemplate} from './components/card-edit';
import {getCardTemplate} from './components/card';
import {getLoadMoreButtonTemplate} from "./components/load-button";

//This is renders function component
const renderComponent = (container, layout) => {
  container.insertAdjacentHTML('beforeend', layout);
}

const mainContainer = document.querySelector('.main');
const mainControlContainer = mainContainer.querySelector('.main__control');

renderComponent(mainControlContainer, getMenuTemplate());
renderComponent(mainContainer, getSearchTemplate());
renderComponent(mainContainer, getFiltersTemplate());
renderComponent(mainContainer, getBoardContainer());

const renderCards = () => {
  const boardTasksContainer = mainContainer.querySelector('.board__tasks');
  renderComponent(boardTasksContainer, getCardEditFormTemplate());

  for (let i = 0; i < 3; i++) {
    renderComponent(boardTasksContainer, getCardTemplate());
  }
}
renderCards();


