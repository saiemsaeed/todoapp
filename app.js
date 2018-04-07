const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),    
    PORT = process.env.PORT || 3000,
    todoRoutes = require('./routes/todos');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + "/views/"));
app.use(express.static(__dirname + "/public/"));

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.use('/api/todos', todoRoutes);

app.listen(PORT, () => {
    console.log("SERVER IS LISTENING ON PORT", PORT);
});
