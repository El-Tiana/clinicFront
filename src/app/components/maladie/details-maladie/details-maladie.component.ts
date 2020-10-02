import { Component, OnInit } from '@angular/core';
import { Maladie } from 'src/app/models/Maladie';
import { MaladieService } from 'src/app/services/maladie/maladie.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-maladie',
  templateUrl: './details-maladie.component.html',
  styleUrls: ['./details-maladie.component.css']
})
export class DetailsMaladieComponent implements OnInit {

  id: number;
  maladie: Maladie;

  constructor(
    public maladieService: MaladieService,
    private route: ActivatedRoute
   ) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.maladieService.get(this.id).subscribe((data: Maladie)=>{
      this.maladie = data;
    });
  }
}
