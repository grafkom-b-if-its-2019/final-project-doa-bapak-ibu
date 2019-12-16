var express = require('express')
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var uuid = require('uuid/v1');

app.get('/',(req, res)=>{
     res.sendFile(__dirname + '/pages/index.html');
});

app.post('/waiting',(req, res)=>{
     res.sendFile(__dirname + '/pages/waiting.html');
});

app.post('/',(req, res)=>{
     res.sendFile(__dirname + '/pages/multi.html');
});

app.post('/single',(req, res)=>{
     res.sendFile(__dirname + '/pages/single.html');
});

app.post('/game_single',(req, res)=>{
     res.sendFile(__dirname + '/pages/game_single.html');
});

app.post('/game',(req, res)=>{
     res.sendFile(__dirname + '/pages/game.html');
});

app.use(express.static('public'));

mysocketID = 0;
waitingQueue = [];
players = {};
rooms = {};

io.on('connection', function(socket){
     console.log('a user connected');
     mysocketID = socket.id;

     socket.on('chat message', function(msg){
          // io.emit('chat message', msg);
          io.to(`${mysocketID}`).emit('chat message', msg);
     });

     socket.on('chat message', (msg)=>{
          console.log('message : '+msg);
     })

     socket.on('waiting', function(){
          players[socket.id] = {
               playerID: socket.id,
               room: null
          };
          if( Array.isArray(waitingQueue) && waitingQueue.length ){
               var roomID = uuid();
               
               var enemy = waitingQueue.pop(0);
               
               players[enemy] = {
                    playerID: enemy,
                    room: roomID
               };
               players[socket.id].room = roomID;

               rooms[roomID] = {
                    players: [socket.id, enemy]
               }

               rooms[roomID].players.forEach(player => {

                    io.to(`${player}`).emit('enemy found', roomID);
                    // socket.broadcast.to(player).emit('enemy found', roomID);
               });
          }else{
               console.log(`Client: ${socket.id}`);
               waitingQueue.push(socket.id);
          }
     });

     socket.on('announce', function (room, socket_id) {
          console.log("announce - from - client");
          rooms[room].players.forEach(player => {
               if(player !== socket_id)
                    io.to(`${player}`).emit('announce-client', "hai from server");
               // socket.broadcast.to(player).emit('enemy found', roomID);
          });
     });

     socket.on('disconnect', function(){
          console.log('user disconnected');
          try {
               delete players[socket.id];    
          } catch (error) {}
     });

     
});

http.listen(3001, ()=>{
     console.log('listening on *:3001');
});

setInterval(function() {
     console.log(rooms);
}, 3000)