const { searchIt} = require('../func')
const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const request = require("request")
var validator = require('validator');

const veiwsFolder = path.join(__dirname, '../templates/views')
app.set('views', veiwsFolder)

const partialsFolder = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsFolder)

app.set('view engine', 'hbs')
const newPathToPublicFolder = path.join(__dirname, '../public/')

app.use(express.static(newPathToPublicFolder))


app.get('/',(req,res)=>{
    res.render('home')
})

app.get('/search',  (req,res)=>{
    console.log(req.query.word)
    if (req.query.word != undefined){
    const isA = validator.isAlpha(req.query.word)
    const word = req.query.word
        if (!isA  ){
            searchIt(res, '')  
        }else{
            searchIt(res, word.toLowerCase()) 
        }
    }else{
        res.send({error:{Code:'WordKeyIsInvalid',Message:'Word key is not Available'}})
    }

})


app.get('*', (req, res) => {
    res.send('No page')
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Listening to port ${port} done!!`)
})

// if(process.argv.length == 2){
//     searchIt('')     
// }else{
// //    console.log(process.argv[2])
//    const d =  searchIt(process.argv[2])
//    console.log(d+' d')
// }



