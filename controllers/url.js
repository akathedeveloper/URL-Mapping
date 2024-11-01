const URL = require('../models/url');

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: 'URL is required' });
    
    // Dynamically import nanoid to avoid ESM conflict with require
    const { nanoid } = await import('nanoid');
    
    const shortID = nanoid(8);
    await URL.create({
        shortId: shortID,
        redirectUrl: body.url,
        visitHistory: []
    });
    
    return res.json({ id: shortID });
}

module.exports = {
    handleGenerateNewShortURL,
};
