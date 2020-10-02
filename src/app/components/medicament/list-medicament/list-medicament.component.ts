import { Component, OnInit } from '@angular/core';
import { Medicament } from 'src/app/models/Medicament';
import { MedicamentService } from 'src/app/services/medicament/medicament.service';

@Component({
  selector: 'app-list-medicament',
  templateUrl: './list-medicament.component.html',
  styleUrls: ['./list-medicament.component.css']
})
export class ListMedicamentComponent implements OnInit {

  medicaments : Medicament[];
  constructor(public medicamentService:MedicamentService) { }

  ngOnInit(): void {
    this.medicamentService.getAll().subscribe((data: Medicament[])=>{
      this.medicaments = data;
      console.log(this.medicaments);
    })  
  }
  deleteMedicament(id){

    this.medicamentService.delete(id).subscribe(res => {

         this.medicaments = this.medicaments.filter(item => item.id !== id);

         console.log('Post deleted successfully!');

    })

  }
}
