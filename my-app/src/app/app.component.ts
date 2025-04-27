import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppService } from './app.component.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  title = 'Hello Berlin!';

  constructor(private appService: AppService) {}

  onClick() {
    this.appService.getHello().subscribe((res) => {
      this.title = res.message;
    })
  }

  getUsers() {
    this.appService.getUsers().subscribe((res) => {
      console.log(res);
    })
  }
}
