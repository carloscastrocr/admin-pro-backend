const jwt = require('jsonwebtoken')


const validarJWT = (req, res, next)=>{
    //Leer Token
    const token = req.header('x-token');

   // console.log(token);

    if(!token){
        return res.status(401).json({
            ok:false,
            msg: 'No hay token en la petición'
        })
    }

    try{
        
        const {uid} = jwt.verify(token, process.env.JWT_SECRET);
        // asi puedo compartir información en cada una de las peticiones
        req.uid = uid;

        next();
        
    }catch(error){
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
    }

}

module.exports = {
    validarJWT
}