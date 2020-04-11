import { Component, OnInit } from '@angular/core';
import { FormGroup } from 'src/app/core/utils/form-group/form-group';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  prevRegisteredUser: User;

  constructor(private userService: UserService) {
    this.form = new FormGroup({
      'firstname': new FormControl('', Validators.required),
      'lastname': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
      'confirm_password': new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    try{

      const user = localStorage.getItem('previous_registered_user');
      if(user)
        this.prevRegisteredUser = new User().fill(JSON.parse(user));

    }
    catch(e){

    }


    if(this.prevRegisteredUser){

    }
  }

  register(): void{
    if(this.form.valid){
      const user: User = (new User()).formFill(this.form);

      this.userService.create(user).subscribe(user => {
        localStorage.setItem('previous_registered_user', JSON.stringify(user));
        this.prevRegisteredUser = user;
      },
      e => {
        this.form.fillErrors(e);
      });

    }
  }

  clear(): void{
    this.form.reset();
    this.form.markAsPristine();
  }

  removePreviousRegistration(): void{
    localStorage.removeItem('previous_registered_user');
    this.prevRegisteredUser = null;
  }

}
