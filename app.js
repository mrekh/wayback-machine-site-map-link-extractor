"use strict"

const fs = require("fs");
const xlsx = require("xlsx");

// Read main.xlsx
let workbook = xlsx.readFile("main.xlsx");
let outputWorkbook = workbook.Sheets[workbook.SheetNames[0]];

// Read input.txt & Write URLs on main.xlsx
fs.readFile("./input.txt", "utf-8", (err, data) => {
  if (err) throw err;
  data = data.match(/(?=https?).*?(?=['"])/gi);
  
  data.forEach((e, i, data) => {
    data[i] = ["".concat("http://", data[i].replace(/https:\/\/web\.archive\.org\/web\/\d*\//, ""))];
  });
  
  let ws_data = data;
  xlsx.utils.sheet_add_aoa(outputWorkbook, ws_data, { origin: {r: 1, c: 0} });
  xlsx.writeFile(workbook, "main.xlsx");
})
