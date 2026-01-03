package backend.intellitrack.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "feedback")
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "submission_version_id", nullable = false)
    private Long submissionVersionId;

    @Column(name = "adviser_id", nullable = false)
    private Long adviserId;

    @Column(nullable = false)
    private String comment;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    public Feedback() {}

    public Feedback(Long id, Long submissionVersionId, Long adviserId, String comment, LocalDateTime createdAt) {
        this.id = id;
        this.submissionVersionId = submissionVersionId;
        this.adviserId = adviserId;
        this.comment = comment;
        this.createdAt = createdAt;
    }

    @PrePersist
    void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getSubmissionVersionId() { return submissionVersionId; }
    public void setSubmissionVersionId(Long submissionVersionId) { this.submissionVersionId = submissionVersionId; }

    public Long getAdviserId() { return adviserId; }
    public void setAdviserId(Long adviserId) { this.adviserId = adviserId; }

    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}