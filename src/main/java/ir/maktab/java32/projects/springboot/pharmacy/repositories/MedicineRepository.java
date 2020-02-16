package ir.maktab.java32.projects.springboot.pharmacy.repositories;

import ir.maktab.java32.projects.springboot.pharmacy.model.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicineRepository extends JpaRepository<Medicine, Long> {
}
