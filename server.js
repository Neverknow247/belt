const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");

app.use(cors());

require("./server/config/mongoose.config");

app.use(express.json(), express.urlencoded({extended: true}));

const AllMyRoutes = require("./server/routes/pets.routes");
AllMyRoutes(app);

const server = app.listen(port, () => console.log(`Listening on port: ${port}`));

const io = require('socket.io')(server, {cors:true});

io.on("connection", socket =>{
    socket.on("event_from_client", data => {
        socket.broadcast.emit("send_data_to_all_other_clients", data);
    });
});