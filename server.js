const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 9992;

// Connect to MongoDB
mongoose.connect('mongodb+srv://stormzzy:stormzzya@cluster0.62sko9e.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');

  // Set up routes
  const routes = require('./routes/routes');
  app.use(express.json());
  app.use(routes);

  // Start the server
  app.listen(port, (err) => {
    if (err) {
      console.error('Error starting the server:', err);
    } else {
      console.log(`Server started on port ${port}`);
    }
  });
});



