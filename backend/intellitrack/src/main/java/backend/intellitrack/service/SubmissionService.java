package backend.intellitrack.service;

import backend.intellitrack.model.Submission;
import backend.intellitrack.model.SubmissionStatus;
import backend.intellitrack.model.SubmissionType;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class SubmissionService {

    private final Map<Long, Submission> submissions = new HashMap<>();
    private Long nextId = 1L;

    public SubmissionService() {
        initializeSampleData();
    }

    private void initializeSampleData() {
        // Sample submissions
        Submission sub1 = new Submission(1L, SubmissionType.PROJECT_PROPOSAL,
                "IntelliTrack System Proposal", "Capstone project proposal");
        sub1.setId(nextId++);
        sub1.setStudentName("John Doe");
        sub1.setStatus(SubmissionStatus.UNDER_REVIEW);
        submissions.put(sub1.getId(), sub1);

        Submission sub2 = new Submission(1L, SubmissionType.SRS,
                "Software Requirements Specification", "SRS Document");
        sub2.setId(nextId++);
        sub2.setStudentName("John Doe");
        sub2.setStatus(SubmissionStatus.PENDING);
        submissions.put(sub2.getId(), sub2);
    }

    public Submission createSubmission(Submission submission) {
        submission.setId(nextId++);
        submission.setSubmittedAt(LocalDateTime.now());
        submission.setCreatedAt(LocalDateTime.now());
        submission.setUpdatedAt(LocalDateTime.now());
        submissions.put(submission.getId(), submission);
        return submission;
    }

    public Submission getSubmissionById(Long id) {
        return submissions.get(id);
    }

    public List<Submission> getSubmissionsByStudentId(Long studentId) {
        return submissions.values().stream()
                .filter(s -> s.getStudentId().equals(studentId))
                .collect(Collectors.toList());
    }

    public List<Submission> getAllSubmissions() {
        return new ArrayList<>(submissions.values());
    }

    public List<Submission> getSubmissionsByStatus(SubmissionStatus status) {
        return submissions.values().stream()
                .filter(s -> s.getStatus() == status)
                .collect(Collectors.toList());
    }

    public Submission updateSubmission(Long id, Submission updatedSubmission) {
        Submission existing = submissions.get(id);
        if (existing != null) {
            existing.setTitle(updatedSubmission.getTitle());
            existing.setDescription(updatedSubmission.getDescription());
            existing.setStatus(updatedSubmission.getStatus());
            existing.setFeedback(updatedSubmission.getFeedback());
            existing.setUpdatedAt(LocalDateTime.now());
            return existing;
        }
        return null;
    }

    public boolean deleteSubmission(Long id) {
        return submissions.remove(id) != null;
    }
}
