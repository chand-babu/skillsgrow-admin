import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListInternshipService } from './list-internship.service';

@Component({
  selector: 'app-list-internship',
  templateUrl: './list-internship.component.html',
  providers: [ListInternshipService]
})
export class ListInternshipComponent implements OnInit {

  public internshipSet: any[];
  public companyId: any;
  public dropDownEditatbleStatusOption: any = [
    { label: 'Active', value: 0 }, { label: 'InActive', value: 1 }
  ];
  constructor(public listInternshipService: ListInternshipService,
    public activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activateRoute.params.forEach(params => {
      this.companyId = params['id'];
    });
    this.internship(this.companyId);
  }

  internship(id){
    this.listInternshipService.listInternship(id)
    .subscribe((success: any) => {
      console.log(success.data);
      if(success.result){
        this.internshipSet = success.data;
      }else{
        alert('Somtheing Went Wrong');
      }
    })
  }

  postActiveAndInactive(data){
    let dataSet = {
      _id: data._id,
      status: data.status
    };
    this.listInternshipService.changeInternshipStatus(dataSet)
    .subscribe((success: any) => {
      console.log(success.data);
      if(success.result){
        this.internship(this.companyId);
      }else{
        alert('Somtheing Went Wrong');
      }
    })
  }

}
