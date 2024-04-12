const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000
app.get('/test', (req, res) => {
    res.status(200).json({message: "hello world!"});
})
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})