module.exports = (req,res,next) => {
    // throw new Error('test error middleware')
    res.status(404).json({msg:"resource not found on this server"})


}