package backend.intellitrack.controller;

import backend.intellitrack.model.SubmissionRisk;
import backend.intellitrack.model.Submission;
import backend.intellitrack.service.SubmissionService;
import backend.intellitrack.service.ai.RiskEngineService;
import backend.intellitrack.service.ai.GeminiService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/ai")
public class AiController {

    private final RiskEngineService riskEngineService;
    private final SubmissionService submissionService;
    private final GeminiService geminiService;

    public AiController(RiskEngineService riskEngineService, SubmissionService submissionService, GeminiService geminiService) {
        this.riskEngineService = riskEngineService;
        this.submissionService = submissionService;
        this.geminiService = geminiService;
    }

    @PostMapping("/risk/{submissionId}")
    @PreAuthorize("hasRole('COORDINATOR') or hasRole('ADMIN')")
    public ResponseEntity<SubmissionRisk> analyzeRisk(@PathVariable Long submissionId) {
        Optional<Submission> submission = submissionService.getSubmissionById(submissionId);
        if (submission.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        SubmissionRisk risk = riskEngineService.calculateRisk(submission.get());
        return ResponseEntity.ok(risk);
    }

    @GetMapping("/recommendation/{submissionId}")
    @PreAuthorize("hasRole('COORDINATOR') or hasRole('ADMIN')")
    public ResponseEntity<String> getRecommendation(@PathVariable Long submissionId) {
        Optional<Submission> submission = submissionService.getSubmissionById(submissionId);
        if (submission.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        String prompt = "Provide a recommendation for improving this capstone project submission. Submission details: " +
                        "Status: " + submission.get().getStatus() + ". Suggest ways to enhance quality and meet deadlines.";
        String recommendation = geminiService.generateRecommendation(prompt);
        return ResponseEntity.ok(recommendation);
    }
}