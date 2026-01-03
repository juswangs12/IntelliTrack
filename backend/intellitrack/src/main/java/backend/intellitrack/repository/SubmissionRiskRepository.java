package backend.intellitrack.repository;

import backend.intellitrack.model.SubmissionRisk;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface SubmissionRiskRepository extends JpaRepository<SubmissionRisk, Long> {
    Optional<SubmissionRisk> findBySubmissionId(Long submissionId);
}