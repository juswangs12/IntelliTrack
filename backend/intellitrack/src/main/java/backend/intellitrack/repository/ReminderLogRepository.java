package backend.intellitrack.repository;

import backend.intellitrack.model.ReminderLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReminderLogRepository extends JpaRepository<ReminderLog, Long> {
}