package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Consent;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Consent entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ConsentRepository extends JpaRepository<Consent, Long> {

}
