package backend.intellitrack.service.ai;

import backend.intellitrack.model.ReminderLog;
import backend.intellitrack.model.RiskLevel;
import backend.intellitrack.model.Submission;
import backend.intellitrack.model.SubmissionRisk;
import backend.intellitrack.repository.SubmissionRepository;
import backend.intellitrack.service.ReminderLogService;
import backend.intellitrack.service.SubmissionRiskService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReminderSchedulerService {

    private final SubmissionRepository submissionRepository;
    private final SubmissionRiskService submissionRiskService;
    private final ReminderLogService reminderLogService;
    private final GeminiService geminiService;

    public ReminderSchedulerService(SubmissionRepository submissionRepository, SubmissionRiskService submissionRiskService, ReminderLogService reminderLogService, GeminiService geminiService) {
        this.submissionRepository = submissionRepository;
        this.submissionRiskService = submissionRiskService;
        this.reminderLogService = reminderLogService;
        this.geminiService = geminiService;
    }

    @Scheduled(fixedRate = 3600000) // every hour
    public void sendReminders() {
        List<Submission> submissions = submissionRepository.findAll();
        for (Submission submission : submissions) {
            Optional<SubmissionRisk> riskOpt = submissionRiskService.getSubmissionRiskBySubmissionId(submission.getId());
            if (riskOpt.isPresent()) {
                SubmissionRisk risk = riskOpt.get();
                if (risk.getRiskLevel() == RiskLevel.HIGH || risk.getRiskLevel() == RiskLevel.MEDIUM) {
                    // Generate AI-powered reminder message
                    String prompt = String.format(
                        "Generate a personalized reminder message for a student about their capstone project submission. " +
                        "Submission status: %s. Risk level: %s. Risk score: %.2f. " +
                        "Make it encouraging, specific, and actionable. Keep it under 100 words.",
                        submission.getStatus(), risk.getRiskLevel(), risk.getRiskScore()
                    );
                    String message = geminiService.generateRecommendation(prompt);

                    // Log the reminder
                    ReminderLog log = new ReminderLog();
                    log.setSubmissionId(submission.getId());
                    log.setMessage(message); // Assume ReminderLog has a message field
                    reminderLogService.saveReminderLog(log);
                    // In real implementation, send email/notification with this message
                }
            }
        }
    }
}