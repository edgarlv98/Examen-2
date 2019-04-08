const request = require('request')

const metfun = function(obj, callback){
    const url = 'https://collectionapi.metmuseum.org/public/collection/v1/search?q='+obj
    request({url, json: true}, function(error, response){
        const data = response.body
        if(error){
            callback("Fuera de servicio", undefined)
        } else if(data.total == 0){
            callback("No existen obras con ese nombre, favor de tratar nuevamente")
        } else{
            const info = {
                id: data.objectIDs[0]
            }
            callback(undefined, info)
        }
    })
}

const metObj = function(id, callback){
    const url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/'+id
    request({url, json: true}, function(error, response){
        const data = response.body
        if(error){
            callback("Fuera de servicio", undefined)
        } else if(data.message == "ObjectID not found"){
            callback("ObjectID not found", undefined)
        } else if(data.constituents == null){
            const info = {
                message: 'No se econtro constituents, pero se puedo recabar la siguiente informacion',
                title: data.title,
                year: data.objectEndDate,
                technique: data.medium,
                metUrl: data.objectURL
            }
            callback(undefined, info)
        }
         else{
            const info = {
                artist : data.constituents[0].name,
                title: data.title,
                year: data.objectEndDate,
                technique: data.medium,
                metUrl: data.objectURL
            }
            callback(undefined, info)
        }
    })
}

module.exports = {
    metfun: metfun,
    metObj: metObj
}