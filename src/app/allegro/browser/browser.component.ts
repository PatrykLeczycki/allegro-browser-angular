import {Component, OnInit} from '@angular/core';
import {AllegroService} from '../allegro.service';
import {Category} from '../model/category.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.css']
})
export class BrowserComponent implements OnInit {

  searchForm: FormGroup;
  categories: Category[] = [];
  chosenCategoryId: any;

  constructor(private allegroService: AllegroService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    if (!this.allegroService.categories) {
      this.allegroService.getCategories().subscribe(res => {
        this.categories = res;
      });
    }

    this.searchForm = this.formBuilder.group({
      title: ['', [Validators.required]]
    });
  }

  onCategoryChoose() {
    console.log('category = ' + this.categories.find(category => category.id === this.chosenCategoryId));
  }

  onSubmit(): void {

  }
}
