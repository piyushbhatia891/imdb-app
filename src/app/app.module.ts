import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MaterialModule } from "./modules/material/material.module";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { environment } from "../environments/environment";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { MoviesListComponent } from "./movies-list/movies-list.component";
import { AddMovieComponent } from "./add-movie/add-movie.component";
import { EditMovieComponent } from "./edit-movie/edit-movie.component";
import { FirebaseStoreDatePipe } from "./shared/firebase-store-date.pipe";

const routes: Routes = [
  {
    path: "movies-list",
    component: MoviesListComponent
  },
  {
    path: "add-movie",
    component: AddMovieComponent
  },
  {
    path: "edit-movie",
    component: EditMovieComponent
  },
  {
    path: "**",
    redirectTo: "movies-list",
    pathMatch: "full"
  }
];
@NgModule({
  declarations: [
    AppComponent,
    MoviesListComponent,
    AddMovieComponent,
    EditMovieComponent,
    FirebaseStoreDatePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule,
    RouterModule.forRoot(routes),
    AngularFontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebase, "imdb-app"),
    AngularFirestoreModule
  ],
  providers: [FirebaseStoreDatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {}
