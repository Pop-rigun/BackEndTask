const router = require('express').Router()
const db = require('./db')



router.get("/:firstName",async (req, res) => {
    try {
      const userName = await db.findByName(req.params.firstName)
      res.json(userName)
  
    } catch (e) {
      res.status(500).json({ error: "Что-то пошло не так, попробуйте снова" })
    }
  })

module.exports = router