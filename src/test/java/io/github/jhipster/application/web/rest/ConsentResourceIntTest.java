package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.EmisAuthApp6App;

import io.github.jhipster.application.domain.Consent;
import io.github.jhipster.application.repository.ConsentRepository;
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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;


import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import io.github.jhipster.application.domain.enumeration.ConsentType;
/**
 * Test class for the ConsentResource REST controller.
 *
 * @see ConsentResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = EmisAuthApp6App.class)
public class ConsentResourceIntTest {

    private static final String DEFAULT_PARENT_CONSENT_ID = "AAAAAAAAAA";
    private static final String UPDATED_PARENT_CONSENT_ID = "BBBBBBBBBB";

    private static final String DEFAULT_ENTITY_KEY = "AAAAAAAAAA";
    private static final String UPDATED_ENTITY_KEY = "BBBBBBBBBB";

    private static final String DEFAULT_ENTITY_KEY_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_ENTITY_KEY_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_FIELD_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_FIELD_VALUE = "BBBBBBBBBB";

    private static final Instant DEFAULT_END_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_END_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_FIELD_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FIELD_NAME = "BBBBBBBBBB";

    private static final Instant DEFAULT_SIGNED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_SIGNED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_START_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_START_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Boolean DEFAULT_ACTIVE = false;
    private static final Boolean UPDATED_ACTIVE = true;

    private static final String DEFAULT_AUTHORISOR_NAME = "AAAAAAAAAA";
    private static final String UPDATED_AUTHORISOR_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_AUTHORISOR_EMAIL_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_AUTHORISOR_EMAIL_ADDRESS = "BBBBBBBBBB";

    private static final String DEFAULT_METADATA_KEY = "AAAAAAAAAA";
    private static final String UPDATED_METADATA_KEY = "BBBBBBBBBB";

    private static final String DEFAULT_METADATA_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_METADATA_VALUE = "BBBBBBBBBB";

    private static final ConsentType DEFAULT_CONSENT_TYPE = ConsentType.Patient;
    private static final ConsentType UPDATED_CONSENT_TYPE = ConsentType.GP;

    @Autowired
    private ConsentRepository consentRepository;

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

    private MockMvc restConsentMockMvc;

    private Consent consent;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ConsentResource consentResource = new ConsentResource(consentRepository);
        this.restConsentMockMvc = MockMvcBuilders.standaloneSetup(consentResource)
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
    public static Consent createEntity(EntityManager em) {
        Consent consent = new Consent()
            .parentConsentId(DEFAULT_PARENT_CONSENT_ID)
            .entityKey(DEFAULT_ENTITY_KEY)
            .entityKeyType(DEFAULT_ENTITY_KEY_TYPE)
            .fieldValue(DEFAULT_FIELD_VALUE)
            .endDate(DEFAULT_END_DATE)
            .fieldName(DEFAULT_FIELD_NAME)
            .signedDate(DEFAULT_SIGNED_DATE)
            .startDate(DEFAULT_START_DATE)
            .active(DEFAULT_ACTIVE)
            .authorisorName(DEFAULT_AUTHORISOR_NAME)
            .authorisorEmailAddress(DEFAULT_AUTHORISOR_EMAIL_ADDRESS)
            .metadataKey(DEFAULT_METADATA_KEY)
            .metadataValue(DEFAULT_METADATA_VALUE)
            .consentType(DEFAULT_CONSENT_TYPE);
        return consent;
    }

    @Before
    public void initTest() {
        consent = createEntity(em);
    }

    @Test
    @Transactional
    public void createConsent() throws Exception {
        int databaseSizeBeforeCreate = consentRepository.findAll().size();

        // Create the Consent
        restConsentMockMvc.perform(post("/api/consents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(consent)))
            .andExpect(status().isCreated());

        // Validate the Consent in the database
        List<Consent> consentList = consentRepository.findAll();
        assertThat(consentList).hasSize(databaseSizeBeforeCreate + 1);
        Consent testConsent = consentList.get(consentList.size() - 1);
        assertThat(testConsent.getParentConsentId()).isEqualTo(DEFAULT_PARENT_CONSENT_ID);
        assertThat(testConsent.getEntityKey()).isEqualTo(DEFAULT_ENTITY_KEY);
        assertThat(testConsent.getEntityKeyType()).isEqualTo(DEFAULT_ENTITY_KEY_TYPE);
        assertThat(testConsent.getFieldValue()).isEqualTo(DEFAULT_FIELD_VALUE);
        assertThat(testConsent.getEndDate()).isEqualTo(DEFAULT_END_DATE);
        assertThat(testConsent.getFieldName()).isEqualTo(DEFAULT_FIELD_NAME);
        assertThat(testConsent.getSignedDate()).isEqualTo(DEFAULT_SIGNED_DATE);
        assertThat(testConsent.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testConsent.isActive()).isEqualTo(DEFAULT_ACTIVE);
        assertThat(testConsent.getAuthorisorName()).isEqualTo(DEFAULT_AUTHORISOR_NAME);
        assertThat(testConsent.getAuthorisorEmailAddress()).isEqualTo(DEFAULT_AUTHORISOR_EMAIL_ADDRESS);
        assertThat(testConsent.getMetadataKey()).isEqualTo(DEFAULT_METADATA_KEY);
        assertThat(testConsent.getMetadataValue()).isEqualTo(DEFAULT_METADATA_VALUE);
        assertThat(testConsent.getConsentType()).isEqualTo(DEFAULT_CONSENT_TYPE);
    }

    @Test
    @Transactional
    public void createConsentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = consentRepository.findAll().size();

        // Create the Consent with an existing ID
        consent.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restConsentMockMvc.perform(post("/api/consents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(consent)))
            .andExpect(status().isBadRequest());

        // Validate the Consent in the database
        List<Consent> consentList = consentRepository.findAll();
        assertThat(consentList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllConsents() throws Exception {
        // Initialize the database
        consentRepository.saveAndFlush(consent);

        // Get all the consentList
        restConsentMockMvc.perform(get("/api/consents?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(consent.getId().intValue())))
            .andExpect(jsonPath("$.[*].parentConsentId").value(hasItem(DEFAULT_PARENT_CONSENT_ID.toString())))
            .andExpect(jsonPath("$.[*].entityKey").value(hasItem(DEFAULT_ENTITY_KEY.toString())))
            .andExpect(jsonPath("$.[*].entityKeyType").value(hasItem(DEFAULT_ENTITY_KEY_TYPE.toString())))
            .andExpect(jsonPath("$.[*].fieldValue").value(hasItem(DEFAULT_FIELD_VALUE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())))
            .andExpect(jsonPath("$.[*].fieldName").value(hasItem(DEFAULT_FIELD_NAME.toString())))
            .andExpect(jsonPath("$.[*].signedDate").value(hasItem(DEFAULT_SIGNED_DATE.toString())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())))
            .andExpect(jsonPath("$.[*].authorisorName").value(hasItem(DEFAULT_AUTHORISOR_NAME.toString())))
            .andExpect(jsonPath("$.[*].authorisorEmailAddress").value(hasItem(DEFAULT_AUTHORISOR_EMAIL_ADDRESS.toString())))
            .andExpect(jsonPath("$.[*].metadataKey").value(hasItem(DEFAULT_METADATA_KEY.toString())))
            .andExpect(jsonPath("$.[*].metadataValue").value(hasItem(DEFAULT_METADATA_VALUE.toString())))
            .andExpect(jsonPath("$.[*].consentType").value(hasItem(DEFAULT_CONSENT_TYPE.toString())));
    }
    
    @Test
    @Transactional
    public void getConsent() throws Exception {
        // Initialize the database
        consentRepository.saveAndFlush(consent);

        // Get the consent
        restConsentMockMvc.perform(get("/api/consents/{id}", consent.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(consent.getId().intValue()))
            .andExpect(jsonPath("$.parentConsentId").value(DEFAULT_PARENT_CONSENT_ID.toString()))
            .andExpect(jsonPath("$.entityKey").value(DEFAULT_ENTITY_KEY.toString()))
            .andExpect(jsonPath("$.entityKeyType").value(DEFAULT_ENTITY_KEY_TYPE.toString()))
            .andExpect(jsonPath("$.fieldValue").value(DEFAULT_FIELD_VALUE.toString()))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE.toString()))
            .andExpect(jsonPath("$.fieldName").value(DEFAULT_FIELD_NAME.toString()))
            .andExpect(jsonPath("$.signedDate").value(DEFAULT_SIGNED_DATE.toString()))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.active").value(DEFAULT_ACTIVE.booleanValue()))
            .andExpect(jsonPath("$.authorisorName").value(DEFAULT_AUTHORISOR_NAME.toString()))
            .andExpect(jsonPath("$.authorisorEmailAddress").value(DEFAULT_AUTHORISOR_EMAIL_ADDRESS.toString()))
            .andExpect(jsonPath("$.metadataKey").value(DEFAULT_METADATA_KEY.toString()))
            .andExpect(jsonPath("$.metadataValue").value(DEFAULT_METADATA_VALUE.toString()))
            .andExpect(jsonPath("$.consentType").value(DEFAULT_CONSENT_TYPE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingConsent() throws Exception {
        // Get the consent
        restConsentMockMvc.perform(get("/api/consents/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateConsent() throws Exception {
        // Initialize the database
        consentRepository.saveAndFlush(consent);

        int databaseSizeBeforeUpdate = consentRepository.findAll().size();

        // Update the consent
        Consent updatedConsent = consentRepository.findById(consent.getId()).get();
        // Disconnect from session so that the updates on updatedConsent are not directly saved in db
        em.detach(updatedConsent);
        updatedConsent
            .parentConsentId(UPDATED_PARENT_CONSENT_ID)
            .entityKey(UPDATED_ENTITY_KEY)
            .entityKeyType(UPDATED_ENTITY_KEY_TYPE)
            .fieldValue(UPDATED_FIELD_VALUE)
            .endDate(UPDATED_END_DATE)
            .fieldName(UPDATED_FIELD_NAME)
            .signedDate(UPDATED_SIGNED_DATE)
            .startDate(UPDATED_START_DATE)
            .active(UPDATED_ACTIVE)
            .authorisorName(UPDATED_AUTHORISOR_NAME)
            .authorisorEmailAddress(UPDATED_AUTHORISOR_EMAIL_ADDRESS)
            .metadataKey(UPDATED_METADATA_KEY)
            .metadataValue(UPDATED_METADATA_VALUE)
            .consentType(UPDATED_CONSENT_TYPE);

        restConsentMockMvc.perform(put("/api/consents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedConsent)))
            .andExpect(status().isOk());

        // Validate the Consent in the database
        List<Consent> consentList = consentRepository.findAll();
        assertThat(consentList).hasSize(databaseSizeBeforeUpdate);
        Consent testConsent = consentList.get(consentList.size() - 1);
        assertThat(testConsent.getParentConsentId()).isEqualTo(UPDATED_PARENT_CONSENT_ID);
        assertThat(testConsent.getEntityKey()).isEqualTo(UPDATED_ENTITY_KEY);
        assertThat(testConsent.getEntityKeyType()).isEqualTo(UPDATED_ENTITY_KEY_TYPE);
        assertThat(testConsent.getFieldValue()).isEqualTo(UPDATED_FIELD_VALUE);
        assertThat(testConsent.getEndDate()).isEqualTo(UPDATED_END_DATE);
        assertThat(testConsent.getFieldName()).isEqualTo(UPDATED_FIELD_NAME);
        assertThat(testConsent.getSignedDate()).isEqualTo(UPDATED_SIGNED_DATE);
        assertThat(testConsent.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testConsent.isActive()).isEqualTo(UPDATED_ACTIVE);
        assertThat(testConsent.getAuthorisorName()).isEqualTo(UPDATED_AUTHORISOR_NAME);
        assertThat(testConsent.getAuthorisorEmailAddress()).isEqualTo(UPDATED_AUTHORISOR_EMAIL_ADDRESS);
        assertThat(testConsent.getMetadataKey()).isEqualTo(UPDATED_METADATA_KEY);
        assertThat(testConsent.getMetadataValue()).isEqualTo(UPDATED_METADATA_VALUE);
        assertThat(testConsent.getConsentType()).isEqualTo(UPDATED_CONSENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingConsent() throws Exception {
        int databaseSizeBeforeUpdate = consentRepository.findAll().size();

        // Create the Consent

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restConsentMockMvc.perform(put("/api/consents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(consent)))
            .andExpect(status().isBadRequest());

        // Validate the Consent in the database
        List<Consent> consentList = consentRepository.findAll();
        assertThat(consentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteConsent() throws Exception {
        // Initialize the database
        consentRepository.saveAndFlush(consent);

        int databaseSizeBeforeDelete = consentRepository.findAll().size();

        // Delete the consent
        restConsentMockMvc.perform(delete("/api/consents/{id}", consent.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Consent> consentList = consentRepository.findAll();
        assertThat(consentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Consent.class);
        Consent consent1 = new Consent();
        consent1.setId(1L);
        Consent consent2 = new Consent();
        consent2.setId(consent1.getId());
        assertThat(consent1).isEqualTo(consent2);
        consent2.setId(2L);
        assertThat(consent1).isNotEqualTo(consent2);
        consent1.setId(null);
        assertThat(consent1).isNotEqualTo(consent2);
    }
}
