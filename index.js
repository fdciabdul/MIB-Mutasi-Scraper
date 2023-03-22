const express = require('express');
const fs = require("fs");
const path = require("path")
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(require('compression')());


//job.start();

function includeRouter(folderName) {
  console.log(" ======================================= ")
  fs.readdirSync(folderName).forEach(function (file) {
    var fullName = path.join(folderName, file);
    var stat = fs.lstatSync(fullName);

    if (stat.isDirectory()) {
      includeRouter(fullName);
    } else if (file.toLowerCase().indexOf(".js")) {
      require("./" + fullName)(app);
      console.log(" Found Router => '" + fullName + "'");
    }
  });
  console.log(" ======================================= ")
}

// =================== Set Interval Refresh Check email Blast
includeRouter("app/controller/");


app.listen(port, () => console.log(`Server running on port ${port}.`));
