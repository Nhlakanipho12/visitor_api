const express = require('express');
const port = 4000;
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.post('/addNewVisitor',async (request,response)=>{

  console.log(request.body);
  let  { full_name,age,date_of_visit,time_of_visit,assistant,comments } = request.body;
  const  visitor = await db.addNewVisitor(full_name,age,date_of_visit,time_of_visit,assistant,comments);

  response.status(200).send(JSON.stringify(visitor));
  response.end();
});

app.get('/viewVisitor/:id',async (request,response)=>{
  const visitor = await db.viewVisitor(request.params.id);
  response.send(JSON.stringify(visitor));
  response.end();
  
});

app.get('/viewVisitors',async(request,response)=>{
  const visitor = await db.viewAllVisitors();
  response.send(JSON.stringify(visitor));
  response.end();
});

app.put('/updateVisitor/:id',async (request,response)=>{
  let  { id,updateName, age, timeOfVisit, dateOfVisit, personWhoAssisted, comments  } = request.body;
  
  const visitor = await db.updateVisitor(id,updateName, age, timeOfVisit, dateOfVisit, personWhoAssisted, comments);
  response.send(JSON.stringify(visitor));
  response.end();
});

app.delete('/deleteVisitor/:id',async(request,response)=>{
  const visitor = await db.deleteVisitor(request.params.id);
  response.send(JSON.stringify(visitor));
});

app.delete('/deleteVisitors',async(request,response)=>{
  const visitor = await db.deleteAllVisitors();
  response.send(JSON.stringify(visitor));
  response.end();
});


const server = app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
module.exports = server;