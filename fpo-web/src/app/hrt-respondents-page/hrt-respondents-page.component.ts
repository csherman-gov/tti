import { Component, OnInit, OnDestroy } from "@angular/core";

import { MissionService } from "../mission.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
// Import Survey.js
import * as Survey from "survey-angular";
import { addQuestionTypes } from "../survey/question-types";
// import * as $ from 'jquery';
// import * as bootstrap from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: "app-hrt-respondents-page",
  templateUrl: "./hrt-respondents-page.component.html",
  styleUrls: ["./hrt-respondents-page.component.scss"],
})
export class HrtRespondentsPageComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  survey: any;
  completedSteps = {
    step1: false,
    step2: false,
  };
  currentStep = {
    home: true,
    step1: false,
    step2: false,
  };
  showForm = "";
  displayingProgressPage = false;
  myCss = {
    matrixdynamic: {
      root: "table testclass",
    },
  };
  private json = {
    showNavigationButtons: false,
    pages: [
      {
        name: "page1",
        elements: [
          {
            type: "paneldynamic",
            name: "Respondents",
            maxPanelCount: 10,
            // "hasTitle": false,
            titleLocation: "hidden",
            templateElements: [
              {
                type: "radiogroup",
                name: "What type of respondent do you want to add?",
                titleLocation: "top",
                choices: ["Individual", "Organization"],
              },
              {
                type: "panel",
                name: "Respondent Detail",
                elements: [
                  {
                    type: "panel",
                    name: "Add Respondent",
                    elements: [
                      {
                        type: "html",
                        name: "question1",
                        html:
                          "<p>\nName each individual person, business or organization you believe is responsible for discrimination.\n</p>\n<p>\nAn individual Respondent might be a co-worker, boss, building manager, landlord, restaurant server, employee at a recreation facility, health care provider or government official.\n</p>\n<p>\nA business or organizational Respondent might be the company you worked for, a newspaper, a school board, a trade union, a society or a strata corporation.\n</p>\n<p>You will be able to add 10 respondents online. If you need to add more respondents, please contact the Human Rights Tribunal.</p>",
                      },
                      {
                        type: "html",
                        name: "Complaints in the Workplace",
                        popupdescription: "workplace",
                        html:
                          "<h5 style='margin-bottom:-30px;font-size: 18px;'>Complaints in the Workplace <h5>",
                      },
                      {
                        type: "html",
                        name: "Complaints About a Union or Association",
                        popupdescription: "association",
                        html:
                          "<h5 style='margin-bottom:-30px;font-size: 18px;'>Complaints About a Union or Association <h5>",
                      },
                      {
                        type: "html",
                        name:
                          "Find Proper Names, Addresses and Phone Numbers for Businesses or Organizations",
                        popupdescription: "find",
                        html:
                          "<h5 style='margin-bottom:-30px;font-size: 18px;'>Find Proper Names, Addresses and Phone Numbers for Businesses or Organizations <h5>",
                      },
                      {
                        type: "html",
                        name: "State Your Relationship With Each Respondent",
                        popupdescription: "relationship",
                        html:
                          "<h5 style='font-size: 18px;'>State Your Relationship With Each Respondent <h5>",
                      },

                      {
                        type: "text",
                        name: "legal_first_name",
                        visibleIf:
                          '{panel.What type of respondent do you want to add?} = "Individual"',
                        title: "Legal first name: ",
                        isRequired: true,
                        titleLocation: "top",
                      },
                      {
                        type: "text",
                        name: "legal_last_name",
                        visibleIf:
                          '{panel.What type of respondent do you want to add?} = "Individual"',
                        startWithNewLine: false,
                        title: "Legal last name: ",
                        isRequired: true,
                        titleLocation: "top",
                      },
                      {
                        type: "text",
                        name: "legal_business_name",
                        visibleIf:
                          '{panel.What type of respondent do you want to add?} = "Organization"',
                        title: "Legal business or organization name: ",
                        isRequired: true,
                        titleLocation: "top",
                      },
                      {
                        type: "text",
                        name: "relation_to_you",
                        title: "Relationship to you: ",
                        isRequired: true,
                        titleLocation: "top",
                      },
                      {
                        type: "text",
                        name: "address_line_1",
                        title: "Address line 1: ",
                        isRequired: true,
                        titleLocation: "top",
                      },
                      {
                        type: "text",
                        name: "address_line_2",
                        // "visible": false,
                        title: "Address line 2",
                        titleLocation: "top",
                      },
                      {
                        type: "text",
                        name: "city",
                        title: "City",
                        isRequired: true,
                        titleLocation: "top",
                      },
                      {
                        type: "dropdown",
                        name: "province",
                        title: "Province: ",
                        startWithNewLine: false,
                        isRequired: true,
                        choices: [
                          "Alberta",
                          "British Columbia",
                          "Manitoba",
                          "New Brunswick",
                          "Newfoundland",
                          "Nova Scotia",
                          "Ontario",
                          "Prince Edward Island",
                          "Quebec",
                          "Saskatchewan",
                          "Northwest Territories",
                          "Nunavut",
                          "Yukon",
                        ],
                        titleLocation: "top",
                      },
                      {
                        type: "text",
                        name: "postal_code",
                        startWithNewLine: false,
                        title: "Postal code: ",
                        isRequired: true,
                        titleLocation: "top",
                      },
                      {
                        type: "text",
                        name: "phone_number",
                        title: "Phone: ",
                        isRequired: true,
                        titleLocation: "top",
                      },
                      {
                        type: "text",
                        name: "other phone",
                        startWithNewLine: false,
                        title: "Other phone:",
                        titleLocation: "top",
                      },
                      {
                        type: "text",
                        name: "fax_number",
                        title: "Fax: ",
                        titleLocation: "top",
                      },
                      {
                        type: "text",
                        name: "email_address",
                        startWithNewLine: false,
                        title: "Email: ",
                        isRequired: true,
                        titleLocation: "top",
                      },
                      {
                        type: "text",
                        name: "individual_name_under_organization",
                        visibleIf:
                          '{panel.What type of respondent do you want to add?} = "Organization"',
                        title:
                          "Individual you want to name under that Organization: ",
                        isRequired: false,
                        titleLocation: "top",
                      },
                    ],
                    title: "Add Respondent",
                  },
                  {
                    type: "panel",
                    name: "Areas & Grounds of discrimination",
                    elements: [
                      {
                        type: "html",
                        name: "Areas & Grounds of discrimination Info",
                        html:
                          "<p>\nList the area(s) and ground(s) of discrimination that apply to your complaint:</p>\n<p>\nYour complaint must show that the Respondent’s conduct took place in an area of daily life protected under theBC Human Rights Code. These are called “areas of discrimination”.It must also show that you have a personal characteristic(s) protected under theCode. These are called “Grounds of discrimination”.\n</p>\n<p>\nThese protected personal characteristics may be:\n</p>\n<ul>\n<li>\nactual (for example, your ancestry or age), or\n</li>\n<li>\nperceived (for example, someone thinks that you have or may develop a disability in the future, or makes homophobic comments regardless of your sexual orientation).</li>\n</ul>\n<p>\n<b>Not all Grounds of discrimination apply to all areas of discrimination.</b>\n</p>\n",
                      },
                      {
                        popupdescription: "area",
                        type: "radiogroup",
                        name: "Area of discrimination",
                        titleLocation: "top",
                        isRequired: true,
                        choices: [
                          "Accommodation, service or facility",
                          "Employment",
                          "Employment advertisement",
                          "Publication",
                          "Purchase of property",
                          "Tenancy",
                          "Unions and associations",
                          "Wages",
                        ],
                        colCount: 3,
                      },
                      // {
                      //   "type": "helptext",
                      //   "name": "Areas of Discrimination helptext",
                      //   "title": "Areas of Discrimination helptext",
                      //   "titleLocation": "hidden",
                      //   "myhtml": "For example:<ul style=\"padding-left: 20px;\"><li>I was an employee at ABC Company</li> <li>I was a customer at XYZ Sporting Goods Ltd.</li> <li>I am a tenant in a building owned by RST Ltd. and managed by GHI Inc.</li></ul>",
                      //   "body": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere fuga commodi unde cumque provident est. Est rerum totam blanditiis! Dolorem similique possimus velit quae nihil delectus voluptas ipsa cupiditate ipsum?"
                      // },
                      {
                        type: "checkbox",
                        name: "Grounds of discrimination",
                        isRequired: true,
                        titleLocation: "top",
                        popupdescription: "grounds",
                        // "valueName": "grounds",
                        choices: [
                          {
                            value: "Age",
                            visibleIf:
                              '{panel.Area of discrimination} = "Accommodation, service or facility"\n or {panel.Area of discrimination} = "Employment" or {panel.Area of discrimination} = "Publication" or {panel.Area of discrimination} = "Unions and Associations" or {panel.Area of discrimination} = "Tenancy" or {panel.Area of discrimination} = "Employment Advertisement"',
                          },
                          {
                            value: "Ancestry",
                            visibleIf:
                              '{panel.Area of discrimination} <> "Wages"',
                          },
                          {
                            value: "Colour",
                            visibleIf:
                              '{panel.Area of discrimination} <> "Wages"',
                          },
                          {
                            value: "Criminal Conviction",
                            visibleIf:
                              '{panel.Area of discrimination} = "Employment advertisement" or {panel.Area of discrimination} = "Unions and associations"',
                          },
                          {
                            value: "Family Status",
                            visibleIf:
                              '{panel.Area of discrimination} <> "Purchase of property"\n and {panel.Area of discrimination} <> "Wages"',
                          },
                          {
                            value: "Gender Identity or Expression",
                            visibleIf:
                              '{panel.Area of discrimination} <> "Wages"',
                          },
                          {
                            value: "Marital Status",
                            visibleIf:
                              '{panel.Area of discrimination} <> "Wages"',
                          },
                          {
                            value: "Mental Disability",
                            visibleIf:
                              '{panel.Area of discrimination} <> "Wages"',
                          },
                          {
                            value: "Physical Disability",
                            visibleIf:
                              '{panel.Area of discrimination} <> "Wages"',
                          },
                          {
                            value: "Place of Origin",
                            visibleIf:
                              '{panel.Area of discrimination} <> "Wages"',
                          },
                          {
                            value: "Political Belief",
                            visibleIf:
                              '{panel.Area of discrimination} = "Employment advertisement"\n or {panel.Area of discrimination} = "Employment advertisement" or {panel.Area of discrimination} = "Unions and associations"',
                          },
                          {
                            value: "Race",
                            visibleIf:
                              '{panel.Area of discrimination} <> "Wages"',
                          },
                          {
                            value: "Religion",
                            visibleIf:
                              '{panel.Area of discrimination} <> "Wages"',
                          },
                          "Sex",
                          {
                            value: "Sexual Orientation",
                            visibleIf:
                              '{panel.Area of discrimination} <> "Wages"',
                          },
                          {
                            value: "Source of Income",
                            visibleIf:
                              '{panel.Area of discrimination} = "Tenancy"',
                          },
                        ],
                        colCount: 3,
                      },
                    ],
                    title: "Areas & Grounds of discrimination",
                  },

                  {
                    type: "text",
                    titleLocation: "top",
                    name: "Details (Age)",
                    visibleIf:
                      '{panel.Grounds of discrimination} contains "Age"',
                    isRequired: true,
                  },
                  {
                    type: "text",
                    titleLocation: "top",
                    name: "Details (Ancestry)",
                    visibleIf:
                      '{panel.Grounds of discrimination} contains "Ancestry"',
                    isRequired: true,
                  },
                  {
                    type: "text",
                    titleLocation: "top",
                    name: "Details (Colour)",
                    visibleIf:
                      '{panel.Grounds of discrimination} contains "Colour"',
                    isRequired: true,
                  },
                  {
                    type: "text",
                    titleLocation: "top",
                    name: "Details (Family Status)",
                    visibleIf:
                      '{panel.Grounds of discrimination} contains "Family Status"',
                    isRequired: true,
                  },
                  {
                    type: "text",
                    titleLocation: "top",
                    name: "Details (Gender Identity or Expression)",
                    visibleIf:
                      '{panel.Grounds of discrimination} contains "Gender Identity or Expression"',
                    isRequired: true,
                  },
                  {
                    type: "text",
                    titleLocation: "top",
                    name: "Details (Marital Status)",
                    visibleIf:
                      '{panel.Grounds of discrimination} contains "Marital Status"',
                    isRequired: true,
                  },
                  {
                    type: "text",
                    titleLocation: "top",
                    name: "Details (Mental Disability)",
                    visibleIf:
                      '{panel.Grounds of discrimination} contains "Mental Disability"',
                    isRequired: true,
                  },
                  {
                    type: "text",
                    titleLocation: "top",
                    name: "Details (Physical Disability)",
                    visibleIf:
                      '{panel.Grounds of discrimination} contains "Physical Disability"',
                    isRequired: true,
                  },
                  {
                    type: "text",
                    titleLocation: "top",
                    name: "Details (Place of Origin)",
                    visibleIf:
                      '{panel.Grounds of discrimination} contains "Place of Origin"',
                    isRequired: true,
                  },
                  {
                    type: "text",
                    titleLocation: "top",
                    name: "Details (Political Belief)",
                    visibleIf:
                      '{panel.Grounds of discrimination} contains "Political Belief"',
                    isRequired: true,
                  },
                  {
                    type: "text",
                    titleLocation: "top",
                    name: "Details (Race)",
                    visibleIf:
                      '{panel.Grounds of discrimination} contains "Race"',
                    isRequired: true,
                  },
                  {
                    type: "text",
                    titleLocation: "top",
                    name: "Details (Religion)",
                    visibleIf:
                      '{panel.Grounds of discrimination} contains "Religion"',
                    isRequired: true,
                  },
                  {
                    type: "text",
                    titleLocation: "top",
                    name: "Details (Sex)",
                    visibleIf:
                      '{panel.Grounds of discrimination} contains "Sex"',
                    isRequired: true,
                  },
                  {
                    type: "text",
                    titleLocation: "top",
                    name: "Details (Sexual Orientation)",
                    visibleIf:
                      '{panel.Grounds of discrimination} contains "Sexual Orientation"',
                    isRequired: true,
                  },
                  {
                    type: "text",
                    titleLocation: "top",
                    name: "Details (Source of Income)",
                    visibleIf:
                      '{panel.Grounds of discrimination} contains "Source of Income"',
                    isRequired: true,
                  },
                  {
                    type: "text",
                    titleLocation: "top",
                    name: "Details (Political Belief)",
                    visibleIf:
                      '{panel.Grounds of discrimination} contains "Political Belief"',
                    isRequired: true,
                  },

                  // {
                  //     "type": "matrixdynamic",
                  //     "name": "detail_matrix",
                  //     "isRequired": true,
                  //     "titleLocation": "hidden",
                  //     "columns": [
                  //         {
                  //             "name": "Details",
                  //             "cellType": "text",
                  //             "isRequired": true
                  //         }
                  //     ],
                  //     "valueName": "grounds",
                  //     "rowCount": "1",
                  //     "maxRowCount": "1",
                  //     "minRowCount": "1"
                  // }
                ],
                visibleIf:
                  "{panel.What type of respondent do you want to add?} notempty",
              },
              {
                visibleIf:
                  "{panel.What type of respondent do you want to add?} notempty",
                type: "panel",
                name: "Respondents’ Conduct",
                titleLocation: "top",
                elements: [
                  {
                    type: "html",
                    name: "question3",
                    html:
                      "<p>Answer these questions to show that the Respondents’ conduct could be discrimination under the Human Rights Code</p>\n",
                  },
                  {
                    type: "matrixdynamic",
                    popupdescription: "respondent-action",
                    name: "What did the Respondent do?",
                    title: "What did the Respondent do?",
                    titleLocation: "top",
                    isRequired: true,
                    columns: [
                      {
                        name: "Date",
                        title: "Date (YYYY MM DD): ",
                        cellType: "text",
                        isRequired: true,
                      },
                      {
                        name: "What Happened? ",
                        title: "What Happened? ",
                        cellType: "text",
                        isRequired: true,
                      },
                    ],
                    choices: [1, 2, 3, 4, 5],
                    rowCount: 1,
                    minRowCount: 1,
                    addRowLocation: "bottom",
                    addRowText: "Add Event",
                    removeRowText: "Remove Event",
                  },
                  {
                    type: "comment",
                    titleLocation: "top",
                    name: "question3What is the adverse impact on you? ",
                    title: "What is the adverse impact on you? ",
                    popupdescription: "respondent-impact",

                    isRequired: true,
                  },
                  {
                    popupdescription: "factor",
                    type: "comment",
                    name:
                      "How was each ground of discrimination a factor in the adverse impact? ",
                    title:
                      "How was each ground of discrimination a factor in the adverse impact? ",
                    titleLocation: "top",
                    isRequired: true,
                  },
                ],
                title: "Respondents’ Conduct",
              },
              {
                visibleIf:
                  "{panel.What type of respondent do you want to add?} notempty",
                type: "panel",
                name: "Time Limit to file a complaint",
                titleLocation: "top",
                elements: [
                  {
                    type: "html",
                    name: "question3",
                    html:
                      "<p>To file your complaint on time, you must file it within one year of each Respondent's conduct (acts or omissions). If only some of the conduct happened in the last one year, your complaint may be filed in time if all of that Respondent's conduct is related or similar and close enough in time.</p>\n<p>Answer the first question to show whether your complaint is filed in time. If some or all of the complaint may be filed late, you will also complete more questions</p>\n",
                  },
                  {
                    type: "radiogroup",
                    popupdescription: "when",
                    titleLocation: "top",
                    name:
                      "Did all the conduct you say is discrimination happen in the last one year?",
                    isRequired: true,
                    choices: ["Yes", "No"],
                  },
                  {
                    type: "radiogroup",
                    name:
                      "Is all the conduct related or similar and, if so, how? ",
                    titleLocation: "top",
                    popupdescription: "related",
                    visibleIf:
                      '{panel.Did all the conduct you say is discrimination happen in the last one year?} = "No"',
                    isRequired: true,
                    choices: ["Yes", "No"],
                  },
                  {
                    type: "text",
                    name: "Explain why related or similar",
                    titleLocation: "top",
                    visibleIf:
                      '{panel.Is all the conduct related or similar and, if so, how? } = "Yes"',
                    isRequired: true,
                  },
                  {
                    type: "text",
                    popupdescription: "gap",
                    titleLocation: "top",
                    visibleIf:
                      '{panel.Did all the conduct you say is discrimination happen in the last one year?} = "No"',
                    name:
                      "If there are gaps between the conduct, can you explain them?",
                    isRequired: true,
                  },
                ],
                title: "Time Limit to file a complaint",
              },
            ],
            panelCount: 1,
            minPanelCount: 1,
            panelAddText: "Add another respondent",
          },
        ],
      },
    ],
  };

  formData: object;
  constructor(private missionService: MissionService, private router: Router) {
    this.subscription = missionService.missionAnnounced$.subscribe(
      (allFormData) => {
        console.log("allFormData", allFormData);

        if (allFormData.respondents) {
          this.formData = allFormData.respondents;
        }
        this.subscription.unsubscribe();
      }
    );
  }

  // -----------------------------------------------------------------------------------------Start
  // -----------------------------------------------------------------------------------------End

  ngOnInit() {
    Survey.JsonObject.metaData.addProperty("question", "popupdescription:text");
    // this.initSurvey();

    Survey.SurveyNG.render("surveyElementHRT", {
      model: this.survey,
      css: this.myCss,
    });
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed -destroy
    this.subscription.unsubscribe();
  }

  initSurvey() {
    addQuestionTypes(Survey);
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

    // load data from sessionStorage if there is one
    this.survey = new Survey.Model(this.json);
    this.survey.data = this.formData;

    this.survey.onAfterRenderQuestion.add(function (survey, options) {
      console.log(options);
      //Return if there is no description to show in popup
      if (!options.question.popupdescription) return;
      //Add a button;
      console.log("options: ", options);
      var targetId = options.question.popupdescription;
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn btn-info btn-xs";
      btn.innerHTML = "More Info";
      btn.style.backgroundColor = "#38598a";
      // var question = options.question;
      btn.onclick = () => {
        console.log("I got clicked!");
        console.log("I got clicked!", document.getElementById(targetId));
        var modal = document.getElementById(targetId);
        modal.style.display = "flex";
        modal.addEventListener("click", (event) => {
          let target = event.target as HTMLInputElement;
          console.dir(target.id);
          if (target.id === targetId) {
            modal.style.display = "none";
          }
        });
      };
      var header = options.htmlElement.querySelector("h5");
      var span = document.createElement("span");
      span.innerHTML = "  ";
      header.appendChild(span);
      header.appendChild(btn);
    });
  }
  // showDescription(element) {
  //   document.getElementById("questionDescriptionText").innerHTML = element.popupdescription;
  //   $("#questionDescriptionPopup").modal();
  // }
  handleNextStep() {
    if (this.survey.isLastPage) {
      const validated = this.survey.completeLastPage();
      if (validated) {
        this.missionService.confirmMission({
          name: "respondents",
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
