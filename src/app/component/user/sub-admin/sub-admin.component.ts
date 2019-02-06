import { Component, OnInit } from '@angular/core';
import { SubAdminService } from './sub-admin.service';
import { Global } from '../../../../common/global';
import { RollsPermissionsService } from '../rolls-permissions/rolls-permission.service';

@Component({
  selector: 'app-sub-admin',
  templateUrl: './sub-admin.component.html',
  providers: [ SubAdminService, RollsPermissionsService ]
})
export class SubAdminComponent implements OnInit {

  public formObject = {};
  public rollsSet = [];
  public cols: any[];
  public subAdminGet: any[];
  public id: any;
  public hideShowList: boolean = false;
  public deletePopStatus: boolean = false;
  public update: boolean = false;

  constructor(public subAdmin: SubAdminService,
    public rollsPermissionsService: RollsPermissionsService,
    public global: Global) { }

  ngOnInit() {
    // this.global.checkRollsAndPermission(100);
    this.listSubAdmin();
    this.listRollsPermission();
    this.tableConfig();
  }

  tableConfig() {
    this.cols = [
      { field: 'sno', header: 'Sno', width:'5%' },
      { field: 'username', header: 'Name', width:'10%' },
      { field: 'emailId', header: 'Email', width:'20%' },
      { field: 'phone', header: 'Contact', width:'8%' },
      { field: 'createdOn', header: 'Created On', width:'12%' },
      { field: 'status', header: 'Status', width:'5%' },
      { field: 'action', header: 'Action', width:'7%' },
    ];
  }

  listRollsPermission() {
    this.rollsPermissionsService.listRollsPermissions()
    .subscribe((success: any) => {
      this.rollsSet = (success.result && !success.length) ? success.data:'';
    });
  }

  listSubAdmin() {
    this.subAdmin.listSubAdmin()
    .subscribe((success: any) => {
      if(success.result){
        this.subAdminGet = success.data;
        console.log(success);
      }else{
        console.log(success);
      }
    });
  }

  showHide() {
    this.hideShowList = !this.hideShowList;
    if(!this.hideShowList) {
      this.formObject = {};
      this.update = false;
    } 
  }

  onSubmit() {
    if(this.update){
      this.subAdmin.updateSubAdmin(this.formObject)
      .subscribe((success: any) => {
        if(success.result){
          this.hideShowList = true;
          this.listSubAdmin();
        }else{
          console.log(success);
        }
      });
    }else{
      this.subAdmin.addSubAdmin(this.formObject)
      .subscribe((success: any) => {
        if(success.result){
          this.hideShowList = true;
          this.listSubAdmin();
        }else{
          console.log(success);
        }
      });
    }
    
  }

  editSubAdmin(id) {
    this.id = this.subAdminGet[id]._id;
    this.hideShowList = false;
    this.update = true;
    this.subAdmin.getSubAdmin(this.id)
    .subscribe((success: any) => {
      if(success.result){
        this.formObject = success.data[0]; 
      }else{
        console.log(success);
      }
    });
  }

  deleteConfirmation(id) {
    this.deletePopStatus = true;
    this.id = this.subAdminGet[id]._id;
  }

  deleteSubAdmin() {
    this.subAdmin.deleteSubAdmin(this.id)
    .subscribe((success: any) => {
      if(success.result){
        this.deletePopStatus = false;
        this.listSubAdmin();
      }else{
        console.log(success);
      }
    });
  }

}
