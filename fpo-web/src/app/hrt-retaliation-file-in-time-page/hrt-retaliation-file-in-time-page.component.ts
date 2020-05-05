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
  selector: "app-hrt-retaliation-file-in-time-page",
  templateUrl: "./hrt-retaliation-file-in-time-page.component.html",
  styleUrls: ["./hrt-retaliation-file-in-time-page.component.scss"],
})
export class HrtRetaliationFileInTimePageComponent
  implements OnInit, OnDestroy {
  subscription: Subscription;
  private json = {
    showNavigationButtons: false,
    completeText: "",

    pages: [
      {
        name: "Is the Complaint filed in Time?",
        elements: [
          {
            type: "paneldynamic",
            name: "There is a one-year time limit for filing a complaint",
            description: "For each Respondent",
            isRequired: true,
            templateElements: [
              {
                type: "text",
                name: "Respondent name",
              },
              {
                type: "text",
                name:
                  "What is the date of the most recent conduct that you say is retaliation?",
                isRequired: true,
                inputType: "date",
                max: "2999-12-31",
              },
              {
                type: "radiogroup",
                name: "Did the most recent event happen in the last year?",
                isRequired: true,
                choices: ["Yes", "No"],
              },
            ],
            panelCount: 1,
            minPanelCount: 1,
          },
          {
            type: "radiogroup",
            name:
              "Did all of the conduct happen in the last year for all Respondents?",
            isRequired: true,
            choices: ["Yes", "No"],
          },
          {
            type: "radiogroup",
            name: "Is all of the conduct related or similar?",
            visibleIf:
              "{Did all of the conduct happen in the last year for all Respondents?} = 'No'",
            isRequired: true,
            choices: ["Yes", "No"],
          },
          {
            type: "comment",
            name:
              "Explain how the incidents are similar or related (a “continuing contravention”)",
            visibleIf: "{Is all of the conduct related or similar?} = 'Yes'",
            isRequired: true,
          },
          {
            type: "comment",
            name: "Explain any gaps between events",
            visibleIf: "{Is all of the conduct related or similar?} = 'Yes'",
            isRequired: true,
          },
        ],
      },
      {
        name: "Ask Tribunal to accept late Complaint",
        elements: [
          {
            type: "html",
            name: "Information",
            html:
              "<h3>\nInformation\n</h3>\n<p>\nThere must be a good reason to accept the late complaint. The legal term is that it must be in the “public interest”.\n</p>\n<p>\nThere must be no real harm to anyone because of the delay in filing. The legal term is no “substantial prejudice”.\n</p>",
          },
          {
            type: "comment",
            name: "Why did you file late?",
            isRequired: true,
          },
          {
            type: "comment",
            name: "How will accepting your complaint benefit the public?",
            isRequired: true,
          },
          {
            type: "comment",
            name: "Why would the delay in filing not harm anyone else?",
            isRequired: true,
          },
        ],
        visibleIf:
          "{Did all of the conduct happen in the last year for all Respondents?} = 'No'",
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

        if (allFormData.fileInTime) {
          this.formData = allFormData.fileInTime;
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
    //Add a property a text property into all questions types and into page
    Survey.JsonObject.metaData.addProperty("question", "popupdescription:text");
    Survey.JsonObject.metaData.addProperty("page", "popupdescription:text");

    this.renderSurvey();
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
          name: "fileInTime",
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
