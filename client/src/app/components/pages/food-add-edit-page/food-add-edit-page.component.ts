import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { timer } from 'rxjs';
import { FoodService } from 'src/app/services/food.service';
import { IFood } from 'src/app/shared/interfaces/IFood';
import { Location } from '@angular/common'

@Component({
  selector: 'app-food-add-edit-page',
  templateUrl: './food-add-edit-page.component.html',
  styleUrls: ['./food-add-edit-page.component.css']
})
export class FoodAddEditPageComponent implements OnInit {

  editmode = false;
  foodDetailsform!: FormGroup;
  isSubmitted = false;
  imageDisplay?: string | ArrayBuffer;
  currentFoodId!: string;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private foodService: FoodService,
    private toastrService: ToastrService,
    private location: Location,
    private router: Router) { }

  ngOnInit(): void {
    this._initForm();
    //this._getCategories();
    this._checkEditMode();
  }


  private _initForm() {
    this.foodDetailsform = this.formBuilder.group({

      name: ['', Validators.required],
      price: ['', Validators.required],
      tags: ['', Validators.required],
      favorite: [''],
      stars: [''],
      imageUrl: ['', Validators.required],
      origins: ['', Validators.required],
      cookTime: ['', Validators.required],

    });
  }

  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.editmode = true;
        this.currentFoodId = params.id;
        console.log('Edit Mode', params.id, this.currentFoodId)
        this.foodService.getFoodById(params.id).subscribe((food) => {
          console.log('food from getFoodById', food)
          this.formControl.name.setValue(food.name);
          this.formControl.price.setValue(food.price);
          this.formControl.tags.setValue(food.tags);
          this.formControl.imageUrl.setValue(food.imageUrl);
          this.formControl.origins.setValue(food.origins);
          this.formControl.cookTime.setValue(food.cookTime);
          this.formControl.stars.setValue(food.stars);
          this.formControl.favorite.setValue(food.favorite);
          console.log(food.favorite)
          // if (food.favorite) {
          //   this.formControl.favorite.setValue(food.stars);
          // } else {
          //   this.formControl.favorite.setValue(food.cookTime);
          // }

        })
      }
    })
  }


  SubmitForm() {
    console.log('Submit Form')
    this.isSubmitted = true;
    if (this.foodDetailsform.invalid) return;

    // const foodFormData = new FormData();
    // Object.keys(this.formControl).map((key) => {
    //   foodFormData.append(key, this.formControl[key].value);
    // });

    const foodDetails = this.foodDetailsform.value;
    const foodFormData: IFood = {
      name: foodDetails.name,
      price: foodDetails.price,
      tags: foodDetails.tags,
      stars: foodDetails.stars,
      imageUrl: foodDetails.imageUrl,
      origins: foodDetails.origins,
      cookTime: foodDetails.cookTime,
      favorite: foodDetails.favorite
    }
    console.log('Submit Form', foodFormData)

    if (this.editmode) {
      this._updateProduct();
    } else {
      this._addProduct(foodFormData);
    }
  }
  private _addProduct(foodData: IFood) {
    console.log('add food', foodData);
    this.foodService.createFood(foodData).subscribe(
      () => {
        this.toastrService.success(
          ` Food Created`,
          'Food Credated Successfully'
        )
        timer(500)
          .toPromise()
          .then(() => {
            this.router.navigateByUrl('/');
          });
      },
      (err) => {
        this.toastrService.error(
          err,
          'Food creation Failed'
        )
      }

    );
  }

  private _updateProduct() {

    const foodDetails = this.foodDetailsform.value;
    const foodFormData: IFood = {
      name: foodDetails.name,
      price: foodDetails.price,
      tags: foodDetails.tags,
      stars: foodDetails.stars,
      imageUrl: foodDetails.imageUrl,
      origins: foodDetails.origins,
      cookTime: foodDetails.cookTime,
      favorite: foodDetails.favorite
    }

    console.log('update Form', foodFormData)

    console.log('update food', foodFormData)
    this.foodService.updateFood(foodFormData, this.currentFoodId).subscribe(() => {
      this.toastrService.success(
        ` Food Updated`,
        'Food Updated Successfully'
      )
      timer(500)
        .toPromise()
        .then(() => {
          this.router.navigateByUrl('/');
        });
    },
      (err) => {
        this.toastrService.error(
          err,
          'Food Update Failed'
        )
      }
    );
  }

  get formControl() {
    return this.foodDetailsform.controls;
  }
}
