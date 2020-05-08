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
  selector: "app-hrt-group-time-limit-page",
  templateUrl: "./hrt-group-time-limit-page.component.html",
  styleUrls: ["./hrt-group-time-limit-page.component.scss"],
})
export class HrtGroupTimeLimitPageComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  private json = {
    showNavigationButtons: false,
    completeText: "",
    showQuestionNumbers: "off",

    pages: [
      {
        name: "Is the Complaint filed in Time?",
        title: "Is the Complaint Filed in Time?",
        elements: [
          {
            type: "paneldynamic",
            name: "There is a one-year time limit for filing a complaint",
            description:
              "Please provide all dates in the following format: YYYY-MM-DD. If the date of the event of discrimination was February 3rd, 2020, you would write 2020-02-03",
            isRequired: true,
            templateElements: [
              {
                type: "text",
                name: "Respondent name",
              },
              {
                type: "text",
                name:
                  "What is the date of the most recent event that you say is discrimination?",
                isRequired: true,
                inputType: "date",
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
              "Did every event happen in the last year for all respondents?",
            isRequired: true,
            choices: ["Yes", "No"],
          },
          {
            type: "radiogroup",
            name: "Are all the event Related or similar?",
            visibleIf:
              "{Did every event happen in the last year for all respondents?} = 'No'",
            isRequired: true,
            popupdescription: `<p>You must file a complaint within one year of the last event if the events are similar or related. The legal term is “continuing contravention”.</p>`,
            choices: ["Yes", "No"],
          },
          {
            type: "comment",
            name: "Explain how the incidents are similar or related",
            popupdescription: `<div class="section"> <p> <b>Examples.</b> </p> <ul> <li>Each event is about a co-worker using racial slurs. </li> <li>Each event is about an employer not accommodating a disability.</li> </ul> </div>`,
            visibleIf: "{Are all the event Related or similar?} = 'Yes'",
            isRequired: true,
          },
          {
            type: "comment",
            name: "Explain any gaps between events",
            popupdescription: `<div class="section"> <p> Gaps in time might mean there is no "continuing contravention". The Tribunal will consider reasons for gaps. </p> <p> <b>Examples.</b> </p> <ul> <li>Your employer denied you three promotions. You explain that the job postings were three months apart. </li> <li>Your manager used racial slurs. You explain that the supervisor was on leave for four months.</li> </ul> </div>`,
            visibleIf: "{Are all the event Related or similar?} = 'Yes'",
            isRequired: true,
          },
        ],
      },
      {
        name: "Ask Tribunal to accept late Complaint",
        title: "Ask Tribunal to accept late Complaint",
        elements: [
          {
            type: "html",
            name: "Information",
            html:
              "<h3>\nInformation\n</h3>\n<p>\nThere must be a good reason to accept the late complaint. The legal term is that it must be in the “public interest”.\n</p>\n<p>\nThere must be no real harm to anyone because of the delay in filing. The legal term is no “substantial prejudice”.\n</p>",
          },
          // {
          //   type: "html",
          //   name: "Resonsto",
          //   html: "<h4>Reasons to accept complaint</h4>",
          //   popupdescription:
          //     '<div class="section"> <p> The Tribunal will consider: </p> <ul> <li>Why you filed late, and how late you filed complaint</li> <li>Any other reason why accepting the complaint would benefit the public </li> <li>Evidence that supports your reason for filling your complaint late.  </li> </ul> </div>',
          // },
          {
            type: "comment",
            name: "Why did you file late?",
            isRequired: true,
            popupdescription:
              '<div class="section"> <p> <b>Examples the Tribunal will consider: </b> </p> <ul> <li>The complainant has a disability that prevented them from filing on time. </li> <li>The complainant faced trauma or a family or housing crisis that made it hard to file the complaint at the time of the events</li> <li>The complainant recently found evidence of discrimination </li> <li> The delay is very short and there is some reason for filing late </li> </ul> <p> You can attach any documents that support your reasons for filing your complaint late </p> </div>',
          },
          {
            type: "comment",
            name: "How will accepting your complaint benefit the public?",
            isRequired: true,
            popupdescription:
              '<div class="section"> <p> <b>Example </b> </p> <p>Your complaint raises a new or unusual issue.</p> </div>',
          },
          {
            type: "comment",
            name: "Why would the delay in filing not harm anyone else?",
            isRequired: true,
            popupdescription:
              '<div class="section"> <p> The Respondent could be harmed if: </p> <ul> <li>they don’t have the evidence about what happened because of the delay</li> <li>they lost contact with witnesses that could help their case</li> </ul> </div>',
          },
        ],
        visibleIf:
          "{Did every event happen in the last year for all respondents?} = 'No'",
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
    //  this.initSurvey();
    //Add a property a text property into all questions types and into page
    Survey.JsonObject.metaData.addProperty("question", "popupdescription:text");
    Survey.JsonObject.metaData.addProperty("page", "popupdescription:text");

    this.renderSurvey();
  }
  initSurvey() {
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
          name: "fileInTime",
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
