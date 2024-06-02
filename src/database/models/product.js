module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("product", {
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING(80),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0.01
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1
      }
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isSpecial: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    specialPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      validate: {
        isValidSpecialPrice(value) {
          if (this.isSpecial) {
            if (value == null) throw new Error("Special price must be provided if the product is on special");
            if (value >= this.price) throw new Error("Special price must be less than the regular price");
            if (value < 0.01) throw new Error("Special price must be greater than 0");
          }
        }
      }
    }
  }, {
    tableName: "products",
    timestamps: true
  });

  Product.addHook("beforeSave", (product) => {
    if (!product.isSpecial) {
      product.specialPrice = null;
    }
  });

  return Product;
};
