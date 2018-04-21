const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),    
    PORT = process.env.PORT || 3000,
    auth = require('./middleware/auth')
    todoRoutes = require('./routes/todos'),
    userRoutes = require('./routes/users');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => {
    res.send('Hello!');
});

app.use('/api/todos', todoRoutes);

app.use('/api/users', userRoutes);

app.use('*', (req, res) => res.status(404).send())

app.listen(PORT, () => {
    console.log("SERVER IS LISTENING ON PORT", PORT);
});
