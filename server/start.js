const db = require('./db.js');

const app = require('./index.js');
const port = process.env.PORT || 8000;

db.sync().then(function() {
  app.listen(port);
  console.log(`I am listening on port: ${port}`);
});
