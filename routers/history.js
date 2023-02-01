const router = require('express').Router()
const HistoryController = require('../controllers/historyController')

router.get('/', HistoryController.readHistories)

module.exports = router