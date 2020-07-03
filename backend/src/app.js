const express = require('express');
const cors = require('cors');
const app = express();
const AuthController = require('./controllers/authController');


// settings
app.set('port',process.env.SERVER_PORT);

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use('/api/users', require('./routes/users'));
app.use('/api/rooms', require('./routes/rooms'));
app.post('/api/login',async (req,res) => {
    const response = await new AuthController().findUserAndLogin(req);
    res.json(response);

});

app.get('/api/protected',async(req,res)=> {
        res.json(await new AuthController().verifyToken(req));
    }
);

app.get('/',(req,res) => res.send('Tito el Bambino'));

module.exports = app;