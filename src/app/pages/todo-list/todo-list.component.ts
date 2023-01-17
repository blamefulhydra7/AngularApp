import { Component, OnInit } from '@angular/core';
import { Tarea } from 'src/interfaces/interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  tarea!: Tarea;
  tareas: Tarea[] = [];
  contador: number = 1;

  ngOnInit(): void {
    this.tarea = {
      TareaID: this.contador,
      Descripcion: ''
    }
  }

  agregarTarea(event: Event): void {
    event.preventDefault();
    this.tarea.Descripcion = this.tarea.Descripcion.trim();

    if (this.tarea.Descripcion === '') {
      Swal.fire('Cuidado', 'El campo de tarea está vacío', 'warning');
      return;
    }

    this.tareas.push({ ...this.tarea });

    this.contador += 1;
    this.tarea.TareaID = this.contador;
    this.tarea.Descripcion = '';
  }

  completada(tarea: Tarea): void {
    tarea.Completada = !tarea.Completada;
  }
}
