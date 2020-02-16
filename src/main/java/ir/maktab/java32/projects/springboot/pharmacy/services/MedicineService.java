package ir.maktab.java32.projects.springboot.pharmacy.services;

import ir.maktab.java32.projects.springboot.pharmacy.model.Medicine;
import ir.maktab.java32.projects.springboot.pharmacy.repositories.MedicineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicineService {
    @Autowired
    private MedicineRepository medicineRepository;

    public Medicine save(Medicine medicine) {
        return medicineRepository.save(medicine);
    }

    public List<Medicine> medicineList() {
        return medicineRepository.findAll();
    }

    public Medicine findById(Long id) {
        return medicineRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Invalid user Id:" + id));
    }

    public void deleteById(Long id) {
        findById(id);
        medicineRepository.deleteById(id);
    }

    public void update(Long id,Medicine newMedicine) {
        medicineRepository.findById(id).map(medicine -> {
            medicine.setMedicineName(newMedicine.getMedicineName());
            medicine.setDescription(newMedicine.getDescription());
            medicine.setPrice(newMedicine.getPrice());
            return medicineRepository.save(medicine);
        }).orElseThrow(() -> new IllegalArgumentException("Invalid user Id:" + id));
    }
}
