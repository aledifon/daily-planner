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
  readonly update = output<Task>();

  onUpdateClick(): void {
    this.update.emit(this.task());
  }

  onDeleteClick(): void {
    this.delete.emit(this.task());
  }
}
