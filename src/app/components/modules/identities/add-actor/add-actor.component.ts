import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MovieService } from "../../../../shared/services/movie.service";
import { Router } from "@angular/router";
import { ToastService } from "src/app/shared/services/toastr.service";
@Component({
  selector: "app-add-actor",
  templateUrl: "./add-actor.component.html",
  styleUrls: ["./add-actor.component.scss"]
})
export class AddActorComponent implements OnInit {
  formVal: any;
  actor: any;
  submitted: boolean = false;
  header = "add new actor";
  get f() {
    return this.formVal.controls;
  }
  constructor(
    private fb: FormBuilder,
    private service: MovieService,
    private router: Router,
    private toastr: ToastService
  ) {}

  ngOnInit() {
    this.formVal = this.fb.group({
      name: ["", Validators.required],
      dob: ["", Validators.required],
      sex: ["", Validators.required],
      bio: [""]
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.formVal.invalid) {
      alert("please fill in all fields");
      return;
    }
    this.actor = this.formVal.value;
    this.service.addNewActor(this.actor);
    this.formVal.reset();
    this.toastr.showToastMessage("New actor is added.");
    this.router.navigateByUrl("/home");
  }
}
