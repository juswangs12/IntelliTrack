package backend.intellitrack.model;

import jakarta.persistence.*;

@Entity
@Table(name = "inline_comments")
public class InlineComment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int pageNumber;
    private String commentText;

    @ManyToOne
    private Feedback feedback;

    public InlineComment() {}

    public InlineComment(Long id, int pageNumber, String commentText, Feedback feedback) {
        this.id = id;
        this.pageNumber = pageNumber;
        this.commentText = commentText;
        this.feedback = feedback;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public int getPageNumber() { return pageNumber; }
    public void setPageNumber(int pageNumber) { this.pageNumber = pageNumber; }

    public String getCommentText() { return commentText; }
    public void setCommentText(String commentText) { this.commentText = commentText; }

    public Feedback getFeedback() { return feedback; }
    public void setFeedback(Feedback feedback) { this.feedback = feedback; }
}