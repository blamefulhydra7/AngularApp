import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  mensaje: string = '';
  mensajes: any[] = [];
  usuario: string = '';
  sala: string = '';
  salas: string[] = ['Sala 1', 'Sala 2', 'Sala 3'];
  loggeado: boolean = false;

  constructor(private socket: SocketService) {}

  ngOnInit(): void {
    this.socket.listen('mensaje').subscribe((mensaje) => {
      if(!this.loggeado) return;
      this.mensajes.push(mensaje);
    })
  }

  /**
   * @description Método para enviar mensajes a los clientes de la misma sala.
   * @returns {void}
   */
  enviar(): void {
    this.mensaje = this.mensaje.trim();

    if(this.mensaje === '') return; 

    this.socket.emit('mensaje', {remitente: this.usuario, msg: this.mensaje, sala: this.sala});
    this.mensaje = '';
  }

  /**
   * @description Logea al usuario a una sala del socket.
   * @returns {void}
   */
  logIn(): void {
    this.usuario = this.usuario.trim();
    
    if(this.usuario === '' || this.sala === '') return;

    this.socket.emit('login', {sala: this.sala});

    this.loggeado = true;
  }
}
