package ir.maktab.java32.projects.springboot.pharmacy.dto;

import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class PrescriptionsDto {
    private String prescriptionId;

    private String issueDate;

    private String patientReferralDate;
}
