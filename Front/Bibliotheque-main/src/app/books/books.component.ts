import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { BooksService } from '../services/books.service';
import { Book } from '../models/Book';
import {HttpErrorResponse} from '@angular/common/http';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {StudentsService} from "../services/students.service";
import {Student} from "../models/Student";
import {DatePipe} from "@angular/common";



@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  providers : [DatePipe]
})
export class BooksComponent implements OnInit {



  closeResult: string;

  public  x: Boolean = false;
  public  msgBtn: string = "Add Book";
  public formType : string;
  books: Book [] = [];
  students: Student [] = [];
  public book : Book;
  public borrowBook : Book;

  addForm: FormGroup = this.fb.group({
    bookName: ['', Validators.required],
    bookAuthor: ['', Validators.required],
    total_examplaries: ['', Validators.required]
  });

  addBorrow: FormGroup = this.fb.group({
    student: ['', Validators.required],
    exitDate: ['', Validators.required],
    plannedEntryDate: ['', Validators.required]
  });

  submitted = false;
  updateFrom: Boolean = false;
  constructor(private datePipe : DatePipe,private studentsService : StudentsService,private modalService: NgbModal,private booksService: BooksService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getBooks();
    this.addBorrow.controls["exitDate"].setValue(this.datePipe.transform(new Date(),'yyyy-MM-dd'));
  }


  addNewBorrow(){
    let borrow = {
      id : {
        bookId : this.borrowBook.id,
        studentId : this.addBorrow.value.student
      },
      exitDate : this.addBorrow.value.exitDate,
      plannedEntryDate : this.addBorrow.value.plannedEntryDate,
    }
    this.booksService.addNewBorrow(borrow).subscribe(
      (data => {
        alert("borrow added succesfully");
        document.getElementById("cancelBtn").click();
      }),(error => {
        console.log(error)
      })
    )
  }

  showUpdateForm() : void
  {
    this.x = !this.x;
    if (this.x)
      this.msgBtn = "Cancel";
    else
      this.msgBtn = "Add Book";
  }


  submit(): void {
    this.x = false;
    if(this.formType == "add"){
      let bookForCreation : Book = new Book(this.addForm.value.bookName, this.addForm.value.total_examplaries, this.addForm.value.bookAuthor);
      this.booksService.create(bookForCreation)
        .subscribe(
          response => {
            this.submitted = true;
            this.msgBtn = "Add Book";
            this.getBooks();
          },
          error => {
            console.log(error);
          });
    }
    else{
      this.book.title = this.addForm.value.bookName;
      this.book.author = this.addForm.value.bookAuthor;
      this.book.total_examplaries = this.addForm.value.total_examplaries;
        this.booksService.update(this.book).subscribe(
                response =>{
                  this.submitted = true;
                  this.msgBtn = "Add Book";
                  this.getBooks();
                },
          error =>{
                  console.log(error);
          }
        );
    }
  }
  OnCreate() : void{

  this.addForm.controls['bookName'].setValue("");
  this.addForm.controls['bookAuthor'].setValue("");
  this.addForm.controls['total_examplaries'].setValue("");

  this.formType = "add";
   this.x = !this.x;
     if (this.x)
      this.msgBtn = "Cancel";
    else
      this.msgBtn = "Add Book";
  }

  OnUpdate(n: Book): void{
    this.x = true;
    this.book = n;
    this.addForm.controls['bookName'].setValue(this.book.title);
    this.addForm.controls['bookAuthor'].setValue(this.book.author);
    this.addForm.controls['total_examplaries'].setValue(this.book.total_examplaries);
    this.formType = "update";
    if (this.x)
      this.msgBtn = "Cancel";
  }

  OnDelete(n: Book): void
  {
    this.booksService.delete(n.id).subscribe(response => {
      this.getBooks();
      },error =>{
      console.log(error);
    });
  }

  public OnBorrow (book: Book) : void {
    this.students = this.studentsService.getStudents();
    this.borrowBook = book;
}


  public getBooks(): void{
    this.books = [];
    this.booksService.getBooks().subscribe((response) => {
      response.map((res: Book ) => {
          this.books.push(res);
      });
      },
         (error: HttpErrorResponse) => {
            alert(error.message);
    } );
  }

  open(content, book) {
    this.OnBorrow(book);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
