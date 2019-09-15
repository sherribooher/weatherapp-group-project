"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("card_locations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.DATE,
        references: {
          model: "user",
          key: "id"
        }
      },
      location_1: {
        type: Sequelize.STRING
      },
      location_2: {
        type: Sequelize.STRING
      },
      location_3: {
        type: Sequelize.STRING
      },
      location_4: {
        type: Sequelize.STRING
      },
      location_5: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("card_locations");
  }
};
