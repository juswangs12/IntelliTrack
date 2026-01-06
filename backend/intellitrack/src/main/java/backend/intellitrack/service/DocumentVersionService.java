package backend.intellitrack.service;

import backend.intellitrack.model.DocumentVersion;
import backend.intellitrack.model.Submission;
import backend.intellitrack.repository.DocumentVersionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class DocumentVersionService {

    private final DocumentVersionRepository documentVersionRepository;

    public DocumentVersionService(DocumentVersionRepository documentVersionRepository) {
        this.documentVersionRepository = documentVersionRepository;
    }

    public List<DocumentVersion> getAllDocumentVersions() {
        return documentVersionRepository.findAll();
    }

    public Optional<DocumentVersion> getDocumentVersionById(Long id) {
        return documentVersionRepository.findById(id);
    }

    public List<DocumentVersion> getDocumentVersionsBySubmission(Submission submission) {
        return documentVersionRepository.findBySubmissionOrderByVersionNumberDesc(submission);
    }

    public DocumentVersion createDocumentVersion(DocumentVersion documentVersion) {
        return documentVersionRepository.save(documentVersion);
    }

    public DocumentVersion updateDocumentVersion(Long id, DocumentVersion documentVersion) {
        Optional<DocumentVersion> existing = documentVersionRepository.findById(id);
        if (existing.isPresent()) {
            DocumentVersion updated = existing.get();
            updated.setFileName(documentVersion.getFileName());
            updated.setFilePath(documentVersion.getFilePath());
            updated.setChangeDescription(documentVersion.getChangeDescription());
            updated.setFileSize(documentVersion.getFileSize());
            updated.setFileHash(documentVersion.getFileHash());
            return documentVersionRepository.save(updated);
        }
        return null;
    }

    public boolean deleteDocumentVersion(Long id) {
        if (documentVersionRepository.existsById(id)) {
            documentVersionRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
