import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { MoviesListComponent } from "../components/modules/movies/movies-list/movies-list.component";
import { AddMovieComponent } from "../components/modules/movies/add-movie/add-movie.component";
import { AddActorComponent } from "../components/modules/identities/add-actor/add-actor.component";
import { AddProducerComponent } from "../components/modules/identities/add-producer/add-producer.component";

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
    path: "add-actor",
    component: AddActorComponent
  },
  {
    path: "add-producer",
    component: AddProducerComponent
  },
  {
    path: "**",
    redirectTo: "movies-list",
    pathMatch: "full"
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)]
})
export class RoutingModule {}
