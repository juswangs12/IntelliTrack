package backend.intellitrack.repository;

import backend.intellitrack.model.RubricEvaluation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RubricEvaluationRepository extends JpaRepository<RubricEvaluation, Long> {
}