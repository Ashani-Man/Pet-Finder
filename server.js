const express = require('express');
const app = express();

const Pets = [
  {name: "Cinderella", species: "Dragon", age: 2, owner: "Patt"},
  {name: "cupcake", species: "Pitbull", age: 21, owner: "Clive"},
  {name: "Galaxy Destroyer", species: "chinchilla", age: 16, owner: "Belmont"},
  {name: "Stillento", species: "Bat", age: 1, owner: "Dracula"}
];

app.get('/api/v1', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.get('/api/v1/Pets', (req, res) => {
  res.send(Pets);
});

app.get('/api/v1/Pets/owner', (req, res) => {
  let foundPets = Pets;
  const {owner} = req.query;

  console.log('req query', req.query);
  if(owner) {
    foundPets = Pets.filter((pet)=> {
      return pet.owner === owner;
    })
  }
  res.send(foundPets);
});


app.get('/api/v1/Pets/:owner', (req, res) => {
  const { owner } = req.params;

  const foundPet = Pets.find((pet) => pet.owner === owner);

  if (!foundPet) {
    return res.status(404).json({ error: 'Pet not found for the given owner' });
  }

  res.json(foundPet);
});



app.get('/api/v1/Pets/name', (req, res) => {
  const { name } = req.params;
  const foundPet = Pets.find((animal) => {
    return animal.name === name
  })

  res.send(foundPet);
});


app.listen(8080, () => {
  console.log('listening on port 8080');
});``