import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Users from './Model/dbUsers.js';
import { EmailSharp } from '@mui/icons-material';
import verif from './verifyToken.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ silent: process.env.NODE_ENV === 'production' });

const app = express();
const port = process.env.PORT;

const connect_db = 'mongodb+srv://randy:1234@powermeter.kpsvf.mongodb.net/testPowerMeter?retryWrites=true&w=majority'


//Middleware
app.use(express.json());
app.use(cors());


//DB config
mongoose.connect(connect_db,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//API endpoints
app.get('/rooot', verif, (req,res) => {
    res.json({"nama":"woi"})
})

//getting data from FE register
app.post('/register', (req,res) => {
    const dbUser = req.body
    Users.find({email: dbUser.email}, (err,data) =>{
        if(err){
            res.status(500).send(err)
        }
        if(data.length > 0){
            res.status(201).send({message: 'Email sudah digunakan, mohon gunakan email lain'})
        }else{
            Users.create(dbUser, (err,data) => {
                if(err){
                    res.status(500).send(err)
                }
                    res.status(201).send(data) //sending back to FE
                    console.log('User berhasil ditambah!');
            })
        }
    })
});


//getting data from FE login
app.post('/login', (req,res) => {
    const emails = req.body.username //getting data from FE
    const password = req.body.password //getting data from FE

    Users.find({email: emails}, (err,data) => {
        if(err){
            res.status(201).send({message: "wrong email/password!"}, {status: 2}) //sending back to FE
        }
        if(data.length > 0){ //if there is data
            if(data[0].password == password){ //checking if input password is correct compared to password in db 
                
                //JWT for authentication
                const accessToken = jwt.sign({_id: data[0]._id.toString()}, process.env.ACCESS_TOKEN_SECRET)
                res.header('authtoken',accessToken) //inspect element > network

                res.status(201).send({status: 1, username: data[0].firstname + ' ' + data[0].lastname, access:accessToken}) //sending back to FE
                }else{ //if email correct but wrong password
                    res.status(201).send({status: 2, messages: 'Email atau password salah!'} ) //sending back to FE
                }
        } else { //if there is no data at all
            res.status(201).send({status: 2, messages: 'Email atau password salah!'}) //sending back to FE
        }
    })
});

//putting paper name
app.get('/dashboard/user',verif, (req,res) => {
    const finduser = req.user;
    Users.findById(finduser._id,(err,data) => {
        if(err){
            res.status(500).send(err)
        } else {
            res.status(201).send(data);
        }
    })
});

//GET all user
app.get('/api/users', (req,res) => {
    Users.find((err,data) => {
        if(err){
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })

    console.log('Berhasil');
});

//GET user by name
app.get('/api/users/:name', (req,res) => {
    Users.find( { firstname: req.params.name}, (err,data) => {
        if(err){
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
            console.log(data[0].email) //get email from id
        }
    })

    console.log('Berhasil');
});


//Starting
app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});