let players = [];
let n = 0;

const addPlayer = (id, name) => {
  if (players.length % 2 === 0) {
    n++;
  }
  let field = `field-${n}`;

  if (!name) return { error: "Playername and field are required." };
  const player = { id, name, field };
  players.push(player);

  console.log("players72", players);
  console.log("players73", player);
  return { player };
};

const findNumber = ({ player }) => {
  return players.filter(item => item.field === player.field).length === 2;
};

const getPlayer = id => {
  return players.find(item => item.id === id);
};

const getPlayerInField = field => {
  return players.filter(player => player.field === field);
};

const removePlayer = vis => {
  const num = players.findIndex(player => player.id === vis.id);
  if (num === -1) return { error: "not found" };
  players.splice(num, 1);
  return vis;
};

// two players

const addplayerstoField = ({ id, name, field }) => {
  name = name.trim().toLowerCase();
  field = field.trim().toLowerCase();
  const is = players.filter(item => item.field === field).length;
  if (is >= 2) return { error: "Sorry this Field had two players!." };

  const isFound = players.find(player => {
    return player.field === field && player.name === name;
  });

  if (!name || !field)
    return { error: "playername and fieldname are required. " };
  if (isFound) return { error: "playername is teken." };

  const twoPlayer = { id, name, field };

  players.push(twoPlayer);

  return { twoPlayer };
};

const getTwoPlayerinField = field =>
  players.filter(player => player.field === field);

module.exports = {
  addPlayer,
  getPlayerInField,
  findNumber,
  getPlayer,
  removePlayer,
  addplayerstoField,
  getTwoPlayerinField
};
