import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringFormat'
})
export class StringFormatPipe implements PipeTransform {

  transform(value: string, format: string): string {
    switch (format) {
      case 'identification':
        break;
      case 'phone':
        break;
      default:
        break;
    }
    if (format === '' || format === undefined || format === null ) {
      return value;
    } else if (format === 'identification') {
      return `${value.substring(0, 3)}-${value.substring(3, 10)}-${value.substring(10)}`
    } else if (format === 'phone' && value.substring(0, 1) === '8' && value.substring(2, 3) === '9' && value.length < 10) {

      return `(${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6, 10)}`
    } else {
      return value;
    }
  }

}
