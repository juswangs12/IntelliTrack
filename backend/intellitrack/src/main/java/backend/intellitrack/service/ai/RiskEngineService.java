package backend.intellitrack.service.ai;

import backend.intellitrack.model.*;
import backend.intellitrack.repository.SubmissionRepository;
import backend.intellitrack.repository.SubmissionVersionRepository;
import backend.intellitrack.service.SubmissionRiskService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class RiskEngineService {

    private final SubmissionRepository submissionRepository;
    private final SubmissionVersionRepository submissionVersionRepository;
    private final SubmissionRiskService submissionRiskService;
    private final GeminiService geminiService;

    public RiskEngineService(SubmissionRepository submissionRepository, SubmissionVersionRepository submissionVersionRepository, SubmissionRiskService submissionRiskService, GeminiService geminiService) {
        this.submissionRepository = submissionRepository;
        this.submissionVersionRepository = submissionVersionRepository;
        this.submissionRiskService = submissionRiskService;
        this.geminiService = geminiService;
    }

    public SubmissionRisk calculateRisk(Submission submission) {
        // Get submission details
        List<SubmissionVersion> versions = submissionVersionRepository.findBySubmissionIdOrderByVersionNumberDesc(submission.getId());
        int revisionCount = versions.size();

        // Placeholder deadline (in real app, get from milestone)
        LocalDateTime deadline = LocalDateTime.now().plusDays(7);
        long daysRemaining = ChronoUnit.DAYS.between(LocalDateTime.now(), deadline);

        // AI-powered risk assessment
        String prompt = String.format(
            "Assess the risk level for this capstone project submission. " +
            "Submission status: %s. " +
            "Number of revisions: %d. " +
            "Days remaining until deadline: %d. " +
            "Provide a risk score from 0.0 to 1.0 and risk level (LOW, MEDIUM, HIGH). " +
            "Format: score: X.X, level: LEVEL",
            submission.getStatus(), revisionCount, daysRemaining
        );

        String aiResponse = geminiService.generateRecommendation(prompt);

        // Parse AI response (simple parsing)
        double riskScore = 0.5; // default
        RiskLevel riskLevel = RiskLevel.MEDIUM;

        try {
            if (aiResponse.contains("score:")) {
                String scoreStr = aiResponse.split("score:")[1].split(",")[0].trim();
                riskScore = Double.parseDouble(scoreStr);
            }
            if (aiResponse.toUpperCase().contains("HIGH")) {
                riskLevel = RiskLevel.HIGH;
            } else if (aiResponse.toUpperCase().contains("LOW")) {
                riskLevel = RiskLevel.LOW;
            } else {
                riskLevel = RiskLevel.MEDIUM;
            }
        } catch (Exception e) {
            // Fallback to rule-based if parsing fails
            if (daysRemaining < 3) riskScore += 0.5;
            if (revisionCount > 3) riskScore += 0.3;
            if (riskScore > 0.7) riskLevel = RiskLevel.HIGH;
            else if (riskScore > 0.4) riskLevel = RiskLevel.MEDIUM;
            else riskLevel = RiskLevel.LOW;
        }

        SubmissionRisk risk = new SubmissionRisk();
        risk.setSubmissionId(submission.getId());
        risk.setRiskScore(riskScore);
        risk.setRiskLevel(riskLevel);

        return submissionRiskService.saveSubmissionRisk(risk);
    }
}