package com.gestionBiblio.Book.service;

import com.gestionBiblio.Book.repository.BookRepository;
import com.gestionBiblio.Book.model.Book;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Slf4j
@Service
public class BookService {
    private BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }



    public ResponseEntity<Book> addBook(Book book) {
        bookRepository.save(book);
        return ResponseEntity.status(HttpStatus.CREATED).body(book);
    }

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public List<Book> getBooksCategoryList(String category) {
        return bookRepository.findByCategory(category);
    }

    public Book getBookById(String id) {
        return bookRepository.findById(id).get();
    }

    public ResponseEntity<Book> updateBook(Book book) {
                bookRepository.save(book);
        return ResponseEntity.status(HttpStatus.OK).body(book);
    }

    public ResponseEntity<?> deleteBookById(String id) {
        bookRepository.deleteById(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
