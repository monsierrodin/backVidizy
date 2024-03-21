
const routes =require("./routes/routes.js") ;
const Db =require("./db/db.js") ;
const User=require("./models/user.js") 
const bcrypt= require("bcrypt") ;
const  express= require('express');
const bodyParser=require('body-parser');
const { v4: uuidv4 } = require('uuid');
const monUUID = uuidv4(); 
const cors =require('cors') 
const path=require('path')
const app = express()



const http = require('http');
const socketIo = require('socket.io');
app.use(cors());
app.use(bodyParser.json());
app.use(cors());
app.use(routes);

const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

Db.sync()
    .then(()=>console.log("Votre base de  données se marche bien"))
    .catch(()=>console.log("tsy madeh base eh"));

app.get('/', (req, res) => {
    res.send('Le serveur vous repond  ');
  });
app.use('/uploads/',express.static(path.join(__dirname,'uploads')));
//creer super utilisateur

const port = 3012;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
