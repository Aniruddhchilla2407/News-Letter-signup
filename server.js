const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true })); // Parse form data
app.use(express.static('public')); // Serve static files from the "public" directory

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/newsletter', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const SubscriberSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
});

const Subscriber = mongoose.model('Subscriber', SubscriberSchema);

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle form submission
app.post('/subscribe', async (req, res) => {
  const { email } = req.body;

  try {
    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();
    res.send(`<h1>Thank you for subscribing, ${email}!</h1>`);
  } catch (error) {
    if (error.code === 11000) {
      res.send('<h1>Email already subscribed!</h1>');
    } else {
      res.send('<h1>Server error, please try again later.</h1>');
    }
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
