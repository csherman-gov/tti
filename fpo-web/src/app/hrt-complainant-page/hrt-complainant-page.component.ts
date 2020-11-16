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
  selector: "app-hrt-complainant-page",
  templateUrl: "./hrt-complainant-page.component.html",
  styleUrls: ["./hrt-complainant-page.component.scss"],
})
export class HrtComplainantPageComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  private json = {
    showNavigationButtons: false,
    completeText: "",
    pages: [
      {
        name: "Who experienced discrimination (Complainant)?",
        elements: [
          {
            type: "text",
            name: "Legal Name - First Name",
            isRequired: true,
            maxLength: 40,
          },
          {
            type: "text",
            name: "Legal Name - Last Name",
            isRequired: true,
            maxLength: 40,
          },
          {
            type: "text",
            name: "Preferred name - e.g. traditional name, nickname, alias",
            maxLength: 255,
          },
          {
            type: "checkbox",
            name: "Use my preferred name",
            choices: [
              {
                value: "When talking to me",
                text: "When talking to me",
              },
              {
                value: "When writing to me",
                text: "When writing to me",
              },
              {
                value: "In decision in addition to my legal name",
                text: "In decision in addition to my legal name",
              },
            ],
          },
          {
            type: "radiogroup",
            name: "Title",
            title: "Title",
            hasOther: true,
            choices: ["Mr.", "Ms.", "Mx."],
            otherText: "Other",
          },
          {
            type: "radiogroup",
            name: "Pronoun",
            hasOther: true,
            choices: ["She", "He", "They"],
            otherText: "Other",
          },
        ],
        title: "Who experienced discrimination (Complainant)?",
      },
      {
        name: "Who will communicate with the Tribunal about this Complaint?",
        elements: [
          {
            isRequired: true,
            type: "radiogroup",
            name: "Select only one option",
            choices: [
              {
                value: "The complainant",
                text: "The complainant",
              },
              "A lawyer for the complainant",
              "A legal advocate (Example: a person who works for a law clinic)",
              "Another person – You must file a Form 1.2 with this complaint.",
            ],
          },
        ],
        title: "Who will communicate with the Tribunal about this Complaint?",
      },
      {
        name:
          "Name of the person who will communicate with the Tribunal, if different from the Complainant",
        title:
          "Name of the person who will communicate with the Tribunal",
        elements: [
          {
            type: "text",
            name: "First name",
            maxLength: 255,
            isRequired: true,
          },
          {
            type: "text",
            name: "Last name",
            maxLength: 255,
            isRequired: true,
          },
          {
            type: "text",
            name: "Organization name",
            maxLength: 255,
            title: "Organization name (e.g. law firm, if applicable)",
            // isRequired: true,
          },
          {
            type: "text",
            title: "Preferred name - e.g. traditional name, nickname, alias",
            maxLength: 255,
            name:
              "Contact Preferred name - e.g. traditional name, nickname, alias",
          },
          {
            type: "radiogroup",
            name: "Contact Title",
            title: "Title",
            hasOther: true,
            choices: ["Mr.", "Ms.", "Mx."],
            otherText: "Other",
          },
          {
            type: "radiogroup",
            name: "Contact Pronoun",
            title: "Pronoun",
            hasOther: true,
            choices: ["She", "He", "They"],
            otherText: "Other",
          },
        ],
        visibleIf:
          "{Select only one option} = 'A lawyer for the complainant' or {Select only one option} = 'A legal advocate (Example: a person who works for a law clinic)' or {Select only one option} = 'Another person – You must file a Form 1.2 with this complaint.'",
      },
      {
        name: "Complainant’s address for Delivery",
        elements: [
          {
            type: "html",
            name: "question1",
            html:
              "<p><strong>Purpose of collecting contact information:</strong> The Tribunal and Respondents use your contact information to communicate with you about the complaint. See <a href='http://www.bchrt.bc.ca/law-library/policies/privacy.htm' target='_blank'>Complaint Process Privacy Policy</a>.</p><p>You must give an address where all parties can send you documents. Give the address of the person who will communicate with the Tribunal.</p><p>The Tribunal usually communicates by email. If possible, give an email address where all parties can reach you. If you have confidential contact information, do not put it on this form. Provide it separately by email, mail, fax, or in person.</p><p><strong>Important information: </strong>A document sent to an address below is considered to be received by the complainant. You must notify the Tribunal of any change to the address for delivery.</p>",
          },
          {
            type: "text",
            name: "Complainant Contact Mailing address",
            title: "Mailing address",
            maxLength: 240,
            // isRequired: true,
          },
          {
            type: "text",
            name: "Complainant Contact City",
            width: "30%",
            title: "City ",
            maxLength: 240,
            // isRequired: true,
          },
          {
            type: "dropdown",
            name: "Complainant Contact Province",
            startWithNewLine: false,
            title: "Province",
            // isRequired: true,
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
            name: "Complainant Contact Postal Code",
            width: "30%",
            startWithNewLine: false,
            maxLength: 10,
            title: "Postal Code",
            // isRequired: true,
          },
          {
            type: "text",
            name: "Complainant Contact Phone number",
            width: "30%",
            maxLength: 255,
            title: "Phone number  ",
            // isRequired: true,
          },
          {
            type: "text",
            name: "Complainant Contact Cell Phone number",
            width: "30%",
            maxLength: 255,
            startWithNewLine: false,
            title: "Cell phone number",
          },
          {
            type: "text",
            name: "Complainant Contact Fax",
            width: "30%",
            maxLength: 255,
            startWithNewLine: false,
            title: "Fax",
          },
          {
            type: "text",
            name: "Complainant Contact Email",
            width: "40%",
            maxLength: 255,
            title: "Email",
            validators: [ { type: "email" } ],
            // isRequired: true,
          },
        ],
        // visibleIf: "{Select only one option} <> 'The complainant'",
        title: "Complainant’s address for delivery",
      },
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
                name: "Relationship to you",
                title:
                  "Relationship to you (For example: your employer, landlord, government body)",
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
                isRequired: true,
                maxLength: 240,
              },
              {
                type: "text",
                name: "Address line 2",
                maxLength: 240,
              },
              {
                type: "text",
                name: "City",
                isRequired: true,
                maxLength: 40,
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
                startWithNewLine: false,
                maxLength: 10,
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
                startWithNewLine: false,
                title: "Cell phone number",
                maxLength: 255,
              },
              {
                type: "text",
                name: "Respondent Contact Fax",
                width: "33%",
                startWithNewLine: false,
                title: "Fax",
                maxLength: 255,
              },
            ],
            panelCount: 1,
            minPanelCount: 1,
            panelAddText: "ADD Another Respondent",
            panelRemoveText: "REMOVE Above Respondent",
          },
        ],
        title: "Respondent Contact Information",
      },
    ],
    showQuestionNumbers: "off",
  };

  survey: any;
  formData: object;
  constructor(private missionService: MissionService, private router: Router) {
    this.subscription = missionService.missionAnnounced$.subscribe(
      (allFormData) => {
        console.log("allFormData", allFormData);

        if (allFormData.complainant) {
          this.formData = allFormData.complainant;
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
    this.survey.maxOthersLength = 255;
    if (this.formData) {
      console.log("hi122!");
      this.survey.data = this.formData;
    }
    console.log("hi!2");
    Survey.SurveyNG.render("surveyElementHRT", { model: this.survey });
    console.log("hi!3");
  }
  handlePreviousStep() {
    if (this.survey.isFirstPage) {
      return;
    }
    this.survey.prevPage();
    // this.currentPageTitle = this.survey.currentPage.title;
  }
  handleNextStep() {
    if (this.survey.isLastPage) {
      const validated = this.survey.completeLastPage();
      if (validated) {
        this.missionService.confirmMission({
          name: "complainant",
          data: this.survey.data,
          complete: true,
        });
        this.router.navigateByUrl("hrt/progress");
      }
    } else {
      this.survey.nextPage();
    }
  }
}
