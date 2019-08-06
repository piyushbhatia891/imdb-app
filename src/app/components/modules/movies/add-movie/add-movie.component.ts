import { Component, OnInit, OnDestroy } from "@angular/core";
import { MovieService } from "../../../../shared/services/movie.service";
import { FormGroup, Validators, FormBuilder, FormArray } from "@angular/forms";
import { MovieObject } from "../../../../shared/models/movie.model";
import { Router } from "@angular/router";
import { Actor } from "../../../../shared/models/actor.model";
import { Producer } from "../../../../shared/models/producer.model";
import { ToastService } from "src/app/shared/services/toastr.service";
import { Uploads } from "src/app/shared/models/uploads.model";
import { Subscription } from "rxjs";

@Component({
  selector: "app-add-movie",
  templateUrl: "./add-movie.component.html",
  styleUrls: ["./add-movie.component.scss"]
})
export class AddMovieComponent implements OnInit, OnDestroy {
  producer: any;
  producersList: Producer[] = [];
  actorsList: Actor[] = [];
  submitted: boolean = false;
  header = "add new movie";

  model: any = {};
  movieId: string;
  moviesData: any;
  movie: MovieObject;
  formVal: FormGroup;
  actor: any;
  progress = 0;
  url: string = "";
  subscription: Subscription;
  get f() {
    return this.formVal.controls;
  }
  get actorsArray(): FormArray {
    return this.formVal.get("actors") as FormArray;
  }

  get producersArray(): FormArray {
    return this.formVal.get("producers") as FormArray;
  }

  constructor(
    private service: MovieService,
    private router: Router,
    private toastr: ToastService,
    private fb: FormBuilder
  ) {
    this.initializeActorsList();
    this.initializeProducersList();
    this.subscription = this.service.uploadSubject.subscribe(
      (upload: Uploads) => {
        if (upload.url) {
          this.url = upload.url;
        }
      }
    );
  }

  ngOnInit() {
    this.formVal = this.fb.group({
      name: ["", Validators.required],
      releaseDate: ["", Validators.required],
      poster: [null, Validators.required],
      actors: this.fb.array([]),
      producers: this.fb.array([]),
      plot: ["", Validators.required]
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addActor() {
    if (this.actorsList.length == 0) {
      alert("Navigating to add an actor link for adding first actor");
      this.router.navigateByUrl("/add-actor");
    }
    if (this.actorsList.length != this.actorsArray.length) {
      let fg = this.createIdentities();
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
      let fg = this.createIdentities();
      this.producersArray.push(fg);
    } else {
      alert("You cant add more producers.");
    }
  }

  onSubmit() {
    let movie = this.formVal.value;
    if (this.formVal.invalid) {
      alert("please fill in all fields");
      return;
    }
    this.getMovieObjectToAddInDatabase(movie);
    this.service.addNewMovie(this.movie);
    this.resetAfterSavingInDatabase();
  }
  startUpload(event: FileList) {
    this.service.uploadFile(event);
  }
  private resetAfterSavingInDatabase() {
    this.formVal.reset();
    this.toastr.showToastMessage("New producer is added.");
    this.router.navigateByUrl("/home");
  }

  private getMovieObjectToAddInDatabase(movie: any) {
    this.movie = movie;
    this.movie.date = movie.releaseDate;
    this.movie.editable = false;
    this.movie.poster = this.url;
  }

  private createIdentities(): FormGroup {
    return this.fb.group({
      name: ""
    });
  }
  private initializeProducersList() {
    this.service.getProducers().subscribe(res => {
      let producers = res;
      producers.forEach(element => {
        this.producer = {};
        this.producer = element.payload.doc.data();
        this.producersList.push(this.producer);
      });
    });
  }

  private initializeActorsList() {
    this.service.getActors().subscribe(res => {
      let actors = res;
      actors.forEach(element => {
        this.actor = {};
        this.actor = element.payload.doc.data();
        this.actorsList.push(this.actor);
      });
    });
  }
}
