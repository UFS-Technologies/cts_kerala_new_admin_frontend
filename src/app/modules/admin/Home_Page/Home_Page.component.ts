import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
selector: 'app-Home_Page',
templateUrl: './Home_Page.component.html',
styleUrls: ['./Home_Page.component.css']
})
export class Home_PageComponent implements OnInit {

constructor( private route: ActivatedRoute, private router: Router) { }
ngOnInit() 
{
   // alert (2)
}
}

