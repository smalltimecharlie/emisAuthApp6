package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.EmisAuthApp6App;

import io.github.jhipster.application.domain.CognitoRegistrations;
import io.github.jhipster.application.repository.CognitoRegistrationsRepository;
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

/**
 * Test class for the CognitoRegistrationsResource REST controller.
 *
 * @see CognitoRegistrationsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = EmisAuthApp6App.class)
public class CognitoRegistrationsResourceIntTest {

    private static final String DEFAULT_USER_POOL_ID = "AAAAAAAAAA";
    private static final String UPDATED_USER_POOL_ID = "BBBBBBBBBB";

    private static final String DEFAULT_USERNAME = "AAAAAAAAAA";
    private static final String UPDATED_USERNAME = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "7}@bB.mQ";
    private static final String UPDATED_EMAIL = "+m@\\z.a";

    private static final Instant DEFAULT_LOGGED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_LOGGED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_COGNITO_EVENT = "AAAAAAAAAA";
    private static final String UPDATED_COGNITO_EVENT = "BBBBBBBBBB";

    @Autowired
    private CognitoRegistrationsRepository cognitoRegistrationsRepository;

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

    private MockMvc restCognitoRegistrationsMockMvc;

    private CognitoRegistrations cognitoRegistrations;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CognitoRegistrationsResource cognitoRegistrationsResource = new CognitoRegistrationsResource(cognitoRegistrationsRepository);
        this.restCognitoRegistrationsMockMvc = MockMvcBuilders.standaloneSetup(cognitoRegistrationsResource)
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
    public static CognitoRegistrations createEntity(EntityManager em) {
        CognitoRegistrations cognitoRegistrations = new CognitoRegistrations()
            .userPoolId(DEFAULT_USER_POOL_ID)
            .username(DEFAULT_USERNAME)
            .email(DEFAULT_EMAIL)
            .loggedDate(DEFAULT_LOGGED_DATE)
            .cognitoEvent(DEFAULT_COGNITO_EVENT);
        return cognitoRegistrations;
    }

    @Before
    public void initTest() {
        cognitoRegistrations = createEntity(em);
    }

    @Test
    @Transactional
    public void createCognitoRegistrations() throws Exception {
        int databaseSizeBeforeCreate = cognitoRegistrationsRepository.findAll().size();

        // Create the CognitoRegistrations
        restCognitoRegistrationsMockMvc.perform(post("/api/cognito-registrations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cognitoRegistrations)))
            .andExpect(status().isCreated());

        // Validate the CognitoRegistrations in the database
        List<CognitoRegistrations> cognitoRegistrationsList = cognitoRegistrationsRepository.findAll();
        assertThat(cognitoRegistrationsList).hasSize(databaseSizeBeforeCreate + 1);
        CognitoRegistrations testCognitoRegistrations = cognitoRegistrationsList.get(cognitoRegistrationsList.size() - 1);
        assertThat(testCognitoRegistrations.getUserPoolId()).isEqualTo(DEFAULT_USER_POOL_ID);
        assertThat(testCognitoRegistrations.getUsername()).isEqualTo(DEFAULT_USERNAME);
        assertThat(testCognitoRegistrations.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testCognitoRegistrations.getLoggedDate()).isEqualTo(DEFAULT_LOGGED_DATE);
        assertThat(testCognitoRegistrations.getCognitoEvent()).isEqualTo(DEFAULT_COGNITO_EVENT);
    }

    @Test
    @Transactional
    public void createCognitoRegistrationsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cognitoRegistrationsRepository.findAll().size();

        // Create the CognitoRegistrations with an existing ID
        cognitoRegistrations.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCognitoRegistrationsMockMvc.perform(post("/api/cognito-registrations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cognitoRegistrations)))
            .andExpect(status().isBadRequest());

        // Validate the CognitoRegistrations in the database
        List<CognitoRegistrations> cognitoRegistrationsList = cognitoRegistrationsRepository.findAll();
        assertThat(cognitoRegistrationsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkUserPoolIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = cognitoRegistrationsRepository.findAll().size();
        // set the field null
        cognitoRegistrations.setUserPoolId(null);

        // Create the CognitoRegistrations, which fails.

        restCognitoRegistrationsMockMvc.perform(post("/api/cognito-registrations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cognitoRegistrations)))
            .andExpect(status().isBadRequest());

        List<CognitoRegistrations> cognitoRegistrationsList = cognitoRegistrationsRepository.findAll();
        assertThat(cognitoRegistrationsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkUsernameIsRequired() throws Exception {
        int databaseSizeBeforeTest = cognitoRegistrationsRepository.findAll().size();
        // set the field null
        cognitoRegistrations.setUsername(null);

        // Create the CognitoRegistrations, which fails.

        restCognitoRegistrationsMockMvc.perform(post("/api/cognito-registrations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cognitoRegistrations)))
            .andExpect(status().isBadRequest());

        List<CognitoRegistrations> cognitoRegistrationsList = cognitoRegistrationsRepository.findAll();
        assertThat(cognitoRegistrationsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = cognitoRegistrationsRepository.findAll().size();
        // set the field null
        cognitoRegistrations.setEmail(null);

        // Create the CognitoRegistrations, which fails.

        restCognitoRegistrationsMockMvc.perform(post("/api/cognito-registrations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cognitoRegistrations)))
            .andExpect(status().isBadRequest());

        List<CognitoRegistrations> cognitoRegistrationsList = cognitoRegistrationsRepository.findAll();
        assertThat(cognitoRegistrationsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCognitoRegistrations() throws Exception {
        // Initialize the database
        cognitoRegistrationsRepository.saveAndFlush(cognitoRegistrations);

        // Get all the cognitoRegistrationsList
        restCognitoRegistrationsMockMvc.perform(get("/api/cognito-registrations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cognitoRegistrations.getId().intValue())))
            .andExpect(jsonPath("$.[*].userPoolId").value(hasItem(DEFAULT_USER_POOL_ID.toString())))
            .andExpect(jsonPath("$.[*].username").value(hasItem(DEFAULT_USERNAME.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].loggedDate").value(hasItem(DEFAULT_LOGGED_DATE.toString())))
            .andExpect(jsonPath("$.[*].cognitoEvent").value(hasItem(DEFAULT_COGNITO_EVENT.toString())));
    }
    
    @Test
    @Transactional
    public void getCognitoRegistrations() throws Exception {
        // Initialize the database
        cognitoRegistrationsRepository.saveAndFlush(cognitoRegistrations);

        // Get the cognitoRegistrations
        restCognitoRegistrationsMockMvc.perform(get("/api/cognito-registrations/{id}", cognitoRegistrations.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cognitoRegistrations.getId().intValue()))
            .andExpect(jsonPath("$.userPoolId").value(DEFAULT_USER_POOL_ID.toString()))
            .andExpect(jsonPath("$.username").value(DEFAULT_USERNAME.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.loggedDate").value(DEFAULT_LOGGED_DATE.toString()))
            .andExpect(jsonPath("$.cognitoEvent").value(DEFAULT_COGNITO_EVENT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCognitoRegistrations() throws Exception {
        // Get the cognitoRegistrations
        restCognitoRegistrationsMockMvc.perform(get("/api/cognito-registrations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCognitoRegistrations() throws Exception {
        // Initialize the database
        cognitoRegistrationsRepository.saveAndFlush(cognitoRegistrations);

        int databaseSizeBeforeUpdate = cognitoRegistrationsRepository.findAll().size();

        // Update the cognitoRegistrations
        CognitoRegistrations updatedCognitoRegistrations = cognitoRegistrationsRepository.findById(cognitoRegistrations.getId()).get();
        // Disconnect from session so that the updates on updatedCognitoRegistrations are not directly saved in db
        em.detach(updatedCognitoRegistrations);
        updatedCognitoRegistrations
            .userPoolId(UPDATED_USER_POOL_ID)
            .username(UPDATED_USERNAME)
            .email(UPDATED_EMAIL)
            .loggedDate(UPDATED_LOGGED_DATE)
            .cognitoEvent(UPDATED_COGNITO_EVENT);

        restCognitoRegistrationsMockMvc.perform(put("/api/cognito-registrations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCognitoRegistrations)))
            .andExpect(status().isOk());

        // Validate the CognitoRegistrations in the database
        List<CognitoRegistrations> cognitoRegistrationsList = cognitoRegistrationsRepository.findAll();
        assertThat(cognitoRegistrationsList).hasSize(databaseSizeBeforeUpdate);
        CognitoRegistrations testCognitoRegistrations = cognitoRegistrationsList.get(cognitoRegistrationsList.size() - 1);
        assertThat(testCognitoRegistrations.getUserPoolId()).isEqualTo(UPDATED_USER_POOL_ID);
        assertThat(testCognitoRegistrations.getUsername()).isEqualTo(UPDATED_USERNAME);
        assertThat(testCognitoRegistrations.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testCognitoRegistrations.getLoggedDate()).isEqualTo(UPDATED_LOGGED_DATE);
        assertThat(testCognitoRegistrations.getCognitoEvent()).isEqualTo(UPDATED_COGNITO_EVENT);
    }

    @Test
    @Transactional
    public void updateNonExistingCognitoRegistrations() throws Exception {
        int databaseSizeBeforeUpdate = cognitoRegistrationsRepository.findAll().size();

        // Create the CognitoRegistrations

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCognitoRegistrationsMockMvc.perform(put("/api/cognito-registrations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cognitoRegistrations)))
            .andExpect(status().isBadRequest());

        // Validate the CognitoRegistrations in the database
        List<CognitoRegistrations> cognitoRegistrationsList = cognitoRegistrationsRepository.findAll();
        assertThat(cognitoRegistrationsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCognitoRegistrations() throws Exception {
        // Initialize the database
        cognitoRegistrationsRepository.saveAndFlush(cognitoRegistrations);

        int databaseSizeBeforeDelete = cognitoRegistrationsRepository.findAll().size();

        // Delete the cognitoRegistrations
        restCognitoRegistrationsMockMvc.perform(delete("/api/cognito-registrations/{id}", cognitoRegistrations.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CognitoRegistrations> cognitoRegistrationsList = cognitoRegistrationsRepository.findAll();
        assertThat(cognitoRegistrationsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CognitoRegistrations.class);
        CognitoRegistrations cognitoRegistrations1 = new CognitoRegistrations();
        cognitoRegistrations1.setId(1L);
        CognitoRegistrations cognitoRegistrations2 = new CognitoRegistrations();
        cognitoRegistrations2.setId(cognitoRegistrations1.getId());
        assertThat(cognitoRegistrations1).isEqualTo(cognitoRegistrations2);
        cognitoRegistrations2.setId(2L);
        assertThat(cognitoRegistrations1).isNotEqualTo(cognitoRegistrations2);
        cognitoRegistrations1.setId(null);
        assertThat(cognitoRegistrations1).isNotEqualTo(cognitoRegistrations2);
    }
}
