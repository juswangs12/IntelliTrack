package backend.intellitrack.service;

import backend.intellitrack.model.AiReminderLog;
import backend.intellitrack.repository.AiReminderLogRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AiReminderLogService {

    private final AiReminderLogRepository aiReminderLogRepository;

    public AiReminderLogService(AiReminderLogRepository aiReminderLogRepository) {
        this.aiReminderLogRepository = aiReminderLogRepository;
    }

    public List<AiReminderLog> getAllAiReminderLogs() {
        return aiReminderLogRepository.findAll();
    }

    public Optional<AiReminderLog> getAiReminderLogById(Long id) {
        return aiReminderLogRepository.findById(id);
    }

    public AiReminderLog saveAiReminderLog(AiReminderLog aiReminderLog) {
        return aiReminderLogRepository.save(aiReminderLog);
    }

    public void deleteAiReminderLog(Long id) {
        aiReminderLogRepository.deleteById(id);
    }
}