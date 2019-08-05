import { Actor } from "./actor.model";
import { Producer } from "./producer.model";
import { Timestamp } from "rxjs";

export class MovieObject {
  constructor(
    public id: string,
    public name: string,
    public date: Date,
    public releaseDate: Date,
    public plot: string,
    public poster: string,
    public actors: Actor[],
    public producers: Producer[],
    public editable: any,
    public newVal: boolean
  ) {}
}
