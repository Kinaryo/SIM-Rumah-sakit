const express = require('express')
const router = express.Router();
// const passport = require('passport')
const staffAdminLoket= require('../models/staffAdminLoket');
const staffRawatInap = require('../models/staffRawatInap');
const admin = require('../models/admin')


router.get('/register', (req,res)=>{
    res.render('auth/register')
})

// router.post('/register', async(req,res)=>{
//     try{
//         const {email,username,password} = req.body
//         const adminloketregister = new staffAdminLoketAuth({email,username});
//         const cek = await staffAdminLoketAuth.register(adminloketregister, password)
//         console.log(cek)

//         req.flash('success_msg', 'registrasi berhasil')
//         res.redirect('/login')
//     }catch (error){
//         req.flash(`error_msg`, error.message)
//         res.redirect('/register')

//     }
// })


router.get('/', async (req, res) => {
    res.render('auth/login')
});



// app.post ('/login', passport.authenticate('local',{
//     failureRedirect: '/login',
//     failureFlash: {
//         type: 'error_msg',
//         msg: 'Invalid Username or password'
//     }
// }), (req,res)=>{
//     req.flash('success_msg', 'you are logged in')
//     res.redirect('/admin/dasborad')
// })


router.post('/login', async (req, res) => {
    try {
        const { username, email } = req.body;
        
        const userAdminLoket = await staffAdminLoket.findOne({
            $or: [{ username }, { email }]
        });

        const userRawatInap = await staffRawatInap.findOne({
            $or:[{username},{email}]
        })

        const userAdmin = await admin.findOne({
            $or: [{ username }, { email }]
        })
        const cekDivisiAdminLoket = await staffAdminLoket.findOne({divisi:"Admin Loket"})
        const cekDivisiRawatInap = await staffRawatInap.findOne({divisi: "Rawat Inap"})
        console.log('iniloh',cekDivisiRawatInap)

        if(userAdminLoket && cekDivisiAdminLoket){
            req.flash('success_msg', 'Selamat Berhasil Login');
            res.redirect('/loket/dasboard',);

        }else if (userRawatInap && cekDivisiRawatInap) {
            req.flash('success_msg','Selamat Berhasil Login');
            res.redirect('/rawatinap/dasboard')
            
        }else if (userAdmin){
            req.flash('success_msg','Selamat Berhasil Login');
            res.redirect('/admin/dasboard')


        }else {
            // User tidak ditemukan
            req.flash('error_msg', 'Invalid Username or Email');
            return res.redirect('/');
        }

        // Jika user ditemukan, arahkan ke dashboard
    } catch (error) {
        console.error(error);
        res.redirect('/login');
    }
});

    

module.exports = router