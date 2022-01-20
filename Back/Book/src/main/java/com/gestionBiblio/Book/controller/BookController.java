package com.gestionBiblio.Book.controller;

import com.gestionBiblio.Book.model.Book;
import com.gestionBiblio.Book.service.BookService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/book")
@CrossOrigin(allowedHeaders = "*", origins = "*")
public class BookController {

    private BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @PostMapping("/addBook")
    public ResponseEntity<Book> addBook(@RequestBody @Valid Book book){
        return this.bookService.addBook(book);
    }

    @GetMapping("/bookList")
    public List<Book> getBooks(){
        return bookService.getAllBooks();
    }

    @GetMapping("/bookList/{category}")
    public List<Book> getBooks(@PathVariable String category){
        return bookService.getBooksCategoryList(category);
    }

    @GetMapping("/{id}")
    public Book getBookById(@PathVariable String id){
        return bookService.getBookById(id);
    }

    @PutMapping("/bookUpdate")
    ResponseEntity<Book> updateBook(@RequestBody Book book){
        return bookService.updateBook(book);
    }

    @DeleteMapping("/bookDelete/{id}")
    ResponseEntity<?> deleteBookById(@PathVariable String id){
        return bookService.deleteBookById(id);
    }

}
