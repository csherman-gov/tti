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
  selector: "app-hrt-retaliation-party-info-page",
  templateUrl: "./hrt-retaliation-party-info-page.component.html",
  styleUrls: ["./hrt-retaliation-party-info-page.component.scss"],
})
export class HrtRetaliationPartyInfoPageComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  // private json = {
  //   "showNavigationButtons": false,
  //   "completeText": "",
  //   "pages": [
  //     {
  //       "name": "Complainant Type",
  //       "elements": [
  //         {
  //           type: "radiogroup",
  //           name: "Complainant type",
  //           title: "Which of the following are you?",
  //           isRequired: true,
  //           colCount: 1,
  //           choices: [
  //             {
  //               text: "Individual",
  //               value: "Individual"
  //             },
  //             {
  //               text: "Organization",
  //               value: "Organization"
  //             }
  //           ]
  //         },
  //         {
  //           visibleIf: "{Complainant type} == 'Individual'",
  //           name: "Legal first name",
  //           type: "text",
  //           title: "Legal first name",
  //           placeHolder: "Please enter your legal first name:",
  //           isRequired: true,
  //           width: "30%",
  //         },
  //         {
  //           visibleIf: "{Complainant type} == 'Individual'",
  //           name: "Legal last name",
  //           type: "text",
  //           title: "Legal last name",
  //           placeHolder: "Please enter your legal last name",
  //           isRequired: true,
  //           width: "30%",
  //         },
  //         {
  //           visibleIf: "{Complainant type} == 'Organization'",
  //           name: "Legal organization name",
  //           type: "text",
  //           title: "Legal organization name",
  //           placeHolder: "Please enter the legal organization name",
  //           isRequired: true,
  //           width: "30%",
  //         },
  //         {
  //           visibleIf: "{Complainant type} == 'Individual'",
  //           "type": "dropdown",
  //           "name": "How do you want to be addressed?",
  //           "choices": [
  //            "She/Her/Hers",
  //            "He/Him/His",
  //            "They/Them"
  //           ]
  //          },
  //          {
  //           "type": "text",
  //           "visibleIf": "{Complainant type} notempty",
  //           "name": "List other names you use or are known by"
  //          },
  //         // {
  //         //   type: "text",
  //         //   name: "mailing_address",
  //         //   title: "Mailing address",
  //         //   isRequired: true,
  //         // },
  //         {
  //           "type": "text",
  //           "name": "Address line 1",
  //           "title": "Address line 1:",
  //           "isRequired": true,
  //           "titleLocation": "top",
  //           "visibleIf": "{Complainant type} notempty",
  //         },
  //         {
  //           "type": "text",
  //           "name": "Address line 2",
  //           // "visible": false,
  //           "title": "Address line 2",
  //           "titleLocation": "top",
  //           "visibleIf": "{Complainant type} notempty",
  //         },
  //         {
  //           type: "text",
  //           name: "City",
  //           title: "City",
  //           isRequired: true,
  //           width: "30%",
  //           "visibleIf": "{Complainant type} notempty",
  //         },
  //         {
  //           "type": "dropdown",
  //           "name": "Province",
  //           "title": "Province: ",
  //           "startWithNewLine": false,
  //           "isRequired": true,
  //           "width": "30%",
  //           "visibleIf": "{Complainant type} notempty",
  //           "choices": [
  //             "Alberta",
  //             "British Columbia",
  //             "Manitoba",
  //             "New Brunswick",
  //             "Newfoundland",
  //             "Nova Scotia",
  //             "Ontario",
  //             "Prince Edward Island",
  //             "Quebec",
  //             "Saskatchewan",
  //             "Northwest Territories",
  //             "Nunavut",
  //             "Yukon"
  //           ]
  //         },
  //         {
  //           type: "text",
  //           name: "Postal code",
  //           title: "Postal code",
  //           isRequired: true,
  //           startWithNewLine: false,
  //           width: "30%",
  //           "visibleIf": "{Complainant type} notempty",
  //         },
  //         {
  //           type: "text",
  //           name: "Phone number",
  //           "inputMask": "phoneNA",
  //           title: "Phone number",
  //           isRequired: true,
  //           width: "30%",
  //           "visibleIf": "{Complainant type} notempty",
  //         },
  //         {
  //           type: "text",
  //           name: "Other phone number",
  //           title: "Other phone number",
  //           // isRequired: true,
  //           startWithNewLine: false,
  //           "visibleIf": "{Complainant type} notempty",
  //           width: "30%",
  //         },
  //         {
  //           type: "text",
  //           name: "Fax",
  //           title: "Fax",
  //           "visibleIf": "{Complainant type} notempty",
  //           // isRequired: true,
  //           width: "30%",
  //         },
  //         {
  //           type: "text",
  //           name: "Email",
  //           "visibleIf": "{Complainant type} notempty",
  //           title: "Email",
  //           isRequired: true,
  //           startWithNewLine: false,
  //           width: "30%",
  //         },
  //         {
  //           type: "checkbox",
  //           name: "Consent",
  //           "visibleIf": "{Complainant type} notempty",
  //           title: "The Tribunal uses your contact information to process the complaint and conduct surveys to evaluate and improve its services. The Tribunal will give your mailing address to the other parties for the exchange of information and other documents. Your additional contact information will only be given to the other parties if you agree.",
  //           description: "",
  //           "choices": [
  //             {
  //               "value": "confirmed",
  //               "text": " I do not want the Tribunal to disclose my phone numbers, fax and email to the respondent"
  //             }
  //           ]
  //         },
  //         {
  //           "type": "radiogroup",
  //           "name": "Add another complainant?",
  //           "isRequired": true,
  //           "visibleIf": "{Complainant type} == 'Individual'",
  //           "choices": [
  //             "Yes",
  //             "No"
  //           ]
  //         },
  //         {
  //           type: "radiogroup",
  //           name: "Complainant type 2",
  //           title: "Which of the following are you?",
  //           "visibleIf": "{Add another complainant?} = \"Yes\"",
  //           isRequired: true,
  //           colCount: 1,
  //           choices: [
  //             {
  //               text: "Individual",
  //               value: "Individual"
  //             },
  //             {
  //               text: "Organization",
  //               value: "Organization"
  //             }
  //           ]
  //         },
  //         {
  //           "type": "text",
  //           "name": "Legal first name 2nd",
  //           "visibleIf": "{Complainant type 2} = \"Individual\"",
  //           "width": "30%",
  //           "title": "Legal first name",
  //           "isRequired": true,
  //           "placeHolder": "Please enter your legal first name:"
  //         },
  //         {
  //           "type": "text",
  //           "name": "Legal last name 2nd",
  //           "visibleIf": "{Complainant type 2} = \"Individual\"",
  //           "width": "30%",
  //           "title": "Legal last name",
  //           "isRequired": true,
  //           "placeHolder": "Please enter your legal last name"
  //         },
  //         {
  //           "type": "text",
  //           "name": "Legal organization name 2nd",
  //           "visibleIf": "{Complainant type 2} = \"Organization\"",
  //           "width": "30%",
  //           "title": "Legal orgnization name",
  //           "isRequired": true,
  //           "placeHolder": "Please enter your legal orgnazation name"
  //         },
  //         {
  //           "type": "dropdown",
  //           "name": "How do you want to be addressed? 2nd",
  //           "title": "How do you want to be addressed?",
  //           "visibleIf": "{Complainant type 2} = \"Individual\"",
  //           "choices": [
  //            "She/Her/Hers",
  //            "He/Him/His",
  //            "They/Them"
  //           ]
  //          },
  //          {
  //           "type": "text",
  //           "visibleIf": "{Add another complainant?} = \"Yes\"",
  //           "name": "List other names you use or are known by 2nd",
  //           "title": "List other names you use or are known by:"
  //          },
  //         {
  //           "type": "text",
  //           "name": "Address line 1 2nd",
  //           "visibleIf": "{Add another complainant?} = \"Yes\"",
  //           "title": "Address line 1:",
  //           "isRequired": true,
  //           "titleLocation": "top"
  //         },
  //         {
  //           "type": "text",
  //           "name": "Address line 2 2nd",
  //           "visibleIf": "{Add another complainant?} = \"Yes\"",
  //           "title": "Address line 2",
  //           "titleLocation": "top"
  //         },
  //         {
  //           "type": "text",
  //           "name": "City 2nd",
  //           "visibleIf": "{Add another complainant?} = \"Yes\"",
  //           "width": "30%",
  //           "title": "City",
  //           "isRequired": true
  //         },
  //         {
  //           "type": "dropdown",
  //           "name": "Province 2nd",
  //           "visibleIf": "{Add another complainant?} = \"Yes\"",
  //           "width": "30%",
  //           "startWithNewLine": false,
  //           "title": "Province: ",
  //           "isRequired": true,
  //           "choices": [
  //             "Alberta",
  //             "British Columbia",
  //             "Manitoba",
  //             "New Brunswick",
  //             "Newfoundland",
  //             "Nova Scotia",
  //             "Ontario",
  //             "Prince Edward Island",
  //             "Quebec",
  //             "Saskatchewan",
  //             "Northwest Territories",
  //             "Nunavut",
  //             "Yukon"
  //           ]
  //         },
  //         {
  //           "type": "text",
  //           "name": "Postal code 2nd",
  //           "visibleIf": "{Add another complainant?} = \"Yes\"",
  //           "width": "30%",
  //           "startWithNewLine": false,
  //           "title": "Postal code",
  //           "isRequired": true
  //         },
  //         {
  //           "type": "text",
  //           "name": "Phone number 2nd",
  //           "visibleIf": "{Add another complainant?} = \"Yes\"",
  //           "width": "30%",
  //           "title": "Phone number",
  //           "isRequired": true
  //         },
  //         {
  //           "type": "text",
  //           "name": "Other phone number 2nd",
  //           "visibleIf": "{Add another complainant?} = \"Yes\"",
  //           "width": "30%",
  //           "startWithNewLine": false,
  //           "title": "Other phone number"
  //         },
  //         {
  //           "type": "text",
  //           "name": "Fax 2nd",
  //           "visibleIf": "{Add another complainant?} = \"Yes\"",
  //           "width": "30%",
  //           "title": "Fax"
  //         },
  //         {
  //           "type": "text",
  //           "name": "Email 2nd",
  //           "visibleIf": "{Add another complainant?} = \"Yes\"",
  //           "width": "30%",
  //           "startWithNewLine": false,
  //           "title": "Email",
  //           "isRequired": true
  //         },
  //         {
  //           "type": "checkbox",
  //           "name": "Consent 2nd",
  //           "visibleIf": "{Add another complainant?} = \"Yes\"",
  //           "title": "The Tribunal uses your contact information to process the complaint and conduct surveys to evaluate and improve its services. The Tribunal will give your mailing address to the other parties for the exchange of information and other documents. Your additional contact information will only be given to the other parties if you agree.",
  //           "choices": [
  //             {
  //               "value": "confirmed",
  //               "text": " I do not want the Tribunal to disclose my phone numbers, fax and email to the respondent"
  //             }
  //           ]
  //         }

  //       ]
  //     }
  //   ],
  //   "showQuestionNumbers": "off"
  // };

  private json = {
    showNavigationButtons: false,
    completeText: "",
    showQuestionNumbers: "off",

    pages: [
      {
        name: "Who experienced retaliation (Complainant)?",
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
        title: "Who experienced retaliation (Complainant)?",
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
              "A lawyer",
              "A legal advocate (Example: A person who works for a law clinic)",
              "Another person – You must file a Form 1.2 with this complaint",
            ],
          },
        ],
        title: "Who will communicate with the Tribunal about this Complaint?",
      },
      {
        name: "Complainant Contact Information",
        elements: [
          {
            type: "text",
            name: "First name",
            isRequired: true,
	          maxLength: 40,
          },
          {
            type: "text",
            name: "Last name",
            isRequired: true,
	          maxLength: 40,
          },
          {
            type: "text",
            name: "Organization name",
            title: "Organization name (e.g. law firm, if applicable)",
	          maxLength: 255,
          },
          {
            type: "text",
            name:
              "Contact Preferred name - e.g. traditional name, nickname, alias",
            title: "Preferred name - e.g. traditional name, nickname, alias",
	          maxLength: 255,
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
          "{Select only one option} = 'A lawyer' or {Select only one option} = 'A legal advocate (Example: A person who works for a law clinic)' or {Select only one option} = 'Another person – You must file a Form 1.2 with this complaint'",
        title:
          "Name of the person who will communicate with the Tribunal",
      },
      {
        name: "Complainant’s address for Delivery",
        title: "Complainant’s address for delivery",
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
	          maxLength: 40,
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
            title: "Postal Code",
	          maxLength: 10,
            // isRequired: true,
          },
          {
            type: "text",
            name: "Complainant Contact Phone number",
            width: "30%",
            title: "Phone number  ",
	          maxLength: 255,
            // isRequired: true,
          },
          {
            type: "text",
            name: "Complainant Contact Cell Phone number",
            width: "30%",
            startWithNewLine: false,
            title: "Cell phone number",
	          maxLength: 255,
          },
          {
            type: "text",
            name: "Complainant Contact Fax",
            width: "30%",
            startWithNewLine: false,
            title: "Fax",
	          maxLength: 255,
          },
          {
            type: "text",
            name: "Complainant Contact Email",
            width: "40%",
            title: "Email",
	          maxLength: 255,
            validators: [ { type: "email" } ],
            // isRequired: true,
          },
        ],
        // visibleIf: "{Select only one option} <> 'The complainant'",
      },
      {
        name: "Respondent Contact Information",
        title: "Respondent Contact Information",
        elements: [
          {
            type: "html",
            name: "question5",
            html:
              "<h4>\nImportant information about Respondents:\n</h4>\n<ol>\n<li>The Respondent is the person or organization you say retaliated against you. Usually, there is only one.\n</li>\n<li>Usually the Respondent is an organization such as: corporate employer, landlord, government body, service provider, business or union. Organizations are usually responsible for their employees’ actions. Make the organization Respondent #1.</li>\n<li>An individual can be a Respondent. Only name the person who you say retaliated against you. For example, you can name the person who made a decision that you think is retaliation. Do not name the person who only told you about the decision.</li>\n</ol>\n<p>\n<strong>Email:</strong> Email is fastest. If possible, give an email address where we can send your complaint. Choose someone that you think has authority to respond to your complaint. For example, someone in the human resources, or legal department. </p>",
          },
          {
            type: "paneldynamic",
            panelAddText: "ADD Another Respondent",
            panelRemoveText: "REMOVE Above Respondent",
            name: "Respondents Contact Information",
            templateElements: [
              {
                type: "text",
                name: "Name of the Respondent",
                maxLength: 40,
                isRequired: true,
              },
              {
                type: "text",
                name: "Relationship to you",
	              maxLength: 255,
                title:
                  "Relationship to you (For example: your employer, landlord, government body)",
                isRequired: true,
              },
              {
                type: "text",
                name: "Respondent Contact Email",
	              maxLength: 255,
                width: "40%",
                title: "Email",
                validators: [ { type: "email" } ],
                // isRequired: true,
              },
              {
                type: "text",
                name: "Mailing address",
	              maxLength: 240,
                isRequired: true,
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
                width: "30%",
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
                width: "30%",
                startWithNewLine: false,
	              maxLength: 255,
                title: "Fax",
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

        if (allFormData.partyInfo) {
          this.formData = allFormData.partyInfo;
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
          name: "partyInfo",
          data: this.survey.data,
          complete: true,
        });
        this.router.navigateByUrl("hrt-retaliation/progress");
      }
    } else {
      this.survey.nextPage();
    }
  }
}
