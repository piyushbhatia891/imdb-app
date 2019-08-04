import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IdentitiesModule } from "./modules/identities/identities.module";
import { MoviesModule } from "./modules/movies/movies.module";

@NgModule({
  declarations: [],
  imports: [CommonModule, MoviesModule, IdentitiesModule]
})
export class ComponentsModule {}
