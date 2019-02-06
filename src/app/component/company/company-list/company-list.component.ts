import { Component, OnInit } from '@angular/core';
import { Constants } from '../../../../common/constant';
import { CompanyListService } from './company-list.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  providers: [CompanyListService]
})
export class CompanyListComponent implements OnInit {

  public cols: any[];
  public image: any;
  public companySet: any[];
  public dropDownEditatbleStatusOption: any = [
    { label: 'Active', value: 0 }, { label: 'InActive', value: 1 }
  ];
  constructor(public companyListService: CompanyListService) { }

  ngOnInit() {
    this.image = Constants.IMAGEPATH;
    this.listCompany();
  }

  listCompany(){
    this.companyListService.listCompany()
    .subscribe((success: any) => {
      if(success.result){
        this.companySet = success.data;
      }else{
        alert("Something Went Wrong");
      }
    })
  }

  companyActiveAndInactive(data){
    let dataSet = {
      _id : data._id,
      status : data.status
    };
    this.companyListService.changeCompanyStatus(dataSet)
    .subscribe((success: any) => {
      if(success.result){
        this.listCompany();
      }else{
        alert("Something Went Wrong");
      }
    })
  }

}
