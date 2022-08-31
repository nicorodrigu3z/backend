const fs = require('fs')


class Contenedor{
    constructor(name){
        this.name = name
    }

     async Save (informacion){
        

        try{
           let contenido = await fs.promises.readFile(`./${this.name}`,'utf-8')
           let contenidojson = JSON.parse(contenido)
           let ultimoIndice = contenidojson.length - 1
           let ultimoId = contenidojson[ultimoIndice].id
           informacion.id = ultimoId + 1
           let id = informacion.id
           contenidojson.push(informacion)
           await fs.promises.writeFile(`./${this.name}`, JSON.stringify(contenidojson))
           return id
        }
        catch(error){
            console.log(error)
        }
        
    }

     async GetById(id){
      try{
         let contenido = await fs.promises.readFile(`./${this.name}`, 'utf-8')
         let contenidoJson = JSON.parse(contenido)
         let contenidoExtraidoDelArray
         contenidoJson.array.forEach(element => {
            if(element.id == id){
                contenidoExtraidoDelArray = element
            }
         });

        return contenidoExtraidoDelArray
        }
      catch{
        console.log(error)
      }
    }
    
    async GetAll(){
        try{
            let contenido = await fs.promises.readFile(`./${this.name}`, 'utf-8')
            let contenidoJson = JSON.parse(contenido)
            return contenidoJson
        }
        catch{
            console.log(error)
        }
    }
    
    DeleteById(id){

    }

    DeleteAll(){

    }
}

let Contenedor = new Contenedor("productos.json")
 
let informacioNueva = {
        "id":1,
        "title":"Boligoma",
        "price": 123
    }


Contenedor.Save(informacioNueva).then(res => {
    console.log(res);
})

Contenedor.GetById(2).then(res =>{
    console.log(res)
})

 Contenedor.GetAll().then(res =>{
    console.log(res)
})