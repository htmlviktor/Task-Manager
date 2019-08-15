export const getFiltersTemplate = (filters) => {
  return `<section class="main__filter filter container">
  ${filters.map(({title, count}) => {
    return `<input
          type="radio"
          id="filter__${title.toLowerCase()}"
          class="filter__input visually-hidden"
          name="filter"
          checked
        />
        <label for="filter__${title.toLowerCase()}" class="filter__label">
          ${title} <span class="filter__${title.toLowerCase()}-count">${count}</span></label
        >` 
  }).join(``)}
        
        
      </section>`
};
