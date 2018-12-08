import { Component, OnInit } from '@angular/core';
import { UserListingProxy } from '../user-listing/user-listing.proxy';
import { Constants } from './../../../../common/constant';

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  providers: [UserListingProxy]
})
export class UserListingComponent implements OnInit {
  public userSet = [];
  public cols: any[];
  public image: string;
  constructor(private UserListingProxy: UserListingProxy) { }

  ngOnInit() {
    this.getUserList();
    this.cols = [
      { field: 'sno', header: 'Sno' },
      { field: 'userName', header: 'UserName' },
      { field: 'emailId', header: 'Email' },
      { field: 'phone', header: 'Contact' },
      { field: 'gender', header: 'Gender' },
      { field: 'address', header: 'Address' },
      // { field: 'profilePic', header: 'Image' },
      { field: 'active', header: 'Active' }
    ];
    this.image = Constants.IMAGEPATH;
  }

  getUserList() {
    this.UserListingProxy.listUserDetails().subscribe((data: any) => {
      let response = data;
      this.userSet = (response.result ) ? response.data : response.data;
      console.log(this.userSet);
    });
  }

}