package io.github.jhipster.application.web.rest;
import io.github.jhipster.application.domain.Agreements;
import io.github.jhipster.application.repository.AgreementsRepository;
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
 * REST controller for managing Agreements.
 */
@RestController
@RequestMapping("/api")
public class AgreementsResource {

    private final Logger log = LoggerFactory.getLogger(AgreementsResource.class);

    private static final String ENTITY_NAME = "agreements";

    private final AgreementsRepository agreementsRepository;

    public AgreementsResource(AgreementsRepository agreementsRepository) {
        this.agreementsRepository = agreementsRepository;
    }

    /**
     * POST  /agreements : Create a new agreements.
     *
     * @param agreements the agreements to create
     * @return the ResponseEntity with status 201 (Created) and with body the new agreements, or with status 400 (Bad Request) if the agreements has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/agreements")
    public ResponseEntity<Agreements> createAgreements(@RequestBody Agreements agreements) throws URISyntaxException {
        log.debug("REST request to save Agreements : {}", agreements);
        if (agreements.getId() != null) {
            throw new BadRequestAlertException("A new agreements cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Agreements result = agreementsRepository.save(agreements);
        return ResponseEntity.created(new URI("/api/agreements/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /agreements : Updates an existing agreements.
     *
     * @param agreements the agreements to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated agreements,
     * or with status 400 (Bad Request) if the agreements is not valid,
     * or with status 500 (Internal Server Error) if the agreements couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/agreements")
    public ResponseEntity<Agreements> updateAgreements(@RequestBody Agreements agreements) throws URISyntaxException {
        log.debug("REST request to update Agreements : {}", agreements);
        if (agreements.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Agreements result = agreementsRepository.save(agreements);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, agreements.getId().toString()))
            .body(result);
    }

    /**
     * GET  /agreements : get all the agreements.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of agreements in body
     */
    @GetMapping("/agreements")
    public List<Agreements> getAllAgreements() {
        log.debug("REST request to get all Agreements");
        return agreementsRepository.findAll();
    }

    /**
     * GET  /agreements/:id : get the "id" agreements.
     *
     * @param id the id of the agreements to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the agreements, or with status 404 (Not Found)
     */
    @GetMapping("/agreements/{id}")
    public ResponseEntity<Agreements> getAgreements(@PathVariable Long id) {
        log.debug("REST request to get Agreements : {}", id);
        Optional<Agreements> agreements = agreementsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(agreements);
    }

    /**
     * DELETE  /agreements/:id : delete the "id" agreements.
     *
     * @param id the id of the agreements to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/agreements/{id}")
    public ResponseEntity<Void> deleteAgreements(@PathVariable Long id) {
        log.debug("REST request to delete Agreements : {}", id);
        agreementsRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
