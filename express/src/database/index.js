const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");

const db = {
  Op: Sequelize.Op
};

db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT
});

db.user = require("./models/user.js")(db.sequelize, DataTypes);
db.post = require("./models/post.js")(db.sequelize, DataTypes);
db.product = require("./models/product.js")(db.sequelize, DataTypes);
db.cart = require("./models/cart.js")(db.sequelize, DataTypes);
db.cartItem = require("./models/cartItem.js")(db.sequelize, DataTypes);

db.post.belongsTo(db.user, { foreignKey: { name: "username", allowNull: false } });
db.cart.hasMany(db.cartItem, { foreignKey: "cart_id" });
db.cartItem.belongsTo(db.cart, { foreignKey: "cart_id" });
db.cartItem.belongsTo(db.product, { foreignKey: "product_id" });

db.sync = async () => {
  await db.sequelize.sync({ force: true });
  await seedData();
};

async function seedData() {
  const userCount = await db.user.count();
  const productCount = await db.product.count();

  if (userCount === 0) {
    const argon2 = require("argon2");
    const hash = await argon2.hash("abc123", { type: argon2.argon2id });
    await db.user.create({ username: "mbolger", password_hash: hash, email: "Matthew@gmail.com", phone: "1234567890" });
  }

  if (productCount === 0) {
    try {
      await db.product.bulkCreate([
        { name: "Blueberries", description: "Fresh, plump organic blueberries perfect for your morning smoothie.", price: 4.99, quantity: 10, unit: "pint", image: "https://images.unsplash.com/photo-1597774681009-f8679cf72348?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", isSpecial: true, specialPrice: 3.49 },
        { name: "Apples", description: "Crisp, juicy apples from local orchards, perfect for snacking or baking.", price: 3.99, quantity: 10, unit: "lb", image: "https://images.unsplash.com/photo-1611574474484-ced6cb70a2cf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", isSpecial: false, specialPrice: null },
        { name: "Avocado", description: "Creamy, ripe avocados packed with healthy fats, perfect for salads or toast.", price: 2.49, quantity: 10, unit: "each", image: "https://images.unsplash.com/photo-1612506266679-606568a33215?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", isSpecial: false, specialPrice: null },
        { name: "Beef", description: "High-quality beef, perfect for grilling or stir-fries.", price: 9.99, quantity: 10, unit: "lb", image: "https://images.unsplash.com/photo-1613454320437-0c228c8b1723?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", isSpecial: true, specialPrice: 8.00 },
        { name: "Black Tea", description: "Premium black tea leaves, rich in flavor and aroma.", price: 5.99, quantity: 10, unit: "oz", image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?q=80&w=867&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", isSpecial: false, specialPrice: null },
        { name: "Capsicum", description: "Fresh, crunchy bell peppers in assorted colors.", price: 3.49, quantity: 10, unit: "each", image: "https://images.unsplash.com/photo-1585159079680-8dec029b76ed?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", isSpecial: true, specialPrice: 2.49 },
        { name: "Chicken", description: "Tender, juicy chicken breasts, perfect for grilling or baking.", price: 6.99, quantity: 10, unit: "lb", image: "https://images.unsplash.com/photo-1615205349253-9694e5d9654b?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", isSpecial: false, specialPrice: null },
        { name: "Coffee", description: "Rich, aromatic coffee beans, perfect for brewing your morning cup of joe.", price: 8.99, quantity: 10, unit: "lb", image: "https://images.unsplash.com/photo-1606486544554-164d98da4889?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", isSpecial: false, specialPrice: null },
        { name: "Decaf Coffee", description: "Smooth, flavorful decaffeinated coffee beans for those late-night cravings.", price: 9.49, quantity: 10, unit: "lb", image: "https://images.unsplash.com/photo-1501492673258-2bcfc17241fd?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", isSpecial: true, specialPrice: 7.00 },
        { name: "Eggplant", description: "Fresh, organic eggplants perfect for grilling or roasting.", price: 1.99, quantity: 10, unit: "each", image: "https://images.unsplash.com/photo-1605197378540-10ebaf6999e5?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", isSpecial: false, specialPrice: null },
        { name: "Eggs6", description: "Farm-fresh eggs sourced locally, perfect for any meal of the day.", price: 2.99, quantity: 10, unit: "half dozen", image: "https://images.unsplash.com/photo-1569288052389-dac9b01c9c05?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", isSpecial: false, specialPrice: null },
        { name: "Eggs12", description: "Organic free-range eggs, high in protein and essential nutrients.", price: 4.99, quantity: 10, unit: "dozen", image: "https://images.unsplash.com/photo-1660224286794-fc173fa9295c?q=80&w=1004&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", isSpecial: false, specialPrice: null },
        { name: "FCmilk", description: "Fresh, creamy milk sourced from grass-fed cows.", price: 3.49, quantity: 10, unit: "gallon", image: "https://images.unsplash.com/photo-1576186726115-4d51596775d1?q=80&w=465&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", isSpecial: false, specialPrice: null },
        { name: "Green Tea", description: "Organic green tea leaves, rich in antioxidants and soothing properties.", price: 4.99, quantity: 10, unit: "oz", image: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", isSpecial: false, specialPrice: null },
        { name: "Lamb", description: "Tender, succulent lamb cuts, perfect for roasting or grilling.", price: 12.99, quantity: 10, unit: "lb", image: "https://images.unsplash.com/photo-1560781290-7dc94c0f8f4f?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", isSpecial: false, specialPrice: null },
        { name: "Lemon", description: "Fresh, zesty lemons bursting with citrus flavor.", price: 2.19, quantity: 10, unit: "each", image: "https://images.unsplash.com/photo-1590502593747-42a996133562?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", isSpecial: true, specialPrice: 1.89 },
        { name: "Lettuce", description: "Crisp, refreshing lettuce perfect for salads or sandwich wraps.", price: 1.49, quantity: 10, unit: "head", image: "https://images.unsplash.com/photo-1591193144634-a2bf060fdb36?q=80&w=327&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", isSpecial: false, specialPrice: null },
        { name: "LF milk", description: "Low-fat milk, rich in calcium and essential vitamins.", price: 2.49, quantity: 10, unit: "gallon", image: "https://plus.unsplash.com/premium_photo-1695042864784-8e3c7b52aeb3?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", isSpecial: false, specialPrice: null },
        { name: "Oat milk", description: "Creamy oat milk, dairy-free and perfect for lactose intolerant individuals.", price: 3.99, quantity: 10, unit: "quart", image: "https://plus.unsplash.com/premium_photo-1664647903517-70bb8213c743?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", isSpecial: true, specialPrice: 3.00 },
        { name: "Onions", description: "Fresh, aromatic onions, versatile for cooking or adding flavor to dishes.", price: 0.79, quantity: 10, unit: "lb", image: "https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", isSpecial: false, specialPrice: null },
        { name: "Organic Tea", description: "Certified organic tea leaves, ethically sourced and deliciously aromatic.", price: 6.99, quantity: 10, unit: "oz", image: "https://images.unsplash.com/photo-1601292048645-593d4c46e6ca?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", isSpecial: false, specialPrice: null },
        { name: "Potatoes", description: "Farm-fresh potatoes, perfect for mashed potatoes, fries, or roasting.", price: 1.29, quantity: 10, unit: "lb", image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", isSpecial: false, specialPrice: null },
        { name: "Raspberries", description: "Plump, juicy raspberries bursting with sweet-tart flavor.", price: 3.99, quantity: 10, unit: "pint", image: "https://images.unsplash.com/photo-1577069861033-55d04cec4ef5?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", isSpecial: false, specialPrice: null },
        { name: "Redbell", description: "Sweet, crunchy red bell peppers, perfect for salads or stir-fries.", price: 1.99, quantity: 10, unit: "each", image: "https://images.unsplash.com/photo-1513530774447-73de85f43d60?q=80&w=436&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", isSpecial: false, specialPrice: null },
        { name: "Strawberries", description: "Fresh, succulent strawberries, perfect for snacking or desserts.", price: 2.99, quantity: 10, unit: "lb", image: "https://images.unsplash.com/photo-1587393855524-087f83d95bc9?q=80&w=460&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", isSpecial: false, specialPrice: null },
        { name: "Tomatoes", description: "Ripe, juicy tomatoes bursting with flavor, perfect for sandwiches or salads.", price: 1.49, quantity: 10, unit: "lb", image: "https://images.unsplash.com/photo-1558818498-28c1e002b655?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", isSpecial: false, specialPrice: null }
      ]);
      console.log("Seed data added successfully.");
    } catch (error) {
      console.error("Failed to seed data:", error);
    }
  }
}

module.exports = db;
