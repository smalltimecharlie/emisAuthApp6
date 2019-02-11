package io.github.jhipster.application.web.rest;
import io.github.jhipster.application.domain.UseCase;
import io.github.jhipster.application.repository.UseCaseRepository;
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
 * REST controller for managing UseCase.
 */
@RestController
@RequestMapping("/api")
public class UseCaseResource {

    private final Logger log = LoggerFactory.getLogger(UseCaseResource.class);

    private static final String ENTITY_NAME = "useCase";

    private final UseCaseRepository useCaseRepository;

    public UseCaseResource(UseCaseRepository useCaseRepository) {
        this.useCaseRepository = useCaseRepository;
    }

    /**
     * POST  /use-cases : Create a new useCase.
     *
     * @param useCase the useCase to create
     * @return the ResponseEntity with status 201 (Created) and with body the new useCase, or with status 400 (Bad Request) if the useCase has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/use-cases")
    public ResponseEntity<UseCase> createUseCase(@RequestBody UseCase useCase) throws URISyntaxException {
        log.debug("REST request to save UseCase : {}", useCase);
        if (useCase.getId() != null) {
            throw new BadRequestAlertException("A new useCase cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UseCase result = useCaseRepository.save(useCase);
        return ResponseEntity.created(new URI("/api/use-cases/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /use-cases : Updates an existing useCase.
     *
     * @param useCase the useCase to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated useCase,
     * or with status 400 (Bad Request) if the useCase is not valid,
     * or with status 500 (Internal Server Error) if the useCase couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/use-cases")
    public ResponseEntity<UseCase> updateUseCase(@RequestBody UseCase useCase) throws URISyntaxException {
        log.debug("REST request to update UseCase : {}", useCase);
        if (useCase.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        UseCase result = useCaseRepository.save(useCase);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, useCase.getId().toString()))
            .body(result);
    }

    /**
     * GET  /use-cases : get all the useCases.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of useCases in body
     */
    @GetMapping("/use-cases")
    public List<UseCase> getAllUseCases() {
        log.debug("REST request to get all UseCases");
        return useCaseRepository.findAll();
    }

    /**
     * GET  /use-cases/:id : get the "id" useCase.
     *
     * @param id the id of the useCase to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the useCase, or with status 404 (Not Found)
     */
    @GetMapping("/use-cases/{id}")
    public ResponseEntity<UseCase> getUseCase(@PathVariable Long id) {
        log.debug("REST request to get UseCase : {}", id);
        Optional<UseCase> useCase = useCaseRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(useCase);
    }

    /**
     * DELETE  /use-cases/:id : delete the "id" useCase.
     *
     * @param id the id of the useCase to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/use-cases/{id}")
    public ResponseEntity<Void> deleteUseCase(@PathVariable Long id) {
        log.debug("REST request to delete UseCase : {}", id);
        useCaseRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
