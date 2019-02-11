package io.github.jhipster.application.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A OrganisationEndpoint.
 */
@Entity
@Table(name = "organisation_endpoint")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class OrganisationEndpoint implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "org_guid", nullable = false)
    private String orgGUID;

    @Column(name = "cbd")
    private String cbd;

    @Column(name = "name")
    private String name;

    @NotNull
    @Column(name = "server_name", nullable = false)
    private String serverName;

    @NotNull
    @Column(name = "database_name", nullable = false)
    private String databaseName;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOrgGUID() {
        return orgGUID;
    }

    public OrganisationEndpoint orgGUID(String orgGUID) {
        this.orgGUID = orgGUID;
        return this;
    }

    public void setOrgGUID(String orgGUID) {
        this.orgGUID = orgGUID;
    }

    public String getCbd() {
        return cbd;
    }

    public OrganisationEndpoint cbd(String cbd) {
        this.cbd = cbd;
        return this;
    }

    public void setCbd(String cbd) {
        this.cbd = cbd;
    }

    public String getName() {
        return name;
    }

    public OrganisationEndpoint name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getServerName() {
        return serverName;
    }

    public OrganisationEndpoint serverName(String serverName) {
        this.serverName = serverName;
        return this;
    }

    public void setServerName(String serverName) {
        this.serverName = serverName;
    }

    public String getDatabaseName() {
        return databaseName;
    }

    public OrganisationEndpoint databaseName(String databaseName) {
        this.databaseName = databaseName;
        return this;
    }

    public void setDatabaseName(String databaseName) {
        this.databaseName = databaseName;
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
        OrganisationEndpoint organisationEndpoint = (OrganisationEndpoint) o;
        if (organisationEndpoint.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), organisationEndpoint.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "OrganisationEndpoint{" +
            "id=" + getId() +
            ", orgGUID='" + getOrgGUID() + "'" +
            ", cbd='" + getCbd() + "'" +
            ", name='" + getName() + "'" +
            ", serverName='" + getServerName() + "'" +
            ", databaseName='" + getDatabaseName() + "'" +
            "}";
    }
}
