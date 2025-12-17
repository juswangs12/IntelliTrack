package backend.intellitrack.repository;

import backend.intellitrack.model.RiskLog;
import backend.intellitrack.model.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RiskLogRepository extends JpaRepository<RiskLog, Long> {
    List<RiskLog> findBySubmission(Submission submission);
}