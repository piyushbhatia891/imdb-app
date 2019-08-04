import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MoviesListComponent } from "./movies-list/movies-list.component";
import { AddMovieComponent } from "./add-movie/add-movie.component";
import { SharedModule } from "../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [MoviesListComponent, AddMovieComponent],
  imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule]
})
export class MoviesModule {}
