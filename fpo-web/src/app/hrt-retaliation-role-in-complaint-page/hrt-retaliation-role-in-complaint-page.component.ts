import { Component, OnInit, OnDestroy } from "@angular/core";

import { MissionService } from "../mission.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { addQuestionTypes } from "../survey/question-types";

// import Inputmask from "inputmask";
// import * as widgets from 'surveyjs-widgets';
// Import Survey.js
import * as Survey from "survey-angular";
// import { addQuestionTypes } from '../survey/question-types';
// widgets.inputmask(Survey);
@Component({
  selector: "app-hrt-retaliation-role-in-complaint-page",
  templateUrl: "./hrt-retaliation-role-in-complaint-page.component.html",
  styleUrls: ["./hrt-retaliation-role-in-complaint-page.component.scss"],
})
export class HrtRetaliationRoleInComplaintPageComponent
  implements OnInit, OnDestroy {
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
            name: "question1",
            html:
              "<h2>Retaliation About a Complaint</h2>\n<p style='margin-bottom: 0;'>\n<b>Information:</b> The Human Rights Code forbids retaliation. It says that no one can retaliate against you for your role:<ul><li>in a complaint to the BC Human Rights Tribunal</li><li>in an inquiry by the Office of the Human Rights Commissioner</li></ul></p>",
          },
          {
            type: "radiogroup",
            name: "Is the retaliation about",
            isRequired: true,
            choices: [
              "A complaint that someone filed with the BC Human Rights Tribunal",
              "A complaint that someone might file with the BC Human Rights Tribunal",
              "An inquiry by the Office of the Human Rights Commissioner",
            ],
          },
        ],
      },
      {
        name: "page2",
        elements: [
          {
            type: "html",
            name: "question2",
            visibleIf:
              "{Is the retaliation about} = 'A complaint that someone filed with the BC Human Rights Tribunal'",
            html:
              "<h2>Retaliation about a complaint that someone filed</h2>\n<p style='margin-bottom: 0;'>\n<b>If the retaliation is about a complaint that someone filed, answer these questions:</p>",
          },
          {
            type: "text",
            name: "What is the complaint name and case number?",
		        maxLength: 255,
            isRequired: true,
          },
          {
            type: "text",
            name: "When was the complaint filed?",
            // isRequired: true,
            inputType: "date",
            max: "2999-12-31",
          },
          {
            type: "radiogroup",
            name: "What is your role in the complaint?",
            isRequired: true,
            choices: [
              "I made the complaint",
              "I was named in the complaint",
              "I gave evidence in the complaint ",
              "I helped with the complaint ",
            ],
          },
          {
            type: "text",
            name: "If you helped with the complaint, how did you help?",
		        maxLength: 255,
            visibleIf:
              "{What is your role in the complaint?} = 'I helped with the complaint '",
            isRequired: true,
          },
          {
            type: "text",
            name: "How did the Respondent(s) know about your role?",
		        maxLength: 255,
            isRequired: true,
            popupdescription:
              "<b>Example.</b> “The Tribunal sent the complaint to the Respondents.”",
          },
        ],
        visibleIf:
          "{Is the retaliation about} = 'A complaint that someone filed with the BC Human Rights Tribunal'",
      },
      {
        name: "page3",
        elements: [
          {
            type: "html",
            name: "question3",
            html:
              "<h2>Retaliation about a complaint that someone might file</h2>\n<p style='margin-bottom: 0;'>\n<b>If the retaliation is about a complaint that someone might file, answer these questions:</b></p>",
          },
          {
            type: "radiogroup",
            name: "What was your role?",
            isRequired: true,
            choices: [
              "The Respondent(s) thought that I might make a complaint",
              "The Respondent(s) thought that I might be named in a complaint",
              "The Respondent(s) thought that I might give evidence or help in some other way with another person’s complaint",
            ],
          },
          {
            type: "text",
            name: "Why did the Respondent(s) think this?",
		        maxLength: 2000,
            popupdescription:
              "<p><b>Example. </b>“I told my boss it was discrimination when I didn’t get the promotion. So my boss and employer knew I might file a complaint.”</p>",
            isRequired: true,
          },
        ],
        visibleIf:
          "{Is the retaliation about} = 'A complaint that someone might file with the BC Human Rights Tribunal'",
      },
      {
        name: "page4",
        elements: [
          {
            type: "html",
            name: "question4",
            visibleIf:
              "{Is the retaliation about} = 'An inquiry by the Office of the Human Rights Commissioner'",
            html:
              "<h2>Your Role in an Inquiry by the Officer of the Human Rights Commissioner</h2>\n<p style='margin-bottom: 0;'>\n<b>If the retaliation is about an inquiry by the Office of the Human Rights Commissioner:</p>",
          },
          {
            type: "text",
            name: "What is the Commissioner's inquiry about?",
		        maxLength: 255,
            isRequired: true,
          },
          {
            type: "dropdown",
            name: "What is your role in the inquiry?",
            title: "What is your role in the inquiry?",
            isRequired: true,
            choices: [
              "I took part",
              "I might take part",
            ],
          },
          {
            type: "text",
            name: "How did you take part? How might you take part?",
		        maxLength: 255,
            isRequired: true,
          },
          {
            type: "text",
            name: "How did the Respondent(s) know about your Role?",
            visibleIf:
              "{Is the retaliation about} = 'An inquiry by the Office of the Human Rights Commissioner'",
		        description:
                  "Example: 'I told the Respondents I had evidence for the inquiry.'",
            maxLength: 255,
            isRequired: true,
          }
        ],
        visibleIf:
          "{Is the retaliation about} = 'An inquiry by the Office of the Human Rights Commissioner'",
      },
    ],
  };
  closed = true;
  survey: any;
  formData: object;
  constructor(private missionService: MissionService, private router: Router) {
    this.subscription = missionService.missionAnnounced$.subscribe(
      (allFormData) => {
        console.log("allFormData", allFormData);

        if (allFormData.roleInComplaint) {
          this.formData = allFormData.roleInComplaint;
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
    // console.log('Survey.Survey.cssType', Survey.Survey.cssType)
    // this.initSurvey();
    // if (!Survey.Survey.cssType) this.initSurvey();
    //Add a property a text property into all questions types and into page
    Survey.JsonObject.metaData.addProperty("question", "popupdescription:text");
    Survey.JsonObject.metaData.addProperty("page", "popupdescription:text");
    this.renderSurvey();
  }

  initSurvey() {
    addQuestionTypes(Survey);
    // console.log("Survey.Survey.cssType", Survey.Survey.cssType);
    Survey.Survey.cssType = "bootstrap";
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
    Survey.JsonObject.metaData.addProperty("question", "popupdescription:text");
    Survey.JsonObject.metaData.addProperty("page", "popupdescription:text");
    // console.log(Survey.JsonObject.metaData.addProperty)
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
    this.survey.maxOthersLength = 255;
    if (this.formData) {
      console.log("hi122!");
      this.survey.data = this.formData;
    }

    console.log("hi!2");
    this.survey.onAfterRenderQuestion.add((survey, options) => {
      console.log("+++++++");
      console.log(options);

      //Return if there is no description to show in popup
      if (!options.question.popupdescription) return;
      console.log("hi!123122");
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
          name: "roleInComplaint",
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
