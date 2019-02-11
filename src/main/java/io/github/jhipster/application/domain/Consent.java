package io.github.jhipster.application.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

import io.github.jhipster.application.domain.enumeration.ConsentType;

/**
 * A Consent.
 */
@Entity
@Table(name = "consent")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Consent implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "parent_consent_id")
    private String parentConsentId;

    @Column(name = "entity_key")
    private String entityKey;

    @Column(name = "entity_key_type")
    private String entityKeyType;

    @Column(name = "field_value")
    private String fieldValue;

    @Column(name = "end_date")
    private Instant endDate;

    @Column(name = "field_name")
    private String fieldName;

    @Column(name = "signed_date")
    private Instant signedDate;

    @Column(name = "start_date")
    private Instant startDate;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "authorisor_name")
    private String authorisorName;

    @Column(name = "authorisor_email_address")
    private String authorisorEmailAddress;

    @Column(name = "metadata_key")
    private String metadataKey;

    @Column(name = "metadata_value")
    private String metadataValue;

    @Enumerated(EnumType.STRING)
    @Column(name = "consent_type")
    private ConsentType consentType;

    @ManyToOne
    @JsonIgnoreProperties("consents")
    private Agreements agreement;

    @ManyToOne
    @JsonIgnoreProperties("consents")
    private SignedUpUsers user;

    @ManyToOne
    @JsonIgnoreProperties("consents")
    private UseCase useCase;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getParentConsentId() {
        return parentConsentId;
    }

    public Consent parentConsentId(String parentConsentId) {
        this.parentConsentId = parentConsentId;
        return this;
    }

    public void setParentConsentId(String parentConsentId) {
        this.parentConsentId = parentConsentId;
    }

    public String getEntityKey() {
        return entityKey;
    }

    public Consent entityKey(String entityKey) {
        this.entityKey = entityKey;
        return this;
    }

    public void setEntityKey(String entityKey) {
        this.entityKey = entityKey;
    }

    public String getEntityKeyType() {
        return entityKeyType;
    }

    public Consent entityKeyType(String entityKeyType) {
        this.entityKeyType = entityKeyType;
        return this;
    }

    public void setEntityKeyType(String entityKeyType) {
        this.entityKeyType = entityKeyType;
    }

    public String getFieldValue() {
        return fieldValue;
    }

    public Consent fieldValue(String fieldValue) {
        this.fieldValue = fieldValue;
        return this;
    }

    public void setFieldValue(String fieldValue) {
        this.fieldValue = fieldValue;
    }

    public Instant getEndDate() {
        return endDate;
    }

    public Consent endDate(Instant endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(Instant endDate) {
        this.endDate = endDate;
    }

    public String getFieldName() {
        return fieldName;
    }

    public Consent fieldName(String fieldName) {
        this.fieldName = fieldName;
        return this;
    }

    public void setFieldName(String fieldName) {
        this.fieldName = fieldName;
    }

    public Instant getSignedDate() {
        return signedDate;
    }

    public Consent signedDate(Instant signedDate) {
        this.signedDate = signedDate;
        return this;
    }

    public void setSignedDate(Instant signedDate) {
        this.signedDate = signedDate;
    }

    public Instant getStartDate() {
        return startDate;
    }

    public Consent startDate(Instant startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public Boolean isActive() {
        return active;
    }

    public Consent active(Boolean active) {
        this.active = active;
        return this;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public String getAuthorisorName() {
        return authorisorName;
    }

    public Consent authorisorName(String authorisorName) {
        this.authorisorName = authorisorName;
        return this;
    }

    public void setAuthorisorName(String authorisorName) {
        this.authorisorName = authorisorName;
    }

    public String getAuthorisorEmailAddress() {
        return authorisorEmailAddress;
    }

    public Consent authorisorEmailAddress(String authorisorEmailAddress) {
        this.authorisorEmailAddress = authorisorEmailAddress;
        return this;
    }

    public void setAuthorisorEmailAddress(String authorisorEmailAddress) {
        this.authorisorEmailAddress = authorisorEmailAddress;
    }

    public String getMetadataKey() {
        return metadataKey;
    }

    public Consent metadataKey(String metadataKey) {
        this.metadataKey = metadataKey;
        return this;
    }

    public void setMetadataKey(String metadataKey) {
        this.metadataKey = metadataKey;
    }

    public String getMetadataValue() {
        return metadataValue;
    }

    public Consent metadataValue(String metadataValue) {
        this.metadataValue = metadataValue;
        return this;
    }

    public void setMetadataValue(String metadataValue) {
        this.metadataValue = metadataValue;
    }

    public ConsentType getConsentType() {
        return consentType;
    }

    public Consent consentType(ConsentType consentType) {
        this.consentType = consentType;
        return this;
    }

    public void setConsentType(ConsentType consentType) {
        this.consentType = consentType;
    }

    public Agreements getAgreement() {
        return agreement;
    }

    public Consent agreement(Agreements agreements) {
        this.agreement = agreements;
        return this;
    }

    public void setAgreement(Agreements agreements) {
        this.agreement = agreements;
    }

    public SignedUpUsers getUser() {
        return user;
    }

    public Consent user(SignedUpUsers signedUpUsers) {
        this.user = signedUpUsers;
        return this;
    }

    public void setUser(SignedUpUsers signedUpUsers) {
        this.user = signedUpUsers;
    }

    public UseCase getUseCase() {
        return useCase;
    }

    public Consent useCase(UseCase useCase) {
        this.useCase = useCase;
        return this;
    }

    public void setUseCase(UseCase useCase) {
        this.useCase = useCase;
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
        Consent consent = (Consent) o;
        if (consent.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), consent.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Consent{" +
            "id=" + getId() +
            ", parentConsentId='" + getParentConsentId() + "'" +
            ", entityKey='" + getEntityKey() + "'" +
            ", entityKeyType='" + getEntityKeyType() + "'" +
            ", fieldValue='" + getFieldValue() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", fieldName='" + getFieldName() + "'" +
            ", signedDate='" + getSignedDate() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", active='" + isActive() + "'" +
            ", authorisorName='" + getAuthorisorName() + "'" +
            ", authorisorEmailAddress='" + getAuthorisorEmailAddress() + "'" +
            ", metadataKey='" + getMetadataKey() + "'" +
            ", metadataValue='" + getMetadataValue() + "'" +
            ", consentType='" + getConsentType() + "'" +
            "}";
    }
}
