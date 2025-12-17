package backend.intellitrack.repository;

import backend.intellitrack.model.AiReminderLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AiReminderLogRepository extends JpaRepository<AiReminderLog, Long> {
}