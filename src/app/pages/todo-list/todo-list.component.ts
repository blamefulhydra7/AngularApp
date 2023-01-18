import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { TodoListService } from 'src/app/services/todo-list.service';
import { Tarea } from 'src/interfaces/interfaces';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  tarea!: Tarea;
  tareas: Tarea[] = [];
  contador: number = 1;

  constructor(private servicio: TodoListService) { }

  ngOnInit(): void {
    this.tarea = {
      Descripcion: ''
    }

    this.servicio.getTareas()
      .then(tareas => {
        this.tareas = tareas;
      })
      .catch(() => {
        Swal.fire('Error', 'Error al obtener las tareas', 'error');
      });
  }


  agregarTarea(event: Event): void {
    event.preventDefault();
    this.tarea.Descripcion = this.tarea.Descripcion.trim();

    if (this.tarea.Descripcion === '') {
      return;
    }

    this.servicio.addTarea(this.tarea)
      .then(() => {
        this.tareas.push({ ...this.tarea })
        this.tarea.Descripcion = '';
      })
      .catch(() => Swal.fire('Error', 'Error al guardar la tarea', 'error'));

  }

  completada(tarea: Tarea): void {
    tarea.Completada = !tarea.Completada;
  }
}
