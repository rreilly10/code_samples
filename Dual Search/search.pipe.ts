import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})

/* The purpose of this pipe is to return a list of values that
contain text passed in via user input or a static search

usage: *ngFor="let item of items | search:searchTerm"
*/
export class SearchPipe implements PipeTransform {
  transform(value: any, args: string) {
    if (args.length >= 1 && value.constructor === Array) {
      return value.filter((item: any) => {
        if (typeof item === 'object') {
          return JSON.stringify(item).toLowerCase().includes(args.toLowerCase());
        } else {
          return item.toString().toLowerCase().includes(args.toLowerCase());
        }
      });
    } else {
      return value;
    }
  }

}