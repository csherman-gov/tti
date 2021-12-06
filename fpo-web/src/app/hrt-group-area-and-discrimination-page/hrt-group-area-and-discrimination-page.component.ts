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
  selector: "app-hrt-group-area-and-discrimination-page",
  templateUrl: "./hrt-group-area-and-discrimination-page.component.html",
  styleUrls: ["./hrt-group-area-and-discrimination-page.component.scss"],
})
export class HrtGroupAreaAndDiscriminationPageComponent
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
            type: "paneldynamic",
            panelAddText: "Add Area",
            panelRemoveText: "Remove Area",
            name: "areas",
            title: "Please enter the Areas and Grounds",
            showHeader: false,
            templateElements: [
              {
                type: "radiogroup",
                name: "What is the Area of Discrimination?",
                description: "Check any area that applies to your complaint\n",
                isRequired: true,
                popupdescription: `<div class="section"> <h4> Employment </h4> <p> Employment means work for an employer who controls the work and pay. It can include work as a volunteer, intern, or “independent contractor”. </p> <p> Applies when you: </p> <ul> <li>apply for a job</li> <li>get fired</li> <li>are working as an employee</li> </ul> <p> You are an employee if you depend on your employer and they control your work and pay. </p> </div> <div class="section"> <h4> Services </h4> <p> Applies when you want a service. For example, you go out to eat or shop. You go to school. You apply for a government benefit. You own a strata unit. </p> </div> <div class="section"> <h4> Tenancy </h4> <p> Applies when you: </p> <ul> <li>try to rent a space</li> <li>are renting a space</li> <li>get evicted</li> </ul> </div> <div class="section"> <h4> Purchase of property </h4> <p> Applies when you want to buy a house, condo, other unit, or land </p> </div> <div class="section"> <h4> Publication </h4> <p> Covers flyers, articles, statements, notices, signs, and symbols. </p> <p>Applies when someone aims to discriminate.</p> <p><b>Example.</b> A "whites only" sign.</p><br> <p> Applies to a publication that is likely to expose a person or group to hatred. </p> <p> <b>Example.</b> An article that says a religious group is disgusting and immoral. </p> </div> <div class="section"> <h4> Membership in a Union, employer’s organization, or occupational associations </h4> <p> Applies when: </p> <ul> <li>you want to join a union or get licensed to work by a regulator</li> <li>you get suspended or expelled</li> <li>you are a member</li> </ul> </div>`,
                choices: [
                  "Employment",
                  "Services ",
                  "Tenancy",
                  "Purchase of property",
                  "Publication",
                  "Membership in a Union, employer’s organization, or occupational associations",
                ],
              },
              {
                type: "checkbox",
                name:
                  "If your complaint is about employment, check if it’s about",
                visibleIf:
                  "{panel.What is the Area of Discrimination?} = 'Employment'",
                isRequired: true,
                choices: [
                  "A job",
                  "A job ad",
                  "Lower rate of pay based on sex for similar work",
                ],
              },
              {
                type: "checkbox",
                name: "What are the Grounds of Discrimination?",
                description:
                  "Check the ones that applies to your complaint and give details",
                isRequired: true,
                popupdescription:
                  '<p> The Human Rights Code protects you based on the traits or “grounds” below. The Code protects you if you have the trait. The Code also protects you if you don’t have the trait, but someone thinks you do. Discrimination is conduct that harms you based on one or more traits. </p> <p> <b>Example of multiple “grounds”. </b> A service provider treats an Indigenous woman badly. She selects the grounds Indigneous identity and sex.</p> <p> <b>Check the ones that apply and give details about the trait. Examples.</b >Disability – I have a learning disability. Disability – Respondent thinks I have a heart condition. Age – I am 67. Race – I am Métis. </p> <div class="section"> <h4>AGE (19 or over)</h4> <p>Does not apply:</p> <ul> <li>To purchase of property</li> <li>If legislation allows an age distinction</li> </ul> </div> <div class="section"> <h4>Ancestry</h4> <p>Where your ancestors come from.</p> <p><b> Example. </b> Your father is Korean.</p> </div> <div class="section"> <h4>Colour</h4> <p>Skin colour.</p> <p><b>Example. </b> Black, “dark-skinned”, “light-skinned”</p> </div> <div class="section"> <h4>Criminal Conviction</h4> <p> Applies only to employment and membership in a union, employer’s organization, or occupational association </p> <ul> Includes: <li>charged with a crime</li> <li>convicted of an offence</li> </ul> </div> <div class="section"> <h4>Family status</h4> <p>Includes:</p> <ul> <li>family size</li> <li>family type (example, single parent family)</li> <li>family care responsibilities</li> <li> who is in your family (example, someone fires you because of who your father is) </li> </ul> </div> <div class="section"> <h4>Gender Identity or Expression</h4> <p>Gender identity is a person’s sense of their gender, including man, woman, transgender, or non-binary.</p> <p>Gender expression is how a person presents their gender. It includes how a person acts and appears.</p> <p> Gender identity or expression can include a person’s name or pronoun such as he, she, or they. </p> </div> <div class="section"> <h4>Indigenous Identity</h4> <p>You are First Nations, Métis, or Inuit. </p> </div> <div class="section"> <h4>Lawful source of income</h4> <p> Applies only to tenancy (Example. A landlord won’t rent to you because you receive government benefits) </p> </div> <div class="section"> <h4>Marital status</h4> <ul> Includes: <li>married, single, widowed, divorced, common-law</li> <li> who your spouse is (example, someone fires you because they fired your spouse) </li> </ul> </div> <div class="section"> <h4>Mental Disability</h4> <p>Conditions that affect or are seen as affecting your abilities.</p> <p> <b>Examples.</b> Addiction, bipolar disorder, depression, dementia, learning disorders, developmental disabilities. </p> </div> <div class="section"> <h4>Physical Disability</h4> <p>Conditions that affect or are seen as affecting your abilities.</p> <p> <b> Examples. </b> amputation, asthma, cancer, epilepsy, obesity, impairments to hearing, speech, vision, or mobility. </p> </div> <div class="section"> <h4>Place of Origin</h4> <p>Where you come from.</p> <p><b>Example. </b> Born in China.</p> </div> <div class="section"> <h4>Political Belief</h4> <p> Applies only to employment and membership in a union, employer’s organization, or occupational association. </p> <ul> Includes: <li>supporting a political party</li> <li>advocating for change to laws</li> <li>beliefs about how to govern a nation</li> </ul> </div> <div class="section"> <h4>Race</h4> <p><b>Examples.</b> South Asian or Black.</p> </div> <div class="section"> <h4>Religion</h4> <ul> Includes: <li>practicing a faith</li> <li>religious beliefs</li> <li> not having certain religious beliefs or any religious beliefs at all </li> </ul> </div> <div class="section"> <h4>Sex</h4> <p>Includes being a woman, man, intersex, Two Spirit, or transgender.</p> <p>Includes pregnancy, breast-feeding and sexual harassment.</p> </div> <div class="section"> <h4>Sexual Orientation</h4> <p> Includes being heterosexual, gay, lesbian, bisexual, pansexual, or queer. </p> </div>',
                choices: [
                  "Indigenous Identity",
                  "Race",
                  "Ancestry",
                  "Colour",
                  "Place of Origin",
                  "Physical Disability",
                  "Mental Disability",
                  "Sex",
                  "Gender Identity or Expression",
                  "Sexual Orientation",
                  {
                    value: "Age (19 or over)",
                    visibleIf:
                      "{panel.What is the Area of Discrimination?} <> 'Membership in a Union, employer’s organization, or occupational associations'",
                  },
                  {
                    value: "Family Status",
                    visibleIf:
                      "{panel.What is the Area of Discrimination?} <> 'Purchase of property'",
                  },
                  "Marital Status",
                  "Religion",
                  {
                    value: "Political Belief",
                    visibleIf:
                      "{panel.What is the Area of Discrimination?} = 'Membership in a Union, employer’s organization, or occupational associations' or {panel.What is the Area of Discrimination?} = 'Employment'",
                  },
                  {
                    value: "Criminal Conviction",
                    visibleIf:
                      "{panel.What is the Area of Discrimination?} = 'Employment' or {panel.What is the Area of Discrimination?} = 'Membership in a Union, employer’s organization, or occupational associations'",
                  },

                  {
                    value: "Lawful source of income",
                    visibleIf:
                      "{panel.What is the Area of Discrimination?} = 'Tenancy'",
                  },
                ],
              },
              {
                type: "text",
                name: "Details - Age (19 or over)",
                description:
                  "<p><b>Examples:</b> Disability – I have a learning disability. Disability – Respondent thinks I have a heart condition. Age – I am 67. Race – I am Métis.</p>",
                visibleIf:
                  "{panel.What are the Grounds of Discrimination?} contains 'Age (19 or over)'",
                isRequired: true,
                maxLength: 2000,
              },
              {
                type: "text",
                name: "Details - Indigenous Identity",
                description:
                  "<p><b>Examples:</b> Disability – I have a learning disability. Disability – Respondent thinks I have a heart condition. Age – I am 67. Race – I am Métis.</p>",
                visibleIf:
                  "{panel.What are the Grounds of Discrimination?} contains 'Indigenous Identity'",
                isRequired: true,
                maxLength: 2000,
              },
              {
                type: "text",
                name: "Details - Ancestry",
                description:
                  "<p><b>Examples:</b> Disability – I have a learning disability. Disability – Respondent thinks I have a heart condition. Age – I am 67. Race – I am Métis.</p>",
                visibleIf:
                  "{panel.What are the Grounds of Discrimination?} contains 'Ancestry'",
                isRequired: true,
                maxLength: 2000,
              },
              {
                type: "text",
                name: "Details - Colour",
                description:
                  "<p><b>Examples:</b> Disability – I have a learning disability. Disability – Respondent thinks I have a heart condition. Age – I am 67. Race – I am Métis.</p>",
                visibleIf:
                  "{panel.What are the Grounds of Discrimination?} contains 'Colour'",
                isRequired: true,
                maxLength: 2000,
              },
              {
                type: "text",
                name: "Details - Criminal Conviction",
                description:
                  "<p><b>Examples:</b> Disability – I have a learning disability. Disability – Respondent thinks I have a heart condition. Age – I am 67. Race – I am Métis.</p>",
                visibleIf:
                  "{panel.What are the Grounds of Discrimination?} contains 'Criminal Conviction'",
                isRequired: true,
                maxLength: 2000,
              },
              {
                type: "panel",
                name: "panel1",
              },
              {
                type: "text",
                name: "Details - Family Status",
                description:
                  "<p><b>Examples:</b> Disability – I have a learning disability. Disability – Respondent thinks I have a heart condition. Age – I am 67. Race – I am Métis.</p>",
                visibleIf:
                  "{panel.What are the Grounds of Discrimination?} contains 'Family Status'",
                isRequired: true,
                maxLength: 2000,
              },
              {
                type: "text",
                name: "Details - Gender Identity or Expression",
                description:
                  "<p><b>Examples:</b> Disability – I have a learning disability. Disability – Respondent thinks I have a heart condition. Age – I am 67. Race – I am Métis.</p>",
                visibleIf:
                  "{panel.What are the Grounds of Discrimination?} contains 'Gender Identity or Expression'",
                isRequired: true,
                maxLength: 2000,
              },
              {
                type: "text",
                name: "Details - Marital Status",
                description:
                  "<p><b>Examples:</b> Disability – I have a learning disability. Disability – Respondent thinks I have a heart condition. Age – I am 67. Race – I am Métis.</p>",
                visibleIf:
                  "{panel.What are the Grounds of Discrimination?} contains 'Marital Status'",
                isRequired: true,
                maxLength: 2000,
              },
              {
                type: "text",
                name: "Details - Mental Disability",
                description:
                  "<p><b>Examples:</b> Disability – I have a learning disability. Disability – Respondent thinks I have a heart condition. Age – I am 67. Race – I am Métis.</p>",
                visibleIf:
                  "{panel.What are the Grounds of Discrimination?} contains 'Mental Disability'",
                isRequired: true,
                maxLength: 2000,
              },
              {
                type: "text",
                name: "Details - Physical Disability",
                description:
                  "<p><b>Examples:</b> Disability – I have a learning disability. Disability – Respondent thinks I have a heart condition. Age – I am 67. Race – I am Métis.</p>",
                visibleIf:
                  "{panel.What are the Grounds of Discrimination?} contains 'Physical Disability'",
                isRequired: true,
                maxLength: 2000,
              },
              {
                type: "text",
                name: "Details - Place of Origin",
                description:
                  "<p><b>Examples:</b> Disability – I have a learning disability. Disability – Respondent thinks I have a heart condition. Age – I am 67. Race – I am Métis.</p>",
                visibleIf:
                  "{panel.What are the Grounds of Discrimination?} contains 'Place of Origin'",
                isRequired: true,
                maxLength: 2000,
              },
              {
                type: "text",
                name: "Details - Political Belief",
                description:
                  "<p><b>Examples:</b> Disability – I have a learning disability. Disability – Respondent thinks I have a heart condition. Age – I am 67. Race – I am Métis.</p>",
                visibleIf:
                  "{panel.What are the Grounds of Discrimination?} contains 'Political Belief'",
                isRequired: true,
                maxLength: 2000,
              },
              {
                type: "text",
                name: "Details - Race",
                description:
                  "<p><b>Examples:</b> Disability – I have a learning disability. Disability – Respondent thinks I have a heart condition. Age – I am 67. Race – I am Métis.</p>",
                visibleIf:
                  "{panel.What are the Grounds of Discrimination?} contains 'Race'",
                isRequired: true,
                maxLength: 2000,
              },
              {
                type: "text",
                name: "Details - Religion",
                description:
                  "<p><b>Examples:</b> Disability – I have a learning disability. Disability – Respondent thinks I have a heart condition. Age – I am 67. Race – I am Métis.</p>",
                visibleIf:
                  "{panel.What are the Grounds of Discrimination?} contains 'Religion'",
                isRequired: true,
                maxLength: 2000,
              },
              {
                type: "text",
                name: "Details - Sex",
                description:
                  "<p><b>Examples:</b> Disability – I have a learning disability. Disability – Respondent thinks I have a heart condition. Age – I am 67. Race – I am Métis.</p>",
                visibleIf:
                  "{panel.What are the Grounds of Discrimination?} contains 'Sex'",
                isRequired: true,
                maxLength: 2000,
              },
              {
                type: "text",
                name: "Details - Sexual Orientation",
                description:
                  "<p><b>Examples:</b> Disability – I have a learning disability. Disability – Respondent thinks I have a heart condition. Age – I am 67. Race – I am Métis.</p>",
                visibleIf:
                  "{panel.What are the Grounds of Discrimination?} contains 'Sexual Orientation'",
                isRequired: true,
                maxLength: 2000,
              },
              {
                type: "text",
                name: "Details - Lawful source of income",
                description:
                  "<p><b>Examples:</b> Disability – I have a learning disability. Disability – Respondent thinks I have a heart condition. Age – I am 67. Race – I am Métis.</p>",
                visibleIf:
                  "{panel.What are the Grounds of Discrimination?} contains 'Lawful source of income'",
                isRequired: true,
                maxLength: 2000,
              },
            ],
            panelCount: 1,
            minPanelCount: 1,
            maxPanelCount: 10,
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

        if (allFormData.areaAndGrounds) {
          this.formData = allFormData.areaAndGrounds;
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
    Survey.JsonObject.metaData.addProperty("question", "popupdescription:text");
    Survey.JsonObject.metaData.addProperty("page", "popupdescription:text");
    this.renderSurvey();
  }
  initSurvey() {
    addQuestionTypes(Survey);
    Survey.defaultBootstrapCss.page.root = "sv_page";
    Survey.defaultBootstrapCss.pageDescription = "sv_page_description";
    Survey.defaultBootstrapCss.page.description = "sv_page_description";
    Survey.defaultBootstrapCss.pageTitle = "sv_page_title";
    Survey.defaultBootstrapCss.page.title = "sv_page_title";
    Survey.defaultBootstrapCss.navigationButton = "btn btn-primary";
    Survey.defaultBootstrapCss.question.title = "sv_q_title";
    Survey.defaultBootstrapCss.question.description = "sv_q_description";
    Survey.defaultBootstrapCss.panel.description = "sv_p_description";
    Survey.defaultBootstrapCss.matrixdynamic.button = "btn btn-primary";
    Survey.defaultBootstrapCss.paneldynamic.button = "btn btn-primary";
    Survey.defaultBootstrapCss.paneldynamic.root = "sv_p_dynamic";
    Survey.defaultBootstrapCss.checkbox.item = "sv-checkbox";
    Survey.defaultBootstrapCss.checkbox.controlLabel = "sv-checkbox-label";
    Survey.defaultBootstrapCss.checkbox.materialDecorator = "";
    Survey.defaultBootstrapCss.radiogroup.item = "sv-radio";
    Survey.defaultBootstrapCss.radiogroup.controlLabel = "sv-checkbox-label";
    Survey.defaultBootstrapCss.radiogroup.materialDecorator = "";
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
    this.survey.onAfterRenderQuestion.add(function (survey, options) {
        console.log(options);
        // Return if there is no description to show in popup
        if (!options.question.description) return;
        // Add a button;
        console.log("options: ", options.question.description);
        const desc = options.htmlElement.querySelector(".sv_q_description");
        desc.innerHTML = options.question.description;
      });

    Survey.SurveyNG.render("surveyElementHRT", { model: this.survey });
    console.log("hi!3");
  }
  handleNextStep() {
    if (this.survey.isLastPage) {
      const validated = this.survey.completeLastPage();
      if (validated) {
        this.missionService.confirmMission({
          name: "areaAndGrounds",
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
