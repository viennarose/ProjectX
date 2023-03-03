const jsonfile = require("jsonfile");
const moment = require("moment");
const simpleGit = require("simple-git");
const FILE_PATH = "./data.json";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const makeCommit = (n) => {
  if (n === 0) return simpleGit().push();

  //   const x = random.int(0, 54);
  //   const y = random.int(0, 6);

  const x = getRandomInt(0, 54);
  const y = getRandomInt(0, 6);

  //commits in random date y = year; d = day; w = week;
  const DATE = moment()
    .subtract(1, "y")
    .add(1, "d")
    .add(x, "w")
    .add(y, "d")
    .format();

  // commit in current date
  //const DATE = moment().format();

  const data = {
    date: DATE,
  };

  console.log(DATE);

  jsonfile.writeFile(FILE_PATH, data, () => {
    simpleGit()
      .add([FILE_PATH])
      .commit(DATE, { "--date": DATE }, makeCommit.bind(this, --n));
  });
};
makeCommit(10);
