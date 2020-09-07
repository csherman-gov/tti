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
  selector: "app-hrt-other-proceedings-page",
  templateUrl: "./hrt-other-proceedings-page.component.html",
  styleUrls: ["./hrt-other-proceedings-page.component.scss"],
})
export class HrtOtherProceedingsPageComponent implements OnInit, OnDestroy {
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
              "<p>Information. The Tribunal can defer your complaint (put it on hold) until another proceeding is finished.</p>",
          },
          {
            type: "radiogroup",
            name: "Do you have another proceeding about the same events?",
            isRequired: true,
            choices: ["Yes", "No"],
          },
          {
            type: "text",
            name: "What kind of proceeding is it?",
            visibleIf:
              "{Do you have another proceeding about the same events?} = 'Yes'",
            isRequired: true,
            maxLength: 32768,
            popupdescription:
              '<div class="section"> <p> <b>Examples:</b> union grievance, court case, WorkSafeBC claim </p> </div>',
          },
          {
            type: "text",
            name: "What stage is that proceeding at?",
            visibleIf:
              "{Do you have another proceeding about the same events?} = 'Yes'",
            isRequired: true,
            maxLength: 32768,
            popupdescription:
              '<div class="section"> <p> <b>Examples:</b> Has there been a hearing? When do you expect a decision? </p> </div>',
          },
          {
            type: "radiogroup",
            name:
              "Do you want the Tribunal to wait to deal with your complaint?",
            visibleIf:
              "{Do you have another proceeding about the same events?} = 'Yes'",
            isRequired: true,
            choices: ["Yes", "No"],
          },
          {
            type: "comment",
            name:
              "Explain why you want the Tribunal to wait to deal with your complaint",
            visibleIf:
              "{Do you want the Tribunal to wait to deal with your complaint?} = 'Yes'",
            isRequired: true,
            maxLength: 32768,
          },
        ],
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

        if (allFormData.otherProceedings) {
          this.formData = allFormData.otherProceedings;
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
          name: "otherProceedings",
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
