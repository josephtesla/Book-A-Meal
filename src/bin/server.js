import http from "http";
import app from "../index";

const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log("Server started on port :" + PORT)
}); 