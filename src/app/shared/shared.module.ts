import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "../material.module";
import { TranslocoRootModule } from "../transloco-root.module";
import { ConfirmDialogComponent } from "./components/confirm-dialog.component";

@NgModule({
    declarations: [
        ConfirmDialogComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        RouterModule,
        TranslocoRootModule,
        FormsModule,
        MatDialogModule
    ],
    providers: [],
    bootstrap: []
  })
  export class SharedModule { }