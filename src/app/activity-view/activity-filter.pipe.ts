import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'activityFilter'
})
export class ActivityFilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLocaleLowerCase();

    return items.filter(it => {
      const fullName = it.contact.firstName + ' ' + it.contact.lastName + ' ' + it.subject;
      return fullName.toLocaleLowerCase().includes(searchText);
    });
  }
}
