import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Task } from '../../models/task.models';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskCard {
  readonly task = input.required<Task>();
}
