package ir.maktab.java32.projects.springboot.pharmacy.services;

import ir.maktab.java32.projects.springboot.pharmacy.model.Patient;
import ir.maktab.java32.projects.springboot.pharmacy.repositories.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientService {
    @Autowired
    private PatientRepository patientRepository;

    public Patient save(Patient patient) {
        return patientRepository.save(patient);
    }

    public List<Patient> patientList() {
        return patientRepository.findAll();
    }

    public Patient findById(Long id) {
        return patientRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Invalid user Id:" + id));
    }

    public void deleteById(Long id) {
        findById(id);
        patientRepository.deleteById(id);
    }

    public void update(Long id, Patient newPatient) {
        patientRepository.findById(id).map(medicine -> {
            medicine.setFirstName(newPatient.getFirstName());
            medicine.setLastName(newPatient.getLastName());
            medicine.setGender(newPatient.getGender());
            medicine.setPrescriptions(newPatient.getPrescriptions());
            return patientRepository.save(medicine);
        }).orElseThrow(() -> new IllegalArgumentException("Invalid user Id:" + id));
    }
}
