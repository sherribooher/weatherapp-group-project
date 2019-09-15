'use strict';
module.exports = (sequelize, DataTypes) => {
  const card_locations = sequelize.define('card_locations', {
    location_1: DataTypes.STRING,
    location_2: DataTypes.STRING,
    location_3: DataTypes.STRING,
    location_4: DataTypes.STRING,
    location_5: DataTypes.STRING
  }, {});
  card_locations.associate = function (models) {
    // associations can be defined here
    card_locations.belongsTo(models.user);
  };
  return card_locations;
};