package io.github.jhipster.application.web.rest;
import io.github.jhipster.application.domain.UsersInOrganisations;
import io.github.jhipster.application.repository.UsersInOrganisationsRepository;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing UsersInOrganisations.
 */
@RestController
@RequestMapping("/api")
public class UsersInOrganisationsResource {

    private final Logger log = LoggerFactory.getLogger(UsersInOrganisationsResource.class);

    private static final String ENTITY_NAME = "usersInOrganisations";

    private final UsersInOrganisationsRepository usersInOrganisationsRepository;

    public UsersInOrganisationsResource(UsersInOrganisationsRepository usersInOrganisationsRepository) {
        this.usersInOrganisationsRepository = usersInOrganisationsRepository;
    }

    /**
     * POST  /users-in-organisations : Create a new usersInOrganisations.
     *
     * @param usersInOrganisations the usersInOrganisations to create
     * @return the ResponseEntity with status 201 (Created) and with body the new usersInOrganisations, or with status 400 (Bad Request) if the usersInOrganisations has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/users-in-organisations")
    public ResponseEntity<UsersInOrganisations> createUsersInOrganisations(@RequestBody UsersInOrganisations usersInOrganisations) throws URISyntaxException {
        log.debug("REST request to save UsersInOrganisations : {}", usersInOrganisations);
        if (usersInOrganisations.getId() != null) {
            throw new BadRequestAlertException("A new usersInOrganisations cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UsersInOrganisations result = usersInOrganisationsRepository.save(usersInOrganisations);
        return ResponseEntity.created(new URI("/api/users-in-organisations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /users-in-organisations : Updates an existing usersInOrganisations.
     *
     * @param usersInOrganisations the usersInOrganisations to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated usersInOrganisations,
     * or with status 400 (Bad Request) if the usersInOrganisations is not valid,
     * or with status 500 (Internal Server Error) if the usersInOrganisations couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/users-in-organisations")
    public ResponseEntity<UsersInOrganisations> updateUsersInOrganisations(@RequestBody UsersInOrganisations usersInOrganisations) throws URISyntaxException {
        log.debug("REST request to update UsersInOrganisations : {}", usersInOrganisations);
        if (usersInOrganisations.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        UsersInOrganisations result = usersInOrganisationsRepository.save(usersInOrganisations);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, usersInOrganisations.getId().toString()))
            .body(result);
    }

    /**
     * GET  /users-in-organisations : get all the usersInOrganisations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of usersInOrganisations in body
     */
    @GetMapping("/users-in-organisations")
    public List<UsersInOrganisations> getAllUsersInOrganisations() {
        log.debug("REST request to get all UsersInOrganisations");
        return usersInOrganisationsRepository.findAll();
    }

    /**
     * GET  /users-in-organisations/:id : get the "id" usersInOrganisations.
     *
     * @param id the id of the usersInOrganisations to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the usersInOrganisations, or with status 404 (Not Found)
     */
    @GetMapping("/users-in-organisations/{id}")
    public ResponseEntity<UsersInOrganisations> getUsersInOrganisations(@PathVariable Long id) {
        log.debug("REST request to get UsersInOrganisations : {}", id);
        Optional<UsersInOrganisations> usersInOrganisations = usersInOrganisationsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(usersInOrganisations);
    }

    /**
     * DELETE  /users-in-organisations/:id : delete the "id" usersInOrganisations.
     *
     * @param id the id of the usersInOrganisations to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/users-in-organisations/{id}")
    public ResponseEntity<Void> deleteUsersInOrganisations(@PathVariable Long id) {
        log.debug("REST request to delete UsersInOrganisations : {}", id);
        usersInOrganisationsRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
