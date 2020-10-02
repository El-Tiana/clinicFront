import { Component, OnInit } from '@angular/core';
import { Maladie } from 'src/app/models/Maladie';
import { MaladieService } from 'src/app/services/maladie/maladie.service';

@Component({
  selector: 'app-list-maladie',
  templateUrl: './list-maladie.component.html',
  styleUrls: ['./list-maladie.component.css']
})
export class ListMaladieComponent implements OnInit {

  maladies : Maladie[];
  constructor(public symptomeService:MaladieService) { }

  ngOnInit(): void {
    this.symptomeService.getAll().subscribe((data: Maladie[])=>{
      this.maladies = data;
      console.log(this.maladies);
    })  
  }
  deleteMaladie(id){
    this.symptomeService.delete(id).subscribe(res => {
         this.maladies = this.maladies.filter(item => item.id !== id);
         console.log('Post deleted successfully!');
    })
  }
}
