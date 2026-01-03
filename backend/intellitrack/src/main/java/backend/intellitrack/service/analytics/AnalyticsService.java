package backend.intellitrack.service.analytics;

import backend.intellitrack.model.SubmissionStatus;
import backend.intellitrack.repository.SubmissionRepository;
import backend.intellitrack.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class AnalyticsService {

    private final SubmissionRepository submissionRepository;
    private final UserRepository userRepository;

    public AnalyticsService(SubmissionRepository submissionRepository, UserRepository userRepository) {
        this.submissionRepository = submissionRepository;
        this.userRepository = userRepository;
    }

    public long getSubmissionCountByStatus(SubmissionStatus status) {
        return submissionRepository.countByStatus(status);
    }

    public long getTotalSubmissions() {
        return submissionRepository.count();
    }

    public long getTotalUsers() {
        return userRepository.count();
    }

    // Submission completion rates
    public double getSubmissionCompletionRate() {
        long total = getTotalSubmissions();
        long approved = getSubmissionCountByStatus(SubmissionStatus.APPROVED);
        return total > 0 ? (double) approved / total : 0;
    }

    // Late submission counts (placeholder, need deadline logic)
    public long getLateSubmissionCount() {
        // Implement logic to count submissions past deadline
        return 0; // placeholder
    }

    // Adviser feedback response times (placeholder)
    public double getAverageFeedbackResponseTime() {
        // Implement logic to calculate average time from submission to feedback
        return 0; // placeholder
    }

    // Project-level progress summaries (placeholder)
    public String getProjectProgressSummary(Long projectId) {
        // Implement logic to summarize progress for a project
        return "Project progress summary"; // placeholder
    }
}