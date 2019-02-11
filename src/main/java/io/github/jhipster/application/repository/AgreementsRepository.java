package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Agreements;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Agreements entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AgreementsRepository extends JpaRepository<Agreements, Long> {

}
