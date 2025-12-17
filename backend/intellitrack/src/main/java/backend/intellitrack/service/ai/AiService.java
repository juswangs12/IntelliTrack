package backend.intellitrack.service.ai;

import backend.intellitrack.model.RiskLog;
import backend.intellitrack.model.Submission;
import backend.intellitrack.repository.RiskLogRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class AiService {

    private final RestTemplate restTemplate;
    private final RiskLogRepository riskLogRepository;

    public AiService(RestTemplate restTemplate, RiskLogRepository riskLogRepository) {
        this.restTemplate = restTemplate;
        this.riskLogRepository = riskLogRepository;
    }

    public RiskLog analyzeRisk(Submission submission) {
        // Mock AI call - in real implementation, call external AI API
        String riskLevel = "Low"; // Mock
        String explanation = "Submission looks good."; // Mock

        RiskLog riskLog = new RiskLog();
        riskLog.setSubmission(submission);
        riskLog.setRiskLevel(riskLevel);
        riskLog.setExplanation(explanation);

        return riskLogRepository.save(riskLog);
    }

    public String generateRecommendation(Submission submission) {
        // Mock recommendation
        return "Consider adding more details to the requirements.";
    }
}