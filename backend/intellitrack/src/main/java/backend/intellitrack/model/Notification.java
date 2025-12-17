package backend.intellitrack.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "notification")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String message;
    @Column(name = "`read`")
    private boolean read;

    private LocalDateTime sentAt;

    @ManyToOne
    private User user;

    public Notification() {}

    public Notification(Long id, String message, boolean read,
                        LocalDateTime sentAt, User user) {
        this.id = id;
        this.message = message;
        this.read = read;
        this.sentAt = sentAt;
        this.user = user;
    }

    @PrePersist
    void onCreate() {
        sentAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public boolean isRead() { return read; }
    public void setRead(boolean read) { this.read = read; }

    public LocalDateTime getSentAt() { return sentAt; }
    public void setSentAt(LocalDateTime sentAt) { this.sentAt = sentAt; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}