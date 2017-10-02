import { Pipe, PipeTransform } from '@angular/core';
import { Requirement } from '../schemas/requirement';

@Pipe({
  name: 'tag',
  pure: false
})

/* The purpose of this pipe is to return a list of values that
contain tags passed in via user imput or static tag search

usage: *ngFor="let item of (items | tag: tags)
*/
export class TagPipe implements PipeTransform {
  transform(requirements: any[], args: string[]) {
    const reqs: any[] = [];
    const activeTags = new Set(args);

    if (activeTags.size === 0) { return requirements }

    for (const req of requirements) {
      let hasAll = true;
      activeTags.forEach(function (t) {
        if (Object.keys(req).includes("tags")) {
          if (!req.tags.includes(t)) { hasAll = false }
        } else if (Object.keys(req).includes("requirements")) {
          if (!req.requirements.includes(t)) { hasAll = false }
        }
      });
      if (hasAll) {
        reqs.push(req)
      }
    }
    return reqs;
  }
}