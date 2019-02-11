package io.github.jhipster.application.web.rest;
import io.github.jhipster.application.domain.Consent;
import io.github.jhipster.application.repository.ConsentRepository;
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
 * REST controller for managing Consent.
 */
@RestController
@RequestMapping("/api")
public class ConsentResource {

    private final Logger log = LoggerFactory.getLogger(ConsentResource.class);

    private static final String ENTITY_NAME = "consent";

    private final ConsentRepository consentRepository;

    public ConsentResource(ConsentRepository consentRepository) {
        this.consentRepository = consentRepository;
    }

    /**
     * POST  /consents : Create a new consent.
     *
     * @param consent the consent to create
     * @return the ResponseEntity with status 201 (Created) and with body the new consent, or with status 400 (Bad Request) if the consent has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/consents")
    public ResponseEntity<Consent> createConsent(@RequestBody Consent consent) throws URISyntaxException {
        log.debug("REST request to save Consent : {}", consent);
        if (consent.getId() != null) {
            throw new BadRequestAlertException("A new consent cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Consent result = consentRepository.save(consent);
        return ResponseEntity.created(new URI("/api/consents/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /consents : Updates an existing consent.
     *
     * @param consent the consent to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated consent,
     * or with status 400 (Bad Request) if the consent is not valid,
     * or with status 500 (Internal Server Error) if the consent couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/consents")
    public ResponseEntity<Consent> updateConsent(@RequestBody Consent consent) throws URISyntaxException {
        log.debug("REST request to update Consent : {}", consent);
        if (consent.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Consent result = consentRepository.save(consent);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, consent.getId().toString()))
            .body(result);
    }

    /**
     * GET  /consents : get all the consents.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of consents in body
     */
    @GetMapping("/consents")
    public List<Consent> getAllConsents() {
        log.debug("REST request to get all Consents");
        return consentRepository.findAll();
    }

    /**
     * GET  /consents/:id : get the "id" consent.
     *
     * @param id the id of the consent to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the consent, or with status 404 (Not Found)
     */
    @GetMapping("/consents/{id}")
    public ResponseEntity<Consent> getConsent(@PathVariable Long id) {
        log.debug("REST request to get Consent : {}", id);
        Optional<Consent> consent = consentRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(consent);
    }

    /**
     * DELETE  /consents/:id : delete the "id" consent.
     *
     * @param id the id of the consent to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/consents/{id}")
    public ResponseEntity<Void> deleteConsent(@PathVariable Long id) {
        log.debug("REST request to delete Consent : {}", id);
        consentRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
