require('dotenv').config();
const express = require('express');
const { connectToMongoDB } = require('./connect');
const urlRoute = require('./routes/url');
const URL = require('./models/url');
const app = express();
const PORT = 8000;


// Replace <username>, <password>, and <dbname> with your details
const mongoUri = process.env.MONGO_URI;
console.log(mongoUri);

connectToMongoDB(mongoUri).then(() => {
    console.log('Connected to MongoDB Atlas');
}).catch(error => {
    console.error('MongoDB connection error:', error);
});

app.use(express.json());

app.use("/url", urlRoute);

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        { shortId, },
        {$push: {visitHistory:{timestamp:Date.now()},}},
    )
    res.redirect(entry.redirectUrl)
})
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
