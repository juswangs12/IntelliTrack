package backend.intellitrack.service;

import backend.intellitrack.model.Submission;
import backend.intellitrack.model.SubmissionStatus;
import backend.intellitrack.model.User;
import backend.intellitrack.repository.SubmissionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SubmissionService {

    private final SubmissionRepository submissionRepository;

    public SubmissionService(SubmissionRepository submissionRepository) {
        this.submissionRepository = submissionRepository;
    }

    public Submission createSubmission(Submission submission) {
        return submissionRepository.save(submission);
    }

    public Optional<Submission> getSubmissionById(Long id) {
        return submissionRepository.findById(id);
    }

    public List<Submission> getSubmissionsByStudent(User student) {
        return submissionRepository.findByStudent(student);
    }

    public List<Submission> getAllSubmissions() {
        return submissionRepository.findAll();
    }

    public List<Submission> getSubmissionsByStatus(SubmissionStatus status) {
        return submissionRepository.findByStatus(status);
    }

    public Submission updateSubmission(Long id, Submission updatedSubmission) {
        Optional<Submission> existing = submissionRepository.findById(id);
        if (existing.isPresent()) {
            Submission submission = existing.get();
            submission.setType(updatedSubmission.getType());
            submission.setStatus(updatedSubmission.getStatus());
            submission.setFeedback(updatedSubmission.getFeedback());
            return submissionRepository.save(submission);
        }
        return null;
    }

    public boolean deleteSubmission(Long id) {
        if (submissionRepository.existsById(id)) {
            submissionRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
