import { SocketIoConfig } from "ngx-socket-io";
import { environment } from "src/environments/environment";

const { socketURL: url } = environment;

const socketConfig: SocketIoConfig = {
    url
}

export default socketConfig;