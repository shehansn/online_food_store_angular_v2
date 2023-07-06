import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { CREATE_FOOD_URL, FOODS_BY_SEARCH_URL, FOODS_BY_TAG_URL, FOODS_TAGS_URL, FOODS_URL, FOOD_BY_ID_URL, UPDATE_FOOD_URL } from '../shared/constants/urls';
import { Food } from '../shared/models/Food';
import { Tag } from '../shared/models/Tag';
import { ToastrService } from 'ngx-toastr';
import { IFood } from '../shared/interfaces/IFood';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http: HttpClient, private toastrService: ToastrService) { }

  foodCreateAPIURL = 'http://localhost:8000/api/foods/create'
  getAll(): Observable<Food[]> {
    return this.http.get<Food[]>(FOODS_URL);
  }

  getAllFoodsBySearchTerm(searchTerm: string) {
    return this.http.get<Food[]>(FOODS_BY_SEARCH_URL + searchTerm);
  }

  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(FOODS_TAGS_URL);
  }

  getAllFoodsByTag(tag: string): Observable<Food[]> {
    return tag === "All" ?
      this.getAll() :
      this.http.get<Food[]>(FOODS_BY_TAG_URL + tag);
  }

  getFoodById(foodId: string): Observable<Food> {
    return this.http.get<Food>(FOOD_BY_ID_URL + foodId);
  }


  createFood(foodData: IFood): Observable<IFood> {
    console.log(foodData);
    return this.http.post<IFood>(CREATE_FOOD_URL, foodData)
  }

  updateFood(foodData: IFood, foodid: string): Observable<IFood> {
    return this.http.put<IFood>(`${UPDATE_FOOD_URL}/${foodid}`, foodData)
  }

}
