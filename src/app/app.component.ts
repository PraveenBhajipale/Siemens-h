import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { ConsultationComponent } from './consultation/consultation.component';
import { CommonModule } from '@angular/common';
import { PhysicianComponent } from './physician/physician.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ConsultationComponent, CommonModule, PhysicianComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'my-app';
  isConsultationActive:boolean = true;
  constructor(
    private route: ActivatedRoute,
    private router: Router  ) {}


  ngOnInit(): void {
    this.router.navigate(['/consultation']);
  }

  routeToConsultation():void{
    this.isConsultationActive = true;
    this.router.navigate(['/consultation']);
  }

  routeToPhysician():void{
    this.isConsultationActive = false;
    this.router.navigate(['/physician']);
  }

  consClass():string{
    if(this.isConsultationActive){
      return 'cons-des';
    }
    else{
      return 'phy-des';
    }  

  }

  phyClass():string{
    if(this.isConsultationActive){
      return 'phy-des';
    }
    else{
      return 'cons-des';
    }  
  }
}
