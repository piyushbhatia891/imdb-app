import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MovieService } from "../../../../shared/services/movie.service";
import { Router } from "@angular/router";
import { ToastService } from "src/app/shared/services/toastr.service";
@Component({
  selector: "app-add-producer",
  templateUrl: "./add-producer.component.html",
  styleUrls: ["./add-producer.component.scss"]
})
export class AddProducerComponent implements OnInit {
  formVal: any;
  producer: any;
  actorsList: any;
  submitted: boolean = false;
  header = "add new producer";
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
    let producer = this.formVal.value;
    this.producer = producer;
    this.service.addNewProducer(this.producer);

    this.formVal.reset();
    this.toastr.showToastMessage("New producer is added.");
    this.router.navigateByUrl("/home");
  }
}
