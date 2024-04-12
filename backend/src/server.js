const express = require('express');
const path = require('path');
const dayjs = require('dayjs');
const app = express();

app.use(express.static(path.join(__dirname, '../../frontend/build')))
app.use(express.json());
app.get("*", (req,res) => { 
  res.sendFile(
      path.resolve(__dirname, '../../frontend/build/index.html')
); }) //wild card. redirect unknown pages to react...

// start server!
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    const day = dayjs();
    console.log(`Listening on port ${PORT} ${day.format('MM/DD/YY @ hh:mm:ss')}`);
})