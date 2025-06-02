const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const UserModel = require('./models/User')

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

const allowedOrigins = [
    process.env.FRONTEND_BASEURL?.trim(), 
    'http://localhost:5173',
    "https://typing-mind-clone-ypii.vercel.app",
    "https://typing-mind-clone-mu.vercel.app",
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.error('Blocked by CORS:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

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
            } else {
                res.json("No record existed. Try Signup!!")
            }


        })

})

app.use('/api/models', require('./routes/modelRoutes'));
app.use('/api/plugins', require('./routes/pluginRoutes'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
