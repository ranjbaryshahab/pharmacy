package ir.maktab.java32.projects.springboot.pharmacy.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "PRESCRIPTION")
public class Prescription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "PRESCRIPTION_ID")
    private String prescriptionId;

    @Temporal(TemporalType.DATE)
    @Column(name = "ISSUE_DATE")
    private Date issueDate;

    @Temporal(TemporalType.DATE)
    @Column(name = "PATIENT_REFERRAL_DATE")
    private Date patientReferralDate;

}
