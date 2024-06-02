const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('./src/database');

// Database will be sync'ed in the background.
db.sync();

const app = express();

// Parse requests of content-type - application/json.
app.use(express.json());

// Add CORS support.
app.use(cors());

// Serve static files
app.use('/images', express.static(path.join(__dirname, 'src/images')));

// Simple Hello World route.
app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});


// Add user routes.
require('./src/routes/user.routes.js')(express, app);
require('./src/routes/post.routes.js')(express, app);

// Add product routes.
const productRoutes = require('./src/routes/product.routes');
app.use('/api/products', productRoutes);

// Add cart routes.
const cartRoutes = require('./src/routes/cart.routes');
app.use('/api/cart', cartRoutes);

// Set port, listen for requests.
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
