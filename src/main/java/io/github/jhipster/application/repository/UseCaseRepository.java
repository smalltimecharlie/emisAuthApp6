package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.UseCase;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the UseCase entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UseCaseRepository extends JpaRepository<UseCase, Long> {

}
