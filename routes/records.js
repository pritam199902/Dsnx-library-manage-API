const router = require('express').Router()
const records = require('../controllers/Records')
// middleware
const {isLibrarian, isNotLibrarian, isLoggedIn, isNotLoggedIn} = require('../middleware/checkUser')

router.get('/', isLoggedIn, records.GetAllRecord )
router.post('/', isLoggedIn,isLibrarian, records.AddNewRecord )
router.get('/:id',isLoggedIn, records.GetRecordById )
router.put('/:id',isLoggedIn,isLibrarian, records.UpdateRecordById )
router.delete('/:id',isLoggedIn,isLibrarian, records.DeleteRecordById )


module.exports = router