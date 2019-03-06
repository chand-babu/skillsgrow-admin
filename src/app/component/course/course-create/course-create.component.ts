import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Message } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.css']
})
export class CourseCreateComponent implements OnInit {
  items: MenuItem[];
  activeIndex: number = 0;
  msgs: Message[] = [];
  constructor(public router: Router) {
   }

  ngOnInit() {
    
    this.items = [
            { label: 'Create Course', disabled: true,
              command: (event: any) => {
                this.activeIndex = 0;
                this.msgs.length = 0;
                this.msgs.push({severity:'info', summary:'First Step', detail: event.item.label})
              }
            },
            { label: 'TimeLine', disabled: true,
              command: (event: any) => {
                this.activeIndex = 1;
              }},
            { label: 'Update Learning Material', disabled: true,
              command: (event: any) => {
                this.activeIndex = 2;
              }
            },
            { label: 'Test Management', disabled: true,
              command: (event: any) => {
                this.activeIndex = 3;
              }
            },
            { label: 'Author Details & Pricing', disabled: true,
            command: (event: any) => {
              this.activeIndex = 4;
            }
            },
        ];

        if (this.router.url === '/course/create/details') {
          this.activeIndex = 0;
          this.items[0].disabled = false;
        } else if (this.router.url === '/course/create/timeline') {
          this.activeIndex = 1;
          this.items[1].disabled = false;
        } else if (this.router.url === '/course/create/learning') {
          this.activeIndex = 2;
          this.items[2].disabled = false;
        } else if (this.router.url === '/course/create/test') {
          this.activeIndex = 3;
          this.items[3].disabled = false;
        } else if (this.router.url === '/course/create/confirmation') {
          this.activeIndex = 4;
          this.items[4].disabled = false;
        }
  }

  

}
