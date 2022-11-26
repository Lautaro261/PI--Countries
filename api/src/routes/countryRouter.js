const {Router} = require ('express');
const  { default: axios } = require ('axios');
const { Country, Activity } = require ('../db.js')
const countryRouter = Router();




 const getApi = async ()=>{
    const apiData = await axios.get('https://restcountries.com/v3/all')
    const arrayPais = apiData.data.map(i=>{
        const country = {
            id: i.cca3,
            name: i.name.common,
            image: i.flags[1],
            continent: i.continents[0],
            capital: i.capital !=null? i.capital[0]: 'No tiene capital',
            subregion: i.subregion,
            area: i.area,
            population: i.population,
        }
        return country;
    }); 

    return arrayPais;
}; 


const cargaBD = async ()=>{

    try {
        const countries = await Country.findAll();
        if(!countries.length){
            const array = await getApi();
            await Country.bulkCreate(array);
        }
    } catch (error) {
        console.log(error)
        
    }

};




const cargodatos = async ()=>{
    await cargaBD();
}

cargodatos();



countryRouter.get('/', async (req, res)=>{

    const x = await getApi();
    res.status(200).send(x);
})



module.exports = countryRouter; 




