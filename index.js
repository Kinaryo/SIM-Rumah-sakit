const express = require ('express')
const ejsMate = require('ejs-mate')
const path = require('path')
const mongoose = require('mongoose')
const app = express()



const formulirPasien = require ('./models/formulirPasien')
const kartuBerobat = require('./models/kartuBerobat')

// setup databases
const PORT = 3000;
const databases = "SIM_RS"
mongoose.connect(`mongodb://127.0.0.1/${databases}`)
.then((result)=>{
    console.log(`Connected to Mongodb(${databases})`)
}).catch((err)=>{
    console.log(err)
})

app.engine('ejs',ejsMate)
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'front-end'))
app.use(express.static('public'));
app.use(express.static(path.join(__dirname,'public')))


app.get('/', (req,res)=>{
    res.render('admin/index')
})


//  admin
app.get('/kartuberobat',(req,res)=>{
    res.render('admin/pendaftaran/kartuberobat')
})
app.get('/formulirpasien',(req,res)=>{
    res.render('admin/pendaftaran/formulirpasien')
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


app.listen(PORT,()=>{
    console.log(`Server is running on http://127.0.0.1:${PORT}`)
})