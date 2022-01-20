package com.gestionBiblio.Student.controller;

import com.gestionBiblio.Student.model.Student;
import com.gestionBiblio.Student.service.StudentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/student")
@CrossOrigin(allowedHeaders = "'*'")
public class StudentController {

    private StudentService studentService;

    public StudentController(StudentService StudentService) {
        this.studentService = StudentService;
    }

    @PostMapping("/addStudent")
    public ResponseEntity<Student> addStudent(@RequestBody @Valid Student student){
        return this.studentService.addStudent(student);
    }

    @GetMapping("/studentList")
    public List<Student> getStudents(){
        return studentService.getAllStudents();
    }

    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable String id){
        return studentService.getStudentById(id);
    }

    @PutMapping("/studentUpdate")
    ResponseEntity<Student> updateStudent(@RequestBody Student student){
        return studentService.updateStudent(student);
    }

    @DeleteMapping("/studentDelete/{id}")
    ResponseEntity<?> deleteStudentById(@PathVariable String id){
        return studentService.deleteStudentById(id);
    }

}
