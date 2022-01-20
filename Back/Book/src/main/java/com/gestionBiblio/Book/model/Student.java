package com.gestionBiblio.Book.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(value = "student")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data

public class Student {
    @Id
    private String id;

    private String firstName;

    private String LastName;

    @Indexed(unique=true)
    private Integer cin;

    @Indexed(unique = true)
    private Integer Phone;

}
