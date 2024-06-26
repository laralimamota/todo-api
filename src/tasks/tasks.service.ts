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

    deleteTaskById(id: string): void {
        let tasksAtualizadas: Task[] = [];
        tasksAtualizadas = this.tasks.filter((task) => task.id !== id);
        this.tasks = tasksAtualizadas;
      }

    updateTask(id:string, titulo:string, descricao:string, status: 'ABERTA' | 'FEITA'): Task {
        const task = this.getTaskById(id);
        if(!task) {
            return null
        }

        task.titulo = titulo;
        task.descricao = descricao;
        task.status = status;

        return task
    }

    patchTask(id: string, updates: Partial<Task>): Task{
        const task = this.getTaskById(id);
        if(!task) {
            return null;
        }

        const camposAceitos = ['titulo', 'descricao', 'status'];

        Object.keys(updates).forEach((key) => {
            if(camposAceitos.includes(key)){
                task[key] = updates[key]
            }
        })
    }
}
