import { Component, OnInit } from "@angular/core";
import { MovieService } from "../../../../shared/services/movie.service";
import { Router } from "@angular/router";
import { Movie, MovieObject } from "../../../../shared/models/movie.model";
import { firestore } from "firebase/app";
import Timestamp = firestore.Timestamp;
import { formatDate } from "@angular/common";

@Component({
  selector: "app-movies-list",
  templateUrl: "./movies-list.component.html",
  styleUrls: ["./movies-list.component.scss"]
})
export class MoviesListComponent implements OnInit {
  moviesList: any;
  moviesValues: Movie[];
  movie: Movie;
  constructor(private moviesService: MovieService, private router: Router) {
    this.moviesValues = [];
  }

  ngOnInit() {
    this.getMovieData();
  }
  getMovieData() {
    this.moviesValues = [];
    this.moviesService.getMovies().subscribe(res => {
      this.moviesList = res;

      this.moviesList.forEach(element => {
        this.movie = {
          editable: false,
          name: element.payload.doc.data().name,
          id: element.payload.doc.id,
          releaseDate: element.payload.doc.data().releaseDate,
          date: element.payload.doc.data().releaseDate,
          actors: element.payload.doc.data().actors,
          producers: element.payload.doc.data().producers,
          plot: element.payload.doc.data().plot || "",
          poster: ""
        };
        this.moviesValues.push(this.movie);
      });
    });
  }
  editMovie(movieVal: Movie) {
    this.moviesService.movieId.next(movieVal.id);
    this.moviesValues
      .filter((movie: Movie) => {
        return movie.id === movieVal.id;
        //return movie;
      })
      .map((movie: Movie) => {
        movie.editable = true;
        return movie;
      });
    //this.router.navigateByUrl("/edit-movie")
  }
  saveMovie(movie: Movie) {
    movie.releaseDate = movie.date;
    this.moviesService.setAndGetMovies(movie);
    this.moviesService.getMovies().subscribe(res => {
      this.moviesList = res;
      this.moviesValues = [];
      this.moviesList.forEach(element => {
        this.movie = element.payload.doc.data();
        this.movie.editable = false;
        this.movie.id = element.payload.doc.id;
        this.moviesValues.push(this.movie);
      });
    });
  }
  addNewMovie() {
    this.router.navigateByUrl("/add-movie");
  }
  addNewActor() {
    this.router.navigateByUrl("/add-actor");
  }
  addNewProducer() {
    this.router.navigateByUrl("/add-producer");
  }
}
