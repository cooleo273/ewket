const express = require ('express');
const app = express();
const cors = require ('cors')

app.use(express.json());
app.use(cors());
const db = require('./models')




const GradesRouter = require('./routes/Grades')
app.use("/grades", GradesRouter)

const usersRouter = require('./routes/Users')
app.use("/auth", usersRouter)



const CourseRouter = require('./routes/Courses')
app.use("/courses", CourseRouter)


db.sequelize.sync().then(()=>{
   app.listen('3001', ()=>{
    console.log('server started on port 3001')
});
});



 







