const router = require('express').Router()
const records = require('../controllers/Records')

router.get('/', records.GetAllRecord )
router.post('/', records.AddNewRecord )
router.get('/:id', records.GetRecordById )
router.put('/:id', records.UpdateRecordById )
router.delete('/:id', records.DeleteRecordById )


module.exports = router