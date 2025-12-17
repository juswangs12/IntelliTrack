package backend.intellitrack.repository;

import backend.intellitrack.model.Submission;
import backend.intellitrack.model.SubmissionStatus;
import backend.intellitrack.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    List<Submission> findByStudent(User student);
    List<Submission> findByStatus(SubmissionStatus status);

    @Query("SELECT COUNT(s) FROM Submission s WHERE s.status = :status")
    long countByStatus(SubmissionStatus status);

    @Query("SELECT COUNT(s) FROM Submission s WHERE s.student = :student")
    long countByStudent(User student);
}