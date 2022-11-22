const { DataTypes } = require('sequelize');

module.exports = (sequelize)=> {

    sequelize.define('activity',{
        id:{ 
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        difficulty:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5,
                isEven(value){
                    if(value<1 || value>5){
                        throw new Error ('El valor debe ser entre 1 y 5')
                    }
                }
            }
        },
        duration:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        season:{
            type: DataTypes.ENUM('verano', 'otoño', 'invierno', 'primavera'),
            allowNull:false,
        },
    },{
        timestamps:false 
      });
}