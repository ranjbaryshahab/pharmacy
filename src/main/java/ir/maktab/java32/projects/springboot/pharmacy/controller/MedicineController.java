package ir.maktab.java32.projects.springboot.pharmacy.controller;

import ir.maktab.java32.projects.springboot.pharmacy.model.Medicine;
import ir.maktab.java32.projects.springboot.pharmacy.services.MedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/medicine")
public class MedicineController {

    @Autowired
    private MedicineService medicineService;

    @GetMapping("/all")
    public List<Medicine> medicineList() {
        return medicineService.medicineList();
    }

    @GetMapping("/save")
    public Medicine medicineSave(@RequestParam String medicineName, @RequestParam String description, @RequestParam Double price) {
        return medicineService.save(new Medicine(null, medicineName, price, description));
    }

    @GetMapping("/find")
    public Medicine getMedicineById(@RequestParam Long id) {
        return medicineService.findById(id);
    }

    @GetMapping("/edit")
    public void updateMedicine(@RequestParam Long id, @RequestParam String medicineName, @RequestParam String description, @RequestParam Double price) {
        medicineService.update(id, new Medicine(id, medicineName, price, description));
    }

    @GetMapping("/delete")
    public void deleteMedicine(@RequestParam Long id) {
        medicineService.deleteById(id);
    }

}
