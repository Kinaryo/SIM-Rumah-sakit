const express = require('express')
const router = express.Router();

const staffAdminLoket = require('../models/staffAdminLoket')
const staffRawatInap = require('../models/staffRawatInap')
const perawat = require('../models/perawat')

// routes/admin.js

router.get('/dasboard', (req, res) => {
    // Misalkan Anda ingin menampilkan pesan jika tidak ada staff terdaftar
    const registeredStaff = null; // Anda dapat mengganti ini dengan logika sesuai kebutuhan

    res.render('admin/admin-dasboard', { registeredStaff });
});


router.get('/daftarPetugas',(req,res)=>{
    res.render('admin/daftarPetugas/daftar-petugas')
})


//get
router.get('/tambah-admin-loket',(req,res)=>{
    res.render('admin/tambah-admin-loket')
})

router.get('/tambah-staff-rawat-inap',(req,res)=>{
    res.render('admin/tambah-staff-rawat-inap')
})

router.get('/tambah-perawat',(req,res)=>{
    res.render('admin/tambah-perawat')
})


router.get('/tambah-admin-loket/print',(req,res)=>{
    res.render('admin/print-staff-rawat-inap')
})

router.post('/tambah-admin-loket/save', async (req, res) => {
    try {
        const { divisi, nama, nik, nip, tanggalLahir, noHp, email, username, password } = req.body;
        const staff = new staffAdminLoket({ divisi, nama, nik, nip, tanggalLahir, noHp, email, username });
        const registeredStaff = await staffAdminLoket.register(staff, password);

        req.flash('success_msg', 'Berhasil menambahkan data');
        res.render('admin/admin-dasboard', { registeredStaff });
    } catch (error) {
        if (error.name === 'MongoError' && error.code === 11000) {
            req.flash('error_msg', 'Email sudah terdaftar, silakan gunakan email lain');
        } else {
            req.flash('error_msg', 'Terjadi kesalahan saat registrasi');
        }
        console.error('Terjadi kesalahan:', error);
        res.redirect('/admin/tambah-admin-loket');
    }
});



module.exports = router