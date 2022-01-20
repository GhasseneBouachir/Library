import { Component, OnInit } from '@angular/core';
import {BooksService} from "../services/books.service";
import {Observable} from "rxjs";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-borrows',
  templateUrl: './borrows.component.html',
  styleUrls: ['./borrows.component.css'],
  providers : [DatePipe]
})
export class BorrowsComponent implements OnInit {

  public borrows : any[] = [];
  constructor(private datePipe : DatePipe,private bookService : BooksService) { }

  ngOnInit(): void {
    this.getBorrows();
  }

  getBorrows(){
    this.bookService.getBorrows().subscribe(
      (data => {
        this.borrows=data;
      }),(error => {
        console.log(error);
      })
    )
  }

  OnUpdate(bor){
    if(window.confirm("Return Book")){
      let borrow = {
        id : {
          bookId : bor.book.id,
          studentId : bor.student.id
        },
        entryDate : this.datePipe.transform(new Date(),'yyyy-MM-dd'),
        exitDate : this.datePipe.transform(bor.exitDate,'yyyy-MM-dd'),
        plannedEntryDate : this.datePipe.transform(bor.plannedEntryDate,'yyyy-MM-dd'),
      }
      this.bookService.updateBorrow(borrow).subscribe(
        (data => {
          this.getBorrows();
        }),(error => {
          console.log(error)
        })
      )
    }

  }

  OnDelete(brr: any){

  }


}
