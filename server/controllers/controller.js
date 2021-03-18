const {Question} = require('../models/index')

class Controller{
  static fetchData(req,res,next){
    Question.findAll()
      .then((result) => {
        res.status(200).json(result)
      }).catch((err) => {
        res.status(500).json(err)
      });
  }

  static getData(req,res,next){
    const id = +req.params.id
    Question.findByPk(id)
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static getAnswer(req,res,next){
      const answer = req.body.answer
      Question.findOne({
          where:{
              answer
          }
      })
      .then(data =>{
          res.status(200).json(data)
      })
      .catch(err =>{
          console.log(err);
          res.status(404).json(err)
      })
  }
}

module.exports = Controller