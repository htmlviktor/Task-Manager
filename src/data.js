const makeTask = () => ({
  description: [
    'Изучить теорию',
    'Сделать домашку',
    'Пройти интенсив на соточку'
  ][Math.floor(Math.random() * 3)],
  dueDate: new Date() * Math.random() * 7 / 1000,
  repeatingDays: {
    'mo': false,
    'tu': Math.round(Math.random()) ? true : false,
    'we': false,
    'th': false,
    'fr': false,
    'sa': false,
    'su': false,
  },
  tags: new Set([
    'homework',
    'theory',
    'practice',
    'intensive',
    'keks',
  ]),
  color: ['black', 'yellow', 'blue', 'green', 'pink'][Math.floor(Math.random() * 4)],
  isFavorite: Math.round(Math.random()) ? true : false,
  isArchive: Math.round(Math.random()) ? true : false,
});


const makeTasks = (count) => {
  const array = new Array();
  for(let i = 0; i < count; i++) {
    array[i] = makeTask();
  }

  return array;
}

export const data = makeTasks(18);

const filterTitles = [
  `ALL`,
  `OVERDUE`,
  `TODAY`,
  `FAVORITES`,
  `REPEATING`,
  `TAGS`,
  `ARCHIVE`
];

const qtyCount = (name, tasks) => {
  switch (name) {
    case `ALL`:
      return tasks.filter(task => task).length;
    case `OVERDUE`:
      return tasks.filter(task => new Date(task.dueDate).toDateString() > new Date().toDateString()).length;
    case `TODAY`:
      return tasks.filter(task => new Date(task.dueDate).toDateString() === new Date().toDateString()).length;
    case `FAVORITES`:
      return tasks.filter(task => task.isFavorite).length;
    case `REPEATING`:
      return tasks.filter((task) => {
       return Object.keys(task.repeatingDays).some(it => task.repeatingDays[it])
      }).length;
    case `TAGS`:
      return tasks.filter(task => task.tags.size > 0).length;
    case `ARCHIVE`:
      return tasks.filter(task => task.isArchive).length;
    default: return tasks.length;
  }
};


const makeTaskFilters = () => {
  const arrayFilter = new Array();
  filterTitles.forEach((title, index) => {
    arrayFilter[index] = {
      title,
      count: qtyCount(title, data)
    }
  })
  return arrayFilter;
};

export const dataFilters = makeTaskFilters();


