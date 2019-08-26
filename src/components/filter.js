import AbstractComponent from "./abstract-component";

export default class Filters extends AbstractComponent {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return `<section class="main__filter filter container">
  ${this._data.map(({title, count}) => {
    return `<input
          type="radio"
          id="filter__${title.toLowerCase()}"
          class="filter__input visually-hidden"
          name="filter"
          checked
        />
        <label for="filter__${title.toLowerCase()}" class="filter__label">
          ${title} <span class="filter__${title.toLowerCase()}-count">${count}</span></label
        >`;
  }).join(``)}
      </section>`;
  }
}


