package backend.intellitrack.service;

import backend.intellitrack.model.SubmissionRisk;
import backend.intellitrack.repository.SubmissionRiskRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SubmissionRiskService {

    private final SubmissionRiskRepository submissionRiskRepository;

    public SubmissionRiskService(SubmissionRiskRepository submissionRiskRepository) {
        this.submissionRiskRepository = submissionRiskRepository;
    }

    public List<SubmissionRisk> getAllSubmissionRisks() {
        return submissionRiskRepository.findAll();
    }

    public Optional<SubmissionRisk> getSubmissionRiskById(Long id) {
        return submissionRiskRepository.findById(id);
    }

    public Optional<SubmissionRisk> getSubmissionRiskBySubmissionId(Long submissionId) {
        return submissionRiskRepository.findBySubmissionId(submissionId);
    }

    public SubmissionRisk saveSubmissionRisk(SubmissionRisk submissionRisk) {
        return submissionRiskRepository.save(submissionRisk);
    }

    public void deleteSubmissionRisk(Long id) {
        submissionRiskRepository.deleteById(id);
    }
}