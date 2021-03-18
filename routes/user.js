const router = require('express').Router()
const user = require('../controllers/User')
const authUser = require('../controllers/Auth')

// other
router.get('/', user.GetAllUser )
router.post('/', user.RegisterUser )
router.get('/:id', user.GetUserById )
router.put('/:id', user.UpdateUserById )
router.delete('/:id', user.DeleteUserById )

// auth
router.post('/getToken', authUser.GetToken ) // login
router.post('/refreshToken', authUser.RefreshToken ) // get refresh token



module.exports = router