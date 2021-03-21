const router = require('express').Router()
const book = require('../controllers/Books')
const {isLibrarian, isNotLibrarian, isLoggedIn, isNotLoggedIn} = require('../middleware/checkUser')


router.get('/', isLoggedIn, book.GetAllBook )
router.post('/', isLoggedIn,isLibrarian, book.AddNewBook )
router.get('/:id',isLoggedIn, book.GetBookById )
router.put('/:id',isLoggedIn,isLibrarian, book.UpdateBookById )
router.delete('/:id',isLoggedIn,isLibrarian, book.DeleteBookById )


module.exports = router