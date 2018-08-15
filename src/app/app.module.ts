import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MatAutocompleteModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatOptionModule, MatProgressBarModule, MatRadioModule, MatSelectModule, MatSidenavModule, MatSlideToggleModule, MatSnackBarModule, MatToolbarModule, MatTooltipModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import 'hammerjs';
import { AdminComponent } from './admin/admin.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/authGaurd';
import { BadPathComponent } from './bad-path/bad-path.component';
import { CardImageDialog } from './card-image-dialog/card-image-dialog.component';
import { FilterDialog } from './card-list-filter-dialog/filter-dialog.component';
import { OrderByDialog } from './card-list-orderby-dialog/orderby-dialog.component';
import { CardListComponent } from './card-list/card-list.component';
import { CardRowComponent } from './card-row/card-row.component';
import { CubeListComponent } from './cube-list/cube-list.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ImportDialog } from './import-dialog/import-dialog.component';
import { LoginComponent } from './login/login.component';
import { AlphabeticalSortPipe } from './pipes/alphabetical-sort.pipe';
import { CardFilterPipe } from './pipes/card-filter.pipe';
import { CurveSortPipe } from './pipes/curve-sort.pipe';
import { RegisterComponent } from './register/register.component';
import { TokenService } from './services/token.service';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'admin', component: AdminComponent }, // TODO - Add AuthGaurd
    { path: '**', component: BadPathComponent } // Wildcard route, if none match
];

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        CubeListComponent,
        HomeComponent,
        BadPathComponent,
        CardRowComponent,
        CardImageDialog,
        FilterDialog,
        CardFilterPipe,
        AlphabeticalSortPipe,
        OrderByDialog,
        CurveSortPipe,
        ImportDialog,
        CardListComponent,
        RegisterComponent,
        LoginComponent,
        AdminComponent,
    ],
    imports: [
        RouterModule.forRoot(
            appRoutes
        ),
        BrowserModule,
        FlexLayoutModule,
        HttpModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatToolbarModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        MatIconModule,
        MatSelectModule,
        MatOptionModule,
        MatDialogModule,
        MatMenuModule,
        MatCheckboxModule,
        MatCardModule,
        MatSlideToggleModule,
        MatRadioModule,
        MatTooltipModule,
        MatProgressBarModule,
        MatListModule,
        MatSnackBarModule,
        MatSidenavModule
    ],
    entryComponents: [
        CardImageDialog,
        FilterDialog,
        OrderByDialog,
        ImportDialog
    ],
    providers: [
        AuthGuard,
        TokenService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
