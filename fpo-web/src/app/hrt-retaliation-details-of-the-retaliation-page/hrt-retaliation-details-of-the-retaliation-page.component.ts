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
  selector: "app-hrt-retaliation-details-of-the-retaliation-page",
  templateUrl:
    "./hrt-retaliation-details-of-the-retaliation-page.component.html",
  styleUrls: [
    "./hrt-retaliation-details-of-the-retaliation-page.component.scss",
  ],
})
export class HrtRetaliationDetailsOfTheRetaliationPageComponent
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
            name: "question2",
            html:
              "<p>\nTo show possible retaliation, you must show:\n</p>\n<ul><li>\nThe Respondent harmed or threatened to harm you, and \n</li><li>\nThe Respondent did this to retaliate against you for your role in a complaint\n\n</li></ul>",
          },
          {
            type: "paneldynamic",
            name: "Details of the Retaliation for each Respondent",
            description: "Complete this section for each Respondent you named in the previous step. Click “Add Details for Another Named Respondent”.",
            templateElements: [
              {
                type: "text",
                name: "Respondent",
                title: "Respondent Name",
                maxLength: 255,
                titleLocation: "left",
              },
              {
                type: "comment",
                name:
                  "Describe in a few words the conduct that you say is retaliation",
                maxLength: 10000,
                description:
                  "<div><p><b>Information: </b>Conduct that can be retaliation is: </p><ul> <li style='display: flex;'> <span style='flex: 1;'> Evicting </span> <span style='flex: 1;'> -  Expelling </span> <span style='flex: 1;'> -   Denying a right or benefit </span> </li> <li style='display: flex;'> <span style='flex: 1;'> Firing </span> <span style='flex: 1;'> -  Intimidating or Coercing </span> <span style='flex: 1;'> -  Threatening to do one of these things </span> </li> <li style='display: flex;'> <span style='flex: 1;'> Suspending </span> <span style='flex: 1;'> -  Penalizing </span> <span style='flex: 1;'> -   Other similar conduct </span> </li> </ul><b>Instructions: </b> Give a short answer here. You will give details below. Your short answer helps us understand the details you give below. </p><p><b>Examples: </b> “This Respondent fired me.” “This Respondent threatened me.”</p></div>",
              },
              {
                type: "matrixdynamic",
                title: "Describe what this Respondent did to retaliate.",
                name:
                  "Give details about this Respondent’s conduct that you say is retaliation.",
                description:
                  "<div><ul><li>Be specific</li><li><b>Example: </b>Do not say, “This person threatened me.” Write out their words and actions.</li><li>Conduct can be what someone did or didn’t do. The legal term is “acts or omissions.”</li><li>If you don’t know the exact date, give an approximate date. Use the 1st day of the month if you do not know the exact day. <b>Example: </b> February 1, 2019.</li></ul></div>",
                columns: [
                  {
                    name: "Date",
                    cellType: "text",
                    isRequired: true,
                    inputType: "date",
                    max: "2999-12-31",
                  },
                  {
                    name: "Conduct",
                    cellType: "comment",
                    isRequired: true,
                    maxLength: 5000,
                    rows: 2,
                  },
                ],
                addRowText: "Add Conduct",
                removeRowText: "Remove Conduct",
                choices: [1, 2, 3, 4, 5],
                rowCount: 1,
                minRowCount: 1,
              },
              {
                type: "comment",
                maxLength: 32768,
                name:
                  "Explain why you think this conduct is retaliation for your role in a complaint",
                description:
                  "<div> <p> <b> Examples: </b> </p> <ul> <li> “I talked about discrimination at work. My boss said he’d never promote me if I made a complaint.” </li> <li> “I filed a discrimination complaint against my landlord. Two months later the landlord sued me in court. The lawsuit had no basis. It was just to smear my character.” </li> <li> “After I filed a complaint, my manager investigated me. My employer suspended me for 5 days for being late to work once. At most, this deserved a verbal warning.” </li> </ul> <p> Consider getting help if you are not sure. See  <a href='http://www.bchrt.bc.ca/whocanhelp/index.htm' target='_blank'>Who Can Help?</a>. </p> </div>",
              },
            ],
            panelAddText: "Add Details for Another Named Respondent",
            panelRemoveText: "Remove Above Respondent",
            panelCount: 1,
            minPanelCount: 1,
            maxPanelCount: 10,
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

        if (allFormData.detailsOfRetaliation) {
          this.formData = allFormData.detailsOfRetaliation;
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
    // this.initSurvey();

    this.renderSurvey();
  }

  renderSurvey() {
    console.log("hi!1");
    // let surveyModel =
    this.survey = new Survey.Model(this.json);

    this.survey.onAfterRenderQuestion.add(function (survey, options) {
      console.log(options);
      // Return if there is no description to show in popup
      if (!options.question.description) return;
      // Add a button;
      console.log("options: ", options.question.description);
      const desc = options.htmlElement.querySelector(".sv_q_description");
      desc.innerHTML = options.question.description;
    });

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
          name: "detailsOfRetaliation",
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
