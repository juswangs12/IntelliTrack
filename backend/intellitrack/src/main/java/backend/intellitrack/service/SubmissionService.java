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

    public List<Submission> getAllSubmissions() {
        return submissionRepository.findAll();
    }

    public List<Submission> getSubmissionsByGroupId(Long groupId) {
        return submissionRepository.findByGroupId(groupId);
    }

    public Submission updateSubmissionStatus(Long id, SubmissionStatus status) {
        Optional<Submission> existing = submissionRepository.findById(id);
        if (existing.isPresent()) {
            Submission submission = existing.get();
            submission.setStatus(status);
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

    public List<Submission> getSubmissionsByStatus(SubmissionStatus status) {
        return submissionRepository.findByStatus(status);
    }

    public Submission updateSubmission(Long id, Submission submission) {
        Optional<Submission> existing = submissionRepository.findById(id);
        if (existing.isPresent()) {
            Submission sub = existing.get();
            sub.setMilestoneId(submission.getMilestoneId());
            sub.setGroupId(submission.getGroupId());
            sub.setStatus(submission.getStatus());
            return submissionRepository.save(sub);
        }
        return null;
    }

    public List<Submission> getSubmissionsByStudent(User student) {
        return submissionRepository.findByGroupId(student.getGroupId());
    }
}
