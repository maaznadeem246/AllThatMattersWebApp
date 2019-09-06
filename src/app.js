const { detailss} = require('../func')
const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const request = require("request")

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

app.get('/search',(req,res)=>{
    
})


app.get('*', (req, res) => {
    res.send('No page')
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Listening to port ${port} done!!`)
})

// if(process.argv.length == 2){
//     detailss('')     
// }else{
// //    console.log(process.argv[2])
//     detailss(process.argv[2])
// }



