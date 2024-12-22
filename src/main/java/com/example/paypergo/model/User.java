package com.example.paypergo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Component
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long user_id;

    String user_username;
    String user_email;
    String user_password;

    @OneToMany(mappedBy = "user")
    private List<LinkTrakerTable> linkTrakerTables;
}
