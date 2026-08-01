import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { Task } from '../../models/task.models';

@Component({
  selector: 'app-task-card',
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
