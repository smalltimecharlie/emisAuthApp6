package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.UsersInOrganisations;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the UsersInOrganisations entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UsersInOrganisationsRepository extends JpaRepository<UsersInOrganisations, Long> {

}
