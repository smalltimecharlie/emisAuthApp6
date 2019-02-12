package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.CognitoRegistrations;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CognitoRegistrations entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CognitoRegistrationsRepository extends JpaRepository<CognitoRegistrations, Long> {

}
