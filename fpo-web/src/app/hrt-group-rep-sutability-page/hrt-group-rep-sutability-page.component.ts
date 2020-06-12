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
  selector: "app-hrt-group-rep-sutability-page",
  templateUrl: "./hrt-group-rep-sutability-page.component.html",
  styleUrls: ["./hrt-group-rep-sutability-page.component.scss"],
})
export class HrtGroupRepSutabilityPageComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  private json = {
    showNavigationButtons: false,
    completeText: "",
    showQuestionNumbers: "off",

    pages: [
      {
        name: "page1",
        elements: [
          {
            type: "html",
            name: "question11",
            html:
              "<p><b>Purpose of collecting information: </b>The Tribunal needs to be satisfied that you will represent the group’s or class’s interests.</p>",
          },
          {
            "type": "radiogroup",
            "name": "Are you a member of the group or class?",
            "popupdescription":
              "<p>You do not need to be a member of the group or class to make the complaint. </p>",
            "isRequired": true,
            "choices": ["Yes", "No"],
          },
          {
            "type": "comment",
            "name": "If no, what is your relationship to the group or class, if any?",
            "visibleIf": "{Are you a member of the group or class?} = 'No'"
           },
          {
            type: "text",
            name: "Why are you filing the complaint?",
            isRequired: true,
          },
          {
            type: "radiogroup",
            name:
              "Are your interests in the complaint different from the group or class members’ interests?",
            isRequired: true,
            popupdescription:
              "<p>It is not necessary that your interests exactly match the members' interests. However, if there is some difference, you will need to explain.</p>",
            choices: ["Yes", "No"],
          },
          {
            type: "text",
            title: "If yes, explain the differences between your interests and interests of the group or class",
            name:
              "If yes, explain the differences between your interests and the interests of the group or class members’ interests",
            popupdescription:
              "<p>Interests can be different but there must be no conflict of interest between your interests in this complaint and the interests of the group or class members.</p>",
            visibleIf:
              "{Are your interests in the complaint different from the group or class members’ interests?} = 'Yes'",
            isRequired: true,
          },
          {
            type: "radiogroup",
            name:
              "Do you have reason to believe that group or class members may not want you to make this complaint on their behalf?",
            popupdescription:
              "<p>If you answer yes, this does not mean that the Tribunal will not allow you to make the complaint. However, the Tribunal may require you to notify group or class members of a right to “opt out” of the complaint and how to do so.</p>",
            isRequired: true,
            choices: ["Yes", "No"],
          },
          {
            type: "text",
            name: "If yes, explain. ",

            visibleIf:
              "{Do you have reason to believe that group or class members may not want you to make this complaint on their behalf?} = 'Yes'",
            isRequired: true,
          },
          {
            type: "radiogroup",
            name: "Have you notified the group or class about the complaint?",
            isRequired: true,
            choices: ["Yes", "No"],
          },
          {
            type: "text",
            name: "If yes, please explain how you notified the group or class about the complaint.",
            visibleIf:
              "{Have you notified the group or class about the complaint?} = 'Yes'",
            isRequired: true,
          },
          {
            type: "text",
            name: "How will you communicate with the group or class members?",
            popupdescription:
              "<p>A Representative is responsible for communicating with group or class members about important steps in the complaint process. You must have a plan.</p>",
            isRequired: true,
          },
          {
            type: "checkbox",
            name: "Declarations",
            description: "I declare that I:",
            isRequired: true,
            validators: [
              {
                type: "answercount",
                minCount: 14,
                text: "You must select all declarations.",
              },
            ],
            choices: [
              "understand the nature of the proceeding;",
              "have no interest that conflicts with those of the group or class members;",
              "will resign as Representative if a conflict of interest arises;",
              "will act in good faith;",
              " will focus on the group or class members’ rights to protection against discrimination under the Human Rights Code;",
              "will give information to the group or class about my role, how the complaint process works, how long it takes, and what the outcomes may be;",
              "will keep the group or class members up-to-date about what steps I have taken, what stage we are at, and what to expect next;",
              "will be available to the group or class members to answer their questions;",
              "will tell the group or class members my plan for how they may take part in the process;  ",
              "will do the job of a Representative, including: ",
            ],
          },
          {
            "type": "html",
            "name": "question1",
            "html": "<ul style='padding-left: 50px;'>\n<li>\nlearn about the complaint process\n</li>\n<li>\nask the Tribunal to accommodate the needs of group or class members so they can take part in the process;</li>\n<li>\ngather evidence to support the complaint and put forward the best possible case to the Tribunal; and</li>\n<li>\ndecide whether to hire a lawyer or legal advocate and instruct that person.</li>\n</ul>"
           }
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

        if (allFormData.repSutability) {
          this.formData = allFormData.repSutability;
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
    Survey.JsonObject.metaData.addProperty("question", "popupdescription:text");
    Survey.JsonObject.metaData.addProperty("page", "popupdescription:text");
    this.renderSurvey();
  }
  closed = true;
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
  showDescription(element) {
    document.querySelector(".popup-body").innerHTML = element.popupdescription;
    // $("#questionDescriptionPopup").modal();
    this.toggleModal();
  }
  toggleModal() {
    console.log(123123123);
    this.closed = !this.closed;
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
      btn.style.marginLeft = "10px";

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
          name: "repSutability",
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
