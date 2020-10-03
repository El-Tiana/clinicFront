import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListSymptomeComponent } from './components/symptome/list-symptome/list-symptome.component';
import { DetailsSymptomeComponent } from './components/symptome/details-symptome/details-symptome.component';
import { AddSymptomeComponent } from './components/symptome/add-symptome/add-symptome.component';
import { UpdateSymptomeComponent } from './components/symptome/update-symptome/update-symptome.component';
import { ListMedicamentComponent } from './components/medicament/list-medicament/list-medicament.component';
import { AddMedicamentComponent } from './components/medicament/add-medicament/add-medicament.component';
import { UpdateMedicamentComponent } from './components/medicament/update-medicament/update-medicament.component';
import { DetailsMedicamentComponent } from './components/medicament/details-medicament/details-medicament.component';
import { ListMaladieComponent } from './components/maladie/list-maladie/list-maladie.component';
import { AddMaladieComponent } from './components/maladie/add-maladie/add-maladie.component';
import { UpdateMaladieComponent } from './components/maladie/update-maladie/update-maladie.component';
import { DetailsMaladieComponent } from './components/maladie/details-maladie/details-maladie.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { RegisterDoctorComponent } from './components/register-doctor/register-doctor.component';
import { AddFicheComponent } from './components/fiche/add-fiche/add-fiche.component';
import { ListFicheUserComponent } from './components/fiche/list-fiche-user/list-fiche-user.component';
import { DetailsFicheComponent } from './components/fiche/details-fiche/details-fiche.component';
import { UpdateFicheComponent } from './components/fiche/update-fiche/update-fiche.component';
import { ListOrdonnanceComponent } from './components/ordonnance/list-ordonnance/list-ordonnance.component';
import { UpdateOrdonnanceComponent } from './components/ordonnance/update-ordonnance/update-ordonnance.component';
import { OrdonnanceDetailsComponent } from './components/ordonnance/ordonnance-details/ordonnance-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'symptomes', component: ListSymptomeComponent },
  { path: 'symptomes/addsymptome', component: AddSymptomeComponent },
  { path: 'symptomes/updatesymptome/:id', component: UpdateSymptomeComponent },
  { path: 'symptomes/:id', component: DetailsSymptomeComponent },
  { path: 'medicaments', component: ListMedicamentComponent },
  { path: 'medicaments/addmedicament', component: AddMedicamentComponent },
  { path: 'medicaments/updatemedicament/:id', component: UpdateMedicamentComponent },
  { path: 'medicaments/:id', component: DetailsMedicamentComponent },
  { path: 'maladies', component: ListMaladieComponent },
  { path: 'maladies/addmaladie', component: AddMaladieComponent },
  { path: 'maladies/updatemaladie/:id', component: UpdateMaladieComponent },
  { path: 'maladies/:id', component: DetailsMaladieComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'registerDoctor', component: RegisterDoctorComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'fichesuser', component: ListFicheUserComponent },
  { path: 'fiches/addfiche', component: AddFicheComponent },
  { path: 'fiches/updatefiche/:id', component: UpdateFicheComponent },
  { path: 'fiches/:id', component: DetailsFicheComponent },
  { path: 'ordonnances', component: ListOrdonnanceComponent },
  { path: 'ordonnances/updateOrdonnance/:id', component: UpdateOrdonnanceComponent },
  { path: 'ordonnances/:id', component: OrdonnanceDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
