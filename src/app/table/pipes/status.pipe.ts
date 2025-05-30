import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {
  transform(value: string): string {
    if (value === 'active') {
      return '✓ Active';
    } else if (value === 'inactive') {
      return '✗ Inactive';
    }
    return value;
  }
}
