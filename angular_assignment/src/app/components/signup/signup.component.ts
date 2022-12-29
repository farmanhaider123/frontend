import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
myForm=new FormGroup({
    email:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required]),
    firstName:new FormControl('',[Validators.required]),
    lastName:new FormControl('',[Validators.required]),
    contactNumber:new FormControl('',[Validators.required])
   })
  constructor(private authSer:AuthServiceService,private router:Router) { }
  errMsg:any;
  succMsg:any;
  ngOnInit(): void {
  }
 postData(){
   let formData=this.myForm.getRawValue();
   this.authSer.postRegis(formData)
   .subscribe((res:any)=>{
     if(res.err==0){
        Swal.fire(`${res.msg}`,'','success');
     }
     if(res.err==1){
      Swal.fire(`${res.msg}`,'','warning');
     }
   })
 }
}
