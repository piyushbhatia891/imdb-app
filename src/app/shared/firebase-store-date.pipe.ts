import { Inject, LOCALE_ID, Pipe, PipeTransform } from "@angular/core";
import { firestore } from "firebase/app";
import Timestamp = firestore.Timestamp;
import { formatDate } from "@angular/common";

@Pipe({
  name: "firebaseStoreDate"
})
export class FirebaseStoreDatePipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private locale: string) {}

  transform(timestamp: Timestamp, format?: string): string {
    return formatDate(timestamp.toDate(), format || "medium", this.locale);
  }
  transform2(date: Date, format?: string): string {
    return formatDate(date, format || "full", this.locale);
  }
}
