package io.github.jhipster.application.web.rest;
import io.github.jhipster.application.domain.SignedUpUsers;
import io.github.jhipster.application.repository.SignedUpUsersRepository;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing SignedUpUsers.
 */
@RestController
@RequestMapping("/api")
public class SignedUpUsersResource {

    private final Logger log = LoggerFactory.getLogger(SignedUpUsersResource.class);

    private static final String ENTITY_NAME = "signedUpUsers";

    private final SignedUpUsersRepository signedUpUsersRepository;

    public SignedUpUsersResource(SignedUpUsersRepository signedUpUsersRepository) {
        this.signedUpUsersRepository = signedUpUsersRepository;
    }

    /**
     * POST  /signed-up-users : Create a new signedUpUsers.
     *
     * @param signedUpUsers the signedUpUsers to create
     * @return the ResponseEntity with status 201 (Created) and with body the new signedUpUsers, or with status 400 (Bad Request) if the signedUpUsers has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/signed-up-users")
    public ResponseEntity<SignedUpUsers> createSignedUpUsers(@Valid @RequestBody SignedUpUsers signedUpUsers) throws URISyntaxException {
        log.debug("REST request to save SignedUpUsers : {}", signedUpUsers);
        if (signedUpUsers.getId() != null) {
            throw new BadRequestAlertException("A new signedUpUsers cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SignedUpUsers result = signedUpUsersRepository.save(signedUpUsers);
        return ResponseEntity.created(new URI("/api/signed-up-users/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /signed-up-users : Updates an existing signedUpUsers.
     *
     * @param signedUpUsers the signedUpUsers to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated signedUpUsers,
     * or with status 400 (Bad Request) if the signedUpUsers is not valid,
     * or with status 500 (Internal Server Error) if the signedUpUsers couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/signed-up-users")
    public ResponseEntity<SignedUpUsers> updateSignedUpUsers(@Valid @RequestBody SignedUpUsers signedUpUsers) throws URISyntaxException {
        log.debug("REST request to update SignedUpUsers : {}", signedUpUsers);
        if (signedUpUsers.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SignedUpUsers result = signedUpUsersRepository.save(signedUpUsers);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, signedUpUsers.getId().toString()))
            .body(result);
    }

    /**
     * GET  /signed-up-users : get all the signedUpUsers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of signedUpUsers in body
     */
    @GetMapping("/signed-up-users")
    public List<SignedUpUsers> getAllSignedUpUsers() {
        log.debug("REST request to get all SignedUpUsers");
        return signedUpUsersRepository.findAll();
    }

    /**
     * GET  /signed-up-users/:id : get the "id" signedUpUsers.
     *
     * @param id the id of the signedUpUsers to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the signedUpUsers, or with status 404 (Not Found)
     */
    @GetMapping("/signed-up-users/{id}")
    public ResponseEntity<SignedUpUsers> getSignedUpUsers(@PathVariable Long id) {
        log.debug("REST request to get SignedUpUsers : {}", id);
        Optional<SignedUpUsers> signedUpUsers = signedUpUsersRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(signedUpUsers);
    }

    /**
     * DELETE  /signed-up-users/:id : delete the "id" signedUpUsers.
     *
     * @param id the id of the signedUpUsers to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/signed-up-users/{id}")
    public ResponseEntity<Void> deleteSignedUpUsers(@PathVariable Long id) {
        log.debug("REST request to delete SignedUpUsers : {}", id);
        signedUpUsersRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
