
//////////////////////////////////ПОМІНЯТИ ВМІСТ ПАПОК МІЖ СОБОЮ////////////////////////////////////////////////////////
let fs = require('fs');
let path = require('path')

// let link1 = path.join(__dirname, "February2021","20_00")
// let link2 = path.join(__dirname,"February2021", "18_00")
//
//
//  fs.readdir(link1, (err, files) => {
//      if (err) {
//          console.log('-------')
//          return
//      }
//    files.forEach(value => {
//        fs.rename(path.join(link1,value),path.join(link2,value),(err)=>{
//          if(err){
//              console.log('-----')
//          }
//        })
//
//    })
//  })
//
//  fs.readdir(link2, (err, files) => {
//      if (err) {
//          console.log(err)
//          return
//      }
//      files.forEach(value => {
//          fs.rename(path.join(link2,value), path.join(link1,value), (err1) => {
//              if (err1) {
//                  console.log(err1)
//              }
//          })
//      })
//  })

////////////////////////////ПЕРЕМІСТИТИ ЮЗЕРІВ ПО ПАПКАХ, ЯКІ ВІДПОВІДАЮТЬ ЇХНІЙ СТАТІ//////////////////////////////////
let json;
let obj;
let link=path.join(__dirname, "February2021")
fs.readdir(link, (err, directories) => {
    if (err) {
        console.log('-------')
        return
    }
    console.log(directories)
    directories.forEach(directory => {
        fs.readdir(path.join(link, directory ), ((err1, files) => {
            if (err) {
                console.log('-------')
                return
            }
            files.forEach(file => {
                    fs.readFile(path.join(link, directory, file), ((err2, data) => {
                        console.log(path.join(link, directory, file))
                        json = data.toString();
                        obj = JSON.parse(json)
                        console.log(obj)
                        if (obj.gender === 'male') {
                            fs.rename(path.join(link, directory, file), path.join(__dirname, 'boys', file), (err) => {
                                if (err) {
                                    console.log('-----')
                                }

                            })
                        } else if (obj.gender === 'female'){
                            fs.rename(path.join(link, directory, file), path.join(__dirname, 'girls', file), (err) => {
                                if (err) {
                                    console.log('-----')
                                }

                            })
                        }
                    }))
                }
            )
        }))
    })
})












