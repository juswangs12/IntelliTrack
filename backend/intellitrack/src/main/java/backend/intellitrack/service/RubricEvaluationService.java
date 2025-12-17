package backend.intellitrack.service;

import backend.intellitrack.model.RubricEvaluation;
import backend.intellitrack.repository.RubricEvaluationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RubricEvaluationService {

    private final RubricEvaluationRepository rubricEvaluationRepository;

    public RubricEvaluationService(RubricEvaluationRepository rubricEvaluationRepository) {
        this.rubricEvaluationRepository = rubricEvaluationRepository;
    }

    public List<RubricEvaluation> getAllRubricEvaluations() {
        return rubricEvaluationRepository.findAll();
    }

    public Optional<RubricEvaluation> getRubricEvaluationById(Long id) {
        return rubricEvaluationRepository.findById(id);
    }

    public RubricEvaluation saveRubricEvaluation(RubricEvaluation rubricEvaluation) {
        return rubricEvaluationRepository.save(rubricEvaluation);
    }

    public void deleteRubricEvaluation(Long id) {
        rubricEvaluationRepository.deleteById(id);
    }
}