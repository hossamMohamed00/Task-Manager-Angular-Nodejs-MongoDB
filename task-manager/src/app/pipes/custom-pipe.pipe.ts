import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'customPipe'
})
export class CustomPipePipe implements PipeTransform {
  transform(value: string, ...args: string[]): string {
    return value.toUpperCase()
  }
}
