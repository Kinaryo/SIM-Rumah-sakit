const express = require('express')
const router = express.Router();
const passport = require('passport')

const staffRawatInap = require('../models/staffRawatInap')
const staffAdminLoket = require('../models/staffAdminLoket')

router.get('/login', async (req, res) => {
    res.render('auth/login')
});

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: {
        type: 'error_msg',
        msg: 'Invalid Username or password'
    }
}), (req, res) => {
    req.flash('success_msg', 'You are logged in');
    res.redirect('/rawatinap/daftarPasien');
});

// Tambahkan penanganan kesalahan
router.post('/login', (err, req, res, next) => {
    console.error(err.message);
    req.flash('error_msg', 'An error occurred during login');
    res.redirect('/login');
});


module.exports = router