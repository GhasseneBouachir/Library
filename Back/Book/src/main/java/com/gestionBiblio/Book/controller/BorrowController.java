package com.gestionBiblio.Book.controller;

import com.gestionBiblio.Book.model.Book;
import com.gestionBiblio.Book.model.Borrow;
import com.gestionBiblio.Book.model.BorrowDTO;
import com.gestionBiblio.Book.service.BorrowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/book")
@CrossOrigin(allowedHeaders = "'*'",origins = "*")
public class BorrowController {
    @Autowired
    private BorrowService borrowService;

    @PostMapping("/borrow/addBorrow")
    public ResponseEntity<Borrow> addBook(@RequestBody @Valid Borrow borrow){
        return this.borrowService.addBorrow(borrow);
    }

    @PutMapping("/borrow/updateBorrow")
    ResponseEntity<Borrow> updateBorrow(@RequestBody Borrow borrow){
        return borrowService.updateBorrow(borrow);
    }

    @GetMapping("/borrows")
    public List<BorrowDTO> getBorrow( ){
        return this.borrowService.getAllBorrows();
    }

    @DeleteMapping("/borrow/deleteBorrow")
    ResponseEntity<?> deleteBorrow(@RequestBody Borrow borrow){
        return borrowService.deleteBorrow(borrow);
    }
}
