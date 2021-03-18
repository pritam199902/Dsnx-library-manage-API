const router = require('express').Router()
const pay = require('../controllers/Payment')

router.get('/', pay.GetAllPayment )
router.post('/', pay.AddNewPayment )
router.get('/:id', pay.GetPaymentById )
router.put('/:id', pay.UpdatePaymentById )
router.delete('/:id', pay.DeletePaymentById )


module.exports = router