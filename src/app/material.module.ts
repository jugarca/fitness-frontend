/**
 * This module provides the necessary imports and exports for using Angular Material components.
 */
import { NgModule } from "@angular/core";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatIconModule } from "@angular/material/icon";
import { MatAutocompleteModule } from "@angular/material/autocomplete"; // Import the missing module
import { MatBadgeModule } from "@angular/material/badge"; // Import the missing module
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipInputEvent,MatChipsModule} from '@angular/material/chips';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatSortModule} from '@angular/material/sort';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@NgModule({
        declarations: [
            
        ],
        imports: [
            MatAutocompleteModule,
            MatBadgeModule, 
            MatButtonModule,
            MatButtonToggleModule,
            MatCardModule,
            MatCheckboxModule,
            MatChipsModule,
            MatDatepickerModule,
            MatDialogModule,
            MatExpansionModule,
            MatFormFieldModule,
            MatIconModule,
            MatInputModule,
            MatListModule,
            MatMenuModule,
            MatPaginatorModule,
            MatProgressSpinnerModule,
            MatSelectModule,
            MatSlideToggleModule,
            MatSortModule,
            MatStepperModule,
            MatTableModule,
            MatTabsModule,
            MatToolbarModule,
            MatTooltipModule,
            
        ],
        exports:[
             MatAutocompleteModule,
             MatBadgeModule,
             MatButtonModule,
             MatButtonToggleModule,
             MatCardModule,
             MatCheckboxModule,
             MatChipsModule,
             MatDatepickerModule,
             MatDialogModule,
             MatExpansionModule,
             MatFormFieldModule,
             MatIconModule,
             MatInputModule,
             MatListModule,
             MatMenuModule,
             MatPaginatorModule,
             MatProgressSpinnerModule,
             MatSelectModule,
             MatSlideToggleModule,
             MatSortModule,
             MatStepperModule,
             MatTableModule,
             MatTabsModule,
             MatToolbarModule,
             MatTooltipModule,
             
        ],
        providers: [],
        bootstrap: []
})
export class MaterialModule { }
