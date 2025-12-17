package backend.intellitrack.service;

import backend.intellitrack.model.DocumentVersion;
import backend.intellitrack.repository.DocumentVersionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
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

    public DocumentVersion saveDocumentVersion(DocumentVersion documentVersion) {
        return documentVersionRepository.save(documentVersion);
    }

    public void deleteDocumentVersion(Long id) {
        documentVersionRepository.deleteById(id);
    }
}