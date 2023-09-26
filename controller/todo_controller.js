const prisma = require('../model/prisma')

exports.createTodo = async (req,res,next) =>{
try{
    const {title,completed,due_date} = req.body
    await prisma.todo.create({
        data:{
            title,
            completed,
            dueDate: due_date,
            userId:req.user.id
        }
    })


    res.json({msg:"created"})
}
catch(err){
console.log(err)
}
}