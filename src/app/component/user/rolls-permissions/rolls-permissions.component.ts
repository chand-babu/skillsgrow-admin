import { Component, OnInit } from '@angular/core';
import { RollsPermission } from './rolls-permission';
import { RollsPermissionsService } from './rolls-permission.service';

@Component({
  selector: 'app-rolls-permissions',
  templateUrl: './rolls-permissions.component.html',
  providers: [RollsPermissionsService]
})
export class RollsPermissionsComponent implements OnInit {

  public rollsPermissionData = RollsPermission.jsonFile;
  public permissionsCode = [];
  public rollsPermissionIterate = [];
  public permissionTitle: any;
  public cols: any[];
  public checkedValue = [];
  public permissionIndex: any;
  public id: any;
  public statusConfirmBox: boolean = false;
  public tableShow: boolean = false;
  public update: boolean = false;
  
  constructor(public rollsPermissionsService : RollsPermissionsService) { }

  ngOnInit() {
    this.listRollsPermissionDetails();
    this.tableListConfig();
  }

  tableListConfig() {
    this.cols = [
      { field: 'sno', header: 'Sno', width:'5%' },
      { field: 'title', header: 'Title', width:'40%' },
      { field: 'status', header: 'Status', width:'7%' },
      { field: 'actions', header: 'Actions', width:'15%' }
    ];
  }

  listRollsPermissionDetails() {
    this.rollsPermissionsService.listRollsPermissions()
    .subscribe((success: any) => {
      let response = success;
      this.rollsPermissionIterate = (response.result ) ? response.data : response.data;
    }); 
  }

  onChange(code, status){
    if(status){
      this.permissionsCode.push(code);
    }else{
      let index = this.permissionsCode.indexOf(code);
      if (index > -1) {
        this.permissionsCode.splice(index, 1);
      } 
    }
  }

  onSubmit() {
    let data = {
      id : (this.update) ?  this.id:'',
      title : this.permissionTitle,
      permissions : this.permissionsCode
    }
    
    if(this.update) {
      this.rollsPermissionsService.updateRollsPermissions(data)
      .subscribe((success: any) => {
        if(success.result){
          this.tableShow = true;
          this.listRollsPermissionDetails();
        }else{
          console.log(success);
        }
      }); 
    } else {
      delete data.id;
      this.rollsPermissionsService.addRollsPermissions(data)
      .subscribe((success: any) => {
        if(success.result){
          this.tableShow = true;
          this.listRollsPermissionDetails();
        }else{
          console.log(success);
        }
      }); 
    }
  }

  editRollsPermissions(index) {
    this.id = this.rollsPermissionIterate[index]._id;
    this.rollsPermissionsService.getRollsPermissions(this.id)
    .subscribe((success: any) => {
      if(success.result){
        let data = success.data[0];
        this.tableShow = false;
        this.update = true;
        this.permissionTitle = data.title;
        this.permissionsCode = data.permissions;
      }else{
        console.log(success);
      }
    }); 
  }

  changeButtonText() {
    this.tableShow = !this.tableShow;
    this.update = false;
    this.permissionTitle = '';
  }

  checkArrayValue(code) {
    if(this.update){
      return this.permissionsCode.includes(code);
    }
  }

  openConfirmation(id){
    this.statusConfirmBox = true;
    this.permissionIndex = id;
  }

  deletePermissions() {
    let id = this.rollsPermissionIterate[this.permissionIndex]._id;
    this.rollsPermissionsService.deleteRollsPermissions(id)
    .subscribe((success: any) => {
      if(success.result){
        this.statusConfirmBox = false;
        this.listRollsPermissionDetails();
      }else{
        console.log(success);
      }
    }); 
  }
}
