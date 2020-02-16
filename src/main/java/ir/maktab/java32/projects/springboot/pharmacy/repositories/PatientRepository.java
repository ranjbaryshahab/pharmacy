package ir.maktab.java32.projects.springboot.pharmacy.repositories;

import ir.maktab.java32.projects.springboot.pharmacy.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {

}
