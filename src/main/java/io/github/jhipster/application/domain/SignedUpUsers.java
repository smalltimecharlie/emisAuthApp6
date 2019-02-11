package io.github.jhipster.application.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A SignedUpUsers.
 */
@Entity
@Table(name = "signed_up_users")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SignedUpUsers implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username")
    private String username;

    @Column(name = "enabled")
    private String enabled;

    @Column(name = "account_status")
    private String accountStatus;

    @Column(name = "email_verified")
    private Boolean emailVerified;

    @Column(name = "phone_number")
    private String phoneNumber;

    @NotNull
    @Pattern(regexp = "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$")
    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "updated")
    private Instant updated;

    @Column(name = "created")
    private Instant created;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public SignedUpUsers username(String username) {
        this.username = username;
        return this;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEnabled() {
        return enabled;
    }

    public SignedUpUsers enabled(String enabled) {
        this.enabled = enabled;
        return this;
    }

    public void setEnabled(String enabled) {
        this.enabled = enabled;
    }

    public String getAccountStatus() {
        return accountStatus;
    }

    public SignedUpUsers accountStatus(String accountStatus) {
        this.accountStatus = accountStatus;
        return this;
    }

    public void setAccountStatus(String accountStatus) {
        this.accountStatus = accountStatus;
    }

    public Boolean isEmailVerified() {
        return emailVerified;
    }

    public SignedUpUsers emailVerified(Boolean emailVerified) {
        this.emailVerified = emailVerified;
        return this;
    }

    public void setEmailVerified(Boolean emailVerified) {
        this.emailVerified = emailVerified;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public SignedUpUsers phoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
        return this;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public SignedUpUsers email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Instant getUpdated() {
        return updated;
    }

    public SignedUpUsers updated(Instant updated) {
        this.updated = updated;
        return this;
    }

    public void setUpdated(Instant updated) {
        this.updated = updated;
    }

    public Instant getCreated() {
        return created;
    }

    public SignedUpUsers created(Instant created) {
        this.created = created;
        return this;
    }

    public void setCreated(Instant created) {
        this.created = created;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        SignedUpUsers signedUpUsers = (SignedUpUsers) o;
        if (signedUpUsers.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), signedUpUsers.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SignedUpUsers{" +
            "id=" + getId() +
            ", username='" + getUsername() + "'" +
            ", enabled='" + getEnabled() + "'" +
            ", accountStatus='" + getAccountStatus() + "'" +
            ", emailVerified='" + isEmailVerified() + "'" +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            ", email='" + getEmail() + "'" +
            ", updated='" + getUpdated() + "'" +
            ", created='" + getCreated() + "'" +
            "}";
    }
}
