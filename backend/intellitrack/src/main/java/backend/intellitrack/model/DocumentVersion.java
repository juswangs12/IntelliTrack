package backend.intellitrack.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "document_versions")
public class DocumentVersion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int versionNumber;

    private String fileUrl;

    private LocalDateTime uploadedAt;

    @ManyToOne
    private Submission submission;

    public DocumentVersion() {}

    public DocumentVersion(Long id, int versionNumber, String fileUrl,
                           LocalDateTime uploadedAt, Submission submission) {
        this.id = id;
        this.versionNumber = versionNumber;
        this.fileUrl = fileUrl;
        this.uploadedAt = uploadedAt;
        this.submission = submission;
    }

    @PrePersist
    void onCreate() {
        uploadedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public int getVersionNumber() { return versionNumber; }
    public void setVersionNumber(int versionNumber) { this.versionNumber = versionNumber; }

    public String getFileUrl() { return fileUrl; }
    public void setFileUrl(String fileUrl) { this.fileUrl = fileUrl; }

    public LocalDateTime getUploadedAt() { return uploadedAt; }
    public void setUploadedAt(LocalDateTime uploadedAt) { this.uploadedAt = uploadedAt; }

    public Submission getSubmission() { return submission; }
    public void setSubmission(Submission submission) { this.submission = submission; }
}