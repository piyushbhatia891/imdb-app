import { Component, OnInit } from "@angular/core";
import { MovieService } from "../shared/services/movie.service";
import { NgForm, FormGroup, FormControl, Validators } from "@angular/forms";
import { MovieObject } from "../shared/movie.model";
import { Router } from "@angular/router";
import { FirebaseStoreDatePipe } from "../shared/firebase-store-date.pipe";
import { firestore } from "firebase/app";
import Timestamp = firestore.Timestamp;
import { formatDate } from "@angular/common";

@Component({
  selector: "app-add-movie",
  templateUrl: "./add-movie.component.html",
  styleUrls: ["./add-movie.component.css"]
})
export class AddMovieComponent implements OnInit {
  model: any = {};
  movieId: string;
  moviesData: any;
  movie: MovieObject;

  constructor(
    private service: MovieService,
    private router: Router,
    private datePipe: FirebaseStoreDatePipe
  ) {
    this.movie = new MovieObject(
      "",
      "",
      new Date(),
      new Date(),
      "",
      "",
      [],
      [],
      false,
      true
    );
    this.service.movieId.subscribe((movieId: string) => {
      this.movieId = movieId;
      this.getMovieDetails(this.movieId);
    });
  }

  ngOnInit() {}
  submitForm() {
    if (
      this.movie.name == "" ||
      this.movie.actors.length == 0 ||
      this.movie.producers.length == 0
    ) {
      alert("Please fill all required fields");
      return false;
    }
    let date = this.movie.date;

    this.movie.releaseDate = new Date(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds()
    );
    this.service.addNewMovie2(this.movie);
    this.router.navigateByUrl("/home");
  }

  getMovieDetails(id: string) {
    this.service.getMovieById(id).subscribe(res => {
      this.moviesData = res;
    });
  }
}
