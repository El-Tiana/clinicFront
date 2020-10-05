import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddSymptomeComponent } from './components/symptome/add-symptome/add-symptome.component';
import { ListSymptomeComponent } from './components/symptome/list-symptome/list-symptome.component';
import { DetailsSymptomeComponent } from './components/symptome/details-symptome/details-symptome.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';
import { UpdateSymptomeComponent } from './components/symptome/update-symptome/update-symptome.component';
import { UpdateMedicamentComponent } from './components/medicament/update-medicament/update-medicament.component';
import { AddMedicamentComponent } from './components/medicament/add-medicament/add-medicament.component';
import { DetailsMedicamentComponent } from './components/medicament/details-medicament/details-medicament.component';
import { ListMedicamentComponent } from './components/medicament/list-medicament/list-medicament.component';
import { ListMaladieComponent } from './components/maladie/list-maladie/list-maladie.component';
import { AddMaladieComponent } from './components/maladie/add-maladie/add-maladie.component';
import { UpdateMaladieComponent } from './components/maladie/update-maladie/update-maladie.component';
import { DetailsMaladieComponent } from './components/maladie/details-maladie/details-maladie.component';
import { LoginComponent } from './components/login/login.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent,ChangeColorDirective } from './home/home.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { RegisterDoctorComponent } from './components/register-doctor/register-doctor.component';
import { AddFicheComponent } from './components/fiche/add-fiche/add-fiche.component';
import { ListFicheUserComponent } from './components/fiche/list-fiche-user/list-fiche-user.component';
import { DetailsFicheComponent } from './components/fiche/details-fiche/details-fiche.component';
import { UpdateFicheComponent } from './components/fiche/update-fiche/update-fiche.component';
import { OrdonnanceDetailsComponent } from './components/ordonnance/ordonnance-details/ordonnance-details.component';
import { UpdateOrdonnanceComponent } from './components/ordonnance/update-ordonnance/update-ordonnance.component';
import { ListOrdonnanceComponent } from './components/ordonnance/list-ordonnance/list-ordonnance.component';

@NgModule({
  declarations: [
    AppComponent,
    ChangeColorDirective,
    AddSymptomeComponent,
    ListSymptomeComponent,
    DetailsSymptomeComponent,
    UpdateSymptomeComponent,
    UpdateMedicamentComponent,
    AddMedicamentComponent,
    DetailsMedicamentComponent,
    ListMedicamentComponent,
    ListMaladieComponent,
    AddMaladieComponent,
    UpdateMaladieComponent,
    DetailsMaladieComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    HomeComponent,
    BoardAdminComponent,
    BoardUserComponent,
    RegisterDoctorComponent,
    AddFicheComponent,
    ListFicheUserComponent,
    DetailsFicheComponent,
    UpdateFicheComponent,
    OrdonnanceDetailsComponent,
    UpdateOrdonnanceComponent,
    ListOrdonnanceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
