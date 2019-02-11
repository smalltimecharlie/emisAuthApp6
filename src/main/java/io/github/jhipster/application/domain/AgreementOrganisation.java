package io.github.jhipster.application.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A AgreementOrganisation.
 */
@Entity
@Table(name = "agreement_organisation")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class AgreementOrganisation implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "agreement_id", nullable = false)
    private String agreementId;

    @NotNull
    @Column(name = "agreement_type", nullable = false)
    private String agreementType;

    @NotNull
    @Column(name = "requesting_org_guid", nullable = false)
    private String requestingOrgGuid;

    @NotNull
    @Column(name = "sharing_org_guid", nullable = false)
    private String sharingOrgGuid;

    @NotNull
    @Column(name = "organisation_id", nullable = false)
    private String organisationId;

    @NotNull
    @Column(name = "agreement_status", nullable = false)
    private String agreementStatus;

    @Column(name = "cretad_date")
    private Instant cretadDate;

    @ManyToOne
    @JsonIgnoreProperties("agreementOrganisations")
    private OrganisationEndpoint organisationEndpoint;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAgreementId() {
        return agreementId;
    }

    public AgreementOrganisation agreementId(String agreementId) {
        this.agreementId = agreementId;
        return this;
    }

    public void setAgreementId(String agreementId) {
        this.agreementId = agreementId;
    }

    public String getAgreementType() {
        return agreementType;
    }

    public AgreementOrganisation agreementType(String agreementType) {
        this.agreementType = agreementType;
        return this;
    }

    public void setAgreementType(String agreementType) {
        this.agreementType = agreementType;
    }

    public String getRequestingOrgGuid() {
        return requestingOrgGuid;
    }

    public AgreementOrganisation requestingOrgGuid(String requestingOrgGuid) {
        this.requestingOrgGuid = requestingOrgGuid;
        return this;
    }

    public void setRequestingOrgGuid(String requestingOrgGuid) {
        this.requestingOrgGuid = requestingOrgGuid;
    }

    public String getSharingOrgGuid() {
        return sharingOrgGuid;
    }

    public AgreementOrganisation sharingOrgGuid(String sharingOrgGuid) {
        this.sharingOrgGuid = sharingOrgGuid;
        return this;
    }

    public void setSharingOrgGuid(String sharingOrgGuid) {
        this.sharingOrgGuid = sharingOrgGuid;
    }

    public String getOrganisationId() {
        return organisationId;
    }

    public AgreementOrganisation organisationId(String organisationId) {
        this.organisationId = organisationId;
        return this;
    }

    public void setOrganisationId(String organisationId) {
        this.organisationId = organisationId;
    }

    public String getAgreementStatus() {
        return agreementStatus;
    }

    public AgreementOrganisation agreementStatus(String agreementStatus) {
        this.agreementStatus = agreementStatus;
        return this;
    }

    public void setAgreementStatus(String agreementStatus) {
        this.agreementStatus = agreementStatus;
    }

    public Instant getCretadDate() {
        return cretadDate;
    }

    public AgreementOrganisation cretadDate(Instant cretadDate) {
        this.cretadDate = cretadDate;
        return this;
    }

    public void setCretadDate(Instant cretadDate) {
        this.cretadDate = cretadDate;
    }

    public OrganisationEndpoint getOrganisationEndpoint() {
        return organisationEndpoint;
    }

    public AgreementOrganisation organisationEndpoint(OrganisationEndpoint organisationEndpoint) {
        this.organisationEndpoint = organisationEndpoint;
        return this;
    }

    public void setOrganisationEndpoint(OrganisationEndpoint organisationEndpoint) {
        this.organisationEndpoint = organisationEndpoint;
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
        AgreementOrganisation agreementOrganisation = (AgreementOrganisation) o;
        if (agreementOrganisation.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), agreementOrganisation.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AgreementOrganisation{" +
            "id=" + getId() +
            ", agreementId='" + getAgreementId() + "'" +
            ", agreementType='" + getAgreementType() + "'" +
            ", requestingOrgGuid='" + getRequestingOrgGuid() + "'" +
            ", sharingOrgGuid='" + getSharingOrgGuid() + "'" +
            ", organisationId='" + getOrganisationId() + "'" +
            ", agreementStatus='" + getAgreementStatus() + "'" +
            ", cretadDate='" + getCretadDate() + "'" +
            "}";
    }
}
