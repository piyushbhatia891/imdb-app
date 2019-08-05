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
import { element } from "protractor";

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
    if (this.actorsList.length == 0) {
      alert("Navigating to add an actor link for adding first actor");
      this.router.navigateByUrl("/add-actor");
    }
    if (this.actorsList.length != this.actorsArray.length) {
      let fg = this.fb.group({ name: "" });
      this.actorsArray.push(fg);
    } else {
      alert("You cant add more actors.");
    }
  }

  addProducer() {
    if (this.producersList.length == 0) {
      alert("Navigating to add a producer link for adding producer actor");
      this.router.navigateByUrl("/add-producer");
    }
    if (this.producersList.length != this.producersArray.length) {
      let fg = this.fb.group({ name: "" });
      this.producersArray.push(fg);
    } else {
      alert("You cant add more producers.");
    }
  }
  createIdentities(): FormGroup {
    return this.fb.group({
      name: ""
    });
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
