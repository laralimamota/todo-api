import { Injectable } from '@nestjs/common';
import { Task } from './task.model';

@Injectable()
export class TasksService {
    private tasks: Task[] = []

    createTask(titulo: string, descricao: string): Task {
        const newTask = new Task(titulo, descricao);
        this.tasks.push(newTask);
        //gambiarrinha pois não estamos usando banco de dados. normalmente aqui adicionaríamos um resgistro no banco de dados com um sql
        return newTask;

    }

    getAllTasks(): Task[]{
        return this.tasks;
    }

    getTaskById(id: string): Task {
        return this.tasks.find((task) => task.id === id)
    }
}
