const router = require('express').Router()

// route: /api/

router.get('/ping', (req, res) => {
  res.status(200).json({ message: 'pong' })
})

module.exports = router
