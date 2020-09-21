import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material";
import { MatInputModule } from "@angular/material/input/typings/input-module";
import { MatTableModule } from "@angular/material/table/typings/table-module";



@NgModule({
    exports: [
      MatInputModule,
      MatTableModule,
      MatButtonModule,
      MatInputModule,
    ]
})

export class MaterialModule { }