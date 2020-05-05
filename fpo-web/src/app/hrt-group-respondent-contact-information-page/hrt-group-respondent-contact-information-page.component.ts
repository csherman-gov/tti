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

    pages: [
      {
        name: "Respondent Contact Information",
        elements: [
          {
            type: "html",
            name: "question5",
            html:
              "<h3>\nImportant information about Respondents:\n</h3>\n<ul>\n<li>\nThe Respondent is the person or organization you say discriminated against the group or class members. Usually, there is only one.</li>\n<li>\nUsually the Respondent is an organization such as: the employer, landlord, government body, service provider, business, or union. They are usually responsible for their employees’ actions. Make the organization Respondent #1</li>\n<li>\n individual can be a Respondent, but only name the person who you say discriminated against the group or class. For example, name the person who harassed group or class members. Do not name the person who only told the members about a policy you say is discriminatory</li>\n</ul>\n<p>\n<strong>Email:</strong> The Tribunal sends the complaint to the Respondent’s email address that you give us. Please give email contact information for an official in the organization that you think has authority to respond to the complaint. For example, someone in the human resources, or legal department.</p>\n\n",
          },
          {
            type: "paneldynamic",
            name: "Respondents Contact Information",
            templateElements: [
              {
                type: "text",
                name: "Name of the Respondent",
                isRequired: true,
              },
              {
                type: "text",
                name: "Relationship to group or class members",
                isRequired: true,
              },
              {
                type: "text",
                name: "Mailing address",
                isRequired: true,
              },
              {
                type: "text",
                name: "ADDRESS LINE 2:",
              },
              {
                type: "text",
                name: "City",
                isRequired: true,
              },
              {
                type: "dropdown",
                name: "PROVINCE",
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
                name: "POSTAL CODE",
                startWithNewLine: false,
                isRequired: true,
              },
              {
                type: "text",
                name: "Respondent Contact Phone number",
                width: "33%",
                title: "Phone number  ",
                isRequired: true,
              },
              {
                type: "text",
                name: "Respondent Contact Cell Phone number",
                width: "30%",
                startWithNewLine: false,
                title: "Cellphone number  ",
              },
              {
                type: "text",
                name: "Respondent Contact Fax",
                width: "33%",
                startWithNewLine: false,
                title: "Fax",
              },
              {
                type: "text",
                name: "Respondent Contact Email",
                width: "40%",
                title: "Email",
                isRequired: true,
              },
            ],
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
    // this.initSurvey();

    this.renderSurvey();
  }

  renderSurvey() {
    console.log("hi!1");
    // let surveyModel =
    this.survey = new Survey.Model(this.json);
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
