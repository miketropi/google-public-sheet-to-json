const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

const { sheetPublicToJson } = require("google-sheet-public-to-json");

app.get('/:googlesheet_public_id', async (req, res, next) => {
  try {
    const { googlesheet_public_id } = req.params;
    const JSON = await sheetPublicToJson(
      `https://docs.google.com/spreadsheets/d/${ googlesheet_public_id }/edit#gid=0`
      );
    req.data = JSON;
    next()
  } catch (err) {
    next(err);
  }
}, (req, res) => {
  try {
    res.json(req.data);
  } catch (err) {
    console.error(err);
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// 

// const { sheetPublicToJson } = require("google-sheet-public-to-json");
// async function S () {
//   const res = await sheetPublicToJson(
//     "https://docs.google.com/spreadsheets/d/1QGMit887A50dLYGEW0yrBgYIqM7FyXZe9AZWu9lNA7U/edit#gid=0"
//   );
//   console.log(res);
// }
// console.log(S());

