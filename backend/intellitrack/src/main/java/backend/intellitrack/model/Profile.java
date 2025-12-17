package backend.intellitrack.model;

import jakarta.persistence.*;

@Entity
@Table(name = "profiles")
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;
    private String contactNumber;
    private String profileImageUrl;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Profile() {}

    public Profile(Long id, String fullName, String contactNumber,
                   String profileImageUrl, User user) {
        this.id = id;
        this.fullName = fullName;
        this.contactNumber = contactNumber;
        this.profileImageUrl = profileImageUrl;
        this.user = user;
    }

    // getters and setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }
    public void setFullName(String fullName) {
        this.fullName = fullName;
    }
    public String getContactNumber() {
        return contactNumber;
    }
    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }
    public String getProfileImageUrl() {
        return profileImageUrl;
    }
    public void setProfileImageUrl(String profileImageUrl) {
        this.profileImageUrl = profileImageUrl;
    }
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }
}