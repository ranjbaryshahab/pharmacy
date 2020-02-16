package ir.maktab.java32.projects.springboot.pharmacy.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "MEDICINE")
public class Medicine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "MEDICINE_NAME", nullable = false)
    private String medicineName;

    @Column(name = "PRICE", nullable = false)
    private Double price;

    @Column(name = "DESCRIPTION")
    private String description;
}
