package backend.intellitrack.repository;

import backend.intellitrack.model.SubmissionVersion;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SubmissionVersionRepository extends JpaRepository<SubmissionVersion, Long> {
    List<SubmissionVersion> findBySubmissionIdOrderByVersionNumberDesc(Long submissionId);
}