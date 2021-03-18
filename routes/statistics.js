const router = require('express').Router()
const statistics = require('../controllers/Statistics')

router.get('/', statistics.Statistics )

module.exports = router