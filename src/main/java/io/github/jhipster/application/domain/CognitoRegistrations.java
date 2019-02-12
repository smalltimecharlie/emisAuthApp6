package io.github.jhipster.application.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A CognitoRegistrations.
 */
@Entity
@Table(name = "cognito_registrations")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CognitoRegistrations implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "user_pool_id", nullable = false)
    private String userPoolId;

    @NotNull
    @Column(name = "username", nullable = false)
    private String username;

    @NotNull
    @Pattern(regexp = "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$")
    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "logged_date")
    private Instant loggedDate;

    @Column(name = "cognito_event")
    private String cognitoEvent;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserPoolId() {
        return userPoolId;
    }

    public CognitoRegistrations userPoolId(String userPoolId) {
        this.userPoolId = userPoolId;
        return this;
    }

    public void setUserPoolId(String userPoolId) {
        this.userPoolId = userPoolId;
    }

    public String getUsername() {
        return username;
    }

    public CognitoRegistrations username(String username) {
        this.username = username;
        return this;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public CognitoRegistrations email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Instant getLoggedDate() {
        return loggedDate;
    }

    public CognitoRegistrations loggedDate(Instant loggedDate) {
        this.loggedDate = loggedDate;
        return this;
    }

    public void setLoggedDate(Instant loggedDate) {
        this.loggedDate = loggedDate;
    }

    public String getCognitoEvent() {
        return cognitoEvent;
    }

    public CognitoRegistrations cognitoEvent(String cognitoEvent) {
        this.cognitoEvent = cognitoEvent;
        return this;
    }

    public void setCognitoEvent(String cognitoEvent) {
        this.cognitoEvent = cognitoEvent;
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
        CognitoRegistrations cognitoRegistrations = (CognitoRegistrations) o;
        if (cognitoRegistrations.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cognitoRegistrations.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CognitoRegistrations{" +
            "id=" + getId() +
            ", userPoolId='" + getUserPoolId() + "'" +
            ", username='" + getUsername() + "'" +
            ", email='" + getEmail() + "'" +
            ", loggedDate='" + getLoggedDate() + "'" +
            ", cognitoEvent='" + getCognitoEvent() + "'" +
            "}";
    }
}
