const router = require('express').Router()
const book = require('../controllers/Books')

router.get('/', book.GetAllBook )
router.post('/', book.AddNewBook )
router.get('/:id', book.GetBookById )
router.put('/:id', book.UpdateBookById )
router.delete('/:id', book.DeleteBookById )


module.exports = router