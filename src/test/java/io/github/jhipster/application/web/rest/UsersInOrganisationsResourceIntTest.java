package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.EmisAuthApp6App;

import io.github.jhipster.application.domain.UsersInOrganisations;
import io.github.jhipster.application.repository.UsersInOrganisationsRepository;
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
 * Test class for the UsersInOrganisationsResource REST controller.
 *
 * @see UsersInOrganisationsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = EmisAuthApp6App.class)
public class UsersInOrganisationsResourceIntTest {

    private static final String DEFAULT_ORGANISATION = "AAAAAAAAAA";
    private static final String UPDATED_ORGANISATION = "BBBBBBBBBB";

    private static final String DEFAULT_USERNAME = "AAAAAAAAAA";
    private static final String UPDATED_USERNAME = "BBBBBBBBBB";

    @Autowired
    private UsersInOrganisationsRepository usersInOrganisationsRepository;

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

    private MockMvc restUsersInOrganisationsMockMvc;

    private UsersInOrganisations usersInOrganisations;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UsersInOrganisationsResource usersInOrganisationsResource = new UsersInOrganisationsResource(usersInOrganisationsRepository);
        this.restUsersInOrganisationsMockMvc = MockMvcBuilders.standaloneSetup(usersInOrganisationsResource)
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
    public static UsersInOrganisations createEntity(EntityManager em) {
        UsersInOrganisations usersInOrganisations = new UsersInOrganisations()
            .organisation(DEFAULT_ORGANISATION)
            .username(DEFAULT_USERNAME);
        return usersInOrganisations;
    }

    @Before
    public void initTest() {
        usersInOrganisations = createEntity(em);
    }

    @Test
    @Transactional
    public void createUsersInOrganisations() throws Exception {
        int databaseSizeBeforeCreate = usersInOrganisationsRepository.findAll().size();

        // Create the UsersInOrganisations
        restUsersInOrganisationsMockMvc.perform(post("/api/users-in-organisations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(usersInOrganisations)))
            .andExpect(status().isCreated());

        // Validate the UsersInOrganisations in the database
        List<UsersInOrganisations> usersInOrganisationsList = usersInOrganisationsRepository.findAll();
        assertThat(usersInOrganisationsList).hasSize(databaseSizeBeforeCreate + 1);
        UsersInOrganisations testUsersInOrganisations = usersInOrganisationsList.get(usersInOrganisationsList.size() - 1);
        assertThat(testUsersInOrganisations.getOrganisation()).isEqualTo(DEFAULT_ORGANISATION);
        assertThat(testUsersInOrganisations.getUsername()).isEqualTo(DEFAULT_USERNAME);
    }

    @Test
    @Transactional
    public void createUsersInOrganisationsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = usersInOrganisationsRepository.findAll().size();

        // Create the UsersInOrganisations with an existing ID
        usersInOrganisations.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUsersInOrganisationsMockMvc.perform(post("/api/users-in-organisations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(usersInOrganisations)))
            .andExpect(status().isBadRequest());

        // Validate the UsersInOrganisations in the database
        List<UsersInOrganisations> usersInOrganisationsList = usersInOrganisationsRepository.findAll();
        assertThat(usersInOrganisationsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllUsersInOrganisations() throws Exception {
        // Initialize the database
        usersInOrganisationsRepository.saveAndFlush(usersInOrganisations);

        // Get all the usersInOrganisationsList
        restUsersInOrganisationsMockMvc.perform(get("/api/users-in-organisations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(usersInOrganisations.getId().intValue())))
            .andExpect(jsonPath("$.[*].organisation").value(hasItem(DEFAULT_ORGANISATION.toString())))
            .andExpect(jsonPath("$.[*].username").value(hasItem(DEFAULT_USERNAME.toString())));
    }
    
    @Test
    @Transactional
    public void getUsersInOrganisations() throws Exception {
        // Initialize the database
        usersInOrganisationsRepository.saveAndFlush(usersInOrganisations);

        // Get the usersInOrganisations
        restUsersInOrganisationsMockMvc.perform(get("/api/users-in-organisations/{id}", usersInOrganisations.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(usersInOrganisations.getId().intValue()))
            .andExpect(jsonPath("$.organisation").value(DEFAULT_ORGANISATION.toString()))
            .andExpect(jsonPath("$.username").value(DEFAULT_USERNAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingUsersInOrganisations() throws Exception {
        // Get the usersInOrganisations
        restUsersInOrganisationsMockMvc.perform(get("/api/users-in-organisations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUsersInOrganisations() throws Exception {
        // Initialize the database
        usersInOrganisationsRepository.saveAndFlush(usersInOrganisations);

        int databaseSizeBeforeUpdate = usersInOrganisationsRepository.findAll().size();

        // Update the usersInOrganisations
        UsersInOrganisations updatedUsersInOrganisations = usersInOrganisationsRepository.findById(usersInOrganisations.getId()).get();
        // Disconnect from session so that the updates on updatedUsersInOrganisations are not directly saved in db
        em.detach(updatedUsersInOrganisations);
        updatedUsersInOrganisations
            .organisation(UPDATED_ORGANISATION)
            .username(UPDATED_USERNAME);

        restUsersInOrganisationsMockMvc.perform(put("/api/users-in-organisations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUsersInOrganisations)))
            .andExpect(status().isOk());

        // Validate the UsersInOrganisations in the database
        List<UsersInOrganisations> usersInOrganisationsList = usersInOrganisationsRepository.findAll();
        assertThat(usersInOrganisationsList).hasSize(databaseSizeBeforeUpdate);
        UsersInOrganisations testUsersInOrganisations = usersInOrganisationsList.get(usersInOrganisationsList.size() - 1);
        assertThat(testUsersInOrganisations.getOrganisation()).isEqualTo(UPDATED_ORGANISATION);
        assertThat(testUsersInOrganisations.getUsername()).isEqualTo(UPDATED_USERNAME);
    }

    @Test
    @Transactional
    public void updateNonExistingUsersInOrganisations() throws Exception {
        int databaseSizeBeforeUpdate = usersInOrganisationsRepository.findAll().size();

        // Create the UsersInOrganisations

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUsersInOrganisationsMockMvc.perform(put("/api/users-in-organisations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(usersInOrganisations)))
            .andExpect(status().isBadRequest());

        // Validate the UsersInOrganisations in the database
        List<UsersInOrganisations> usersInOrganisationsList = usersInOrganisationsRepository.findAll();
        assertThat(usersInOrganisationsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUsersInOrganisations() throws Exception {
        // Initialize the database
        usersInOrganisationsRepository.saveAndFlush(usersInOrganisations);

        int databaseSizeBeforeDelete = usersInOrganisationsRepository.findAll().size();

        // Delete the usersInOrganisations
        restUsersInOrganisationsMockMvc.perform(delete("/api/users-in-organisations/{id}", usersInOrganisations.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<UsersInOrganisations> usersInOrganisationsList = usersInOrganisationsRepository.findAll();
        assertThat(usersInOrganisationsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UsersInOrganisations.class);
        UsersInOrganisations usersInOrganisations1 = new UsersInOrganisations();
        usersInOrganisations1.setId(1L);
        UsersInOrganisations usersInOrganisations2 = new UsersInOrganisations();
        usersInOrganisations2.setId(usersInOrganisations1.getId());
        assertThat(usersInOrganisations1).isEqualTo(usersInOrganisations2);
        usersInOrganisations2.setId(2L);
        assertThat(usersInOrganisations1).isNotEqualTo(usersInOrganisations2);
        usersInOrganisations1.setId(null);
        assertThat(usersInOrganisations1).isNotEqualTo(usersInOrganisations2);
    }
}
