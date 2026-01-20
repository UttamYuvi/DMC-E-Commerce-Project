import adminAxios from "../axios/AdminAxios";
import createServer from "../createServer";

const AdminServer = createServer(adminAxios);

export default AdminServer;
