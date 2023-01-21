import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { TodoListService } from 'src/app/services/todo-list.service';
import { Tarea } from 'src/interfaces/interfaces';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  tarea!: Tarea;
  tareas: Tarea[] = [];
  contador: number = 1;

  constructor(private servicio: TodoListService, private socket: SocketService) { }

  ngOnInit(): void {
    this.tarea = {
      Descripcion: ''
    }

    this.servicio.getTareas()
      .then((tareas: Tarea[]) => {
        this.tareas = tareas;
      })
      .catch(() => {
        Swal.fire('Error', 'Error al obtener las tareas', 'error');
      });
    
  }

  /**
   * @description Método para agregar la tarea nueva en la tabla de tareas de SQL Server.
   * @param event 
   * @returns 
   */
  agregarTarea(event: Event): void {
    event.preventDefault();
    this.tarea.Descripcion = this.tarea.Descripcion.trim();

    if (this.tarea.Descripcion === '') {
      return;
    }

    this.servicio.addTarea(this.tarea)
      .then(({ TareaID }) => {
        this.tareas.push({ ...this.tarea, TareaID })
        this.tarea.Descripcion = '';
      })
      .catch(() => Swal.fire('Error', 'Error al guardar la tarea', 'error'));

  }

  /**
   * @description Método para marcar las tareas como completadas.
   * @param {Tarea} tarea 
   */
  completada(tarea: Tarea): void {
    tarea.Completada = !tarea.Completada;

    this.servicio.updateTarea(tarea)
      .catch(() => {
        tarea.Completada = !tarea.Completada;
        Swal.fire('Error', 'Error al actualizar la tarea', 'error');
      })
  }
}
