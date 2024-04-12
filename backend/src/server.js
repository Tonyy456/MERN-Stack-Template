const express = require('express');
const path = require('path');
const dayjs = require('dayjs');
const app = express();
const PORT = process.env.PORT || 5000

app.use(express.static(path.join(__dirname, '../../frontend/build')));
app.get('*', (req, res) => {
    res.sendFile(
        path.resolve(__dirname, '../../frontend/build/index.html')
    )
})
app.listen(PORT, () => {
    const date = dayjs();
    console.log(`Listening on port ${PORT} at ${date.format('MM/DD/YY @ hh:mm:ss UTC')}`);
})