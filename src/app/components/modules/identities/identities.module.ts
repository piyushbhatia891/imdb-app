import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AddActorComponent } from "./add-actor/add-actor.component";
import { AddProducerComponent } from "./add-producer/add-producer.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [AddProducerComponent, AddActorComponent],
  imports: [CommonModule, SharedModule]
})
export class IdentitiesModule {}
