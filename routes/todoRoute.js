const express = require('express')
const router = express.Router()
const todo_control = require('../controller/todo_controller')
const verify_token = require('../middlewares/token_verify')

router.use(verify_token)
router.post('/create',todo_control.createTodo)



module.exports =  routercr