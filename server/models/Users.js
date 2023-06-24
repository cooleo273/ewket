const { Sequelize } = require(".")

module.exports = (sequelize, DataTypes) =>{
    const Users = sequelize.define("Users", {
        first_name: {
            type: DataTypes.STRING,
            allowNull:false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull:false,
        },
        username:{
            type:DataTypes.STRING,
            allowNull:false,

        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        role:{
          
                type: DataTypes.ENUM(['student', 'teacher', 'admin']),
                allowNull: false,
            
        },
        gender:{
            type: DataTypes.ENUM(['male','female']),
            allowNull: false,
        }
    })
    Users.associate = (models) =>{
        Users.hasMany(models.Grades),{
            onDelete:  "cascade",
        }
    }
    
    

    return Users
}