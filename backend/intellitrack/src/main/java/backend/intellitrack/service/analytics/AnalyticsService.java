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

    // Add more analytics methods as needed
}