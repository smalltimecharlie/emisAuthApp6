package io.github.jhipster.application.web.rest;
import io.github.jhipster.application.domain.OrganisationGroups;
import io.github.jhipster.application.repository.OrganisationGroupsRepository;
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
 * REST controller for managing OrganisationGroups.
 */
@RestController
@RequestMapping("/api")
public class OrganisationGroupsResource {

    private final Logger log = LoggerFactory.getLogger(OrganisationGroupsResource.class);

    private static final String ENTITY_NAME = "organisationGroups";

    private final OrganisationGroupsRepository organisationGroupsRepository;

    public OrganisationGroupsResource(OrganisationGroupsRepository organisationGroupsRepository) {
        this.organisationGroupsRepository = organisationGroupsRepository;
    }

    /**
     * POST  /organisation-groups : Create a new organisationGroups.
     *
     * @param organisationGroups the organisationGroups to create
     * @return the ResponseEntity with status 201 (Created) and with body the new organisationGroups, or with status 400 (Bad Request) if the organisationGroups has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/organisation-groups")
    public ResponseEntity<OrganisationGroups> createOrganisationGroups(@Valid @RequestBody OrganisationGroups organisationGroups) throws URISyntaxException {
        log.debug("REST request to save OrganisationGroups : {}", organisationGroups);
        if (organisationGroups.getId() != null) {
            throw new BadRequestAlertException("A new organisationGroups cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OrganisationGroups result = organisationGroupsRepository.save(organisationGroups);
        return ResponseEntity.created(new URI("/api/organisation-groups/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /organisation-groups : Updates an existing organisationGroups.
     *
     * @param organisationGroups the organisationGroups to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated organisationGroups,
     * or with status 400 (Bad Request) if the organisationGroups is not valid,
     * or with status 500 (Internal Server Error) if the organisationGroups couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/organisation-groups")
    public ResponseEntity<OrganisationGroups> updateOrganisationGroups(@Valid @RequestBody OrganisationGroups organisationGroups) throws URISyntaxException {
        log.debug("REST request to update OrganisationGroups : {}", organisationGroups);
        if (organisationGroups.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        OrganisationGroups result = organisationGroupsRepository.save(organisationGroups);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, organisationGroups.getId().toString()))
            .body(result);
    }

    /**
     * GET  /organisation-groups : get all the organisationGroups.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of organisationGroups in body
     */
    @GetMapping("/organisation-groups")
    public List<OrganisationGroups> getAllOrganisationGroups() {
        log.debug("REST request to get all OrganisationGroups");
        return organisationGroupsRepository.findAll();
    }

    /**
     * GET  /organisation-groups/:id : get the "id" organisationGroups.
     *
     * @param id the id of the organisationGroups to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the organisationGroups, or with status 404 (Not Found)
     */
    @GetMapping("/organisation-groups/{id}")
    public ResponseEntity<OrganisationGroups> getOrganisationGroups(@PathVariable Long id) {
        log.debug("REST request to get OrganisationGroups : {}", id);
        Optional<OrganisationGroups> organisationGroups = organisationGroupsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(organisationGroups);
    }

    /**
     * DELETE  /organisation-groups/:id : delete the "id" organisationGroups.
     *
     * @param id the id of the organisationGroups to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/organisation-groups/{id}")
    public ResponseEntity<Void> deleteOrganisationGroups(@PathVariable Long id) {
        log.debug("REST request to delete OrganisationGroups : {}", id);
        organisationGroupsRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
