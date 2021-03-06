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
  selector: "app-hrt-details-of-the-discrimination-page",
  templateUrl: "./hrt-details-of-the-discrimination-page.component.html",
  styleUrls: ["./hrt-details-of-the-discrimination-page.component.scss"],
})
export class HrtDetailsOfTheDiscriminationPageComponent
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
              "<p>\nTo show possible discrimination under the Human Rights Code, you must show:\n</p>\n<ul><li>\nThe Respondent harmed you in the area you selected, such as employment. The legal term is “adverse effect” regarding the area. </li>\n<li>\nThe harm is based on grounds you selected. The legal term is that the grounds “are a factor in” or are “connected to” the harm.\n</li></ul>",
          },
          {
            type: "paneldynamic",
            name: "Details of the Discrimination for each Respondent",
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
                name: "Describe the harm you experienced in a few words",
                description:
                  "<b>Example.</b> My landlord evicted me based on my race. My co-worker said things that made work very uncomfortable for me. <br>Give a short answer. Your short answer helps us understand the details you give below.",
                maxLength: 2000,
                isRequired: true,
              },
              {
                type: "comment",
                name:
                  "Explain how the harm relates to the grounds you have selected before",
                description:
                  "<div><b>Examples:</b> <ul><li>The words my co-worker used are slurs about Black men.</li><li>Security only followed me around the store, not the other people who were not First Nations.</li><li>The respondent fired me one week after they learned I was pregnant.</li><li>A white male colleague got the promotion. I am at least as qualified. I am an Asian woman.</li><li>My employer said I have to work Saturdays. My religion does not allow me to work Saturdays.</li><li>My employer disciplined me for shouting at someone. My disability caused me to shout.</li><li>This organization refused to provide an interpreter which I need because I am Deaf.</li></ul><p>Consider getting help if you are not sure. See <a href='http://www.bchrt.bc.ca/whocanhelp/index.htm' target='_blank'>Who Can Help?</a> </p></div> ",
                isRequired: true,
                maxLength: 2000,
              },
              {
                type: "matrixdynamic",
                name:
                  "Give details about this Respondent’s conduct that you say is discrimination",
                  title: "Describe what this Respondent did that harmed you.",
                description:
                  "<div><ul><li>Be specific</li><li><b>Example: </b>Do not say, “This person threatened me.” Write out their words and actions.</li><li>Conduct can be what someone did or didn’t do. The legal term is “acts or omissions.”</li><li>If you don’t know the exact date, give an approximate date. Use the 1st day of the month if you do not know the exact day. <b>Example: </b>February 1, 2019</li></ul></div>",
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
                    maxLength: 1500,
                    rows: 2,
                  }
                ],
                choices: [1, 2, 3, 4, 5],
                rowCount: 1,
                minRowCount: 1,
                maxRowCount: 10,
                addRowText: "Add Conduct",
                removeRowText: "Remove Conduct",
              },
            ],
            panelCount: 1,
            minPanelCount: 1,
            maxPanelCount: 10,
            panelAddText: "Add Details for Another Named Respondent",
            panelRemoveText: "Remove Above Respondent",
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
    // console.log('Survey.Survey.cssType', Survey.Survey.cssType)
    this.initSurvey();

    this.renderSurvey();
  }
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

  renderSurvey() {
    console.log("hi!1");
    // let surveyModel =
    this.survey = new Survey.Model(this.json);
    this.survey.maxOthersLength = 255;

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
        this.router.navigateByUrl("hrt/progress");
      }
    } else {
      this.survey.nextPage();
    }
  }
}
