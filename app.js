const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),    
    PORT = process.env.PORT || 3000,
    todoRoutes = require('./routes/todos');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send("This is from ROOT Route");
});

app.use('/api/todos', todoRoutes);

app.listen(PORT, () => {
    console.log("SERVER IS LISTENING ON PORT", PORT);
});
