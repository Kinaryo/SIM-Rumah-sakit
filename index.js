const express = require ('express')
const flash = require('connect-flash')
const ejsMate = require('ejs-mate')
require('dotenv').config();
const path = require('path')
const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const staffRawatInap = require('./models/staffRawatInap')
const perawat = require('./models/perawat')
const app = express()
const session = require('express-session')
const admin = require('./data-dummy-admin')

// setup databases
// const PORT = 3000;
// const databases = "simrawatinap"
// mongoose.connect(`mongodb://127.0.0.1/${databases}`)
// .then((result)=>{
//     console.log(`Connected to Mongodb(${databases})`)
// }).catch((err)=>{
//     console.log(err)
// })

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB Connected`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};
connectDB();

app.engine('ejs',ejsMate)
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'front-end'))
app.use(express.static('public'));
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret: 'this-is-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie:{
        httpOnly:true,
        expires:Date.now() + 1000*60*60*24*7,
        maxAge: 1000*60*60*24*7
    }
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(staffRawatInap.authenticate()));
passport.serializeUser(staffRawatInap.serializeUser)
passport.deserializeUser(staffRawatInap.deserializeUser)



app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg'); // Pengejaan yang benar
    res.locals.error_msg = req.flash('error_msg');
    next();
});

// admin segala admin 
app.use('/admin', require('./routes/admin'))


app.use('/', require('./routes/auth'))
app.use('/loket', require('./routes/loketAdmin'))
app.use('/rawatinap',  require('./routes/stafRawatInap'));
app.use('/logostik-farmasi',require('./routes/logistikFarmasi'))



// app.listen(PORT,()=>{
//     console.log(`Server is running on http://127.0.0.1:${PORT}`)
// })

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening On Port http://127.0.0.1:${PORT}`);
});


// app.get('',(req,res)=>{
//     res.render('admin/daftarpasien')
// })



// app.post('/isiDataPasienRawatInap/save', async (req, res) => {
//     // try {
//         const { formulirId } = req.body.pasienRawatInap;
//          await console.log(formulirId)

//         const formulir = await formulirPasien.find();
//         await console.log(formulir)
// })
    //     
        
    //     if (!formulir) {
    //         return res.status(404).json({ message: 'Formulir pendaftaran tidak ditemukan' });
    //     }

    //     // Buat objek pasienRawatInap yang baru
    //     const pasien = new pasienRawatInap({
    //         noPendaftaran: id,
    //         ...req.body.pasienRawatInap,
    //     });
    //     await pasien.save();

    //     // Populasikan data pasienRawatInap
    //     const pasienWithPopulate = await pasienRawatInap.findById(pasien._id).populate('noPendaftaran');

    //     // Perbarui formulirPasien dengan ID pasienRawatInap
    //     formulir.pasienRawatInapId = pasien._id;
    //     await formulir.save();

    //     // Render tanggapan
    //     res.render('rawatInap/detaildatapasien', { message: 'Berhasil menambahkan PasienRawatInap', pasienRawatInap: pasienWithPopulate });
    // } catch (error) {
    //     console.error('Error:', error);
    //     res.status(500).json({ message: 'Terjadi kesalahan dalam menyimpan data pasien rawat inap' });
    // }
// });






// Perawat
// app.get('/rawatinap/pasien', async (req, res) => {
//     try {
//         const pasienRawatInap = await formulirPasien.find({ poli: 'Rawat Inap' });
//         console.log(pasienRawatInap)
//         if (pasienRawatInap.length > 0) {
//             res.render('rawatInap/daftarPasien', { pasienRawatInap });
//         } else {
//             res.render('rawatInap/daftarPasien', { pasienRawatInap: null });
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).send('Terjadi kesalahan dalam mengambil data pasien rawat inap');
//     }
// });

// 



// app.get('/rawatinap/detail/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const pasienWithPopulate = await pasienRawatInap.findById(id).populate('noPendaftaran');
//         if (!pasienWithPopulate) {
//             return res.status(404).render('error', { message: 'Data Pasien Rawat Inap tidak ditemukan' });
//         }
//         res.render('rawatInap/detail', { pasienRawatInap: pasienWithPopulate });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).render('error', { message: 'Terjadi kesalahan dalam mengambil data pasien rawat inap' });
//     }
// });















// const getMonthYearDateMasuk = function(tanggalMasuk) {
//     if (tanggalMasuk) {
//         const options = { year: 'numeric', month: 'long', day: 'numeric' };
//         return new Date(tanggalMasuk).toLocaleDateString('id-ID', options);
//     } else {
//         return 'Tanggal Masuk Tidak Tersedia';
//     }
// };

// const getMonthYearDateLahir = function(tanggalLahir) {
//     if(tanggalLahir) {
//         const options = { year: 'numeric', month: 'long', day : 'numeric'};
//         return new Date(tanggalLahir).toLocaleDateString('id-ID', options);
//     }return "Tanggal Lahir Tidak Tersedia"
// }




// router.get('/formulirPasienByKartu/:kodeRegistrasiKartu', async (req, res) => {
//     try {
//         const kodeRegistrasiInput = req.params.kodeRegistrasiKartu;

//         // Cari kartuBerobat berdasarkan kode registrasi
//         const kartuBerobatData = await kartuBerobat.findOne({ kodeRegistrasi: kodeRegistrasiInput });

//         if (kartuBerobatData) {
//             // Ambil formulirPasien yang terkait dengan kartuBerobat dan "populate" kodeRegistrasi
//             const formulirPasienList = await formulirPasien
//                 .find({ kodeRegistrasi: kartuBerobatData._id })
//                 .populate('kodeRegistrasi');  // Populate kartuBerobat
            
//             res.json({ formulirPasienList });
//         } else {
//             res.status(404).json({ error: 'Data kartuBerobat tidak ditemukan.' });
//         }
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data.' });
//     }
// });