import Menu from "./components/menu";
import Search from "./components/searching";
import Filters from "./components/filter";
import {render} from "./utils";

import {dataFilters, data} from "./data";
import BoardController from "./controllers/board-controller";

const mainContainer = document.querySelector(`.main`);
const mainControlContainer = mainContainer.querySelector(`.main__control`);

const menu = new Menu();
const search = new Search();
const filters = new Filters(dataFilters);

render(mainControlContainer, menu.getElement(), `afterbegin`);
render(mainContainer, search.getElement(), `afterbegin`);
render(mainContainer, filters.getElement(), `afterbegin`);


const boardController = new BoardController(mainContainer, data);
boardController.init();
