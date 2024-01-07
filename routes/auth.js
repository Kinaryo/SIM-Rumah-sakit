const express = require('express')
const router = express.Router();

const staffRawatInap = require('../models/staffRawatInap')

router.get('/register', async (req, res) => {
    res.render('auth/register')
});

router.post('/register', async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const staff = new staffRawatInap({ email, username });
        const registeredStaff = await staffRawatInap.register(staff, password);

        if (registeredStaff) {
            console.log('Registrasi berhasil:', registeredStaff);

            // Set pesan flash sukses dan redirect ke dashboard
            req.flash('success_msg', 'Berhasil menambahkan data');
            res.redirect('/rawatinap/dasboard');
        } else {
            console.log('Registrasi gagal');
            req.flash('error_msg', 'Gagal menambahkan data');
            res.redirect('/rawatinap/dasboard'); // Redirect ke halaman registrasi jika registrasi gagal
        }
    } catch (error) {
        console.error('Terjadi kesalahan:', error);
        req.flash('error_msg', 'Terjadi kesalahan saat registrasi');
        res.redirect('/rawatinap/dasboard'); // Redirect ke halaman registrasi jika terjadi kesalahan
    }
});

module.exports = router