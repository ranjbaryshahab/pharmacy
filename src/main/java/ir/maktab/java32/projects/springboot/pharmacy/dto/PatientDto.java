package ir.maktab.java32.projects.springboot.pharmacy.dto;

import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class PatientDto {
    private String firstName;

    private String lastName;

    private String gender;

    private PrescriptionsDto[] prescriptions;
}
