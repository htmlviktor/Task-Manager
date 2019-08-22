import {createElement} from '../utils';

export default class Card {
  constructor({color, tags, repeatingDays, description, dueDate}) {
    this._color = color;
    this._tags = tags;
    this._repeatingDays = repeatingDays;
    this._description = description;
    this._dueDate = new Date(dueDate);
    this._element = null;
    this._onEdit = null;
  }

  _onEditCheckout() {
    typeof this._onEdit === `function` && this._onEdit();
  }


  bind() {
    this._element.querySelector(`.card__btn--edit`)
      .addEventListener(`click`, this._onEditCheckout.bind(this));
  }

  unbind() {
    this._element.querySelector(`.card__btn--edit`)
      .removeEventListener(`click`, this._onEditCheckout);
  }

  set onEdit(cb) {
    this._onEdit = cb;
  }

  get element() {
    return this._element;
  }

  render() {
    this._element = createElement(this.template);
    this.bind();
    return this._element;
  }

  unRender() {
    this.unbind();
    this._element = null;
  }

  get template() {
    return `<article class="card card--${this._color} ${Object.keys(this._repeatingDays)
      .some((day) => this._repeatingDays[day]) ? `card--repeat` : ``}">
            <div class="card__form">
              <div class="card__inner">
                <div class="card__control">
                  <button type="button" class="card__btn card__btn--edit">
                    edit
                  </button>
                  <button type="button" class="card__btn card__btn--archive">
                    archive
                  </button>
                  <button
                    type="button"
                    class="card__btn card__btn--favorites card__btn--disabled"
                  >
                    favorites
                  </button>
                </div>

                <div class="card__color-bar">
                  <svg class="card__color-bar-wave" width="100%" height="10">
                    <use xlink:href="#wave"></use>
                  </svg>
                </div>

                <div class="card__textarea-wrap">
                  <p class="card__text">${this._description}</p>
                </div>

                <div class="card__settings">
                  <div class="card__details">
                    <div class="card__dates">
                      <div class="card__date-deadline">
                        <p class="card__input-deadline-wrap">
                          <span class="card__date">${new Date(this._dueDate).toDateString()}</span>
                          <span class="card__time">11:15 PM</span>
                        </p>
                      </div>
                    </div>

                    <div class="card__hashtag">
                      <div class="card__hashtag-list">
                        <span class="card__hashtag-inner">
                          <span class="card__hashtag-name">
                            #${Array.from(this._tags).map((tag) => `${tag}`).join(` `)}
                          </span>
                        </span>

                        <span class="card__hashtag-inner">
                          <span class="card__hashtag-name">
                            #personal
                          </span>
                        </span>

                        <span class="card__hashtag-inner">
                          <span class="card__hashtag-name">
                            #important
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>`;
  }
}

