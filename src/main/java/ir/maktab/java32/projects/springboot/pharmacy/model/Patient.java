package ir.maktab.java32.projects.springboot.pharmacy.model;

import ir.maktab.java32.projects.springboot.pharmacy.enumeration.Gender;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "PATIENT")
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "FIRST_NAME", nullable = false)
    private String firstName;

    @Column(name = "LAST_NAME")
    private String lastName;

    @Enumerated(EnumType.STRING)
    @Column(name = "GENDER", nullable = false)
    private Gender gender;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "patient", fetch = FetchType.LAZY)
    private Set<Prescription> prescriptions;
}
