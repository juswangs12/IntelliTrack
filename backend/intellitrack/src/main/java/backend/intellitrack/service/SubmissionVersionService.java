package backend.intellitrack.service;

import backend.intellitrack.model.SubmissionVersion;
import backend.intellitrack.repository.SubmissionVersionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SubmissionVersionService {

    private final SubmissionVersionRepository submissionVersionRepository;

    public SubmissionVersionService(SubmissionVersionRepository submissionVersionRepository) {
        this.submissionVersionRepository = submissionVersionRepository;
    }

    public List<SubmissionVersion> getAllSubmissionVersions() {
        return submissionVersionRepository.findAll();
    }

    public Optional<SubmissionVersion> getSubmissionVersionById(Long id) {
        return submissionVersionRepository.findById(id);
    }

    public List<SubmissionVersion> getSubmissionVersionsBySubmissionId(Long submissionId) {
        return submissionVersionRepository.findBySubmissionIdOrderByVersionNumberDesc(submissionId);
    }

    public SubmissionVersion saveSubmissionVersion(SubmissionVersion submissionVersion) {
        return submissionVersionRepository.save(submissionVersion);
    }

    public void deleteSubmissionVersion(Long id) {
        submissionVersionRepository.deleteById(id);
    }
}