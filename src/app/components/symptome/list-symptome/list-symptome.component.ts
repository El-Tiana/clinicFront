import { Component, OnInit } from '@angular/core';
import { Symptome } from 'src/app/models/Symptome';
import { SymptomeService } from 'src/app/services/symptome/symptome.service'

@Component({
  selector: 'app-list-symptome',
  templateUrl: './list-symptome.component.html',
  styleUrls: ['./list-symptome.component.css']
})
export class ListSymptomeComponent implements OnInit {
  symptomes : Symptome[];
  constructor(public symptomeService:SymptomeService) { }

  ngOnInit(): void {
    this.getAll();  
  }
  private getAll() {
    this.symptomeService.getAll().subscribe((data: Symptome[]) => {
      this.symptomes = data;
      console.log(this.symptomes);
    });
  }

  deleteSymptome(id){

    this.symptomeService.delete(id).subscribe(res => {

         this.symptomes = this.symptomes.filter(item => item.id !== id);

         console.log('Post deleted successfully!');

    })

  }

}
