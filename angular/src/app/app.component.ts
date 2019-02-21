import {Component, OnDestroy, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef} from '@angular/core';
import {TasksService} from './services/tasks.service';
import {Task} from './models/task';
import {MatDialog, MatPaginator, MatSort, PageEvent} from '@angular/material';
import {ModalComponent, baseDataModal} from './modal/modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit, OnDestroy, AfterViewInit {

    isLoadingResults: boolean=false;
    result;
    textFilter;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private tasksService: TasksService, private cd: ChangeDetectorRef, public dialog: MatDialog) { }

    ngOnInit() {
        this.paginator.page.subscribe(() =>{
            this.list();
        });
    }

    ngAfterViewInit(): void {
        this.list();
        this.cd.detectChanges();
    }

    ngOnDestroy() {}

    filter() {
        this.paginator.pageIndex = 0;
        this.list();
    }

    list() {
        this.showLoading();
        this.tasksService
            .list(this.paginator.pageIndex+1, this.paginator.pageSize, this.textFilter)
            .subscribe((result) => {
                this.hideLoading(() => {
                    this.result = result;
                    this.paginator.length = result['total'] || null;
                });
            });
    }

    openModal(task: Task): void {
        const dialogRef = this.dialog.open(ModalComponent, {
            width: '250px',
            data: <baseDataModal>{
                task: new Task({
                    id: task.id,
                    task: task.task,
                }),
                onSaved: (task) => {
                    this.list();
                }
            }
        });
    }


    create() {
        this.openModal(new Task());
    }

    edit(task: Task) {
        this.openModal(task);
    }

    delete(task: Task, $event: MouseEvent) {
        $event.stopPropagation();
        if (confirm("Você tem certeza que quer apagar ?")) {
            this.tasksService.delete(task).subscribe(() => {
                this.list();
            });
        }
    }

    showLoading() {
        this.isLoadingResults = true;
    }

    hideLoading(call) {
      setTimeout(() => {
        this.isLoadingResults = false;
          call();
      }, 2000)
    }


}
