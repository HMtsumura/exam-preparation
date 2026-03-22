package com.example.backend.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
import java.util.HashMap;
import java.util.Map;

@Service
public class ExamAnalysisService {
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    private final String FASTAPI_URL = "http://toc-server:8000";

    public ExamAnalysisService() {
        this.restTemplate = new RestTemplate();
        this.objectMapper = new ObjectMapper();
    }

    public Map<String, Object> analyzeExam(String examName, Double dailyStudyHours) throws Exception {
        // FastAPIエンドポイントに送信
        String url = FASTAPI_URL + "/analyze-exam/";

        // リクエストボディを作成
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("exam_name", examName);
        requestBody.put("daily_study_hours", dailyStudyHours);

        // HTTPヘッダーを設定
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // HTTPエンティティを作成
        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

        try {
            // FastAPIに送信
            Map<String, Object> response = restTemplate.postForObject(url, request, Map.class);
            return response;
        } catch (Exception e) {
            throw new RuntimeException("FastAPI呼び出しに失敗しました: " + e.getMessage(), e);
        }
    }
}
