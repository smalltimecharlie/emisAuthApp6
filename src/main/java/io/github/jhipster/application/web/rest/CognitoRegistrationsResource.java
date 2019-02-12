package io.github.jhipster.application.web.rest;
import io.github.jhipster.application.domain.CognitoRegistrations;
import io.github.jhipster.application.repository.CognitoRegistrationsRepository;
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
 * REST controller for managing CognitoRegistrations.
 */
@RestController
@RequestMapping("/api")
public class CognitoRegistrationsResource {

    private final Logger log = LoggerFactory.getLogger(CognitoRegistrationsResource.class);

    private static final String ENTITY_NAME = "cognitoRegistrations";

    private final CognitoRegistrationsRepository cognitoRegistrationsRepository;

    public CognitoRegistrationsResource(CognitoRegistrationsRepository cognitoRegistrationsRepository) {
        this.cognitoRegistrationsRepository = cognitoRegistrationsRepository;
    }

    /**
     * POST  /cognito-registrations : Create a new cognitoRegistrations.
     *
     * @param cognitoRegistrations the cognitoRegistrations to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cognitoRegistrations, or with status 400 (Bad Request) if the cognitoRegistrations has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cognito-registrations")
    public ResponseEntity<CognitoRegistrations> createCognitoRegistrations(@Valid @RequestBody CognitoRegistrations cognitoRegistrations) throws URISyntaxException {
        log.debug("REST request to save CognitoRegistrations : {}", cognitoRegistrations);
        if (cognitoRegistrations.getId() != null) {
            throw new BadRequestAlertException("A new cognitoRegistrations cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CognitoRegistrations result = cognitoRegistrationsRepository.save(cognitoRegistrations);
        return ResponseEntity.created(new URI("/api/cognito-registrations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cognito-registrations : Updates an existing cognitoRegistrations.
     *
     * @param cognitoRegistrations the cognitoRegistrations to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cognitoRegistrations,
     * or with status 400 (Bad Request) if the cognitoRegistrations is not valid,
     * or with status 500 (Internal Server Error) if the cognitoRegistrations couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cognito-registrations")
    public ResponseEntity<CognitoRegistrations> updateCognitoRegistrations(@Valid @RequestBody CognitoRegistrations cognitoRegistrations) throws URISyntaxException {
        log.debug("REST request to update CognitoRegistrations : {}", cognitoRegistrations);
        if (cognitoRegistrations.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CognitoRegistrations result = cognitoRegistrationsRepository.save(cognitoRegistrations);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cognitoRegistrations.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cognito-registrations : get all the cognitoRegistrations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of cognitoRegistrations in body
     */
    @GetMapping("/cognito-registrations")
    public List<CognitoRegistrations> getAllCognitoRegistrations() {
        log.debug("REST request to get all CognitoRegistrations");
        return cognitoRegistrationsRepository.findAll();
    }

    /**
     * GET  /cognito-registrations/:id : get the "id" cognitoRegistrations.
     *
     * @param id the id of the cognitoRegistrations to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cognitoRegistrations, or with status 404 (Not Found)
     */
    @GetMapping("/cognito-registrations/{id}")
    public ResponseEntity<CognitoRegistrations> getCognitoRegistrations(@PathVariable Long id) {
        log.debug("REST request to get CognitoRegistrations : {}", id);
        Optional<CognitoRegistrations> cognitoRegistrations = cognitoRegistrationsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cognitoRegistrations);
    }

    /**
     * DELETE  /cognito-registrations/:id : delete the "id" cognitoRegistrations.
     *
     * @param id the id of the cognitoRegistrations to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cognito-registrations/{id}")
    public ResponseEntity<Void> deleteCognitoRegistrations(@PathVariable Long id) {
        log.debug("REST request to delete CognitoRegistrations : {}", id);
        cognitoRegistrationsRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
