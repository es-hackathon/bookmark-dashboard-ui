const groups = [
  {
    name: "FFC",
    description: "Tribe",
    isActive: true,
    id: 1,
    cards: [
      1
    ]
  },
  {
    name: "TAU",
    description: "Feature team",
    isActive: false,
    id: 2,
    cards: [
      1, 2
    ]
  }
];


const cards = [
  {
    name: "SG connect",
    description: "For authentication",
    url: "https://google.com",
    expireDate: "2020-09-25",
    id: 1
  },
  {
    name: "SG dashboard",
    description: "For authentication",
    url: "https://google.com",
    expireDate: "2020-09-11",
    id: 2
  }
];




// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {

  groups,
  cards
};
