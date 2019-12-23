require('dotenv').config()
const express = require('express');
const app = express();
const fetch = require('node-fetch');
const toExcel = require('json2xls');
const PORT = process.env.PORT || 3500;
const apiURL = process.env.STRAPI;
const collectionToFetch = process.env.COLLECTION || 'interactions'
const fileName = process.env.FILENAME || `${collectionToFetch}.xls`;
app.use('/public', express.static(__dirname + '/public'));
app.use(toExcel.middleware);

app.get('/', (req, res) => {
    res.send('✅Service up.');
});

app.get('/extract-data', (req, res) => {
    fetch(`${apiURL}/${collectionToFetch}?_limit=-1`)
    .then(res => res.json())
    .then(json => {
        res.xls(fileName, json);
    })
    .catch(e => console.error(e));
})

app.listen(PORT, () => {
    console.log('🚀 Server ready on port ', PORT);
});