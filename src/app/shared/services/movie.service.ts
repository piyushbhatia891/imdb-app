import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  DocumentChangeAction,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { Subject, Observable } from "rxjs";
import { Movie, MovieObject } from "../movie.model";
@Injectable({
  providedIn: "root"
})
export class MovieService {
  movieId = new Subject<string>();
  movies: AngularFirestoreCollection<MovieObject>;
  constructor(public firebaseStore: AngularFirestore) {
    this.getActors();
    this.getProducers();
    this.getMovies();
  }

  getActors() {
    return this.firebaseStore.collection("actors").snapshotChanges();
  }
  getProducers() {
    return this.firebaseStore.collection("producers").snapshotChanges();
  }

  getMovies() {
    return this.firebaseStore.collection("movies").snapshotChanges();
  }
  getMovieById(id: string) {
    return this.firebaseStore
      .collection("movies")
      .doc(id)
      .snapshotChanges();
  }
  setAndGetMovies(movie: Movie) {
    this.firebaseStore
      .collection("movies")
      .doc(movie.id)
      .set(movie);
    return this.getMovies();
  }
  addNewMovie(movie: Movie) {
    return this.firebaseStore.collection("movies").add(movie);
  }
  addNewMovie2(movie: MovieObject) {
    this.firebaseStore
      .collection<MovieObject>("movies")
      .add(JSON.parse(JSON.stringify(movie)));
  }
}
