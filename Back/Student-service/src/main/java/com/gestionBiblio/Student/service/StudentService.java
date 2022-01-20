package com.gestionBiblio.Student.service;

import com.gestionBiblio.Student.model.Student;
import com.gestionBiblio.Student.repository.StudentRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class StudentService {
    private StudentRepository studentRepository;

    public StudentService(StudentRepository StudentRepository) {
        this.studentRepository = StudentRepository;
    }



    public ResponseEntity<Student> addStudent(Student student) {
        studentRepository.save(student);
        return ResponseEntity.status(HttpStatus.CREATED).body(student);
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student getStudentById(String id) {
        return studentRepository.findById(id).get();
    }

    public ResponseEntity<Student> updateStudent(Student Student) {
                studentRepository.save(Student);
        return ResponseEntity.status(HttpStatus.OK).body(Student);
    }

    public ResponseEntity<?> deleteStudentById(String id) {
        studentRepository.deleteById(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
