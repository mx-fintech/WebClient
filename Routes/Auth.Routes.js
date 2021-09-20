
module.exports = router=>{

    router.get('/signin', (req, res)=>{
        res.render('login',{
            title:"Login"
        })
    })

    return router
}