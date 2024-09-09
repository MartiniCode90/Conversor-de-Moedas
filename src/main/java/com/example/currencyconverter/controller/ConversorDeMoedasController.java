package com.example.currencyconverter.controller;

import com.example.currencyconverter.service.ConversorDeMoedasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ConversorDeMoedasController {

    @Autowired
    private ConversorDeMoedasService conversorService;

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/convert")
    public ResponseEntity<Map<String, Object>> converterMoeda(
            @RequestParam String from,
            @RequestParam String to,
            @RequestParam double amount) {
        double result = conversorService.convert(from, to, amount);
        Map<String, Object> response = new HashMap<>();
        response.put("from", from);
        response.put("to", to);
        response.put("amount", amount);
        response.put("convertedAmount", result);
        return ResponseEntity.ok(response);
    }
}
