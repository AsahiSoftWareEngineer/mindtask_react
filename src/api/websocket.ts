export class WebSocketService {
    public socket;

    constructor(url:string) {
        this.socket = new WebSocket(url);
    }

    revice = () => {
        return this.socket.onmessage;
    }
}