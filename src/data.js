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
  isFavorite: false,
  isArchive: false
});


const makeTasks = (count) => {
  const array = new Array();
  for(let i = 0; i < count; i++) {
    array[i] = makeTask();
  }

  return array;
}

export const data = makeTasks(18);



