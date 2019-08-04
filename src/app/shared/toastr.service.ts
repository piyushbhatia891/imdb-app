import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root"
})
export class ToastService {
  constructor(private toastr: ToastrService) {}

  showToastMessage(message: string) {
    this.toastr.success(message);
  }
}
