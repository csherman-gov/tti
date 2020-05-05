import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
  HttpClientModule,
  HttpClientXsrfModule,
  HTTP_INTERCEPTORS
} from "@angular/common/http";
import { HttpCsrfInterceptor } from "./csrf-interceptor.provider";
import { MatomoModule } from "@ambroise-rabier/ngx-matomo";

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { SearchBoxDirective } from "./search-box/search-box.directive";
import { GeneralDataService } from "app/general-data.service";
import { AdminModule } from "app/admin/admin.module";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { GlossaryService } from "./glossary/glossary.service";
import { GlossaryEditorComponent } from "./glossary/editor.component";
import { InsertComponent } from "./insert/insert.component";
import { InsertService } from "./insert/insert.service";
import {MissionService} from '../../src/app/mission.service'
import { StaticComponent } from "./static/static.component";
import { HomeComponent } from "./home/home.component";
import { TermsContentComponent } from "./home/terms-content.component";
import { TermsViewComponent } from "./home/terms.component";
import { UserStatusComponent } from "./home/status.component";
import { UserStatusResolver } from "./home/status-resolver.service";

import { SurveyComponent } from "./survey/survey.component";
import { SurveyPrimaryComponent } from "./survey/primary.component";
import { SurveyEditorComponent } from "./survey/editor.component";
import { SurveySidebarComponent } from "./survey/sidebar.component";
import { ResultComponent } from "./result/result.component";

import { HrtHomePageComponent } from './hrt-home-page/hrt-home-page.component';
import { HrtProgressPageComponent } from './hrt-progress-page/hrt-progress-page.component';
import { HrtComplainantPageComponent } from './hrt-complainant-page/hrt-complainant-page.component';
import { HrtRepresentativePageComponent } from './hrt-representative-page/hrt-representative-page.component';
import { HrtRespondentsPageComponent } from './hrt-respondents-page/hrt-respondents-page.component';
import { HrtLateComplaintsPageComponent } from './hrt-late-complaints-page/hrt-late-complaints-page.component';
import { HrtOtherRelatedProceedingsPageComponent } from './hrt-other-related-proceedings-page/hrt-other-related-proceedings-page.component';
import { HrtRemediesPageComponent } from './hrt-remedies-page/hrt-remedies-page.component';
import { HrtSettlementMeetingPageComponent } from './hrt-settlement-meeting-page/hrt-settlement-meeting-page.component';
import { HrtReviewPageComponent } from './hrt-review-page/hrt-review-page.component';
import { HrtThankYouPageComponent } from './hrt-thank-you-page/hrt-thank-you-page.component';
import { HrtAreaAndGroundsOfDiscriminationComponent } from './hrt-area-and-grounds-of-discrimination/hrt-area-and-grounds-of-discrimination.component';
import { HrtDetailsOfTheDiscriminationPageComponent } from './hrt-details-of-the-discrimination-page/hrt-details-of-the-discrimination-page.component';
import { HrtComplaintFileInTimePageComponent } from './hrt-complaint-file-in-time-page/hrt-complaint-file-in-time-page.component';
import { HrtOtherProceedingsPageComponent } from './hrt-other-proceedings-page/hrt-other-proceedings-page.component';
import { HrtMediationPageComponent } from './hrt-mediation-page/hrt-mediation-page.component';
import { HrtStatisticalInformationPageComponent } from './hrt-statistical-information-page/hrt-statistical-information-page.component';
import { HrtGroupHomePageComponent } from './hrt-group-home-page/hrt-group-home-page.component';
import { HrtGroupProgressPageComponent } from './hrt-group-progress-page/hrt-group-progress-page.component';
import { HrtGroupRepresentativeComponent } from './hrt-group-representative/hrt-group-representative.component';
import { HrtGroupRepSutabilityPageComponent } from './hrt-group-rep-sutability-page/hrt-group-rep-sutability-page.component';
import { HrtGroupComplaintSutabilityPageComponent } from './hrt-group-complaint-sutability-page/hrt-group-complaint-sutability-page.component';
import { HrtGroupRespondentContactInformationPageComponent } from './hrt-group-respondent-contact-information-page/hrt-group-respondent-contact-information-page.component';
import { HrtGroupAreaAndDiscriminationPageComponent } from './hrt-group-area-and-discrimination-page/hrt-group-area-and-discrimination-page.component';
import { HrtGroupDetailsOfDiscriminationPageComponent } from './hrt-group-details-of-discrimination-page/hrt-group-details-of-discrimination-page.component';
import { HrtGroupTimeLimitPageComponent } from './hrt-group-time-limit-page/hrt-group-time-limit-page.component';
import { HrtGroupOtherProceedingsPageComponent } from './hrt-group-other-proceedings-page/hrt-group-other-proceedings-page.component';
import { HrtGroupRemediesPageComponent } from './hrt-group-remedies-page/hrt-group-remedies-page.component';
import { HrtGroupMediationPageComponent } from './hrt-group-mediation-page/hrt-group-mediation-page.component';
import { HrtGroupStatisticalInformationPageComponent } from './hrt-group-statistical-information-page/hrt-group-statistical-information-page.component';
import { HrtGroupReviewPageComponent } from './hrt-group-review-page/hrt-group-review-page.component';
import { HrtGroupThankYouPageComponent } from './hrt-group-thank-you-page/hrt-group-thank-you-page.component';
import { HrtRetaliationHomePageComponent } from './hrt-retaliation-home-page/hrt-retaliation-home-page.component';
import { HrtRetaliationProgressPageComponent } from './hrt-retaliation-progress-page/hrt-retaliation-progress-page.component';
import { HrtRetaliationPartyInfoPageComponent } from './hrt-retaliation-party-info-page/hrt-retaliation-party-info-page.component';
import { HrtRetaliationRoleInComplaintPageComponent } from './hrt-retaliation-role-in-complaint-page/hrt-retaliation-role-in-complaint-page.component';
import { HrtRetaliationDetailsOfTheRetaliationPageComponent } from './hrt-retaliation-details-of-the-retaliation-page/hrt-retaliation-details-of-the-retaliation-page.component';
import { HrtRetaliationFileInTimePageComponent } from './hrt-retaliation-file-in-time-page/hrt-retaliation-file-in-time-page.component';
import { HrtRetaliationOtherProceedingsPageComponent } from './hrt-retaliation-other-proceedings-page/hrt-retaliation-other-proceedings-page.component';
import { HrtRetaliationRemediesPageComponent } from './hrt-retaliation-remedies-page/hrt-retaliation-remedies-page.component';
import { HrtRetaliationMediationPageComponent } from './hrt-retaliation-mediation-page/hrt-retaliation-mediation-page.component';
import { HrtRetaliationStatisticalInformationPageComponent } from './hrt-retaliation-statistical-information-page/hrt-retaliation-statistical-information-page.component';
import { HrtRetaliationThankYouPageComponent } from './hrt-retaliation-thank-you-page/hrt-retaliation-thank-you-page.component';
import { HrtRetaliationReviewPageComponent } from './hrt-retaliation-review-page/hrt-retaliation-review-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchBoxDirective,
    HomeComponent,
    ResultComponent,
    BreadcrumbComponent,
    GlossaryEditorComponent,
    InsertComponent,
    SurveyComponent,
    SurveyPrimaryComponent,
    SurveyEditorComponent,
    SurveySidebarComponent,
    StaticComponent,
    TermsContentComponent,
    TermsViewComponent,
    UserStatusComponent,
    HrtHomePageComponent,
    HrtProgressPageComponent,
    HrtComplainantPageComponent,
    HrtRepresentativePageComponent,
    HrtRespondentsPageComponent,
    HrtLateComplaintsPageComponent,
    HrtOtherRelatedProceedingsPageComponent,
    HrtRemediesPageComponent,
    HrtSettlementMeetingPageComponent,
    HrtReviewPageComponent,
    HrtThankYouPageComponent,
    HrtAreaAndGroundsOfDiscriminationComponent,
    HrtDetailsOfTheDiscriminationPageComponent,
    HrtComplaintFileInTimePageComponent,
    HrtOtherProceedingsPageComponent,
    HrtMediationPageComponent,
    HrtStatisticalInformationPageComponent,
    HrtGroupHomePageComponent,
    HrtGroupProgressPageComponent,
    HrtGroupRepresentativeComponent,
    HrtGroupRepSutabilityPageComponent,
    HrtGroupComplaintSutabilityPageComponent,
    HrtGroupRespondentContactInformationPageComponent,
    HrtGroupAreaAndDiscriminationPageComponent,
    HrtGroupDetailsOfDiscriminationPageComponent,
    HrtGroupTimeLimitPageComponent,
    HrtGroupOtherProceedingsPageComponent,
    HrtGroupRemediesPageComponent,
    HrtGroupMediationPageComponent,
    HrtGroupStatisticalInformationPageComponent,
    HrtGroupReviewPageComponent,
    HrtGroupThankYouPageComponent,
    HrtRetaliationHomePageComponent,
    HrtRetaliationProgressPageComponent,
    HrtRetaliationPartyInfoPageComponent,
    HrtRetaliationRoleInComplaintPageComponent,
    HrtRetaliationDetailsOfTheRetaliationPageComponent,
    HrtRetaliationFileInTimePageComponent,
    HrtRetaliationOtherProceedingsPageComponent,
    HrtRetaliationRemediesPageComponent,
    HrtRetaliationMediationPageComponent,
    HrtRetaliationStatisticalInformationPageComponent,
    HrtRetaliationThankYouPageComponent,
    HrtRetaliationReviewPageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: "csrftoken",
      headerName: "X-CSRFToken"
    }),
    AppRoutingModule,
    AdminModule,
    MatomoModule
  ],
  providers: [
    GeneralDataService,
    GlossaryService,
    InsertService,
    MissionService,
    UserStatusResolver,
    { provide: HTTP_INTERCEPTORS, useClass: HttpCsrfInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
