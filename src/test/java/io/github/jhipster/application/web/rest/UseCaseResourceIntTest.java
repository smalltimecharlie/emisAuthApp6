package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.EmisAuthApp6App;

import io.github.jhipster.application.domain.UseCase;
import io.github.jhipster.application.repository.UseCaseRepository;
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
 * Test class for the UseCaseResource REST controller.
 *
 * @see UseCaseResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = EmisAuthApp6App.class)
public class UseCaseResourceIntTest {

    private static final String DEFAULT_USE_CASE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_USE_CASE_NAME = "BBBBBBBBBB";

    private static final Instant DEFAULT_START_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_START_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_END_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_END_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Boolean DEFAULT_ACTIVE = false;
    private static final Boolean UPDATED_ACTIVE = true;

    @Autowired
    private UseCaseRepository useCaseRepository;

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

    private MockMvc restUseCaseMockMvc;

    private UseCase useCase;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UseCaseResource useCaseResource = new UseCaseResource(useCaseRepository);
        this.restUseCaseMockMvc = MockMvcBuilders.standaloneSetup(useCaseResource)
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
    public static UseCase createEntity(EntityManager em) {
        UseCase useCase = new UseCase()
            .useCaseName(DEFAULT_USE_CASE_NAME)
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE)
            .active(DEFAULT_ACTIVE);
        return useCase;
    }

    @Before
    public void initTest() {
        useCase = createEntity(em);
    }

    @Test
    @Transactional
    public void createUseCase() throws Exception {
        int databaseSizeBeforeCreate = useCaseRepository.findAll().size();

        // Create the UseCase
        restUseCaseMockMvc.perform(post("/api/use-cases")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(useCase)))
            .andExpect(status().isCreated());

        // Validate the UseCase in the database
        List<UseCase> useCaseList = useCaseRepository.findAll();
        assertThat(useCaseList).hasSize(databaseSizeBeforeCreate + 1);
        UseCase testUseCase = useCaseList.get(useCaseList.size() - 1);
        assertThat(testUseCase.getUseCaseName()).isEqualTo(DEFAULT_USE_CASE_NAME);
        assertThat(testUseCase.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testUseCase.getEndDate()).isEqualTo(DEFAULT_END_DATE);
        assertThat(testUseCase.isActive()).isEqualTo(DEFAULT_ACTIVE);
    }

    @Test
    @Transactional
    public void createUseCaseWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = useCaseRepository.findAll().size();

        // Create the UseCase with an existing ID
        useCase.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUseCaseMockMvc.perform(post("/api/use-cases")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(useCase)))
            .andExpect(status().isBadRequest());

        // Validate the UseCase in the database
        List<UseCase> useCaseList = useCaseRepository.findAll();
        assertThat(useCaseList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllUseCases() throws Exception {
        // Initialize the database
        useCaseRepository.saveAndFlush(useCase);

        // Get all the useCaseList
        restUseCaseMockMvc.perform(get("/api/use-cases?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(useCase.getId().intValue())))
            .andExpect(jsonPath("$.[*].useCaseName").value(hasItem(DEFAULT_USE_CASE_NAME.toString())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getUseCase() throws Exception {
        // Initialize the database
        useCaseRepository.saveAndFlush(useCase);

        // Get the useCase
        restUseCaseMockMvc.perform(get("/api/use-cases/{id}", useCase.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(useCase.getId().intValue()))
            .andExpect(jsonPath("$.useCaseName").value(DEFAULT_USE_CASE_NAME.toString()))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE.toString()))
            .andExpect(jsonPath("$.active").value(DEFAULT_ACTIVE.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingUseCase() throws Exception {
        // Get the useCase
        restUseCaseMockMvc.perform(get("/api/use-cases/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUseCase() throws Exception {
        // Initialize the database
        useCaseRepository.saveAndFlush(useCase);

        int databaseSizeBeforeUpdate = useCaseRepository.findAll().size();

        // Update the useCase
        UseCase updatedUseCase = useCaseRepository.findById(useCase.getId()).get();
        // Disconnect from session so that the updates on updatedUseCase are not directly saved in db
        em.detach(updatedUseCase);
        updatedUseCase
            .useCaseName(UPDATED_USE_CASE_NAME)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE)
            .active(UPDATED_ACTIVE);

        restUseCaseMockMvc.perform(put("/api/use-cases")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUseCase)))
            .andExpect(status().isOk());

        // Validate the UseCase in the database
        List<UseCase> useCaseList = useCaseRepository.findAll();
        assertThat(useCaseList).hasSize(databaseSizeBeforeUpdate);
        UseCase testUseCase = useCaseList.get(useCaseList.size() - 1);
        assertThat(testUseCase.getUseCaseName()).isEqualTo(UPDATED_USE_CASE_NAME);
        assertThat(testUseCase.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testUseCase.getEndDate()).isEqualTo(UPDATED_END_DATE);
        assertThat(testUseCase.isActive()).isEqualTo(UPDATED_ACTIVE);
    }

    @Test
    @Transactional
    public void updateNonExistingUseCase() throws Exception {
        int databaseSizeBeforeUpdate = useCaseRepository.findAll().size();

        // Create the UseCase

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUseCaseMockMvc.perform(put("/api/use-cases")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(useCase)))
            .andExpect(status().isBadRequest());

        // Validate the UseCase in the database
        List<UseCase> useCaseList = useCaseRepository.findAll();
        assertThat(useCaseList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUseCase() throws Exception {
        // Initialize the database
        useCaseRepository.saveAndFlush(useCase);

        int databaseSizeBeforeDelete = useCaseRepository.findAll().size();

        // Delete the useCase
        restUseCaseMockMvc.perform(delete("/api/use-cases/{id}", useCase.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<UseCase> useCaseList = useCaseRepository.findAll();
        assertThat(useCaseList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UseCase.class);
        UseCase useCase1 = new UseCase();
        useCase1.setId(1L);
        UseCase useCase2 = new UseCase();
        useCase2.setId(useCase1.getId());
        assertThat(useCase1).isEqualTo(useCase2);
        useCase2.setId(2L);
        assertThat(useCase1).isNotEqualTo(useCase2);
        useCase1.setId(null);
        assertThat(useCase1).isNotEqualTo(useCase2);
    }
}
