package backend.intellitrack.repository;

import backend.intellitrack.model.DocumentVersion;
import backend.intellitrack.model.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentVersionRepository extends JpaRepository<DocumentVersion, Long> {
    List<DocumentVersion> findBySubmission(Submission submission);
    List<DocumentVersion> findBySubmissionOrderByVersionNumberDesc(Submission submission);
}
