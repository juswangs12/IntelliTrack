package backend.intellitrack.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "feedback")
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Submission submission;

    @ManyToOne
    private User adviser;

    private String summaryComment;

    private LocalDateTime createdAt;

    @PrePersist
    void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public Feedback() {}

    public Feedback(Long id, String summaryComment, LocalDateTime createdAt,
                    Submission submission, User adviser) {
        this.id = id;
        this.summaryComment = summaryComment;
        this.createdAt = createdAt;
        this.submission = submission;
        this.adviser = adviser;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getSummaryComment() { return summaryComment; }
    public void setSummaryComment(String summaryComment) { this.summaryComment = summaryComment; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public Submission getSubmission() { return submission; }
    public void setSubmission(Submission submission) { this.submission = submission; }

    public User getAdviser() { return adviser; }
    public void setAdviser(User adviser) { this.adviser = adviser; }
}