const express = require ('express')
const ejsMate = require('ejs-mate')
require('dotenv').config();
const path = require('path')
const mongoose = require('mongoose')
const app = express()



const formulirPasien = require ('./models/formulirPasien')
const kartuBerobat = require('./models/kartuBerobat')

// setup databases
// const PORT = 3000;
// const databases = "SIM_RS"
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


app.get('/',(req,res)=>{
    res.render('admin/dasboard')
})
app.get('/formulirpasien', (req,res)=>{
    res.render('admin/pendaftaran/formulirpasien')
})
//  admin (kartuberobat)
app.get('/kartuberobat',(req,res)=>{
    res.render('admin/pendaftaran/kartuberobat')
})
app.post('/saveKartuBerobat', async (req, res) => {
    const savekartuBerobat = kartuBerobat(req.body.kartuBerobat);
    await savekartuBerobat.save();
    console.log(savekartuBerobat);
    res.render('print/printKartuBerobat', { saveKartuBerobat: savekartuBerobat });
});

// print
app.get('/kartuberobat/cetak', (req,res)=>{
    res.render('print/printKartuBerobat')
})

// admin(formulirpasien)
app.get('/formulirpasien',(req,res)=>{
    res.render('admin/pendaftaran/formulirpasien')
})

app.post('/saveformulirpasien', async (req, res) => {
    const kodeRegistrasiInput = req.body.formulirPasien.kodeRegistrasiKartu;
    const kodeRegistrasiKartu = await kartuBerobat.findOne({ kodeRegistrasi: kodeRegistrasiInput });

    try {
        if (kodeRegistrasiInput === kodeRegistrasiKartu.kodeRegistrasi) {
            const pasien = new formulirPasien(req.body.formulirPasien);
            pasien.kodeRegistrasi = kodeRegistrasiKartu._id;
            await pasien.save();
            console.log(pasien);
            res.render('print/printPendaftaranPasien', { saveDataPasien: pasien });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan saat menyimpan data.');
    }
});


app.get('/saveformulirpasien/cetak', (req,res)=>{
    res.render('print/printPendaftaranPasien')
})


app.get('/daftarpasien',(req,res)=>{
    res.render('admin/daftarpasien')
})
app.get('/daftarkunjungan',(req,res)=>{
    res.render('admin/daftarkunjungan')
})
app.get('/asuransi',(req,res)=>{
    res.render('admin/asuransi')
})
// laporan
app.get('/laporan/harian',(req,res)=>{
    res.render('rawatInap/laporan/harian')
})
app.get('/laporan/mingguan',(req,res)=>{
    res.render('rawatInap/laporan/mingguan')
})
app.get('/laporan/bulanan',(req,res)=>{
    res.render('rawatInap/laporan/bulanan')
})


// app.get('',(req,res)=>{
//     res.render('admin/daftarpasien')
// })


// Perawat
app.get('/rawatinap/pasien',(req,res)=>{
    res.render('rawatInap/daftarPasien')
})
//laporan perawat
app.get('/rawatinap/laporan/harian',(req,res)=>{
    res.render('rawatInap/laporan/harian')
})
app.get('/rawatinap/laporan/mingguan',(req,res)=>{
    res.render('rawatInap/laporan/mingguan')
})
app.get('/rawatinap/laporan/bulanan',(req,res)=>{
    res.render('rawatInap/laporan/bulanan')
})
//farmasi & logistik
app.get('/rawatinap/farmasilogistik/harian',(req,res)=>{
    res.render('rawatInap/farmasiLogistik/harian')
})
app.get('/rawatinap/farmasilogistik/mingguan',(req,res)=>{
    res.render('rawatInap/farmasiLogistik/mingguan')
})
app.get('/rawatinap/farmasilogistik/bulanan',(req,res)=>{
    res.render('rawatInap/farmasiLogistik/bulanan')
})
// data kamar dan permintaan makan
app.get('/rawatinap/datakamar', (req,res)=>{
    res.render('rawatinap/dataKamar')
})
app.get('/rawatinap/pasien/control', (req,res)=>{
    res.render('rawatinap/control')
})



// app.listen(PORT,()=>{
//     console.log(`Server is running on http://127.0.0.1:${PORT}`)
// })

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening On Port http://127.0.0.1:${PORT}`);
});