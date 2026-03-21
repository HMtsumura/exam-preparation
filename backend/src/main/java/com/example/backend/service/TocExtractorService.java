package com.example.backend.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class TocExtractorService {

    @Value("${toc-extractor.api.url:http://localhost:8000}")
    private String tocServerUrl;

    private final RestTemplate restTemplate;

    @Autowired
    private ObjectMapper objectMapper;

    public TocExtractorService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    /**
     * FastAPI サーバーに画像を送信して、目次を抽出する
     */
    public String extractToc(MultipartFile file) throws IOException {
        String tocServerEndpoint = tocServerUrl + "/extract-toc/";

        // マルチパートリクエストを構築
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("file", new MultipartFileResource(file));

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        try {
            // FastAPI サーバーを呼び出し
            ResponseEntity<String> response = restTemplate.postForEntity(
                    tocServerEndpoint,
                    requestEntity,
                    String.class
            );

            if (response.getStatusCode().is2xxSuccessful()) {
                // JSON レスポンスをそのまま返す
                return response.getBody();
            } else {
                throw new RuntimeException("Failed to extract TOC: " + response.getStatusCode());
            }
        } catch (Exception e) {
            throw new RuntimeException("Error calling TOC extractor service: " + e.getMessage(), e);
        }
    }

    /**
     * マルチパートファイルリソースラッパー
     */
    private static class MultipartFileResource extends org.springframework.core.io.ByteArrayResource {
        private final String filename;

        public MultipartFileResource(MultipartFile file) throws IOException {
            super(file.getBytes());
            this.filename = file.getOriginalFilename();
        }

        @Override
        public String getFilename() {
            return filename;
        }
    }
}
