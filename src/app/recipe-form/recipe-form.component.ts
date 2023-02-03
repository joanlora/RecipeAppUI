import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css'],
})
export class RecipeFormComponent implements OnInit {
  model: any;

  constructor(
    private router: Router,
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id') != null)
      this.recipeService
        .getRecipe(this.route.snapshot.paramMap.get('id'))
        .subscribe({
          next: (r) => (this.model = r),
          error: (e) => console.log(e),
        });
    else {
      this.model = { id: null, name: null, description: null };
    }
  }

  onSubmit(): void {
    if (this.model.id) {
      this.recipeService.updateRecipe(this.model.id, this.model).subscribe({
        next: (r) => this.router.navigate(['/']),
        error: (e) => console.error(),
      });
    } else {
      this.recipeService.createRecipe(this.model).subscribe({
        next: (r) => this.router.navigate(['/']),
        error: (e) => console.error(),
      });
    }

    this.router.navigate(['/']);
  }
}
