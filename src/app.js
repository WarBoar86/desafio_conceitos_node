const express = require("express");
const cors = require("cors");

const { v4: uuid} = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO

  return response.json(repositories);
  
});

app.post("/repositories", (request, response) => {
  // TODO
  const {title, url, techs} = request.body;

  const repository = { 
    id: uuid(), 
    title: title, 
    url: url, 
    techs: techs, 
    likes: 0 
  }

  repositories.push(repository);
  return response.json(repository);
  
});

app.put("/repositories/:id", (request, response) => {
  //TODO
  const {id} = request.params;  
  const { url,title, techs} = request.body;
  
  
  const   repositoryIndex=  repositories.findIndex( repository => repository.id === id);

  if (repositoryIndex == -1) {
    return response.sendStatus(400);

  }else{
     repositories[repositoryIndex].url = url
     repositories[repositoryIndex].title = title;
     repositories[repositoryIndex].techs= techs;
  
    return response.json(repositories[repositoryIndex]);
  }  
});

app.delete("/repositories/:id", (request, response) => {
  // TODO

  const {id} = request.params;  
  const repositoryIndex= repositories.findIndex( repository => repository.id === id);

  
  if (repositoryIndex == -1) {
    return response.sendStatus(400);

  }else {
    repositories.splice(repositoryIndex, 1);
    return response.sendStatus(204);
  }

});

app.post("/repositories/:id/like", (request, response) => {
  // TODO

 const {id} = request.params;  
 const repositoryIndex= repositories.findIndex( repository => repository.id === id);

  if (repositoryIndex == -1) {
    return response.sendStatus(400);

  }else{
    
    repositories[repositoryIndex].likes +=1;
    return response.json(repositories[repositoryIndex]);
  }

});

module.exports = app;
