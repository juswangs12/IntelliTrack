package backend.intellitrack.controller;

import backend.intellitrack.model.RiskLog;
import backend.intellitrack.model.Submission;
import backend.intellitrack.service.SubmissionService;
import backend.intellitrack.service.ai.AiService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/ai")
public class AiController {

    private final AiService aiService;
    private final SubmissionService submissionService;

    public AiController(AiService aiService, SubmissionService submissionService) {
        this.aiService = aiService;
        this.submissionService = submissionService;
    }

    @PostMapping("/risk/{submissionId}")
    @PreAuthorize("hasRole('COORDINATOR') or hasRole('ADMIN')")
    public ResponseEntity<RiskLog> analyzeRisk(@PathVariable Long submissionId) {
        Optional<Submission> submission = submissionService.getSubmissionById(submissionId);
        if (submission.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        RiskLog riskLog = aiService.analyzeRisk(submission.get());
        return ResponseEntity.ok(riskLog);
    }

    @GetMapping("/recommendation/{submissionId}")
    @PreAuthorize("hasRole('COORDINATOR') or hasRole('ADMIN')")
    public ResponseEntity<String> getRecommendation(@PathVariable Long submissionId) {
        Optional<Submission> submission = submissionService.getSubmissionById(submissionId);
        if (submission.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        String recommendation = aiService.generateRecommendation(submission.get());
        return ResponseEntity.ok(recommendation);
    }
}