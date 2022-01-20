package com.gestionBiblio.Book.service;

import com.gestionBiblio.Book.model.Book;
import com.gestionBiblio.Book.model.Borrow;
import com.gestionBiblio.Book.model.BorrowDTO;
import com.gestionBiblio.Book.model.Student;
import com.gestionBiblio.Book.repository.BookRepository;
import com.gestionBiblio.Book.repository.BorrowReposiory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class BorrowService {

    @Autowired
    private BorrowReposiory borrowRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private RestTemplate restTemplate;

    public ResponseEntity<Borrow> addBorrow(Borrow borrow) {
        borrowRepository.save(borrow);
        Optional<Book> b = bookRepository.findById(borrow.getId().getBookId());
        b.get().setTotal_examplaries(b.get().getTotal_examplaries()-1);
        bookRepository.save(b.get());
        return ResponseEntity.status(HttpStatus.CREATED).body(borrow);
    }

    public ResponseEntity<Borrow> updateBorrow(Borrow borrow) {
        Optional<Book> b = bookRepository.findById(borrow.getId().getBookId());
        b.get().setTotal_examplaries(b.get().getTotal_examplaries()+1);
        bookRepository.save(b.get());
        borrowRepository.save(borrow);
        return ResponseEntity.status(HttpStatus.OK).body(borrow);
    }

    public ResponseEntity<?> deleteBorrow(Borrow borrow) {
        Optional<Book> b = bookRepository.findById(borrow.getId().getBookId());
        b.get().setTotal_examplaries(b.get().getTotal_examplaries()+1);
        bookRepository.save(b.get());
        borrowRepository.delete(borrow);
        return ResponseEntity.status(HttpStatus.OK).build();
    }


    public List<BorrowDTO>  getAllBorrows() {
        List<Borrow> borrows = borrowRepository.findAll();
        List<BorrowDTO> allBorrows;
        allBorrows = borrows.stream().map(borrow1 -> {
            BorrowDTO brDTO = new BorrowDTO();
            brDTO.setBook(bookRepository.findById(borrow1.getId().getBookId()).get());
            brDTO.setStudent(restTemplate.getForObject("http://localhost:8080/student/"+borrow1.getId().getStudentId(), Student.class));
            brDTO.setEntryDate(borrow1.getEntryDate());
            brDTO.setExitDate(borrow1.getExitDate());
            brDTO.setPlannedEntryDate(borrow1.getPlannedEntryDate());
            return brDTO;
        }).collect(Collectors.toList());

        return allBorrows;
    }
}
