package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.EmisAuthApp6App;

import io.github.jhipster.application.domain.OrganisationGroups;
import io.github.jhipster.application.repository.OrganisationGroupsRepository;
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
 * Test class for the OrganisationGroupsResource REST controller.
 *
 * @see OrganisationGroupsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = EmisAuthApp6App.class)
public class OrganisationGroupsResourceIntTest {

    private static final String DEFAULT_ORGANISATION_GROUP = "AAAAAAAAAA";
    private static final String UPDATED_ORGANISATION_GROUP = "BBBBBBBBBB";

    private static final String DEFAULT_ORGANISATION_ID = "AAAAAAAAAA";
    private static final String UPDATED_ORGANISATION_ID = "BBBBBBBBBB";

    @Autowired
    private OrganisationGroupsRepository organisationGroupsRepository;

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

    private MockMvc restOrganisationGroupsMockMvc;

    private OrganisationGroups organisationGroups;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OrganisationGroupsResource organisationGroupsResource = new OrganisationGroupsResource(organisationGroupsRepository);
        this.restOrganisationGroupsMockMvc = MockMvcBuilders.standaloneSetup(organisationGroupsResource)
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
    public static OrganisationGroups createEntity(EntityManager em) {
        OrganisationGroups organisationGroups = new OrganisationGroups()
            .organisationGroup(DEFAULT_ORGANISATION_GROUP)
            .organisationId(DEFAULT_ORGANISATION_ID);
        return organisationGroups;
    }

    @Before
    public void initTest() {
        organisationGroups = createEntity(em);
    }

    @Test
    @Transactional
    public void createOrganisationGroups() throws Exception {
        int databaseSizeBeforeCreate = organisationGroupsRepository.findAll().size();

        // Create the OrganisationGroups
        restOrganisationGroupsMockMvc.perform(post("/api/organisation-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(organisationGroups)))
            .andExpect(status().isCreated());

        // Validate the OrganisationGroups in the database
        List<OrganisationGroups> organisationGroupsList = organisationGroupsRepository.findAll();
        assertThat(organisationGroupsList).hasSize(databaseSizeBeforeCreate + 1);
        OrganisationGroups testOrganisationGroups = organisationGroupsList.get(organisationGroupsList.size() - 1);
        assertThat(testOrganisationGroups.getOrganisationGroup()).isEqualTo(DEFAULT_ORGANISATION_GROUP);
        assertThat(testOrganisationGroups.getOrganisationId()).isEqualTo(DEFAULT_ORGANISATION_ID);
    }

    @Test
    @Transactional
    public void createOrganisationGroupsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = organisationGroupsRepository.findAll().size();

        // Create the OrganisationGroups with an existing ID
        organisationGroups.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOrganisationGroupsMockMvc.perform(post("/api/organisation-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(organisationGroups)))
            .andExpect(status().isBadRequest());

        // Validate the OrganisationGroups in the database
        List<OrganisationGroups> organisationGroupsList = organisationGroupsRepository.findAll();
        assertThat(organisationGroupsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkOrganisationGroupIsRequired() throws Exception {
        int databaseSizeBeforeTest = organisationGroupsRepository.findAll().size();
        // set the field null
        organisationGroups.setOrganisationGroup(null);

        // Create the OrganisationGroups, which fails.

        restOrganisationGroupsMockMvc.perform(post("/api/organisation-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(organisationGroups)))
            .andExpect(status().isBadRequest());

        List<OrganisationGroups> organisationGroupsList = organisationGroupsRepository.findAll();
        assertThat(organisationGroupsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllOrganisationGroups() throws Exception {
        // Initialize the database
        organisationGroupsRepository.saveAndFlush(organisationGroups);

        // Get all the organisationGroupsList
        restOrganisationGroupsMockMvc.perform(get("/api/organisation-groups?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(organisationGroups.getId().intValue())))
            .andExpect(jsonPath("$.[*].organisationGroup").value(hasItem(DEFAULT_ORGANISATION_GROUP.toString())))
            .andExpect(jsonPath("$.[*].organisationId").value(hasItem(DEFAULT_ORGANISATION_ID.toString())));
    }
    
    @Test
    @Transactional
    public void getOrganisationGroups() throws Exception {
        // Initialize the database
        organisationGroupsRepository.saveAndFlush(organisationGroups);

        // Get the organisationGroups
        restOrganisationGroupsMockMvc.perform(get("/api/organisation-groups/{id}", organisationGroups.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(organisationGroups.getId().intValue()))
            .andExpect(jsonPath("$.organisationGroup").value(DEFAULT_ORGANISATION_GROUP.toString()))
            .andExpect(jsonPath("$.organisationId").value(DEFAULT_ORGANISATION_ID.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingOrganisationGroups() throws Exception {
        // Get the organisationGroups
        restOrganisationGroupsMockMvc.perform(get("/api/organisation-groups/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOrganisationGroups() throws Exception {
        // Initialize the database
        organisationGroupsRepository.saveAndFlush(organisationGroups);

        int databaseSizeBeforeUpdate = organisationGroupsRepository.findAll().size();

        // Update the organisationGroups
        OrganisationGroups updatedOrganisationGroups = organisationGroupsRepository.findById(organisationGroups.getId()).get();
        // Disconnect from session so that the updates on updatedOrganisationGroups are not directly saved in db
        em.detach(updatedOrganisationGroups);
        updatedOrganisationGroups
            .organisationGroup(UPDATED_ORGANISATION_GROUP)
            .organisationId(UPDATED_ORGANISATION_ID);

        restOrganisationGroupsMockMvc.perform(put("/api/organisation-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedOrganisationGroups)))
            .andExpect(status().isOk());

        // Validate the OrganisationGroups in the database
        List<OrganisationGroups> organisationGroupsList = organisationGroupsRepository.findAll();
        assertThat(organisationGroupsList).hasSize(databaseSizeBeforeUpdate);
        OrganisationGroups testOrganisationGroups = organisationGroupsList.get(organisationGroupsList.size() - 1);
        assertThat(testOrganisationGroups.getOrganisationGroup()).isEqualTo(UPDATED_ORGANISATION_GROUP);
        assertThat(testOrganisationGroups.getOrganisationId()).isEqualTo(UPDATED_ORGANISATION_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingOrganisationGroups() throws Exception {
        int databaseSizeBeforeUpdate = organisationGroupsRepository.findAll().size();

        // Create the OrganisationGroups

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOrganisationGroupsMockMvc.perform(put("/api/organisation-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(organisationGroups)))
            .andExpect(status().isBadRequest());

        // Validate the OrganisationGroups in the database
        List<OrganisationGroups> organisationGroupsList = organisationGroupsRepository.findAll();
        assertThat(organisationGroupsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteOrganisationGroups() throws Exception {
        // Initialize the database
        organisationGroupsRepository.saveAndFlush(organisationGroups);

        int databaseSizeBeforeDelete = organisationGroupsRepository.findAll().size();

        // Delete the organisationGroups
        restOrganisationGroupsMockMvc.perform(delete("/api/organisation-groups/{id}", organisationGroups.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<OrganisationGroups> organisationGroupsList = organisationGroupsRepository.findAll();
        assertThat(organisationGroupsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OrganisationGroups.class);
        OrganisationGroups organisationGroups1 = new OrganisationGroups();
        organisationGroups1.setId(1L);
        OrganisationGroups organisationGroups2 = new OrganisationGroups();
        organisationGroups2.setId(organisationGroups1.getId());
        assertThat(organisationGroups1).isEqualTo(organisationGroups2);
        organisationGroups2.setId(2L);
        assertThat(organisationGroups1).isNotEqualTo(organisationGroups2);
        organisationGroups1.setId(null);
        assertThat(organisationGroups1).isNotEqualTo(organisationGroups2);
    }
}
