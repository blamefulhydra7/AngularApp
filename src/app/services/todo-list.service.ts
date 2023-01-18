import { Injectable } from '@angular/core';
import axios from 'src/configurations/axiosInstance';
import { endpoints } from 'src/configurations/endpoints';
import { Tarea } from 'src/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  constructor() { }

  getTareas(): Promise<Tarea[]> {
    return axios.get<[], Tarea[]>(endpoints.todoList.base());
  }

  addTarea(tarea: Tarea): Promise<void> {
    return axios.post(endpoints.todoList.base(), { tarea });
  }
}
