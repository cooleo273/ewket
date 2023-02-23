
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
        }
    })
    Users.associate = (models) =>{
        Users.hasMany(models.Grades),{
            onDelete:  "cascade",
        }
    }
    
    

    return Users
}