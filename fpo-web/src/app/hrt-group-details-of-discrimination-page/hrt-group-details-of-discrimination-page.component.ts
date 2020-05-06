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
  selector: "app-hrt-group-details-of-discrimination-page",
  templateUrl: "./hrt-group-details-of-discrimination-page.component.html",
  styleUrls: ["./hrt-group-details-of-discrimination-page.component.scss"],
})
export class HrtGroupDetailsOfDiscriminationPageComponent
  implements OnInit, OnDestroy {
  subscription: Subscription;
  private json = {
    showNavigationButtons: false,
    completeText: "",
    showQuestionNumbers: "off",
    pages: [
      {
        name: "Details of the Discrimination",
        elements: [
          {
            type: "html",
            name: "question1",
            html:
              "<p>\nTo show possible discrimination under the Human Rights Code, you must show:\n</p>\n<ul>\n<li>The Respondent harmed the group or class members in the area you selected, such as employment. The legal term is “adverse effect” regarding the area. </li>\n<li>\nThe harm is based on grounds you selected. The legal term is that the grounds “are a factor in” or are “connected to” the harm.\n</li></ul>",
          },
          {
            type: "comment",
            name: "Describe what your complaint is about in a few words. ",
            description:
              "<b>Example:</b> This person fired group or class members based on race. You can give details below.\n",
            isRequired: true,
          },
          {
            type: "comment",
            name: "Describe the harm in a few word",
            description:
              "<b>Example:</b> The class members lost their jobs and felt terrible. You can say what remedy you want below",
            isRequired: true,
          },
          {
            type: "comment",
            name:
              "Explain how the harm relates to the grounds you have selected before.",
            description:
              "<b>Examples:</b> The words the manager used are slurs about race; Security only followed members of the group or class around the store, not the other people who were not First Nations; The respondent fired group or class members one week after they learned they were pregnant; A white male colleague got the promotion. Group or class members are at least as qualified. They are Black women; The employer said group or class members have to work Saturdays. Their religion does not allow them to work Saturdays; The employer disciplined group or class members for shouting at someone. Their disability caused them to shout; This organization refused to provide an interpreter which group or class members need because they are Deaf. If you need help, you can contact the BC Human Rights Clinic or the Law Center",
            isRequired: true,
          },
        ],
      },
      {
        name: "page1",
        elements: [
          {
            type: "matrixdynamic",
            name:
              "Describe what this Respondent did that harmed group or class members based on the grounds. ",
            description:
              "Be specific. Example. Do not say, “This person bullied group or class members.” Write out the words they used. Give the date for each event. If you don’t know the exact date, give an approximate date. Please provide the date in the format YYYY-MM-DD. Example: If the event occurred on February 3rd, 2020, please provide the date as 2020-02-03.",
            isRequired: true,
            columns: [
              {
                name: "Respondent",
                isRequired: true,
                width: "20%",
              },
              {
                name: "Event",
                isRequired: true,
                width: "50%",
              },
              {
                name: "Date",
                inputType: "date",
                cellType: "text",
                isRequired: true,
                width: "20%",
                // validators: [
                //   {
                //     type: "regex",
                //     text: "Please enter the correct date",
                //     regex:
                //       "([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))",
                //   },
                // ],
              },
            ],
            choices: [1, 2, 3, 4, 5],
            cellType: "text",
            rowCount: 1,
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

        if (allFormData.detailsOfDiscrimination) {
          this.formData = allFormData.detailsOfDiscrimination;
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
    console.log('Survey.StylesManager: ', Survey.StylesManager.applyTheme)
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

    // test
  }

  renderSurvey() {
    console.log("hi!1");
    // let surveyModel =
    this.survey = new Survey.Model(this.json);

    this.survey.onAfterRenderQuestion.add(function (survey, options) {
      console.log(options);
      //Return if there is no description to show in popup
      if (!options.question.description) return;
      //Add a button;
      console.log("options: ", options.question.description);
      var desc = options.htmlElement.querySelector(".sv_q_description");
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
          name: "detailsOfDiscrimination",
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
