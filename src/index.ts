import { server } from "./server";
const PORT = process.env.PORT;
import dotenv from "dotenv";

dotenv.config();

const startApp = () => {
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
startApp();
