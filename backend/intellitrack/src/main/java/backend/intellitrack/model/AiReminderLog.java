package backend.intellitrack.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "ai_reminder_logs")
public class AiReminderLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String riskLevel;
    private String reason;

    private LocalDateTime generatedAt;

    @ManyToOne
    private Submission submission;

    public AiReminderLog() {}

    public AiReminderLog(Long id, String riskLevel, String reason,
                         LocalDateTime generatedAt, Submission submission) {
        this.id = id;
        this.riskLevel = riskLevel;
        this.reason = reason;
        this.generatedAt = generatedAt;
        this.submission = submission;
    }

    @PrePersist
    void onCreate() {
        generatedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getRiskLevel() { return riskLevel; }
    public void setRiskLevel(String riskLevel) { this.riskLevel = riskLevel; }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }

    public LocalDateTime getGeneratedAt() { return generatedAt; }
    public void setGeneratedAt(LocalDateTime generatedAt) { this.generatedAt = generatedAt; }

    public Submission getSubmission() { return submission; }
    public void setSubmission(Submission submission) { this.submission = submission; }
    
}