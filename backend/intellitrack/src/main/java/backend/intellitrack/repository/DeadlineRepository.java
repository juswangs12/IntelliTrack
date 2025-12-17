package backend.intellitrack.repository;

import backend.intellitrack.model.Deadline;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeadlineRepository extends JpaRepository<Deadline, Long> {
}