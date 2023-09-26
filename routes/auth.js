const express = require('express')
const router = express.Router()
const auth_control = require('../controller/auth_control')

router.post('/register',auth_control.register)
router.post('/login',auth_control.login)
module.exports =  router