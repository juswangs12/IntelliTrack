package backend.intellitrack.service;

import backend.intellitrack.model.InlineComment;
import backend.intellitrack.repository.InlineCommentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InlineCommentService {

    private final InlineCommentRepository inlineCommentRepository;

    public InlineCommentService(InlineCommentRepository inlineCommentRepository) {
        this.inlineCommentRepository = inlineCommentRepository;
    }

    public List<InlineComment> getAllInlineComments() {
        return inlineCommentRepository.findAll();
    }

    public Optional<InlineComment> getInlineCommentById(Long id) {
        return inlineCommentRepository.findById(id);
    }

    public InlineComment saveInlineComment(InlineComment inlineComment) {
        return inlineCommentRepository.save(inlineComment);
    }

    public void deleteInlineComment(Long id) {
        inlineCommentRepository.deleteById(id);
    }
}