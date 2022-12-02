const {Router} = require ('express');
const  { default: axios } = require ('axios');
const { Country, Activity } = require ('../db.js');
const {Op} = require ('sequelize')
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

//------------------------------------------------------
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

//-------------------------------------------------


const cargodatos = async ()=>{
    await cargaBD();
}

cargodatos();


//---------------------------------------------------


countryRouter.get('/', async (req, res)=>{

    const name = req.query.name

    try {
        if(!name){
            const countries = await Country.findAll({
                include:[{
                    model: Activity,
                    attributes: ['name', 'difficulty', 'duration', 'season',],
                    through: {attributes:[]}
                }]
            })

            if(countries){
                return res.status(200).json(countries);
            }else{
                return res.status(404).send('Error de paises line 74')
            }
        }else{
            const country = await Country.findAll({
                where:{
                    name: {[Op.substring]: name}
                },
                include:[{
                    model: Activity,
                    attributes:['name', 'difficulty', 'duration', 'season'],
                    through:{attributes:[]}
                }]
            })

            if(country){
                return res.status(200).json(country);
            }else{
                return res.status(404).send('Error de paises line 91')
            }
        }
        
    } catch (error) {
        console.log(error)
        
    }

})

countryRouter.get('/:idPais', async(req, res)=>{
    const idPais = req.params.idPais

    try {
        const country = await Country.findOne({
            where:{
                id: idPais.toUpperCase()
            },
            include: [{
                model: Activity,
                attributes:['name', 'difficulty', 'duration', 'season'],
                through: {attributes:[]}
            }]
        })
        if(country){
            return res.status(200).json(country);
        }else{
            return res.status(404).send('Error line 119')
        }
    } catch (error) {
        console.log(error)
        
    }
});



module.exports = countryRouter; 




