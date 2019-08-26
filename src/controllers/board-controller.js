import Task from "../components/task";
import TaskEdit from "../components/task-edit";
import TaskList from "../components/task-list";
import BoardContainer from "../components/board-container";
import Sort from "../components/sort";
import {render, Position} from "../utils";
import Button from "../components/load-button";

class BoardController {
  constructor(container, tasks) {
    this._container = container;
    this._tasks = tasks;
    this._sort = new Sort();
    this._board = new BoardContainer();
    this._taskList = new TaskList();
    this._loadButton = new Button();

    this._onLoadMore = this._onLoadMore.bind(this);
  };

  init() {
    render(this._container, this._board.getElement(), Position.AFTER);
    render(this._board.getElement(), this._sort.getElement(), Position.BEFORE);
    render(this._board.getElement(), this._taskList.getElement(), Position.AFTER);

    this._renderTasks(this._tasks);

  }

  _renderTasks(tasks) {
    tasks.slice(0, 8).forEach((taskElement) => {
      const task = new Task(taskElement);
      const taskEdit = new TaskEdit(taskElement);

      const onEscKeyDown = (evt) => {
        if (evt.key === `Escape` || evt.key === `Esc`) {
          this._taskList.getElement().replaceChild(task.getElement(), taskEdit.getElement());
          document.removeEventListener(`keydown`, onEscKeyDown);
        }
      };

      render(this._taskList.getElement(), task.getElement(), Position.AFTER);
      taskEdit.getElement().querySelector(`textarea`)
        .addEventListener(`focus`, () => {
          document.removeEventListener(`keydown`, onEscKeyDown);
        });
      taskEdit.getElement().querySelector(`textarea`)
        .addEventListener(`blur`, () => {
          document.addEventListener(`keydown`, onEscKeyDown);
        });

      task.getElement().querySelector(`.card__btn--edit`)
        .addEventListener(`click`, () => {
          this._taskList.getElement()
            .replaceChild(taskEdit.getElement(), task.getElement());
          document.addEventListener(`keydown`, onEscKeyDown);
        });
      taskEdit.getElement().querySelector(`.card__save`)
        .addEventListener(`click`, () => {
          this._taskList.getElement()
            .replaceChild(task.getElement(), taskEdit.getElement());
        });
    });
    render(this._board.getElement(), this._loadButton.getElement(), Position.AFTER);
    this._loadButton.getElement().addEventListener(`click`, this._onLoadMore);
  }

  _onLoadMore() {
    const countTasks = this._taskList.getElement().childElementCount;
    if (this._tasks.length > countTasks) {
      this._renderTasks(this._tasks.slice(countTasks));
    } else {
      this._loadButton.getElement().classList.add(`visually-hidden`);
    }
  }

}

export default BoardController;
