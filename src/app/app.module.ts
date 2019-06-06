import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
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
import { CreateCubeDialogComponent } from './create-cube-dialog/create-cube-dialog.component';
import { CubeListComponent } from './cube-list/cube-list.component';
import { EditCubeCardDialog } from './edit-cube-card-modal/edit-cube-card-modal.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ImportDialog } from './import-dialog/import-dialog.component';
import { LoginComponent } from './login/login.component';
import { AlphabeticalSortPipe } from './pipes/alphabetical-sort.pipe';
import { CardFilterPipe } from './pipes/card-filter.pipe';
import { CurveSortPipe } from './pipes/curve-sort.pipe';
import { RegisterComponent } from './register/register.component';
import { TokenService } from './services/token.service';
import { LoaderComponent } from './loader/component/loader.component';
import { LoaderService } from './loader/service/loader.service';
import { Interceptor } from './interceptor/interceptor';
import { GlobalErrorHandler } from './util/error-handler';
import { LoggerService } from './util/logger.service';
import { AddCardComponent } from './add-card/add-card.component';
import { SortUtility } from './util/sort.service';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },//, canActivate: [AuthGuard] },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'cubeList/:id', component: CubeListComponent },
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
      CreateCubeDialogComponent,
      EditCubeCardDialog,
      LoaderComponent,
      AddCardComponent
   ],
   imports: [
      RouterModule.forRoot(appRoutes),
      BrowserModule,
      FlexLayoutModule,
      BrowserAnimationsModule,
      HttpClientModule,
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
      MatSidenavModule,
      MatProgressSpinnerModule
   ],
   entryComponents: [
      CardImageDialog,
      FilterDialog,
      OrderByDialog,
      ImportDialog,
      CreateCubeDialogComponent,
      EditCubeCardDialog
   ],
   providers: [
      AuthGuard,
      TokenService,
      LoaderService,
      LoggerService,
      SortUtility,
      { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
      { provide: ErrorHandler, useClass: GlobalErrorHandler }
   ],
   bootstrap: [
      AppComponent
   ]
})

export class AppModule { }
