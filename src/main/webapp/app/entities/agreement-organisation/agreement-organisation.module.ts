import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { EmisAuthApp6SharedModule } from 'app/shared';
import {
    AgreementOrganisationComponent,
    AgreementOrganisationDetailComponent,
    AgreementOrganisationUpdateComponent,
    AgreementOrganisationDeletePopupComponent,
    AgreementOrganisationDeleteDialogComponent,
    agreementOrganisationRoute,
    agreementOrganisationPopupRoute
} from './';

const ENTITY_STATES = [...agreementOrganisationRoute, ...agreementOrganisationPopupRoute];

@NgModule({
    imports: [EmisAuthApp6SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AgreementOrganisationComponent,
        AgreementOrganisationDetailComponent,
        AgreementOrganisationUpdateComponent,
        AgreementOrganisationDeleteDialogComponent,
        AgreementOrganisationDeletePopupComponent
    ],
    entryComponents: [
        AgreementOrganisationComponent,
        AgreementOrganisationUpdateComponent,
        AgreementOrganisationDeleteDialogComponent,
        AgreementOrganisationDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmisAuthApp6AgreementOrganisationModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
