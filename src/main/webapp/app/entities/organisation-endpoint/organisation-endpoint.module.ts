import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { EmisAuthApp6SharedModule } from 'app/shared';
import {
    OrganisationEndpointComponent,
    OrganisationEndpointDetailComponent,
    OrganisationEndpointUpdateComponent,
    OrganisationEndpointDeletePopupComponent,
    OrganisationEndpointDeleteDialogComponent,
    organisationEndpointRoute,
    organisationEndpointPopupRoute
} from './';

const ENTITY_STATES = [...organisationEndpointRoute, ...organisationEndpointPopupRoute];

@NgModule({
    imports: [EmisAuthApp6SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        OrganisationEndpointComponent,
        OrganisationEndpointDetailComponent,
        OrganisationEndpointUpdateComponent,
        OrganisationEndpointDeleteDialogComponent,
        OrganisationEndpointDeletePopupComponent
    ],
    entryComponents: [
        OrganisationEndpointComponent,
        OrganisationEndpointUpdateComponent,
        OrganisationEndpointDeleteDialogComponent,
        OrganisationEndpointDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmisAuthApp6OrganisationEndpointModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
