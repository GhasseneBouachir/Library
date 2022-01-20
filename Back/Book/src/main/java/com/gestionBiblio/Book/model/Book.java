package com.gestionBiblio.Book.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.util.Enumeration;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "book")
public class Book {

    @Id
    private String id;

    @NotNull(message = "Title should not be null")
    private String title;

    @NotNull(message = "Author should not be null")
    private String author;

    @Min(0)
    private Integer total_examplaries;

}
