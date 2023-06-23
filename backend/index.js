const http = require("http");
const app = require("./app");
const server = http.createServer(app);

const { APP_PORT } = process.env;
const port = process.env.APP_PORT || 3000;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
