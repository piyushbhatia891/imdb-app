import { Component } from "@angular/core";
import * as firebase from "firebase";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "imdb-app";
  constructor() {
    const config = {
      // copy firebase configuration from your firebase project
    };
    firebase.initializeApp(config);
  }
}
