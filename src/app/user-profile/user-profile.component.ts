import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../service/authentication.service";
import {User} from "../model/User";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  bufferRequest = 0;
  user: User = new User();

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.authenticationService.getFakerUser().subscribe(user => {
      this.bufferRequest = 100;
      this.user = user;
    })
  }

}
