import { Injectable } from '@angular/core';
import axios from 'src/configurations/axiosInstance';
import { endpoints } from 'src/configurations/endpoints';
import { Tarea } from 'src/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  constructor() { }

  /**
   * @description Método para pedirle al back las tareas no completadas de SQL Server.
   */
  getTareas(): Promise<Tarea[]> {
    return axios.get<[], Tarea[]>(endpoints.todoList.base());
  }

  /**
   * @description Método para mandar por body la nueva tarea al Back.
   * @param {Tarea} tarea
   */
  addTarea(tarea: Tarea): Promise<any> {
    return axios.post(endpoints.todoList.base(), { tarea });
  }

  /**
   * @description Método para actualizar una tarea.
   * @param {Tarea} tarea 
   * @returns Promise<void>
   */
  updateTarea(tarea: Tarea): Promise<void> {
    return axios.put(endpoints.todoList.base(), { tarea });
  }
}
