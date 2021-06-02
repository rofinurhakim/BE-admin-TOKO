'use strict';
module.exports = (sequelize, DataTypes) => {
  const products = sequelize.define('products', {
    id: {
        defaultValue: DataTypes.UUID4,
        type: DataTypes.UUID,
        primaryKey: true
    },
    nama_products: DataTypes.STRING,
    deskripsi: DataTypes.TEXT,
    image: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER
  }, {});

  return products;
};