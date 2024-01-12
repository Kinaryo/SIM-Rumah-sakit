const express = require('express')
const Admin = require('./models/admin')

const createDummyAdmin = async () => {
  const adminEmail = "admin@gmail.com"
  const adminUsername = 'admin';
  const adminPassword = 'admin';

  const existingAdmin = await Admin.findOne({ username: adminUsername });

  if (!existingAdmin) {
    // const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const newAdmin = new Admin({
      email: adminEmail,
      username: adminUsername,
      // password: hashedPassword,
      password:adminPassword
    });

    await newAdmin.save();
    console.log('Data dummy admin berhasil ditambahkan.');
  } else {
    console.log('Admin sudah ada.');
  }
};

module.exports = createDummyAdmin();
