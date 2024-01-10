const express = require('express')
const router = express.Router();
const passport = require('passport')

// const staffRawatInap = require('../models/staffRawatInap')
const staffAdminLoketAuth= require('../models/auth-admin-loket')


router.get('/register', (req,res)=>{
    res.render('auth/register')
})

router.post('/register', async(req,res)=>{
    try{
        const {email,username,password} = req.body
        const adminloketregister = new staffAdminLoketAuth({email,username});
        const cek = await staffAdminLoketAuth.register(adminloketregister, password)
        console.log(cek)

        req.flash('success_msg', 'registrasi berhasil')
        res.redirect('/login')
    }catch (error){
        req.flash(`error_msg`, error.message)
        res.redirect('/register')

    }
})


router.get('/login', async (req, res) => {
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

        // Ambil data login berdasarkan username atau email
        const user = await staffAdminLoketAuth.findOne({
            $or: [{ username }, { email }]
        });

        if (!user) {
            // User tidak ditemukan
            req.flash('error_msg', 'Invalid Username or Email');
            
            return res.redirect('/login');
        }

        // Jika user ditemukan, arahkan ke dashboard
        req.flash('success_msg', 'You are logged in');
        res.redirect('/admin/dasboard');
    } catch (error) {
        console.error(error);
        res.redirect('/login');
    }
});

    

module.exports = router