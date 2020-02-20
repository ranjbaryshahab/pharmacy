package ir.maktab.java32.projects.springboot.pharmacy.services;

import ir.maktab.java32.projects.springboot.pharmacy.model.Prescription;
import ir.maktab.java32.projects.springboot.pharmacy.repositories.PrescriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PrescriptionService {
    @Autowired
    private PrescriptionRepository prescriptionRepository;

    public Prescription save(Prescription prescription) {
        return prescriptionRepository.save(prescription);
    }

    public List<Prescription> prescriptionList() {
        return prescriptionRepository.findAll();
    }

    public Prescription findById(Long id) {
        return prescriptionRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Invalid user Id:" + id));
    }

    public void deleteById(Long id) {
        findById(id);
        prescriptionRepository.deleteById(id);
    }

    public void update(Long id, Prescription newPrescription) {
        prescriptionRepository.findById(id).map(prescription -> {
            prescription.setIssueDate(newPrescription.getIssueDate());
            prescription.setPatientReferralDate(newPrescription.getPatientReferralDate());
            return prescriptionRepository.save(prescription);
        }).orElseThrow(() -> new IllegalArgumentException("Invalid user Id:" + id));
    }
}
