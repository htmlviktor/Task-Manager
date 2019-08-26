import AbstractComponent from "./abstract-component";

export default class TaskList extends AbstractComponent {
  constructor(props) {
    super(props);
  };

  getTemplate() {
    return `<div class="board__tasks">          
        </div>`;
  }

}
