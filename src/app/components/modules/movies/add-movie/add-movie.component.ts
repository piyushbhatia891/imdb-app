import { Component, OnInit } from "@angular/core";
import { MovieService } from "../../../../shared/services/movie.service";
import {
  NgForm,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} from "@angular/forms";
import { MovieObject } from "../../../../shared/models/movie.model";
import { Router } from "@angular/router";
import { FirebaseStoreDatePipe } from "../../../../shared/pipes/firebase-store-date.pipe";
import { firestore } from "firebase/app";
import Timestamp = firestore.Timestamp;
import { formatDate } from "@angular/common";
import { Actor } from "../../../../shared/models/actor.model";
import { Producer } from "../../../../shared/models/producer.model";
import { ToastService } from "src/app/shared/toastr.service";

@Component({
  selector: "app-add-movie",
  templateUrl: "./add-movie.component.html",
  styleUrls: ["./add-movie.component.scss"]
})
export class AddMovieComponent implements OnInit {
  producer: any;
  producersList: Producer[] = [];
  actorsList: Actor[] = [];
  submitted: boolean = false;
  header = "add new movie";
  get f() {
    return this.formVal.controls;
  }
  get actorsArray(): FormArray {
    return this.formVal.get("actors") as FormArray;
  }

  get producersArray(): FormArray {
    return this.formVal.get("producers") as FormArray;
  }

  model: any = {};
  movieId: string;
  moviesData: any;
  movie: MovieObject;
  formVal: FormGroup;
  actor: any;
  constructor(
    private service: MovieService,
    private router: Router,
    private toastr: ToastService,
    private fb: FormBuilder
  ) {
    this.service.getActors().subscribe(res => {
      let actors = res;
      actors.forEach(element => {
        this.actor = {};
        this.actor = element.payload.doc.data();
        this.actorsList.push(this.actor);
      });
    });

    this.service.getProducers().subscribe(res => {
      let producers = res;
      producers.forEach(element => {
        this.producer = {};
        this.producer = element.payload.doc.data();
        this.producersList.push(this.producer);
      });
    });
  }

  ngOnInit() {
    this.formVal = this.fb.group({
      name: ["", Validators.required],
      releaseDate: ["", Validators.required],
      actors: this.fb.array([]),
      producers: this.fb.array([]),
      plot: ["", Validators.required]
    });
  }

  addActor() {
    let fg = this.fb.group(new Actor());
    this.actorsArray.push(fg);
  }

  addProducer() {
    let fg = this.fb.group(new Producer());
    this.producersArray.push(fg);
  }
  createIdentities(): FormGroup {
    return this.fb.group({
      name: ""
    });
  }

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

  onSubmit() {
    let movie = this.formVal.value;
    if (this.formVal.invalid) {
      alert("please fill in all fields");
      return;
    }
    this.movie = movie;
    this.movie.date = movie.releaseDate;
    this.service.addNewMovie2(this.movie);

    this.formVal.reset();
    this.toastr.showToastMessage("New producer is added.");
    this.router.navigateByUrl("/home");
  }
}
