import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { environment } from "../environments/environment";
import { ComponentsModule } from "./components/components.module";
import { RoutingModule } from "./routing/routing.module";
import { ToastrModule } from "ngx-toastr";

import { AppComponent } from "./app.component";
import { FirebaseStoreDatePipe } from "./shared/pipes/firebase-store-date.pipe";

@NgModule({
  declarations: [AppComponent, FirebaseStoreDatePipe],
  imports: [
    BrowserModule,
    ComponentsModule,
    RoutingModule,
    AngularFontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebase, "imdb-app"),
    AngularFirestoreModule,
    AngularFireStorageModule,
    RouterModule,
    ToastrModule.forRoot()
  ],
  providers: [FirebaseStoreDatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {}
