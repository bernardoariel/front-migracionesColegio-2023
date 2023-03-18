import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './login/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'portalColegio';
  token:string| null;
  constructor(
    private route: ActivatedRoute,
    private authService:AuthService) {
      this.token = this.authService.leerToken()

  }

  ngOnInit() {

  }

}
