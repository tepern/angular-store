import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cost'
})
export class CostPipe implements PipeTransform {
  
  transform(value: bigint | number | null, ...args: unknown[]): string {
    return new Intl.NumberFormat('ru').format(Number(value));
  }

}
