import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { IUserPassword } from 'src/app/shared/interfaces/IUserPassword';
import { IUserProfile } from 'src/app/shared/interfaces/IUserProfile';
import { User } from 'src/app/shared/models/User';
import { PasswordsMatchValidator } from 'src/app/shared/validators/password_match_validator';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit, OnChanges {
  orders: any
  updateProfileForm!: FormGroup;
  isSubmittedPassword: boolean = false;
  updatePasswordForm!: FormGroup;
  isSubmittedProfile: boolean = false;
  constructor(private formBuilder: FormBuilder, private userService: UserService) {


  }
  ngOnChanges(changes: SimpleChanges): void {
    this.getUserDetails()
  }
  ngOnInit(): void {
    let { name, address } = this.userService.currentUser;
    this.updateProfileForm = this.formBuilder.group({
      name: [name, [Validators.required]],
      address: [address, Validators.required]
    });

    this.updatePasswordForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: PasswordsMatchValidator('password', 'confirmPassword')
    });
  }


  get profileformcontrol() {
    return this.updateProfileForm.controls;
  }
  get passwordformcontrol() {
    return this.updatePasswordForm.controls;
  }

  updateProfile() {
    //this.userService.updateUserProfile()
    this.isSubmittedProfile = true;
    if (this.profileformcontrol.invalid) {
      return;
    }
    const fprofile = this.updateProfileForm.value;
    const userProfile: IUserProfile = {
      id: this.userService.currentUser.id,
      name: fprofile.name,
      address: fprofile.address,
    }
    console.log(userProfile)
    /*
        this.userService.updateUserProfile(userProfile).subscribe(_ => {
          this.userService.getAllUsers().subscribe(userProfiles => {
            console.log(userProfiles)
          })
        })
        */

    this.userService.updateUserProfile(userProfile);

  }

  updatePassword() {
    this.isSubmittedPassword = true;
    if (this.passwordformcontrol.invalid) {
      return;
    }
    const fpassword = this.updatePasswordForm.value;
    const userPassword: IUserPassword = {
      id: this.userService.currentUser.id,
      password: fpassword.password
    }
    console.log(userPassword)

    this.userService.updateUserPassword(userPassword).subscribe(_ => {
      this.userService.logout();
    });

  }

  getUserDetails() {
    this.userService.getAllUsers().subscribe(userProfiles => {
      console.log(userProfiles)
    })
  }


}
