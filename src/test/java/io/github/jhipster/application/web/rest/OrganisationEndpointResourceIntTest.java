package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.EmisAuthApp6App;

import io.github.jhipster.application.domain.OrganisationEndpoint;
import io.github.jhipster.application.repository.OrganisationEndpointRepository;
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
 * Test class for the OrganisationEndpointResource REST controller.
 *
 * @see OrganisationEndpointResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = EmisAuthApp6App.class)
public class OrganisationEndpointResourceIntTest {

    private static final String DEFAULT_ORG_GUID = "AAAAAAAAAA";
    private static final String UPDATED_ORG_GUID = "BBBBBBBBBB";

    private static final String DEFAULT_CBD = "AAAAAAAAAA";
    private static final String UPDATED_CBD = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_SERVER_NAME = "AAAAAAAAAA";
    private static final String UPDATED_SERVER_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DATABASE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_DATABASE_NAME = "BBBBBBBBBB";

    @Autowired
    private OrganisationEndpointRepository organisationEndpointRepository;

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

    private MockMvc restOrganisationEndpointMockMvc;

    private OrganisationEndpoint organisationEndpoint;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OrganisationEndpointResource organisationEndpointResource = new OrganisationEndpointResource(organisationEndpointRepository);
        this.restOrganisationEndpointMockMvc = MockMvcBuilders.standaloneSetup(organisationEndpointResource)
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
    public static OrganisationEndpoint createEntity(EntityManager em) {
        OrganisationEndpoint organisationEndpoint = new OrganisationEndpoint()
            .orgGUID(DEFAULT_ORG_GUID)
            .cbd(DEFAULT_CBD)
            .name(DEFAULT_NAME)
            .serverName(DEFAULT_SERVER_NAME)
            .databaseName(DEFAULT_DATABASE_NAME);
        return organisationEndpoint;
    }

    @Before
    public void initTest() {
        organisationEndpoint = createEntity(em);
    }

    @Test
    @Transactional
    public void createOrganisationEndpoint() throws Exception {
        int databaseSizeBeforeCreate = organisationEndpointRepository.findAll().size();

        // Create the OrganisationEndpoint
        restOrganisationEndpointMockMvc.perform(post("/api/organisation-endpoints")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(organisationEndpoint)))
            .andExpect(status().isCreated());

        // Validate the OrganisationEndpoint in the database
        List<OrganisationEndpoint> organisationEndpointList = organisationEndpointRepository.findAll();
        assertThat(organisationEndpointList).hasSize(databaseSizeBeforeCreate + 1);
        OrganisationEndpoint testOrganisationEndpoint = organisationEndpointList.get(organisationEndpointList.size() - 1);
        assertThat(testOrganisationEndpoint.getOrgGUID()).isEqualTo(DEFAULT_ORG_GUID);
        assertThat(testOrganisationEndpoint.getCbd()).isEqualTo(DEFAULT_CBD);
        assertThat(testOrganisationEndpoint.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testOrganisationEndpoint.getServerName()).isEqualTo(DEFAULT_SERVER_NAME);
        assertThat(testOrganisationEndpoint.getDatabaseName()).isEqualTo(DEFAULT_DATABASE_NAME);
    }

    @Test
    @Transactional
    public void createOrganisationEndpointWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = organisationEndpointRepository.findAll().size();

        // Create the OrganisationEndpoint with an existing ID
        organisationEndpoint.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOrganisationEndpointMockMvc.perform(post("/api/organisation-endpoints")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(organisationEndpoint)))
            .andExpect(status().isBadRequest());

        // Validate the OrganisationEndpoint in the database
        List<OrganisationEndpoint> organisationEndpointList = organisationEndpointRepository.findAll();
        assertThat(organisationEndpointList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkOrgGUIDIsRequired() throws Exception {
        int databaseSizeBeforeTest = organisationEndpointRepository.findAll().size();
        // set the field null
        organisationEndpoint.setOrgGUID(null);

        // Create the OrganisationEndpoint, which fails.

        restOrganisationEndpointMockMvc.perform(post("/api/organisation-endpoints")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(organisationEndpoint)))
            .andExpect(status().isBadRequest());

        List<OrganisationEndpoint> organisationEndpointList = organisationEndpointRepository.findAll();
        assertThat(organisationEndpointList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkServerNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = organisationEndpointRepository.findAll().size();
        // set the field null
        organisationEndpoint.setServerName(null);

        // Create the OrganisationEndpoint, which fails.

        restOrganisationEndpointMockMvc.perform(post("/api/organisation-endpoints")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(organisationEndpoint)))
            .andExpect(status().isBadRequest());

        List<OrganisationEndpoint> organisationEndpointList = organisationEndpointRepository.findAll();
        assertThat(organisationEndpointList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDatabaseNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = organisationEndpointRepository.findAll().size();
        // set the field null
        organisationEndpoint.setDatabaseName(null);

        // Create the OrganisationEndpoint, which fails.

        restOrganisationEndpointMockMvc.perform(post("/api/organisation-endpoints")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(organisationEndpoint)))
            .andExpect(status().isBadRequest());

        List<OrganisationEndpoint> organisationEndpointList = organisationEndpointRepository.findAll();
        assertThat(organisationEndpointList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllOrganisationEndpoints() throws Exception {
        // Initialize the database
        organisationEndpointRepository.saveAndFlush(organisationEndpoint);

        // Get all the organisationEndpointList
        restOrganisationEndpointMockMvc.perform(get("/api/organisation-endpoints?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(organisationEndpoint.getId().intValue())))
            .andExpect(jsonPath("$.[*].orgGUID").value(hasItem(DEFAULT_ORG_GUID.toString())))
            .andExpect(jsonPath("$.[*].cbd").value(hasItem(DEFAULT_CBD.toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].serverName").value(hasItem(DEFAULT_SERVER_NAME.toString())))
            .andExpect(jsonPath("$.[*].databaseName").value(hasItem(DEFAULT_DATABASE_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getOrganisationEndpoint() throws Exception {
        // Initialize the database
        organisationEndpointRepository.saveAndFlush(organisationEndpoint);

        // Get the organisationEndpoint
        restOrganisationEndpointMockMvc.perform(get("/api/organisation-endpoints/{id}", organisationEndpoint.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(organisationEndpoint.getId().intValue()))
            .andExpect(jsonPath("$.orgGUID").value(DEFAULT_ORG_GUID.toString()))
            .andExpect(jsonPath("$.cbd").value(DEFAULT_CBD.toString()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.serverName").value(DEFAULT_SERVER_NAME.toString()))
            .andExpect(jsonPath("$.databaseName").value(DEFAULT_DATABASE_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingOrganisationEndpoint() throws Exception {
        // Get the organisationEndpoint
        restOrganisationEndpointMockMvc.perform(get("/api/organisation-endpoints/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOrganisationEndpoint() throws Exception {
        // Initialize the database
        organisationEndpointRepository.saveAndFlush(organisationEndpoint);

        int databaseSizeBeforeUpdate = organisationEndpointRepository.findAll().size();

        // Update the organisationEndpoint
        OrganisationEndpoint updatedOrganisationEndpoint = organisationEndpointRepository.findById(organisationEndpoint.getId()).get();
        // Disconnect from session so that the updates on updatedOrganisationEndpoint are not directly saved in db
        em.detach(updatedOrganisationEndpoint);
        updatedOrganisationEndpoint
            .orgGUID(UPDATED_ORG_GUID)
            .cbd(UPDATED_CBD)
            .name(UPDATED_NAME)
            .serverName(UPDATED_SERVER_NAME)
            .databaseName(UPDATED_DATABASE_NAME);

        restOrganisationEndpointMockMvc.perform(put("/api/organisation-endpoints")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedOrganisationEndpoint)))
            .andExpect(status().isOk());

        // Validate the OrganisationEndpoint in the database
        List<OrganisationEndpoint> organisationEndpointList = organisationEndpointRepository.findAll();
        assertThat(organisationEndpointList).hasSize(databaseSizeBeforeUpdate);
        OrganisationEndpoint testOrganisationEndpoint = organisationEndpointList.get(organisationEndpointList.size() - 1);
        assertThat(testOrganisationEndpoint.getOrgGUID()).isEqualTo(UPDATED_ORG_GUID);
        assertThat(testOrganisationEndpoint.getCbd()).isEqualTo(UPDATED_CBD);
        assertThat(testOrganisationEndpoint.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testOrganisationEndpoint.getServerName()).isEqualTo(UPDATED_SERVER_NAME);
        assertThat(testOrganisationEndpoint.getDatabaseName()).isEqualTo(UPDATED_DATABASE_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingOrganisationEndpoint() throws Exception {
        int databaseSizeBeforeUpdate = organisationEndpointRepository.findAll().size();

        // Create the OrganisationEndpoint

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOrganisationEndpointMockMvc.perform(put("/api/organisation-endpoints")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(organisationEndpoint)))
            .andExpect(status().isBadRequest());

        // Validate the OrganisationEndpoint in the database
        List<OrganisationEndpoint> organisationEndpointList = organisationEndpointRepository.findAll();
        assertThat(organisationEndpointList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteOrganisationEndpoint() throws Exception {
        // Initialize the database
        organisationEndpointRepository.saveAndFlush(organisationEndpoint);

        int databaseSizeBeforeDelete = organisationEndpointRepository.findAll().size();

        // Delete the organisationEndpoint
        restOrganisationEndpointMockMvc.perform(delete("/api/organisation-endpoints/{id}", organisationEndpoint.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<OrganisationEndpoint> organisationEndpointList = organisationEndpointRepository.findAll();
        assertThat(organisationEndpointList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OrganisationEndpoint.class);
        OrganisationEndpoint organisationEndpoint1 = new OrganisationEndpoint();
        organisationEndpoint1.setId(1L);
        OrganisationEndpoint organisationEndpoint2 = new OrganisationEndpoint();
        organisationEndpoint2.setId(organisationEndpoint1.getId());
        assertThat(organisationEndpoint1).isEqualTo(organisationEndpoint2);
        organisationEndpoint2.setId(2L);
        assertThat(organisationEndpoint1).isNotEqualTo(organisationEndpoint2);
        organisationEndpoint1.setId(null);
        assertThat(organisationEndpoint1).isNotEqualTo(organisationEndpoint2);
    }
}
