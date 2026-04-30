import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { MatExpansionModule, MatInputModule} from '@angular/material';
import {  AgmCoreModule} from '@agm/core';
import { TokenInterceptor } from './interceptor/http.interceptor';
import { DialogBox_Component } from './modules/admin/DialogBox/DialogBox.component';

// import { CustomToastComponent } from './custom-toast/custom-toast.component';
@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule, MatExpansionModule, MatInputModule,
    
    ReactiveFormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,


    AppRoutingModule,   
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    }
    ),
    // ToastrModule.forRoot({
    //   toastComponent: CustomToastComponent, // added custom toast!
    // }), // ToastrModule added 
  ],
  declarations: [
    AppComponent, DialogBox_Component,
    //  CustomToastComponent

  ],
  entryComponents: [    DialogBox_Component,
    // CustomToastComponent  
  ]  ,
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
