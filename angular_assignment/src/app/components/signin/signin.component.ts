import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
 myForm=new FormGroup({
    email:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required])
   })
  constructor(private authSer:AuthServiceService,private router:Router) { }
  errMsg: any;
  data: any;
  ngOnInit(): void {
   
  }
  postData(){
    let formData = this.myForm.getRawValue();
    this.authSer.getuserById(formData.email).subscribe((res) => {
      if (res) {
        console.log(this.data = res);
      }
      
   })
    this.authSer.postLogin(formData)
    .subscribe((res:any)=>{
        if(res.err==0){
          localStorage.setItem("_token", res.token);
          localStorage.setItem('userdata',JSON.stringify(this.data))
          this.router.navigate(['/products']).then(() => {
            window.location.reload();
          })
        }
        if(res.err==1){
          Swal.fire(`${res.msg}`,'','warning');
        }
    })
  }

}


