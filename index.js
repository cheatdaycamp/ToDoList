var express = require('express');
var app = express();
const PORT = 7000;

app.set('port', (process.env.PORT || PORT));
app.use(express.static(__dirname));

app.listen(app.get('port'), function () {
  console.log(`http://localhost:${PORT}/index.html`)
});
