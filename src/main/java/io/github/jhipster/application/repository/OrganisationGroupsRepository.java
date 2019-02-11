package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.OrganisationGroups;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the OrganisationGroups entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrganisationGroupsRepository extends JpaRepository<OrganisationGroups, Long> {

}
