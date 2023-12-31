const express = require('express')

const formulirPasien = require ('../models/formulirPasien')
const kartuBerobat = require('../models/kartuBerobat')
const BPJS = require('../models/asuransi/bpjs')
const pasienRawatInap = require('../models/pasienRawatInap')

const router = express.Router();

router.get('/dasboard', async (req, res) => {
    const dataKamar = await formulirPasien.findOne({ruangan : 'Kamboja'})
    if(dataKamar){
        console.log(dataKamar.ruangan)
    }
    // req.flash('success_msg', 'Selamat Datang Kembali')
    res.render('rawatInap/dasboard' , {dataKamar: dataKamar});
})


router.get('/tambah-data-pasien-rawat-inap',async(req,res)=>{

    try {
        const pasienRawatInap = await formulirPasien.find({ poli: 'Rawat Inap' });
        console.log(pasienRawatInap)
        if (pasienRawatInap.length > 0) {
            res.render('rawatInap/tambahDataPasienRawatInap', { pasienRawatInap });
        } else {
            res.render('rawatInap/tambahDataPasienRawatInap', { pasienRawatInap: null });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Terjadi kesalahan dalam mengambil data pasien rawat inap');
    }
    
})

// pencarian nomor noPendaftaran 
router.get('/cari-pasien', async (req, res) => {
    try {
        const noPendaftaran = req.query.noPendaftaran;
        if (!noPendaftaran) {
            res.status(400).json({ error: 'Nomor pendaftaran tidak ditemukan.' });
            return;
        }
        const pasienRawatInap = await formulirPasien.findOne({ noPendaftaran: noPendaftaran, poli: 'Rawat Inap' });
        if (pasienRawatInap) {
            console.log(pasienRawatInap);
            res.json({ pasienRawatInap, noPendaftaran });
        } else {
            res.status(404).json({ error: 'Pasien tidak ditemukan.' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Terjadi kesalahan dalam mencari data pasien rawat inap' });
    }
});

router.post('/isiDataPasienRawatInap/save', async (req, res) => {
    try {
        const { formulirId } = req.body.pasienRawatInap;
        const formulir = await formulirPasien.findById(formulirId);
        if (!formulir) {
            return res.status(404).json({ message: 'Formulir pendaftaran tidak ditemukan' });
        }
        // Buat objek pasienRawatInap yang baru
        const pasien = new pasienRawatInap({
            noPendaftaran: formulirId, // Menggunakan formulirId sebagai noPendaftaran
            ...req.body.pasienRawatInap,
        });
        const formatTanggalMasukRawatInap = pasien.getMonthYearDate();
        await pasien.save();
        // Populasikan data pasienRawatInap
        await pasienRawatInap.findById(pasien._id).populate('noPendaftaran');
        // Perbarui formulirPasien dengan ID pasienRawatInap
        formulir.pasienRawatInapId = pasien._id;
        await formulir.save();

        console.log("iniloh",formatTanggalMasukRawatInap)
        // Render tanggapan
        
        res.redirect('/rawatinap/daftarPasien');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Terjadi kesalahan dalam menyimpan data pasien rawat inap' });
    }
});

router.get('/daftarPasien', async (req, res) => {
    try {
        // Menggunakan fungsi `populate` untuk mengisi data pasienRawatInap dengan data formulirPasien
        const semuaDataPasien = await pasienRawatInap.find()
            .populate('noPendaftaran');
           
            const datakamar = await semuaDataPasien.noKasur
            console.log('datakamar',datakamar)
        console.log('isi semua data', semuaDataPasien);
    
        res.render('rawatInap/daftarPasien', { pasienRawatInap: semuaDataPasien});
    } catch (error) {
        console.error('Error dalam mendapatkan data pasien rawat inap:', error);
        res.status(500).json({ message: 'Terjadi kesalahan dalam mengambil data pasien rawat inap', error });
    }
});






//laporan perawat
router.get('/laporan/harian',(req,res)=>{
    res.render('rawatInap/laporan/harian')
})
router.get('/laporan/mingguan',(req,res)=>{
    res.render('rawatInap/laporan/mingguan')
})
router.get('/laporan/bulanan',(req,res)=>{
    res.render('rawatInap/laporan/bulanan')
})
//farmasi & logistik
router.get('/farmasilogistik/harian',(req,res)=>{
    // res.render('rawatInap/farmasiLogistik/harian')
    res.render('rawatInap/pageNotFoundStaffPerawat')
})
router.get('/farmasilogistik/mingguan',(req,res)=>{
    // res.render('rawatInap/farmasiLogistik/mingguan')
    res.render('rawatInap/pageNotFoundStaffPerawat')
})
router.get('/farmasilogistik/bulanan',(req,res)=>{
    // res.render('rawatInap/farmasiLogistik/bulanan')
    res.render('rawatInap/pageNotFoundStaffPerawat')
})
// data kamar dan permintaan makan
router.get('/datakamar', (req,res)=>{
    // res.render('rawatinap/dataKamar')
    res.render('rawatInap/pageNotFoundStaffPerawat')
})
router.get('/pasien/control', (req,res)=>{
    // res.render('rawatinap/control')
    res.render('rawatInap/pageNotFoundStaffPerawat')
})




module.exports = router