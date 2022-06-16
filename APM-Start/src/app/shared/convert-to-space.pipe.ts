import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'convertToSpace'
})

export class ConvertToSpace implements PipeTransform{
    transform(value: string, ...args: string[]) {
        return value.replace(args[0], " ")
    }

}