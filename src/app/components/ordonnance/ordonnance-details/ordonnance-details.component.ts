import { Component, OnInit } from '@angular/core';
import { Ordonnance } from 'src/app/models/Ordonnance';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/auth/token-storage.service';
import { UserService } from 'src/app/services/auth/user.service';
import { OrdonnanceService } from 'src/app/services/ordonnance/ordonnance.service';
import * as JsonToXML from "js2xmlparser";
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-ordonnance-details',
  templateUrl: './ordonnance-details.component.html',
  styleUrls: ['./ordonnance-details.component.css']
})
export class OrdonnanceDetailsComponent implements OnInit {
  id: number;
  ordonnance: Ordonnance;
  isPatient = false;
  isLoggedIn = false;
  isDoctor = false;
  private roles: string[];
  user: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private userService: UserService,
    private ordonnanceService: OrdonnanceService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.isPatient = this.roles.includes('ROLE_USER');
      this.isDoctor = this.roles.includes('ROLE_DOCTOR');
      this.user = user;
      this.getById();

    }
    if (this.isPatient) {
    } else if (this.isDoctor) {
    } else {
      this.router.navigateByUrl('login');
    }
  }
  getById() {
    this.id = this.route.snapshot.params['id'];
    this.ordonnanceService.get(this.id).subscribe((data: Ordonnance) => {
      this.ordonnance = data;
      console.log(this.ordonnance.etat);
    });
  }
  exportXML(){
    //console.log(JsonToXML.parse("ordonnance",this.ordonnance));
    console.log("clic");
    this.ordonnanceService.exportXml(this.id).subscribe(response => {
      //const filename = response.headers.get('filename');
        //this.saveFile(response.body, filename);
        const blob1 = new Blob([response], { type: 'text/xml' });
          fileSaver.saveAs(blob1, 'data.xml');
        console.log(response);
    });;
    //this.saveFile(JsonToXML.parse("ordonnance",this.ordonnance));
  }
  download() {
    this.ordonnanceService.downloadFile(this.id).subscribe(response => {
			let blob:any = new Blob([response], { type: 'text/xml; charset=utf-8' });
			const url = window.URL.createObjectURL(blob);
			//window.open(url);
			//window.location.href = response.url;
			fileSaver.saveAs(blob, 'ordonnance.xml');
		}), error => console.log('Error downloading the file'),
                 () => console.info('File downloaded successfully');
  }
  saveFile(data: any, filename?: string) {
    const blob = new Blob([data], {type: 'text/xml'});
    fileSaver.saveAs(blob, filename);
  }
}
