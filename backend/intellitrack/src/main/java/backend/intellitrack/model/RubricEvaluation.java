package backend.intellitrack.model;

import jakarta.persistence.*;

@Entity
@Table(name = "rubric_evaluations")
public class RubricEvaluation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String criteria;
    private int score;
    private String remarks;

    @ManyToOne
    private Feedback feedback;

    public RubricEvaluation() {}

    public RubricEvaluation(Long id, String criteria, int score,
                            String remarks, Feedback feedback) {
        this.id = id;
        this.criteria = criteria;
        this.score = score;
        this.remarks = remarks;
        this.feedback = feedback;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCriteria() { return criteria; }
    public void setCriteria(String criteria) { this.criteria = criteria; }

    public int getScore() { return score; }
    public void setScore(int score) { this.score = score; }

    public String getRemarks() { return remarks; }
    public void setRemarks(String remarks) { this.remarks = remarks; }

    public Feedback getFeedback() { return feedback; }
    public void setFeedback(Feedback feedback) { this.feedback = feedback; }
}