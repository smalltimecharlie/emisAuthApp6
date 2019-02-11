import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { EmisAuthApp6SharedModule } from 'app/shared';
import {
    OrganisationGroupsComponent,
    OrganisationGroupsDetailComponent,
    OrganisationGroupsUpdateComponent,
    OrganisationGroupsDeletePopupComponent,
    OrganisationGroupsDeleteDialogComponent,
    organisationGroupsRoute,
    organisationGroupsPopupRoute
} from './';

const ENTITY_STATES = [...organisationGroupsRoute, ...organisationGroupsPopupRoute];

@NgModule({
    imports: [EmisAuthApp6SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        OrganisationGroupsComponent,
        OrganisationGroupsDetailComponent,
        OrganisationGroupsUpdateComponent,
        OrganisationGroupsDeleteDialogComponent,
        OrganisationGroupsDeletePopupComponent
    ],
    entryComponents: [
        OrganisationGroupsComponent,
        OrganisationGroupsUpdateComponent,
        OrganisationGroupsDeleteDialogComponent,
        OrganisationGroupsDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmisAuthApp6OrganisationGroupsModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
