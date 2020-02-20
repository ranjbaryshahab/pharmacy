package ir.maktab.java32.projects.springboot.pharmacy.controller;

import ir.maktab.java32.projects.springboot.pharmacy.dto.PatientDto;
import ir.maktab.java32.projects.springboot.pharmacy.dto.PrescriptionsDto;
import ir.maktab.java32.projects.springboot.pharmacy.model.Patient;
import ir.maktab.java32.projects.springboot.pharmacy.model.Prescription;
import ir.maktab.java32.projects.springboot.pharmacy.services.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/patient")
@CrossOrigin
public class PatientController {
    @Autowired
    private PatientService patientService;

    @GetMapping("/all")
    public List<Patient> patientList() {
        return patientService.patientList();
    }


    @PostMapping("/save")
    public void patientSave(@RequestBody PatientDto patientDto) {
        Patient patient = new Patient(null, patientDto.getFirstName(), patientDto.getLastName(), patientDto.getGender(), null);
        List<Prescription> prescriptions = new ArrayList<>();

        for (int i = 0; i < patientDto.getPrescriptions().length; i++) {
            prescriptions.add(
                    new Prescription(null, patientDto.getPrescriptions()[i].getPrescriptionId(),
                            new Date(patientDto.getPrescriptions()[i].getIssueDate()),
                            new Date(patientDto.getPrescriptions()[i].getPatientReferralDate())
                    )
            );
        }
        patient.setPrescriptions(prescriptions);

        patientService.save(patient);
    }

    @PostMapping("/edit")
    public void patientEdit(@RequestBody PatientDto patientDto, @RequestParam String id) {
        Patient patient = new Patient(Long.parseLong(id), patientDto.getFirstName(), patientDto.getLastName(), patientDto.getGender(), null);
        List<Prescription> prescriptions = new ArrayList<>();

        for (int i = 0; i < patientDto.getPrescriptions().length; i++) {
            prescriptions.add(
                    new Prescription(null, patientDto.getPrescriptions()[i].getPrescriptionId(),
                            new Date(patientDto.getPrescriptions()[i].getIssueDate()),
                            new Date(patientDto.getPrescriptions()[i].getPatientReferralDate())
                    )
            );
        }
        patient.setPrescriptions(prescriptions);

        patientService.update(patient.getId(),patient);
    }


    @GetMapping("/find")
    public Patient getPatientById(@RequestParam Long id) {
        return patientService.findById(id);
    }


    @GetMapping("/delete")
    public void patientDelete(@RequestParam Long id) {
        patientService.deleteById(id);
    }
}
