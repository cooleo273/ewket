module.exports = (sequelize, DataTypes) =>{
    const Grades = sequelize.define("Grades", {
        
        grade: {
            type: DataTypes.STRING, 
            allowNull:false,
        },
    })

    return Grades 
}