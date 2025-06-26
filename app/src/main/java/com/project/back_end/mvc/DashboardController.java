package com.project.back_end.mvc;

import com.project.back_end.service.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Controller
public class DashboardController {

    // 2. Autowire the Shared Service:
    @Autowired
    private Service sharedService;

    // 3. Define the `adminDashboard` Method:
    @GetMapping("/adminDashboard/{token}")
    public String adminDashboard(@PathVariable String token) {
        Map<String, Object> result = sharedService.validateToken(token, "admin");
        if (result.isEmpty()) {
            return "admin/adminDashboard";
        } else {
            return "redirect:http://localhost:8080";
        }
    }

    // 4. Define the `doctorDashboard` Method:
    @GetMapping("/doctorDashboard/{token}")
    public String doctorDashboard(@PathVariable String token) {
        Map<String, Object> result = sharedService.validateToken(token, "doctor");
        if (result.isEmpty()) {
            return "doctor/doctorDashboard";
        } else {
            return "redirect:http://localhost:8080";
        }
    }
}

