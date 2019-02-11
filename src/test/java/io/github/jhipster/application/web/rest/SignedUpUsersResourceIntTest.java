package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.EmisAuthApp6App;

import io.github.jhipster.application.domain.SignedUpUsers;
import io.github.jhipster.application.repository.SignedUpUsersRepository;
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
 * Test class for the SignedUpUsersResource REST controller.
 *
 * @see SignedUpUsersResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = EmisAuthApp6App.class)
public class SignedUpUsersResourceIntTest {

    private static final String DEFAULT_USERNAME = "AAAAAAAAAA";
    private static final String UPDATED_USERNAME = "BBBBBBBBBB";

    private static final String DEFAULT_ENABLED = "AAAAAAAAAA";
    private static final String UPDATED_ENABLED = "BBBBBBBBBB";

    private static final String DEFAULT_ACCOUNT_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_ACCOUNT_STATUS = "BBBBBBBBBB";

    private static final Boolean DEFAULT_EMAIL_VERIFIED = false;
    private static final Boolean UPDATED_EMAIL_VERIFIED = true;

    private static final String DEFAULT_PHONE_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_PHONE_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "F|@I.u";
    private static final String UPDATED_EMAIL = "l@9\".7k";

    private static final Instant DEFAULT_UPDATED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATED = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_CREATED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private SignedUpUsersRepository signedUpUsersRepository;

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

    private MockMvc restSignedUpUsersMockMvc;

    private SignedUpUsers signedUpUsers;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SignedUpUsersResource signedUpUsersResource = new SignedUpUsersResource(signedUpUsersRepository);
        this.restSignedUpUsersMockMvc = MockMvcBuilders.standaloneSetup(signedUpUsersResource)
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
    public static SignedUpUsers createEntity(EntityManager em) {
        SignedUpUsers signedUpUsers = new SignedUpUsers()
            .username(DEFAULT_USERNAME)
            .enabled(DEFAULT_ENABLED)
            .accountStatus(DEFAULT_ACCOUNT_STATUS)
            .emailVerified(DEFAULT_EMAIL_VERIFIED)
            .phoneNumber(DEFAULT_PHONE_NUMBER)
            .email(DEFAULT_EMAIL)
            .updated(DEFAULT_UPDATED)
            .created(DEFAULT_CREATED);
        return signedUpUsers;
    }

    @Before
    public void initTest() {
        signedUpUsers = createEntity(em);
    }

    @Test
    @Transactional
    public void createSignedUpUsers() throws Exception {
        int databaseSizeBeforeCreate = signedUpUsersRepository.findAll().size();

        // Create the SignedUpUsers
        restSignedUpUsersMockMvc.perform(post("/api/signed-up-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(signedUpUsers)))
            .andExpect(status().isCreated());

        // Validate the SignedUpUsers in the database
        List<SignedUpUsers> signedUpUsersList = signedUpUsersRepository.findAll();
        assertThat(signedUpUsersList).hasSize(databaseSizeBeforeCreate + 1);
        SignedUpUsers testSignedUpUsers = signedUpUsersList.get(signedUpUsersList.size() - 1);
        assertThat(testSignedUpUsers.getUsername()).isEqualTo(DEFAULT_USERNAME);
        assertThat(testSignedUpUsers.getEnabled()).isEqualTo(DEFAULT_ENABLED);
        assertThat(testSignedUpUsers.getAccountStatus()).isEqualTo(DEFAULT_ACCOUNT_STATUS);
        assertThat(testSignedUpUsers.isEmailVerified()).isEqualTo(DEFAULT_EMAIL_VERIFIED);
        assertThat(testSignedUpUsers.getPhoneNumber()).isEqualTo(DEFAULT_PHONE_NUMBER);
        assertThat(testSignedUpUsers.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testSignedUpUsers.getUpdated()).isEqualTo(DEFAULT_UPDATED);
        assertThat(testSignedUpUsers.getCreated()).isEqualTo(DEFAULT_CREATED);
    }

    @Test
    @Transactional
    public void createSignedUpUsersWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = signedUpUsersRepository.findAll().size();

        // Create the SignedUpUsers with an existing ID
        signedUpUsers.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSignedUpUsersMockMvc.perform(post("/api/signed-up-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(signedUpUsers)))
            .andExpect(status().isBadRequest());

        // Validate the SignedUpUsers in the database
        List<SignedUpUsers> signedUpUsersList = signedUpUsersRepository.findAll();
        assertThat(signedUpUsersList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = signedUpUsersRepository.findAll().size();
        // set the field null
        signedUpUsers.setEmail(null);

        // Create the SignedUpUsers, which fails.

        restSignedUpUsersMockMvc.perform(post("/api/signed-up-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(signedUpUsers)))
            .andExpect(status().isBadRequest());

        List<SignedUpUsers> signedUpUsersList = signedUpUsersRepository.findAll();
        assertThat(signedUpUsersList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSignedUpUsers() throws Exception {
        // Initialize the database
        signedUpUsersRepository.saveAndFlush(signedUpUsers);

        // Get all the signedUpUsersList
        restSignedUpUsersMockMvc.perform(get("/api/signed-up-users?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(signedUpUsers.getId().intValue())))
            .andExpect(jsonPath("$.[*].username").value(hasItem(DEFAULT_USERNAME.toString())))
            .andExpect(jsonPath("$.[*].enabled").value(hasItem(DEFAULT_ENABLED.toString())))
            .andExpect(jsonPath("$.[*].accountStatus").value(hasItem(DEFAULT_ACCOUNT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].emailVerified").value(hasItem(DEFAULT_EMAIL_VERIFIED.booleanValue())))
            .andExpect(jsonPath("$.[*].phoneNumber").value(hasItem(DEFAULT_PHONE_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].updated").value(hasItem(DEFAULT_UPDATED.toString())))
            .andExpect(jsonPath("$.[*].created").value(hasItem(DEFAULT_CREATED.toString())));
    }
    
    @Test
    @Transactional
    public void getSignedUpUsers() throws Exception {
        // Initialize the database
        signedUpUsersRepository.saveAndFlush(signedUpUsers);

        // Get the signedUpUsers
        restSignedUpUsersMockMvc.perform(get("/api/signed-up-users/{id}", signedUpUsers.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(signedUpUsers.getId().intValue()))
            .andExpect(jsonPath("$.username").value(DEFAULT_USERNAME.toString()))
            .andExpect(jsonPath("$.enabled").value(DEFAULT_ENABLED.toString()))
            .andExpect(jsonPath("$.accountStatus").value(DEFAULT_ACCOUNT_STATUS.toString()))
            .andExpect(jsonPath("$.emailVerified").value(DEFAULT_EMAIL_VERIFIED.booleanValue()))
            .andExpect(jsonPath("$.phoneNumber").value(DEFAULT_PHONE_NUMBER.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.updated").value(DEFAULT_UPDATED.toString()))
            .andExpect(jsonPath("$.created").value(DEFAULT_CREATED.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSignedUpUsers() throws Exception {
        // Get the signedUpUsers
        restSignedUpUsersMockMvc.perform(get("/api/signed-up-users/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSignedUpUsers() throws Exception {
        // Initialize the database
        signedUpUsersRepository.saveAndFlush(signedUpUsers);

        int databaseSizeBeforeUpdate = signedUpUsersRepository.findAll().size();

        // Update the signedUpUsers
        SignedUpUsers updatedSignedUpUsers = signedUpUsersRepository.findById(signedUpUsers.getId()).get();
        // Disconnect from session so that the updates on updatedSignedUpUsers are not directly saved in db
        em.detach(updatedSignedUpUsers);
        updatedSignedUpUsers
            .username(UPDATED_USERNAME)
            .enabled(UPDATED_ENABLED)
            .accountStatus(UPDATED_ACCOUNT_STATUS)
            .emailVerified(UPDATED_EMAIL_VERIFIED)
            .phoneNumber(UPDATED_PHONE_NUMBER)
            .email(UPDATED_EMAIL)
            .updated(UPDATED_UPDATED)
            .created(UPDATED_CREATED);

        restSignedUpUsersMockMvc.perform(put("/api/signed-up-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSignedUpUsers)))
            .andExpect(status().isOk());

        // Validate the SignedUpUsers in the database
        List<SignedUpUsers> signedUpUsersList = signedUpUsersRepository.findAll();
        assertThat(signedUpUsersList).hasSize(databaseSizeBeforeUpdate);
        SignedUpUsers testSignedUpUsers = signedUpUsersList.get(signedUpUsersList.size() - 1);
        assertThat(testSignedUpUsers.getUsername()).isEqualTo(UPDATED_USERNAME);
        assertThat(testSignedUpUsers.getEnabled()).isEqualTo(UPDATED_ENABLED);
        assertThat(testSignedUpUsers.getAccountStatus()).isEqualTo(UPDATED_ACCOUNT_STATUS);
        assertThat(testSignedUpUsers.isEmailVerified()).isEqualTo(UPDATED_EMAIL_VERIFIED);
        assertThat(testSignedUpUsers.getPhoneNumber()).isEqualTo(UPDATED_PHONE_NUMBER);
        assertThat(testSignedUpUsers.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testSignedUpUsers.getUpdated()).isEqualTo(UPDATED_UPDATED);
        assertThat(testSignedUpUsers.getCreated()).isEqualTo(UPDATED_CREATED);
    }

    @Test
    @Transactional
    public void updateNonExistingSignedUpUsers() throws Exception {
        int databaseSizeBeforeUpdate = signedUpUsersRepository.findAll().size();

        // Create the SignedUpUsers

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSignedUpUsersMockMvc.perform(put("/api/signed-up-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(signedUpUsers)))
            .andExpect(status().isBadRequest());

        // Validate the SignedUpUsers in the database
        List<SignedUpUsers> signedUpUsersList = signedUpUsersRepository.findAll();
        assertThat(signedUpUsersList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSignedUpUsers() throws Exception {
        // Initialize the database
        signedUpUsersRepository.saveAndFlush(signedUpUsers);

        int databaseSizeBeforeDelete = signedUpUsersRepository.findAll().size();

        // Delete the signedUpUsers
        restSignedUpUsersMockMvc.perform(delete("/api/signed-up-users/{id}", signedUpUsers.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SignedUpUsers> signedUpUsersList = signedUpUsersRepository.findAll();
        assertThat(signedUpUsersList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SignedUpUsers.class);
        SignedUpUsers signedUpUsers1 = new SignedUpUsers();
        signedUpUsers1.setId(1L);
        SignedUpUsers signedUpUsers2 = new SignedUpUsers();
        signedUpUsers2.setId(signedUpUsers1.getId());
        assertThat(signedUpUsers1).isEqualTo(signedUpUsers2);
        signedUpUsers2.setId(2L);
        assertThat(signedUpUsers1).isNotEqualTo(signedUpUsers2);
        signedUpUsers1.setId(null);
        assertThat(signedUpUsers1).isNotEqualTo(signedUpUsers2);
    }
}
