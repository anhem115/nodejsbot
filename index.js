const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json());

require('./routes/dialogFlowRoutes')(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, function() {
  console.log('CORS-enabled web server listening on port 80')
});


