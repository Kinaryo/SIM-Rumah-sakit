const express = require('express')

const formulirPasien = require ('../models/formulirPasien')
const kartuBerobat = require('../models/kartuBerobat')
const BPJS = require('../models/asuransi/bpjs')
const pasienRawatInap = require('../models/pasienRawatInap')

const router = express.Router();


router.get('/',(req,res)=>{
    res.render('loketAdmin/dasboard')
})

router.get('/formulirpasien', (req,res)=>{
    res.render('loketAdmin/pendaftaran/formulirpasien')
})
//  admin (kartuberobat)
router.get('/kartuberobat',(req,res)=>{
    res.render('loketAdmin/pendaftaran/kartuberobat')
})
router.post('/saveKartuBerobat', async (req, res) => {
    const savekartuBerobat = kartuBerobat(req.body.kartuBerobat);
    await savekartuBerobat.save();
    console.log(savekartuBerobat);
    res.render('print/printKartuBerobat', { saveKartuBerobat: savekartuBerobat });
});

// print


router.get('/kartuberobat/cetak', (req,res)=>{
    res.render('print/printKartuBerobat')
})

// admin(formulirpasien)
router.get('/formulirpasien',(req,res)=>{
    res.render('loketAdmin/pendaftaran/formulirpasien')
})


router.post('/saveformulirpasien', async (req, res) => {
    try {
        const kodeRegistrasiInput = req.body.formulirPasien.kodeRegistrasiKartu;
        const kodeRegistrasiKartu = await kartuBerobat.findOne({ kodeRegistrasi: kodeRegistrasiInput });

        if (kodeRegistrasiKartu) {
            const pasienData = req.body.formulirPasien;

            // Ensure that 'asuransi' is a string, not an array
            if (Array.isArray(pasienData.asuransi)) {
                pasienData.asuransi = pasienData.asuransi[0];
            }

            const pasien = new formulirPasien(pasienData);
            pasien.kodeRegistrasi = kodeRegistrasiKartu._id;
            await pasien.save();

            if (pasien.asuransi === 'BPJS') {
                const bpjsData = new BPJS({
                    asuransi: pasien._id,
                });
                await bpjsData.save();
            }

            // Log BPJS data
            const tanggalFormattedMasuk = pasien.getMonthYearDateMasuk();
            const tanggalFormattedLahir = pasien.getMonthYearDateLahir();

            console.log("Data Pasien:", pasien);
            console.log("Kode Registrasi Pasien:", pasien.kodeRegistrasi);

            res.render('print/printPendaftaranPasien', {
                saveDataPasien: pasien,
                kodeRegistrasiKartu,
                tanggalFormattedMasuk,
                tanggalFormattedLahir,
                successMessage: 'Data berhasil disimpan.',
            });
        } else {
            res.status(404).send('Data kartuBerobat tidak ditemukan.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan saat mengambil atau menyimpan data.');
    }
});


router.get('/saveformulirpasien/cetak', (req,res)=>{
    res.render('print/printPendaftaranPasien')
})




// daftar pasien 
router.get('/daftarpasien', async (req,res)=>{
    const pasiens = await formulirPasien.find()
    res.render('loketAdmin/daftarpasien' , {pasiens})
})

router.get('/daftarkunjungan',(req,res)=>{
    res.render('loketAdmin/daftarkunjungan')
})
router.get('/asuransi', async (req, res) => {
    try {
        const bpjs = await BPJS.find().populate('asuransi');
        console.log(bpjs);
        res.render('loketAdmin/asuransi', { bpjs });
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan saat mengambil data BPJS.');
    }
});

// laporan
router.get('/laporan/harian',(req,res)=>{
    res.render('loketAdmin/laporan/harian')
})
router.get('/laporan/mingguan',(req,res)=>{
    res.render('loketAdmin/laporan/mingguan')
})
router.get('/laporan/bulanan',(req,res)=>{
    res.render('loketAdmin/laporan/bulanan')
})

module.exports = router