import { Pipe, PipeTransform } from '@angular/core';
import { Task } from 'src/app/shared/interface';


@Pipe({
    name: 'postsSearch'
})
export class PostsSearch implements PipeTransform {

    transform(tasks: Task[], search = ''): Task[] {
        if (!search.trim()) {
            return tasks;
        }
        return tasks.filter((post) => {
            return post.title.toLowerCase().includes(search.toLowerCase());
        });
    }
}
