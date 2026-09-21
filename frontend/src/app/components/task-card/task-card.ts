import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Task } from '../../models/task.models';

@Component({
  selector: 'app-task-card',
  imports: [DatePipe],
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskCard {
  readonly task = input.required<Task>();
  readonly delete = output<Task>();
  readonly edit = output<Task>();

  onEditClick(): void {
    this.edit.emit(this.task());
  }

  onDeleteClick(): void {
    this.delete.emit(this.task());
  }
}
