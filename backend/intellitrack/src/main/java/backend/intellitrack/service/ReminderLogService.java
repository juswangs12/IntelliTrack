package backend.intellitrack.service;

import backend.intellitrack.model.ReminderLog;
import backend.intellitrack.repository.ReminderLogRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReminderLogService {

    private final ReminderLogRepository reminderLogRepository;

    public ReminderLogService(ReminderLogRepository reminderLogRepository) {
        this.reminderLogRepository = reminderLogRepository;
    }

    public List<ReminderLog> getAllReminderLogs() {
        return reminderLogRepository.findAll();
    }

    public Optional<ReminderLog> getReminderLogById(Long id) {
        return reminderLogRepository.findById(id);
    }

    public ReminderLog saveReminderLog(ReminderLog reminderLog) {
        return reminderLogRepository.save(reminderLog);
    }

    public void deleteReminderLog(Long id) {
        reminderLogRepository.deleteById(id);
    }
}