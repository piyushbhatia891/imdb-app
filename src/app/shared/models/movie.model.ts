import { Actor } from "./actor.model";
import { Producer } from "./producer.model";
import { Timestamp } from "rxjs";

export class MovieObject {
  id: string;
  name: string;
  date: Date;
  releaseDate: Date;
  plot: string;
  poster: string;
  actors: Actor[];
  producers: Producer[];
  editable: any;
  newVal: boolean;
}
