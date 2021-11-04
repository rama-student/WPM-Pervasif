import jwt from 'jsonwebtoken';

export default function auth (req,res,next){
    const token = req.header('authtoken');
    if(!token){
        return res.status(401).send('Access Denied!');
    }
    try{
        const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); //decode token menjadi data awal (ID user karena dari server itu yg dikirimkan)
        req.user = verified; //mengirim ke server agar data id user bisa dipakai
        next();
    }catch(err){
        res.status(400).send('Invalid Token!');
    }
}