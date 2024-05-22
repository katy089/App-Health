const server = require("./src/app");
const { connection } = require("./src/database/db.js");
const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  connection.sync({ force: false }).catch((err) => console.log(err));
  console.log(`Server running on port ${PORT}`);
});
