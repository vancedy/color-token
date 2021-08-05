const axios = require('axios').default;

async function getImage(hex){
    try{
        const res = await axios.get(`https://singlecolorimage.com/get/${hex}/420x420`)
        console.log(res)
        res.data.pipe(fs.createWriteStream)
 
 
    } catch(error){
        console.error(error)
    }
}

getImage('#FFFFF')