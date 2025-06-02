const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const UserModel = require('./models/User')

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());


app.post('/api/register', (req, res) => {
    UserModel.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.json(err))
})

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("Success")
                } else {
                    res.json("The Password is incorrect")
                }
            }else{
                res.json("No record existed")
            }


        })

})

app.use('/api/models', require('./routes/modelRoutes'));
app.use('/api/plugins', require('./routes/pluginRoutes'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
