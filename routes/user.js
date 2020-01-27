const express = require('express')
const router = express.Router();

//import controller
const { requireSignin, adminMiddleware } = require('../controllers/auth')
const { read, update, deleteUser, getAll, updateAdmin, deleteUserByAdmin } = require('../controllers/user')


router.get('/user/:id', requireSignin,  read );
router.put('/user/update', requireSignin,  update );
router.delete('/user/delete/:id', requireSignin, deleteUser );

router.get('admin/user', requireSignin, adminMiddleware, getAll );
router.put('/admin/update', requireSignin,  adminMiddleware, updateAdmin );
router.delete('/admin/user/delete/:id', requireSignin, adminMiddleware, deleteUserByAdmin)


module.exports = router;