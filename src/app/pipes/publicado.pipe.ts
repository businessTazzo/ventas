import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'publicado'
})
export class PublicadoPipe implements PipeTransform {

  transform(value: any): any {
    switch (value) {
      case true: return 'SI';
      case false: return 'NO';
    }
  }

}
