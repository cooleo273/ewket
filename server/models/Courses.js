module.exports = (sequelize, DataTypes) =>{
    const Courses = sequelize.define("Courses", {
        
        course: {
            type: DataTypes.STRING, 
            allowNull:false,
        },
    })

    return Courses
}