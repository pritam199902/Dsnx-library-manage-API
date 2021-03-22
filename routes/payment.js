const router = require('express').Router()
const pay = require('../controllers/Payment')
// middleware
const {isLibrarian, isNotLibrarian, isLoggedIn, isNotLoggedIn} = require('../middleware/checkUser')


router.get('/',isLoggedIn, pay.GetAllPayment )
router.post('/',isLoggedIn,isLibrarian, pay.AddNewPayment )
router.get('/:id',isLoggedIn, pay.GetPaymentById )
router.put('/:id',isLoggedIn, isLibrarian,pay.UpdatePaymentById )
router.delete('/:id', isLoggedIn,isLibrarian, pay.DeletePaymentById )


module.exports = router