package com.gestionBiblio.Book.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BorrowDTO {

    private Book book;

    private Student student;

    private Date exitDate;

    private Date entryDate;

    private Date plannedEntryDate;

}
