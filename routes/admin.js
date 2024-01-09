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



router.get('/tambah-admin-loket/print',(req,res)=>{
    res.render('admin/print-staff-rawat-inap')
})



// import bcrypt from "bcryrptjs"
router.post('/tambah-admin-loket/save', async (req, res) => {
    try {
        const { divisi, nama, nik, nip, tanggalLahir, noHp, email, username, password} = req.body;
        const staff = await new staffAdminLoket({ divisi, nama, nik, nip, tanggalLahir, noHp, email, username, password });

        await staff.save()
        console.log(staff);

        req.flash('success_msg', 'Berhasil menambahkan data');
        res.redirect('/admin/dasboard',);
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


router.post('./login',async(req,res)=>{
    const staffadminloket = await user.findOne({email:req.body.email});

    if(staffadminloket)
    res.send({
        _id:staffadminloket._id,
        name:staffadminloket.nama,
        email:staffadminloket.email,
        password:staffadminloket.password,
        token: generateLogToken(staffadminloket)
    })
})

const jwt = require ('jsonwebtoken')

const generateLogToken = (staffadminloket)=>{
    return jwt.sign({
        _id:staffadminloket._id,
        name:staffadminloket.nama,
        email:staffadminloket.email,
        
    },
    process.env.JWT_PASS,
    {
        expiresIn:'10d'
    }
    )
}
// router.post('/tambah-admin-loket/save', async (req, res) => {
//     try {
//         const { divisi, nama, nik, nip, tanggalLahir, noHp, email, username, password } = req.body;
//         const staff = new staffAdminLoket({ divisi, nama, nik, nip, tanggalLahir, noHp, email, username });
//         const registeredStaff = await staffAdminLoket.register(staff, password);

//         req.flash('success_msg', 'Berhasil menambahkan data');
//         res.render('admin/admin-dasboard', { registeredStaff });
//     } catch (error) {
//         if (error.name === 'MongoError' && error.code === 11000) {
//             req.flash('error_msg', 'Email sudah terdaftar, silakan gunakan email lain');
//         } else {
//             req.flash('error_msg', 'Terjadi kesalahan saat registrasi');
//         }
//         console.error('Terjadi kesalahan:', error);
//         res.redirect('/admin/tambah-admin-loket');
//     }
// });



// CRUD perawat 
router.get('/tambah-perawat',(req,res)=>{
    res.render('admin/tambah-perawat')
})

router.post('/tambah-perawat/save', async (req, res) => {
    try {
        const { divisi, nama, nik, nip, noSTR, tanggalLahir, noHp, email,username, alamat, password } = req.body;
        const newPerawatData = new perawat ({ divisi, nama, nik, nip, noSTR, tanggalLahir, noHp, email, username,  alamat });
        const registeredPerawat = await perawat.register(newPerawatData, password);

        req.flash('success_msg', 'Berhasil menambahkan data perawat');
        res.redirect('/admin/daftar-perawat'); // Redirect to the dashboard or any other route after successful save
    } catch (error) {
        if (error.name === 'MongoError' && error.code === 11000) {
            req.flash('error_msg', 'Email sudah terdaftar, silakan gunakan email lain');
        } else {
            req.flash('error_msg', 'Terjadi kesalahan saat menambahkan data perawat');
        }
        console.error('Terjadi kesalahan:', error);
        res.redirect('/admin/tambah-perawat');
    }
});

router.get('/daftar-perawat',async(req,res)=>{
    const  dataPerawat = await perawat.find()
    console.log(dataPerawat)
    res.render('admin/daftarPetugas/daftar-perawat',{dataPerawat : dataPerawat})
})

// CRUD Perawat (edit)
router.get('/data-perawat/:id/edit', async (req, res) => {
    try {
        const editPerawat = await perawat.findById(req.params.id);
        console.log(editPerawat);
        res.render('admin/edit/edit-perawat', { editPerawat: editPerawat });
    } catch (error) {
        console.error(error);
        // Handle error and send appropriate response
        res.status(500).send('Internal Server Error');
    }
});

router.post('/data-perawat/:id/edit/save', async (req, res) => {
    try {
        const updatedPerawat = await perawat.findByIdAndUpdate(
            req.params.id,
            {
                divisi: req.body.divisi,
                nama: req.body.nama,
                // tambahkan field lainnya sesuai kebutuhan
            },
            { new: true } // opsional, agar mengembalikan dokumen yang sudah diupdate
        );

        if (!updatedPerawat) {
            // Jika dokumen tidak ditemukan
            return res.status(404).send('Perawat not found');
        }

        console.log(updatedPerawat);
        res.redirect('/path/redirect/setelah/update'); // Ganti dengan path yang sesuai
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


router.delete('/data-perawat/:id', async (req, res) => {
    try {
        const deletedPerawat = await perawat.findByIdAndDelete(req.params.id);
        if (!deletedPerawat) {
            // If the perawat with the given ID is not found
            return res.status(404).send('Perawat not found');
        }

        // Redirect or send a response after successful deletion
        res.redirect('/some-redirect-path'); // Change this to the desired path
    } catch (error) {
        console.error(error);
        // Handle error and send appropriate response
        res.status(500).send('Internal Server Error');
    }
});






// router.post('/tambah-staff-rawat-inap/save', async (req, res) => {
//     try {
//         const { divisi, nama, nik, nip, tanggalLahir, noHp, email, alamat, password } = req.body;
//         const staffRawatInapData = { divisi, nama, nik, nip, tanggalLahir, noHp, email, alamat };
//         const staffRawatInap = new staffRawatInap(staffRawatInapData);
//         const registeredStaffRawatInap = await staffRawatInap.save();

//         req.flash('success_msg', 'Berhasil menambahkan data staff rawat inap');
//         res.redirect('/admin/dasboard'); // Redirect to the dashboard or any other route after successful save
//     } catch (error) {
//         if (error.name === 'MongoError' && error.code === 11000) {
//             req.flash('error_msg', 'Email sudah terdaftar, silakan gunakan email lain');
//         } else {
//             req.flash('error_msg', 'Terjadi kesalahan saat menambahkan data staff rawat inap');
//         }
//         console.error('Terjadi kesalahan:', error);
//         res.redirect('/admin/tambah-staff-rawat-inap');
//     }
// });

module.exports = router