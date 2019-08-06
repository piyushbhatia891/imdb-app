import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { Subject } from "rxjs";
import { MovieObject } from "../models/movie.model";
import { Actor } from "../models/actor.model";
import { Producer } from "../models/producer.model";
import { AngularFireStorage } from "@angular/fire/storage";
import { Uploads } from "../models/uploads.model";
import * as firebase from "firebase/app";
@Injectable({
  providedIn: "root"
})
export class MovieService {
  movies: AngularFirestoreCollection<MovieObject>;
  snapshot: any;
  uploadSubject = new Subject<Uploads>();
  upload: Uploads;
  constructor(
    public firebaseStore: AngularFirestore,
    private firebaseStorage: AngularFireStorage
  ) {
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
  setAndGetMovies(movie: MovieObject) {
    this.firebaseStore
      .collection("movies")
      .doc(movie.id)
      .set(movie);
  }

  addNewMovie(movie: MovieObject) {
    this.firebaseStore
      .collection<MovieObject>("movies")
      .add(JSON.parse(JSON.stringify(movie)));
  }

  addNewActor(actor: Actor) {
    this.firebaseStore
      .collection<MovieObject>("actors")
      .add(JSON.parse(JSON.stringify(actor)));
  }

  addNewProducer(producer: Producer) {
    this.firebaseStore
      .collection<MovieObject>("producers")
      .add(JSON.parse(JSON.stringify(producer)));
  }
  uploadFile(event: FileList): Uploads {
    // The File object
    const file = event.item(0);
    this.upload = new Uploads(file);
    // Client-side validation example
    if (file.type.split("/")[0] !== "image") {
      console.error("unsupported file type :( ");
      return;
    }

    // The storage path
    const path = `uploads/${new Date().getTime()}_${file.name}`;
    let storageRef = this.firebaseStorage.storage.ref();
    let uploadTask = storageRef.child(path).put(file);
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot => {
        // upload in progress
        this.upload.progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.uploadSubject.next(this.upload);
      },
      error => {
        // upload failed
        console.log(error);
      },
      () => {
        // upload success
        this.firebaseStorage.storage
          .ref()
          .child(path)
          .getDownloadURL()
          .then(res => {
            this.upload.url = res;
            this.uploadSubject.next(this.upload);
          });
        this.upload.name = this.upload.file.name;
      }
    );
  }
}
