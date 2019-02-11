package io.github.jhipster.application.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A OrganisationGroups.
 */
@Entity
@Table(name = "organisation_groups")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class OrganisationGroups implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "organisation_group", nullable = false)
    private String organisationGroup;

    @Column(name = "organisation_id")
    private String organisationId;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOrganisationGroup() {
        return organisationGroup;
    }

    public OrganisationGroups organisationGroup(String organisationGroup) {
        this.organisationGroup = organisationGroup;
        return this;
    }

    public void setOrganisationGroup(String organisationGroup) {
        this.organisationGroup = organisationGroup;
    }

    public String getOrganisationId() {
        return organisationId;
    }

    public OrganisationGroups organisationId(String organisationId) {
        this.organisationId = organisationId;
        return this;
    }

    public void setOrganisationId(String organisationId) {
        this.organisationId = organisationId;
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
        OrganisationGroups organisationGroups = (OrganisationGroups) o;
        if (organisationGroups.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), organisationGroups.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "OrganisationGroups{" +
            "id=" + getId() +
            ", organisationGroup='" + getOrganisationGroup() + "'" +
            ", organisationId='" + getOrganisationId() + "'" +
            "}";
    }
}
