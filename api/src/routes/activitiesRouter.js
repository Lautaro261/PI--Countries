const {Router}=require('express');
const {Country, Activity}=require('../db.js');
const {Op}= require('sequelize');


const activityRouter = Router();


activityRouter.get('/', async(req, res)=>{
    const activities = await Activity.findAll();

    if(activities){
        return res.status(200).json(activities);
    }else{
        return res.status(404).json(activities.length? activities:'no hay actividades');

    }

});


activityRouter.post ('/', async(req, res)=>{

    try {
        const {id, name, difficulty, duration, season, } =req.body
        if(id && name && difficulty && duration && season ){
            const activity = await Activity.create({
                id,
                name,
                difficulty,
                duration,
                season,
            })

            countries.forEach(async (id)=> {
                const country = await Country.findOne({
                    where: {id: {[Op.iLike]: `%${id}%`}}
                })
                await country?.addActivity(activity);
                
            });

            return res.send(activity)
        }else{
            return res.status(404).json('Error actividad line 44')
        }

    } catch (error) {
        next(error)
        
    }
})


module.exports = activityRouter; 