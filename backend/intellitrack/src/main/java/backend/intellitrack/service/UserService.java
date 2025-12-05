package backend.intellitrack.service;

import backend.intellitrack.model.User;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserService {

    private final Map<Long, User> users = new HashMap<>();

    public List<User> getAllUsers() {
        return new ArrayList<>(users.values());
    }

    public User getUserById(Long id) {
        return users.get(id);
    }

    public User createUser(User user) {
        users.put(user.getId(), user);
        return user;
    }

    public User updateUser(Long id, User updatedUser) {
        User existing = users.get(id);
        if (existing != null) {
            existing.setName(updatedUser.getName());
            existing.setEmail(updatedUser.getEmail());
            existing.setRole(updatedUser.getRole());
            existing.setActive(updatedUser.isActive());
            return existing;
        }
        return null;
    }

    public boolean deleteUser(Long id) {
        return users.remove(id) != null;
    }
}
