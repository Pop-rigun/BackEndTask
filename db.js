
const mysql = require("mysql2")
const { jsPDF } = require("jspdf")


const connection = mysql.createConnection({ //при необходимости изменить значения
    host: "localhost",
    database: "userdb",
    user: "root",
    password: "root"
  });


const startDB = () =>{
 connection.connect(function(err){
    if (err) {
      return console.error("Ошибка: " + err.message)
    }
    else{
      console.log("Подключение к серверу MySQL успешно установлено")
    }
 });
}

// создание pdf, расположение данных, сохранение в дб
function writePDF (result) { 
    let doc = new jsPDF()
    let imgData =Buffer.from(result[0]['image'], 'base64').toString()
    doc.setFontSize(40)
    doc.text(30, 20, result[0]['firstName'])
    doc.text(30, 50, result[0]['lastName'])
    doc.addImage(imgData, 'JPEG', 15, 60, 90, 80)
    connection.query(`update users set pdf = '${doc}' where firstName = '${result[0]['firstName']}'`, (err) => {
        if (err) {
            return console.error("Ошибка записи: " + err.message)
        }
    })
    // doc.save('test.pdf') для проверки
}

// поиск пользователя в дб
function findByName(userName) {
    return new Promise((resolve, reject) => {
        let temp = false
        connection.query(`select * from users where firstName = '${userName}'`, (err, result) => {
        if (err) {
          reject(err)
          return console.error("Ошибка поиска: " + err.message)
        }
        if (result[0] != undefined )
        {
            writePDF (result) 
            temp = true 
         }
        resolve(temp)
      })
    })
  }

module.exports = {findByName,startDB}
