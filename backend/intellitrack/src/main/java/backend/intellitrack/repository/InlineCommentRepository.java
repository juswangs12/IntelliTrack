package backend.intellitrack.repository;

import backend.intellitrack.model.InlineComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InlineCommentRepository extends JpaRepository<InlineComment, Long> {
}