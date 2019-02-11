package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.EmisAuthApp6App;

import io.github.jhipster.application.domain.Agreements;
import io.github.jhipster.application.repository.AgreementsRepository;
import io.github.jhipster.application.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the AgreementsResource REST controller.
 *
 * @see AgreementsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = EmisAuthApp6App.class)
public class AgreementsResourceIntTest {

    private static final String DEFAULT_AGREEMENT_URL = "AAAAAAAAAA";
    private static final String UPDATED_AGREEMENT_URL = "BBBBBBBBBB";

    @Autowired
    private AgreementsRepository agreementsRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restAgreementsMockMvc;

    private Agreements agreements;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AgreementsResource agreementsResource = new AgreementsResource(agreementsRepository);
        this.restAgreementsMockMvc = MockMvcBuilders.standaloneSetup(agreementsResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Agreements createEntity(EntityManager em) {
        Agreements agreements = new Agreements()
            .agreementUrl(DEFAULT_AGREEMENT_URL);
        return agreements;
    }

    @Before
    public void initTest() {
        agreements = createEntity(em);
    }

    @Test
    @Transactional
    public void createAgreements() throws Exception {
        int databaseSizeBeforeCreate = agreementsRepository.findAll().size();

        // Create the Agreements
        restAgreementsMockMvc.perform(post("/api/agreements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agreements)))
            .andExpect(status().isCreated());

        // Validate the Agreements in the database
        List<Agreements> agreementsList = agreementsRepository.findAll();
        assertThat(agreementsList).hasSize(databaseSizeBeforeCreate + 1);
        Agreements testAgreements = agreementsList.get(agreementsList.size() - 1);
        assertThat(testAgreements.getAgreementUrl()).isEqualTo(DEFAULT_AGREEMENT_URL);
    }

    @Test
    @Transactional
    public void createAgreementsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = agreementsRepository.findAll().size();

        // Create the Agreements with an existing ID
        agreements.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAgreementsMockMvc.perform(post("/api/agreements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agreements)))
            .andExpect(status().isBadRequest());

        // Validate the Agreements in the database
        List<Agreements> agreementsList = agreementsRepository.findAll();
        assertThat(agreementsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAgreements() throws Exception {
        // Initialize the database
        agreementsRepository.saveAndFlush(agreements);

        // Get all the agreementsList
        restAgreementsMockMvc.perform(get("/api/agreements?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(agreements.getId().intValue())))
            .andExpect(jsonPath("$.[*].agreementUrl").value(hasItem(DEFAULT_AGREEMENT_URL.toString())));
    }
    
    @Test
    @Transactional
    public void getAgreements() throws Exception {
        // Initialize the database
        agreementsRepository.saveAndFlush(agreements);

        // Get the agreements
        restAgreementsMockMvc.perform(get("/api/agreements/{id}", agreements.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(agreements.getId().intValue()))
            .andExpect(jsonPath("$.agreementUrl").value(DEFAULT_AGREEMENT_URL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAgreements() throws Exception {
        // Get the agreements
        restAgreementsMockMvc.perform(get("/api/agreements/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAgreements() throws Exception {
        // Initialize the database
        agreementsRepository.saveAndFlush(agreements);

        int databaseSizeBeforeUpdate = agreementsRepository.findAll().size();

        // Update the agreements
        Agreements updatedAgreements = agreementsRepository.findById(agreements.getId()).get();
        // Disconnect from session so that the updates on updatedAgreements are not directly saved in db
        em.detach(updatedAgreements);
        updatedAgreements
            .agreementUrl(UPDATED_AGREEMENT_URL);

        restAgreementsMockMvc.perform(put("/api/agreements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAgreements)))
            .andExpect(status().isOk());

        // Validate the Agreements in the database
        List<Agreements> agreementsList = agreementsRepository.findAll();
        assertThat(agreementsList).hasSize(databaseSizeBeforeUpdate);
        Agreements testAgreements = agreementsList.get(agreementsList.size() - 1);
        assertThat(testAgreements.getAgreementUrl()).isEqualTo(UPDATED_AGREEMENT_URL);
    }

    @Test
    @Transactional
    public void updateNonExistingAgreements() throws Exception {
        int databaseSizeBeforeUpdate = agreementsRepository.findAll().size();

        // Create the Agreements

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAgreementsMockMvc.perform(put("/api/agreements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agreements)))
            .andExpect(status().isBadRequest());

        // Validate the Agreements in the database
        List<Agreements> agreementsList = agreementsRepository.findAll();
        assertThat(agreementsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAgreements() throws Exception {
        // Initialize the database
        agreementsRepository.saveAndFlush(agreements);

        int databaseSizeBeforeDelete = agreementsRepository.findAll().size();

        // Delete the agreements
        restAgreementsMockMvc.perform(delete("/api/agreements/{id}", agreements.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Agreements> agreementsList = agreementsRepository.findAll();
        assertThat(agreementsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Agreements.class);
        Agreements agreements1 = new Agreements();
        agreements1.setId(1L);
        Agreements agreements2 = new Agreements();
        agreements2.setId(agreements1.getId());
        assertThat(agreements1).isEqualTo(agreements2);
        agreements2.setId(2L);
        assertThat(agreements1).isNotEqualTo(agreements2);
        agreements1.setId(null);
        assertThat(agreements1).isNotEqualTo(agreements2);
    }
}
