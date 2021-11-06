import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Users from './Model/dbUsers.js';
import Datas from './Model/dbDatas.js';
import awsIot from 'aws-iot-device-sdk';
import verif from './verifyToken.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ silent: process.env.NODE_ENV === 'production' });

const app = express();
const port = process.env.PORT;

const connect_db = 'mongodb+srv://randy:1234@powermeter.kpsvf.mongodb.net/testPowerMeter?retryWrites=true&w=majority'

var topic = '$aws/things/wpmbroker/shadow/name/datas';


//connecting to broker
var devices = awsIot.thingShadow({
    keyPath : '../certs/ecac49f2c7a9fd13f407919bb4c8b47b6d5bdd12489a76856d89a3d572405203-private.pem.key',
    certPath: '../certs/ecac49f2c7a9fd13f407919bb4c8b47b6d5bdd12489a76856d89a3d572405203-certificate.pem.crt',
    caPath: '../certs/AmazonRootCA1.pem',
    clientId : 'wpmbroker',
    host : 'a2hssfdpz59n4-ats.iot.ap-southeast-1.amazonaws.com',
});

devices.on('connect', () =>{
    console.log('connected to broker');
    devices.subscribe(topic); //getting data from broker and pass it to line 22 'message'
    // devices.publish('$aws/things/wpmbroker/shadow/name/temp', JSON.stringify({ test_data: 1})); //sending data to broker
})
//end from connecting to broker

//Middleware
app.use(express.json());
app.use(cors());


//DB config
mongoose.connect(connect_db,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

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
                    console.log(data);
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
                const accessToken = jwt.sign({_id: data[0]._id.toString(), deviceid: data[0].deviceID[0]}, process.env.ACCESS_TOKEN_SECRET)
                res.header('authtoken',accessToken) //inspect element > network
                res.status(201).send({status: 1, userid: data[0]._id.toString(), username: data[0].firstname + data[0].lastname, access:accessToken, deviceid: data[0].deviceID}) //sending back to FE
                
                // mengambil data dari broker (subscribe)
                devices.on('message', (topic, message) => {
                    message = JSON.parse(message)
                    //memasukan data ke mongodb
                    var datas = {
                        deviceID: message.deviceID,
                        sensor: message.sensor,
                        temperature: message.temperature,
                        humidity: message.humidity,
                    }
                    Datas.create(datas, (err,data) => {
                        if(err){
                            res.status(500).send(err)
                        }
                        console.log('data ditambah')
                    })
                })
            }else{ //if email correct but wrong password
                    res.status(201).send({status: 2, messages: 'Email atau password salah!'} ) //sending back to FE
                }
        } else { //if there is no data at all
            res.status(201).send({status: 2, messages: 'Email atau password salah!'}) //sending back to FE
        }
    })
});

app.get('/data', verif, (req,res) => {
    const finddata = req.user;
    Datas.find({deviceID: finddata.deviceid},(err,data) => {
        if(err){
            res.status(500).send(err)
        } else {
            res.status(201).send({temperature: data[0].temperature, humidity: data[0].humidity})
        }
    }).sort({$natural:-1}).limit(1)
})

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

//Mengecek jika user memiliki device/tidak
app.get('/checkDevice',verif, (req,res) => {
    const datas = req.user
    Users.findById(datas._id, (err,data) => {
        if(data.deviceID.length > 0){
            res.status(201).send({device: data.deviceID, username : data.firstname + data.lastname})
        }else{
            res.status(201).send({device: null})
        }
    })
})

//Memasukan device dari FE /inputdevice
app.post('/addDevice',verif, (req,res) => {
    const data = req.user;
    Users.findById(data._id, (err,data) =>{
        if(err){
            res.status(500).send(err)
        }else{
            if(data.deviceID.length === 0){ //jika user belum memiliki device sama sekali
                Users.findOneAndUpdate(
                    {_id: data._id.toString()},
                    { $push: { deviceID: req.body.idDevice } },
                function(err, data){
                    console.log('aaa')
                    if(err){
                        res.status(500).send(err)
                    }else{
                        res.status(200).send({message: 'Device berhasil ditambahkan', status: 1, email: data.email, password: data.password})
                    }
                }
                )
            } else{
                //mencegah id yang sama untuk masuk
                let temp = 0;
                for(let i = 0; i < data.deviceID.length; i ++){
                    if(data.deviceID[i] === req.body.idDevice){
                        temp = temp + 1;
                    }
                }

                //jika device sudah pernah terdaftar
                if(temp > 0){
                    res.status(200).send({message: 'Device sudah pernah terdaftar!', status: 0})
                }else if(temp === 0){ //jika user sudah memiliki device namun id device yg didaftarkan belum terdaftar
                    Users.findOneAndUpdate(
                        {_id: data._id.toString()},
                        { $push: { deviceID: req.body.idDevice } },
                    function(err, data){
                        if(err){
                            res.status(500).send(err)
                        }else{
                            res.status(200).send({message: 'Device berhasil ditambahkan', status: 1, email: data.email, password: data.password})
                        }
                    }
                    )
                }
            }
        }
    })
})

//Starting the server
app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});