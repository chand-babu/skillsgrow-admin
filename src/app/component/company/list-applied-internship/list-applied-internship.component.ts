import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListAppliedService } from './list-applied.service';

@Component({
  selector: 'app-list-applied-internship',
  templateUrl: './list-applied-internship.component.html',
  providers: [ListAppliedService]
})
export class ListAppliedInternshipComponent implements OnInit {
  
  public appliedSet: any[];
  public companyId: any;
  public internId: any;
  public dropDownEditatbleStatusOption: any = [
    { label: 'Active', value: 0 }, { label: 'InActive', value: 1 }
  ];
  constructor(public listAppliedService: ListAppliedService,
    public activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activateRoute.params.forEach(params => {
      this.companyId = params['companyId'];
      this.internId = params['id'];
    });
    console.log(this.companyId,this.internId);
    this.listApplied(this.companyId,this.internId);
  }

  listApplied(company,intern){
    this.listAppliedService.listApplied(company,intern)
    .subscribe((success: any) => {
      console.log(success);
      if(success.result){
        this.appliedSet = success.data;
      }else{
        alert('Somtheing Went Wrong');
      }
    })
  }
  postActiveAndInactive(data){
    console.log(data);
  }

}
