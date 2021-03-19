const { Question } = require('../models/index')

class Controller {
  static fetchData(req, res, next) {
    Question.findAll()
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        res.status(500).json(err)
      })
  }

  static getData(req, res, next) {
    const id = +req.params.id
    Question.findByPk(id)
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        res.status(500).json(err)
      })
  }

  static getAnswer(req, res, next) {
    let answer = req.body.answer
    let answerUpper = answer.toUpperCase()
    const id = req.body.id
    Question.findOne({
      where: {
        id,
        answer: answerUpper,
      },
    })
      .then((data) => {
        if (!data) throw new Error()
        else res.status(200).json(data)
      })
      .catch((err) => {
        res.status(404).json(err)
      })
  }
}

module.exports = Controller
