import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  username :String = ''; 

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    logout(){
      this.authService.logout();
      this.router.navigate(['/login']); 
    }

  constructor(private breakpointObserver: BreakpointObserver,
              public authService:AuthService,
              private router:Router) {

              }
              ngOnInit(): void {
                this.authService.getUser().subscribe(
                  user => {
                      this.username = user.email;
                      
                  })
              }
}
