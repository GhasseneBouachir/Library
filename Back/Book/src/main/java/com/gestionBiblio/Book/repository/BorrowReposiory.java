package com.gestionBiblio.Book.repository;

import com.gestionBiblio.Book.model.Borrow;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BorrowReposiory extends MongoRepository<Borrow, String> {
}
