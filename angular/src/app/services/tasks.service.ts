import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {Task} from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

    private url = 'http://0.0.0.0:3333/tasks';

    constructor(private http: HttpClient) { }

    private defaultHttpOptions() {
        return {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
    }

    list (page: number, perPage: number, textFilter?): Observable<Task[]> {

        page = page <= 0 ? 1 : page;

        let httpOptions = this.defaultHttpOptions();

        httpOptions['params'] = {
            page: page,
            perPage: perPage,
            q: textFilter || '',
        };
        return this.http.get<Task[]>(this.url, httpOptions)
            .pipe(
                map(response => {
                    let result = [];
                    response['data'].forEach((item: any) => {
                        result.push(new Task(item));
                    });
                    response['data'] = result;
                    return response;
                })
            )
    }

    create (task: Task): Observable<Task> {
        let httpOptions = this.defaultHttpOptions();

        return this.http.post<Task[]>(this.url, {task: task.task}, httpOptions)
            .pipe(
                map(response => {
                    return new Task(response);
                })
            )
    }

    update (task: Task): Observable<Task> {
        let httpOptions = this.defaultHttpOptions();

        return this.http.put<Task[]>(`${this.url}/${task.id}`, {task: task.task}, httpOptions)
            .pipe(
                map(response => {
                    return new Task(response);
                })
            )
    }

    delete (task: Task): Observable<any> {
        let httpOptions = this.defaultHttpOptions();
        console.log(`${this.url}/${task.id}`);
        return this.http.delete(`${this.url}/${task.id}`, httpOptions);
    }
}
