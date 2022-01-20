package com.gestionBiblio.Book.repository;

import com.gestionBiblio.Book.model.Book;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends MongoRepository<Book, String> {
    @Query("{'Category.label':?0}")
    List<Book> findByCategory(String category);
}
