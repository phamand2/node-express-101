const http = require('http')
const express = require('express')
const data = require('./data')

console.log(data)

const hostname = '127.0.0.1'
const port = 3000

const app = express()

const server = http.createServer(app)

app.get('/', (req,res)=>{
  res.send('<h1>Hello World</h1>')
})

app.get('/about', (req,res) => {
  res.send('<h1>About Page</h1>')
})

app.get('/friends', (req,res)=>{
  let friends = '';
  for (let index = 0; index < data.length; index++) {
    const friend = data[index];
    friends += `<li><a href="/friends/${friend.handle}">${friend.name}</a></li>`
    
  }
  res.send(`
  <ul>
    ${friends}
  </ul>
  `)
})

app.get('/friends/:handle', (req,res) => {
  const {handle} = req.params;
  const friend = data.find(element => {
    if (element.handle === handle){
      return true;
    }
    return false;
  })
  if(!friend) {
    res.status(404)
    res.send(`<h1>No friend found with handle: ${handle}</h1>`)
  } else{
    res.send(
      `<h1>${friend.name}</h1>
      <h3>${friend.handle}</h3>
      <p>${friend.skill}</p>
      `
    )
    
  }
})

app.get('*', (req,res) => {
  res.status(404).send('404 - page not found')
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})