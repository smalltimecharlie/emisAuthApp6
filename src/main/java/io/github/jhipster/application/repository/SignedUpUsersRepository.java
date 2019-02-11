package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.SignedUpUsers;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the SignedUpUsers entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SignedUpUsersRepository extends JpaRepository<SignedUpUsers, Long> {

}
