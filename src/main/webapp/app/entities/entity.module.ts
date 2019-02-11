import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'consent',
                loadChildren: './consent/consent.module#EmisAuthApp6ConsentModule'
            },
            {
                path: 'use-case',
                loadChildren: './use-case/use-case.module#EmisAuthApp6UseCaseModule'
            },
            {
                path: 'agreements',
                loadChildren: './agreements/agreements.module#EmisAuthApp6AgreementsModule'
            },
            {
                path: 'signed-up-users',
                loadChildren: './signed-up-users/signed-up-users.module#EmisAuthApp6SignedUpUsersModule'
            },
            {
                path: 'users-in-organisations',
                loadChildren: './users-in-organisations/users-in-organisations.module#EmisAuthApp6UsersInOrganisationsModule'
            },
            {
                path: 'organisation-groups',
                loadChildren: './organisation-groups/organisation-groups.module#EmisAuthApp6OrganisationGroupsModule'
            },
            {
                path: 'agreement-organisation',
                loadChildren: './agreement-organisation/agreement-organisation.module#EmisAuthApp6AgreementOrganisationModule'
            },
            {
                path: 'organisation-endpoint',
                loadChildren: './organisation-endpoint/organisation-endpoint.module#EmisAuthApp6OrganisationEndpointModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmisAuthApp6EntityModule {}
