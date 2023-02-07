'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // async up digunakan untuk menambahkan data pada sebuah tabel sesuai struktur dari tabel.
  async up(queryInterface, Sequelize) { //digunakan untuk menambahkan data pada sebuah tabel sesuai struktur dari tabel.
    await queryInterface.bulkInsert("members", [
      {
        name: `Soekarno`, gender: `Male`,
        contact: `021-223311`, address: `Tokyo, Japan`,
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: `Soeharto`, gender: `Male`,
        contact: `0331-474747`, address: `Beijing, China`,
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        name: `Megawati`, gender: `Female`,
        contact: `091-23981`, address: `Bangkok, Thailand`,
        createdAt: new Date(), updatedAt: new Date()
      },
    ], {})
  },
 
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('members', null, {});
  }
};