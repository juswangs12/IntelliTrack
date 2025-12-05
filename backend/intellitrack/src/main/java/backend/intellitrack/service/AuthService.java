package backend.intellitrack.service;

import backend.intellitrack.dto.LoginRequest;
import backend.intellitrack.dto.LoginResponse;
import backend.intellitrack.model.User;
import backend.intellitrack.model.UserRole;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AuthService {
    
    // Simulated user database
    private final Map<String, User> users = new HashMap<>();

    public AuthService() {
        initializeUsers();
    }

    private void initializeUsers() {
        // Student user
        User student = new User("John Doe", "student@example.com", "student123", UserRole.STUDENT);
        student.setId(1L);
        student.setStudentId("2024-00001");
        users.put("student@example.com", student);

        // Coordinator user
        User coordinator = new User("Dr. Jane Smith", "coordinator@example.com", "coordinator123", UserRole.COORDINATOR);
        coordinator.setId(2L);
        coordinator.setDepartment("Computer Science Department");
        coordinator.setPosition("Associate Professor");
        users.put("coordinator@example.com", coordinator);

        // Admin user
        User admin = new User("Admin User", "admin@example.com", "admin123", UserRole.ADMIN);
        admin.setId(3L);
        users.put("admin@example.com", admin);
    }

    public LoginResponse authenticate(LoginRequest request) {
        User user = users.get(request.getEmail());
        
        if (user == null) {
            return null;
        }

        // Verify password
        if (!user.getPassword().equals(request.getPassword())) {
            return null;
        }

        // Verify role matches
        String roleString = user.getRole().name().toLowerCase();
        if (!roleString.equals(request.getRole().toLowerCase())) {
            return null;
        }

        // Create response
        LoginResponse response = new LoginResponse(
            user.getId(),
            user.getName(),
            user.getEmail(),
            roleString
        );

        return response;
    }

    public User getUserByEmail(String email) {
        return users.get(email);
    }

    public List<User> getAllUsers() {
        return new ArrayList<>(users.values());
    }
}
