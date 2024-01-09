const express = require('express')
const router = express.Router()
const ITEM = require('../models/logistikFarmasi')


router.get('/',async(req,res)=>{
    try{
        const items = await ITEM.find()
        res.render('logistikFarmasi/logistik-farmasi', {items})
    }catch(err){
        res.status(500).send("terjadi kesalahan")

    }
})

router.get('/tambah-item',async(req,res)=>{
    try{
        res.render('logistikFarmasi/new-item')
    }catch(err){
        res.status(500).send("terjadi kesalahan")
    }
})

router.post('tambah-item/save', async(req,res)=>{
    const { kode, nama, satuan, jumlah } = req.body

    try{
        await ITEM.create({kode, nama, satuan, jumlah})
        res.redirect('/')
    }catch{

    }
})

router.post('/ambil', async (req, res) => {
    const { kode, jumlahAmbil } = req.body;
    try {
      const item = await ITEM.findOne({ kode });
  
      if (item && item.jumlah >= jumlahAmbil) {
        item.jumlah -= jumlahAmbil;
        await item.save();
      }
  
      res.redirect('/');
    } catch (err) {
      console.error(err);
      res.status(500).send('Terjadi kesalahan');
    }
  });


module.exports = router