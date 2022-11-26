const {Router} = require ('express');
const  { default: axios }= require ('axios');
const { json } = require('body-parser');

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



countryRouter.get('/', async (req, res)=>{

    const x = await getApi();

    res.status(200).send(x);
})



module.exports = countryRouter; 




