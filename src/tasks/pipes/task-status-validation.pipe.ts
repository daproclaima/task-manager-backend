import {
  BadRequestException,
  PipeTransform /* , ArgumentMetadata */,
} from '@nestjs/common';
import { TaskStatus } from '../task.model';

export class TaskStatusValidationPipe implements PipeTransform {
  // can not be modified at runtime
  readonly allowedStatuses = [
    TaskStatus.IN_PROGRESS,
    TaskStatus.OPEN,
    TaskStatus.DONE,
  ];
  transform(value: any /* , metadata: ArgumentMetadata */): any {
    // console.log(value);
    // // console.log(metadata);
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" in not a valid status`);
    }
    return value;
  }

  private isStatusValid(status: any) {
    const idx = this.allowedStatuses.indexOf(status);
    return idx !== -1;
  }
}
