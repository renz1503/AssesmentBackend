const app = require('../server/index')

const port = process.env.PORT || 3001;

const server = app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });

module.exports = server