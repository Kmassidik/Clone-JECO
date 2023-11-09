"use strict";
const { Bcrypt } = require("../helpers/bycrpt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Users", [
      {
        username: "admin",
        email: "admin@admin.com",
        password: Bcrypt.hashPassword("admin"),
        role: "admin",
        phoneNumber: "0808080808",
        address: "jakartahhh",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // categories
    let categories = require("./categories.json");
    categories = categories.map((e) => {
      (e.createdAt = new Date()), (e.updatedAt = new Date());
      return e;
    });
    await queryInterface.bulkInsert("Categories", categories);

    // items
    let items = require("./items.json");
    items = items.map((e) => {
      (e.authorId = 1),
        (e.createdAt = new Date()),
        (e.updatedAt = new Date());
      return e;
    });
    await queryInterface.bulkInsert("Items", items);

    // ingredients
    let ingredients = require("./ingredients.json");
    ingredients = ingredients.map((e) => {
      (e.createdAt = new Date()), (e.updatedAt = new Date());
      return e;
    });
    await queryInterface.bulkInsert("Ingredients", ingredients);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
