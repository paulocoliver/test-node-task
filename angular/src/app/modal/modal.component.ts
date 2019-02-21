import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {TasksService} from '../services/tasks.service';
import {Task} from '../models/task';

export interface baseDataModal {
    task: Task;
    onSaved(task: Task);
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

    task: Task;

    constructor(
        private tasksService: TasksService,
        public dialogRef: MatDialogRef<ModalComponent>,
        @Inject(MAT_DIALOG_DATA) public dataDialog: baseDataModal) {

        this.task = dataDialog.task;
    }

    save(): void {
        this.dialogRef.close();

        let request;
        if (this.task.id) {
            request = this.tasksService.update(this.task);
        } else {
            request = this.tasksService.create(this.task);
        }

        request.subscribe((task) => {
          this.dataDialog.onSaved(task);
        })
    }

    ngOnInit() {
    }

}
