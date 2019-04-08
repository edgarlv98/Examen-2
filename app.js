const path = require('path')
const express = require('express')
const app = express()
const met = require('./met.js')

const port = process.env.PORT || 3000;

const publicDir = path.join(__dirname, 'public')
app.use(express.static(publicDir))

app.get('/students/:id', function(req, res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    if(!req.params.id){
        return res.send({
            error: 'Tienes que dar una matricula valida'
        })
    }
    if(req.params.id = 'A01039505'){
        return res.send({
            id: 'A01039505',
            fullname: 'Edgar López Villarreal',
            nickname: 'no tengo',
            age: '21'
        })
    }
    else{
        return res.send({
            error: 'Tienes que dar una matricula valida'
        })
    }

})

app.get('/met', function(req, res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    if(!req.query.search){
        return res.send({
            error: 'Favor de introducir una busqueda'
        })
    }
    met.metfun(req.query.search, function(error, response){
        if(error){
            return res.send({
                error: error
            })
        }
        const obj = req.query.search
        const id = response.id
        met.metObj(id, function(error, response){
            if(error){
                res.send({
                    error: error
                })
            }
            res.send({
                searchTerm: obj,
                artist: response.artist,
                title: response.title,
                year: response.year,
                technique: response.technique,
                metURL: response.metURL
            })
        })
    })
})

app.get('*', function(req, res){
    res.send({
        error: "No existe esa ruta"
    })
})

app.listen(port, function(){
    console.log('up and running')
})