module.exports = (sequelize, DataTypes) =>{
    const Course = sequelize.define("Grades", {
        
        course: {
            type: DataTypes.STRING, 
            allowNull:false,
        },
    })

    return Course
}