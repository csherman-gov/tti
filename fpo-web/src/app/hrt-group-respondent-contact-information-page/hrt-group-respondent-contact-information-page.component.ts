import { Component, OnInit, OnDestroy } from "@angular/core";

import { MissionService } from "../mission.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

// import Inputmask from "inputmask";
// import * as widgets from 'surveyjs-widgets';
// Import Survey.js
import * as Survey from "survey-angular";
// import { addQuestionTypes } from '../survey/question-types';
// widgets.inputmask(Survey);
@Component({
  selector: "app-hrt-group-respondent-contact-information-page",
  templateUrl: "./hrt-group-respondent-contact-information-page.component.html",
  styleUrls: ["./hrt-group-respondent-contact-information-page.component.scss"],
})
export class HrtGroupRespondentContactInformationPageComponent
  implements OnInit, OnDestroy {
  subscription: Subscription;

  private json = {
    showNavigationButtons: false,
    completeText: "",
    showQuestionNumbers: "off",

    pages: [
      {
        name: "Respondent Contact Information",
        elements: [
          {
            type: "html",
            name: "question5",
            html:
              "<h4>\nImportant information about Respondents:\n</h4>\n<ol>\n<li>\nThe Respondent is the person or organization you say discriminated. Usually, there is only one.\n</li>\n<li>Usually the Respondent is an organization such as: corporate employer, landlord, government body, service provider, business or union. Organizations are usually responsible for their employees’ actions. Make the organization Respondent #1.</li>\n<li>An individual can be a Respondent. Only name the person who you say discriminated against you. For example, name the person who harassed you. Do not name the person who only handed you a letter firing you.</li>\n</ol>\n<p>\n<strong>Email:</strong> Email is fastest. If possible, give an email address where we can send your complaint. Choose someone that you think has authority to respond to your complaint. For example, someone in the human resources, or legal department. </p>",
          },
          {
            type: "paneldynamic",
            name: "Respondents Contact Information",
            templateElements: [
              {
                type: "text",
                name: "Name of the Respondent",
		            maxLength: 80,
                isRequired: true,
              },
              {
                type: "text",
                name: "Relationship to group or class members",
                title:
                  "Relationship to group or class members (For example, employer)",
                isRequired: true,
		            maxLength: 255,
              },
              {
                type: "text",
                name: "Respondent Contact Email",
                width: "40%",
                title: "Email",
		            maxLength: 255,
                validators: [ { type: "email" } ],
                // isRequired: true,
              },
              {
                type: "text",
                name: "Mailing address",
		            maxLength: 255,
                isRequired: true,
              },
              {
                type: "text",
                name: "Address line 2",
		            maxLength: 255,
              },
              {
                type: "text",
                name: "City",
		            maxLength: 255,
                isRequired: true,
              },
              {
                type: "dropdown",
                name: "Province",
                startWithNewLine: false,
                isRequired: true,
                choices: [
                  "Alberta",
                  "British Columbia",
                  "Manitoba",
                  "New Brunswick",
                  "Newfoundland and Labrador",
                  "Nova Scotia",
                  "Northwest Territories",
                  "Nunavut",
                  "Ontario",
                  "Prince Edward Island",
                  "Québec",
                  "Saskatchewan",
                  "Yukon",
                ],
              },
              {
                type: "text",
                name: "Postal Code",
		            maxLength: 10,
                startWithNewLine: false,
                // isRequired: true,
              },
              {
                type: "text",
                name: "Respondent Contact Phone number",
                width: "33%",
                title: "Phone number  ",
		            maxLength: 255,
                // isRequired: true,
              },
              {
                type: "text",
                name: "Respondent Contact Cell Phone number",
                width: "30%",
		            maxLength: 255,
                startWithNewLine: false,
                title: "Cell phone number",
              },
              {
                type: "text",
                name: "Respondent Contact Fax",
                width: "33%",
		            maxLength: 255,
                startWithNewLine: false,
                title: "Fax",
              },
            ],
            panelAddText: "ADD Another Respondent",
            panelRemoveText: "REMOVE Above Respondent",
            panelCount: 1,
            minPanelCount: 1,
          },
        ],
      },
    ],
  };

  survey: any;
  formData: object;
  constructor(private missionService: MissionService, private router: Router) {
    this.subscription = missionService.missionAnnounced$.subscribe(
      (allFormData) => {
        console.log("allFormData", allFormData);

        if (allFormData.respondentContact) {
          this.formData = allFormData.respondentContact;
          console.log("hi!");
        }
        this.subscription.unsubscribe();
      }
    );
  }
  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
  ngOnInit() {
    // console.log("Survey.Survey.cssType", Survey.Survey.cssType);
    //  this.initSurvey();

    this.renderSurvey();
  }
  initSurvey() {
    // addQuestionTypes(Survey);
    // console.log("Survey.Survey.cssType", Survey.Survey.cssType);
    // Survey.Survey.cssType = "bootstrap";
    Survey.defaultBootstrapCss.page.root = "sv_page";
    Survey.defaultBootstrapCss.pageDescription = "sv_page_description";
    Survey.defaultBootstrapCss.pageTitle = "sv_page_title";
    Survey.defaultBootstrapCss.navigationButton = "btn btn-primary";
    Survey.defaultBootstrapCss.question.title = "sv_q_title";
    Survey.defaultBootstrapCss.question.description = "sv_q_description small";
    Survey.defaultBootstrapCss.panel.title = "sv_p_title";
    Survey.defaultBootstrapCss.panel.container = "sv_p_container";
    Survey.defaultBootstrapCss.panel.description = "sv_p_description";
    Survey.defaultBootstrapCss.row = "sv_row";
    Survey.defaultBootstrapCss.matrixdynamic.button = "btn btn-default";
    Survey.defaultBootstrapCss.paneldynamic.button = "btn btn-default";
    Survey.defaultBootstrapCss.paneldynamic.root = "sv_p_dynamic"; // not used?
    Survey.defaultBootstrapCss.checkbox.item = "sv-checkbox";
    Survey.defaultBootstrapCss.checkbox.controlLabel = "sv-checkbox-label";
    Survey.defaultBootstrapCss.checkbox.materialDecorator = "";
    Survey.defaultBootstrapCss.radiogroup.item = "sv-radio";
    Survey.defaultBootstrapCss.radiogroup.controlLabel = "sv-checkbox-label";
    Survey.defaultBootstrapCss.radiogroup.materialDecorator = "";
    //Add a property a text property into all questions types and into page
    // Survey.JsonObject.metaData.addProperty("question", "popupdescription:text");
    // Survey.JsonObject.metaData.addProperty("page", "popupdescription:text");
    // console.log(Survey.JsonObject.metaData.addProperty)
    Survey.StylesManager.applyTheme("bootstrap");
  }
  renderSurvey() {
    console.log("hi!1");
    // let surveyModel =
    this.survey = new Survey.Model(this.json);
    this.survey.maxOthersLength = 255;
    if (this.formData) {
      console.log("hi122!");
      this.survey.data = this.formData;
    }
    console.log("hi!2");
    Survey.SurveyNG.render("surveyElementHRT", { model: this.survey });
    console.log("hi!3");
  }
  handleNextStep() {
    if (this.survey.isLastPage) {
      const validated = this.survey.completeLastPage();
      if (validated) {
        this.missionService.confirmMission({
          name: "respondentContact",
          data: this.survey.data,
          complete: true,
        });
        this.router.navigateByUrl("hrt-group/progress");
      }
    } else {
      this.survey.nextPage();
    }
  }
}
