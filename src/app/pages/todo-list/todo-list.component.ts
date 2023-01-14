import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  tarea: string = '';
  tareas: string[] = [];

  agregarTarea(event: Event): void {
    event.preventDefault();
    this.tarea = this.tarea.trim();

    if(this.tarea === '')
    {
      Swal.fire('Cuidado', 'El campo de tarea está vacío', 'warning');
      return;
    }
    this.tareas.push(this.tarea);
    console.log(this.tarea);
    this.tarea = '';
  }

  completada(): void {
    
  }
}
