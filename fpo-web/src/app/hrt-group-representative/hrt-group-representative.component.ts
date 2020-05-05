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
  selector: "app-hrt-group-representative",
  templateUrl: "./hrt-group-representative.component.html",
  styleUrls: ["./hrt-group-representative.component.scss"],
})
export class HrtGroupRepresentativeComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  currentPage = 0;
  pageTitles = [
    "Who is representing the group or class (Representative)?",
    "Who will communicate with the Tribunal about this Complaint?",
    "Name of the person who will communicate with the Tribunal, if different from the Representative",
    "Representative’s address for Delivery",
  ];
  currentPageTitle = "Who is representing the group or class (Representative)?";
  pageHelpText = {
    "Who is representing the group or class (Representative)?":
      "<p>A Representative can be an organization or an individual. Complete either organization name or name of individual. If you are writing on behalf of an organization, give the organization name here, then give your name as the person who will communicate with the Tribunal (question 3).</p>",
  };

  handlePopupClick() {
    console.log(123);
    this.showDescription({
      popupdescription: this.pageHelpText[this.currentPageTitle],
    });
  }
  private json = {
    showNavigationButtons: false,
    completeText: "",
    showPageTitles: false,
    pages: [
      {
        name: "Who is representing the group or class (Representative)?",
        title: "Who is representing the group or class (Representative)?",
        elements: [
          {
            type: "text",
            name: "Organization Name",
            // popupdescription:
            //   '<div class="section"> <p> The Respondent could be harmed if: </p> <ul> <li>they don’t have the evidence about what happened because of the delay</li> <li>they lost contact with witnesses that could help their case</li> </ul> </div>',
          },
          {
            type: "text",
            name: "Individual Legal name – First name",
            isRequired: true,
          },
          {
            type: "text",
            name: "Individual Legal Name – Last name",
            isRequired: true,
          },
          {
            type: "text",
            name: "Preferred name",
            title: "Preferred name – e.g. traditional name, nickname, alias",
          },
          {
            type: "checkbox",
            name: "Use my preferred name",
            choices: [
              "When talking to me",
              "When writing to me",
              "In decision in addition to my legal name",
            ],
          },
          {
            type: "radiogroup",
            name: "Title",
            hasOther: true,
            choices: ["Mr.", "Ms."],
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
      },
      {
        name: "Who will communicate with the Tribunal about this Complaint?",
        title: "Who will communicate with the Tribunal about this Complaint?",
        elements: [
          {
            type: "radiogroup",
            name: "Select only one option:",
            isRequired: true,
            choices: [
              "The Representative of the group or class or, if the Representative is an organization, the individual speaking for the organization",
              "A lawyer for the Representative",
              "A legal advocate for the Representative (Example: A person who works for a law clinic)",
            ],
          },
        ],
      },
      {
        name:
          "Name of the person who will communicate with the Tribunal, if different from the Representative",
        title:
          "Name of the person who will communicate with the Tribunal, if different from the Representative",
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
            name: "Representative Preferred name",
            title: "Preferred name – e.g. traditional name, nickname, alias",
            isRequired: true,
          },
          {
            type: "radiogroup",
            name: "Representative Title",
            title: "Title",
            hasOther: true,
            choices: ["Mr.", "Ms."],
            otherText: "Other",
          },
          {
            type: "radiogroup",
            name: "Representative Pronoun",
            title: "Pronoun",
            hasOther: true,
            choices: ["She", "He", "They"],
            otherText: "Other",
          },
        ],
        visibleIf:
          "{Select only one option:} <> 'The Representative of the group or class or, if the Representative is an organization, the individual speaking for the organization'",
      },
      {
        name: "Representative’s address for Delivery",
        title: "Representative’s address for Delivery",
        elements: [
          {
            type: "html",
            name: "question1",
            html:
              "<p><b>Purpose of collecting contact information:</b> The Tribunal and Respondents use your contact information to communicate with you about the complaint. The Tribunal may also use it to conduct surveys to evaluate and improve its services.</p>\n<p><b>Mailing address:</b> You must give a mailing address where all parties can send you documents.</p>\n<p><b>Email:</b> The Tribunal usually communicates via email. If possible, give an email address where all parties can reach you. If you have confidential contact information, do not put it on this form. Provide it separately by email, mail, fax, or in person.</p> \n<p><b>Important information:</b> A document sent to an address below is deemed to be received by the complainant. You must notify the Tribunal of any change to the address for delivery.</p>",
          },
          {
            type: "text",
            name: "Mailing address",
            title: "Mailing address",
          },
          {
            type: "text",
            name: "City",
            isRequired: true,
          },
          {
            type: "dropdown",
            name: "Province",
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
            name: "Postal Code",
            startWithNewLine: false,
            isRequired: true,
          },
          {
            type: "text",
            name: "Phone number",
            isRequired: true,
          },
          {
            type: "text",
            name: "Fax",
            startWithNewLine: false,
          },
          {
            type: "text",
            name: "Email",
            isRequired: true,
          },
        ],
      },
    ],
  };

  survey: any;
  formData: object;
  closed = true;

  constructor(private missionService: MissionService, private router: Router) {
    this.subscription = missionService.missionAnnounced$.subscribe(
      (allFormData) => {
        console.log("allFormData", allFormData);

        if (allFormData.representative) {
          this.formData = allFormData.representative;
          console.log("hi!");
        }
        // this.subscription.unsubscribe();
      }
    );
  }
  showDescription(element) {
    document.querySelector(".popup-body").innerHTML = element.popupdescription;
    // $("#questionDescriptionPopup").modal();
    this.toggleModal();
  }
  toggleModal() {
    console.log(123123123);
    this.closed = !this.closed;
  }
  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
  ngOnInit() {
    // console.log("Survey.Survey.cssType", Survey.Survey.cssType);
    // this.initSurvey();

    //Add a property a text property into all questions types and into page
    Survey.JsonObject.metaData.addProperty("question", "popupdescription:text");
    Survey.JsonObject.metaData.addProperty("page", "popupdescription:text");

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

    this.survey.onAfterRenderQuestion.add((survey, options) => {
      console.log("+++++++");
      console.log(options);

      //Return if there is no description to show in popup
      if (!options.question.popupdescription) return;
      console.log("has desc");
      //Add a button;
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn btn-default btn-xs";

      // btn.style.position = "absolute";
      btn.style.marginLeft = "20px";

      btn.innerHTML = "More Info";
      var question = options.question;
      btn.onclick = () => {
        this.showDescription(question);
      };
      var header = options.htmlElement.querySelector("h5");
      var span = document.createElement("span");
      span.innerHTML = "  ";
      header.appendChild(span);
      header.appendChild(btn);
    });

    console.log("hi!2");
    Survey.SurveyNG.render("surveyElementHRT", { model: this.survey });
    console.log("hi!3");
  }
  handleNextStep() {
    if (this.survey.isLastPage) {
      const validated = this.survey.completeLastPage();
      if (validated) {
        this.missionService.confirmMission({
          name: "representative",
          data: this.survey.data,
          complete: true,
        });
        this.router.navigateByUrl("hrt-group/progress");
      }
    } else {
      this.survey.nextPage();
      console.log(this.survey.currentPage);
      this.currentPageTitle = this.survey.currentPage.title;
    }
  }
  handlePreviousStep() {
    if (this.survey.isFirstPage) {
      return;
    }
    this.survey.prevPage();
    this.currentPageTitle = this.survey.currentPage.title;
  }
}
