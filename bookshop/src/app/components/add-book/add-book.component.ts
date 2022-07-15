import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  bookForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService,
    ) {
      this.bookForm = this.formBuilder.group({
        name: [''],
        price: [''],
        description: ['']
      })
     }

  ngOnInit() { }
  onSubmit(): any {
    this.crudService.AddBook( this.bookForm.value )
    .subscribe( () => {
      console.log('L30 add-book.component.ts: Data Added Successfully!');
      this.ngZone.run( ()=> this.router.navigateByUrl('/books-list'))
      }, (err) => {
        console.log("L33: " + err);
      }
    );
  }

}
