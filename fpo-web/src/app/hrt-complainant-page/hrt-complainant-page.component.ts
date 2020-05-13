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
  //           "title": "Address line 2:",
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
  //           "title": "Address line 2:",
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
    pages: [
      {
        name: "Who experienced discrimination (Complainant)?",
        elements: [
          {
            type: "text",
            name: "Legal Name - First Name",
            isRequired: true,
          },
          {
            type: "text",
            name: "Legal Name - Last Name",
            isRequired: true,
          },
          {
            type: "text",
            name: "Preferred name - e.g. traditional name, nickname, alias",
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
              "A person in a legal clinic acting for the complainant",
              "Another person – You must file a Form 1.2 with this complaint (attach PDF of form 1.2)",
            ],
          },
          {
            type: "html",
            name: "question6",
            html:
              '<p style="margin-top: 20px;">The Tribunal may accept your complaint filed for another person if the person has legal capacity and consent, or you have legal authority to file the complaint for someone without legal capacity, such as a child.</p><p style="margin-bottom: 20px;">\n              In order to determine if your complaint on behalf of another person can be accepted, please complete an additional form "<a href="#">FORM 1.2 – REPRESENTATIVE AUTHORIZATION</a>". You will need to email us a copy of your completed authorization form at <a href="mailto:BCHumanRightsTribunal@gov.bc.ca">BCHumanRightsTribunal@gov.bc.ca</a>.</p>',
          },
        ],
        title: "Who will communicate with the Tribunal about this Complaint?",
      },
      {
        name:
          "Name of the person who will communicate with the Tribunal, if different from the Complainant",
        title:
          "Name of the person who will communicate with the Tribunal, if different from the Complainant",
        elements: [
          {
            type: "text",
            name: "First name",
            isRequired: true,
          },
          {
            type: "text",
            name: "Last name",
            isRequired: true,
          },
            {
              type: "text",
              title: 'Preferred name - e.g. traditional name, nickname, alias',
              name: "Contact Preferred name - e.g. traditional name, nickname, alias",
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
          "{Select only one option} = 'A lawyer for the complainant' or {Select only one option} = 'A person in a legal clinic acting for the complainant' or {Select only one option} = 'Another person – You must file a Form 1.2 with this complaint (attach PDF of form 1.2)'",
      },
      {
        name: "Complainant’s address for Delivery",
        elements: [
          {
            type: "html",
            name: "question1",
            html:
              "<p><strong>Purpose of collecting contact information:</strong> The Tribunal and Respondents use your contact information to communicate with you about the complaint. The Tribunal may also use it to conduct surveys to evaluate and improve its services.</p><p><strong>Mailing address: </strong> You must give a mailing address.</p><p><strong>Email: </strong>The Tribunal usually communicates via email. If possible, give an email address where all parties can reach you. If you have confidential contact information, do not put it on this form. Put it in your cover email or letter.\n</p><p><strong>Important information: </strong>A document sent to an address below is deemed to be received by the complainant. You must notify the Tribunal of any change to the address for delivery.\n</p>",
          },
          {
            type: "text",
            name: "Complainant Contact Mailing address",
            title: "Mailing address",
            isRequired: true,
          },
          {
            type: "text",
            name: "Complainant Contact City",
            width: "30%",
            title: "City ",
            isRequired: true,
          },
          {
            type: "dropdown",
            name: "Complainant Contact Province",
            startWithNewLine: false,
            title: "Province",
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
            name: "Complainant Contact Postal Code",
            width: "30%",
            startWithNewLine: false,
            title: "Postal Code",
            isRequired: true,
          },
          {
            type: "text",
            name: "Complainant Contact Phone number",
            width: "30%",
            title: "Phone number  ",
            isRequired: true,
          },
          {
            type: "text",
            name: "Complainant Contact Email",
            width: "40%",
            title: "Email",
            isRequired: true,
          },
          {
            type: "text",
            name: "Complainant Contact Cell Phone number",
            width: "30%",
            startWithNewLine: false,
            title: "Cellphone number  ",
          },
          {
            type: "text",
            name: "Complainant Contact Fax",
            width: "30%",
            startWithNewLine: false,
            title: "Fax",
          },
        ],
        visibleIf: "{Select only one option} <> 'The complainant'",
        title: "Complainant’s address for Delivery",
      },
      {
        name: "Respondent Contact Information",
        elements: [
          {
            type: "html",
            name: "question5",
            html:
              "<h4>\nImportant information about Respondents:\n</h4>\n<ol>\n<li>\nThe Respondent is the person or organization you say discriminated. Usually, there is only one.\n</li>\n<li>\nUsually the Respondent is your employer, landlord, service provider, union. They are usually responsible for their employees’ actions. Make them Respondent #1.\n</li>\n<li>\nAn individual can be a Respondent, but you need to say what they did that you think is discrimination. For example, name the person who harassed you. Do not name the person who only handed you a letter firing you.\n</li>\n</ol>\n<p>\n<strong>Email:</strong> The Tribunal sends your complaint to the Respondent’s email address that you give us. Please give email contact information for an official in the organization that you think has authority to respond to your complaint. For example, someone in the human resources, or legal department.\n</p>\n\n",
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
                name: "Relationship to you",
                title: 'Relationship to you (For example: your employer, landlord, government body)',
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
            // panelAddText: "Add New Respondent",
            // panelRemoveText: "Remove Respondent",
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
