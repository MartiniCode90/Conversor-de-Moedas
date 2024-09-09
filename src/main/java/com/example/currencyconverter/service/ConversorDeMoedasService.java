package com.example.currencyconverter.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class ConversorDeMoedasService {

    private final String API_URL = "https://v6.exchangerate-api.com/v6/976bbaee1ffc70bd7abfba1e/latest/";

    public double convert(String from, String to, double amount) {
        RestTemplate restTemplate = new RestTemplate();
        String url = API_URL + from.trim();
        ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);

        if (response.getStatusCode() == HttpStatus.OK) {
            Map<String, Object> body = response.getBody();
            if(body != null && body.containsKey("conversion_rates")) {
                Map<String, Double> rates = (Map<String, Double>) body.get("conversion_rates");
                if(rates != null && rates.containsKey(to)) {
                    double rate = rates.get(to);
                    return amount * rate;
                } else {
                    throw new RuntimeException("Taxa de câmbio não encontrada para a moeda: " + to);
                }
            } else {
                throw new RuntimeException("Resposta da API não contém a chave 'conversion_rates'");
            }
        } else {
            throw new RuntimeException("Falha ao recuperar a taxa de câmbio");
        }
    }
}