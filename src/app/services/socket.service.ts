import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket) { }

  listen(evento: string): Observable<unknown> {
    return this.socket.fromEvent(evento);
  }

  emit(evento: string, payload: any): void {
    this.socket.emit(evento, payload);
  }
}
