import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { EmisAuthApp6SharedModule } from 'app/shared';
import {
    UsersInOrganisationsComponent,
    UsersInOrganisationsDetailComponent,
    UsersInOrganisationsUpdateComponent,
    UsersInOrganisationsDeletePopupComponent,
    UsersInOrganisationsDeleteDialogComponent,
    usersInOrganisationsRoute,
    usersInOrganisationsPopupRoute
} from './';

const ENTITY_STATES = [...usersInOrganisationsRoute, ...usersInOrganisationsPopupRoute];

@NgModule({
    imports: [EmisAuthApp6SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        UsersInOrganisationsComponent,
        UsersInOrganisationsDetailComponent,
        UsersInOrganisationsUpdateComponent,
        UsersInOrganisationsDeleteDialogComponent,
        UsersInOrganisationsDeletePopupComponent
    ],
    entryComponents: [
        UsersInOrganisationsComponent,
        UsersInOrganisationsUpdateComponent,
        UsersInOrganisationsDeleteDialogComponent,
        UsersInOrganisationsDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmisAuthApp6UsersInOrganisationsModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
