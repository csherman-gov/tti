import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { PlatformLocation } from "@angular/common";

// import service
import { MissionService } from "../mission.service";
import { Subscription } from "rxjs";

import { Router } from "@angular/router";

@Component({
  selector: "app-hrt-group-review-page",
  templateUrl: "./hrt-group-review-page.component.html",
  styleUrls: ["./hrt-group-review-page.component.scss"],
})
export class HrtGroupReviewPageComponent implements OnInit, OnDestroy {
  result: boolean;
  loading = false;
  get showLateComplaints() {
    return this.result;
  }
  buttonClass = "btn btn-inactive";
  error = false;
  checkbox = false;
  complainants: any;
  subscription: Subscription;
  formData = {
    indigenous: { question1: false },
    home: {
      case_type: "",
      attachment_html: "",
    },
    respondents: [],
    representative: {},
    repSutability: {},
    complaintSutability: {},
    respondentContact: {},
    areaAndGrounds: {
      areas: [],
    },
    detailsOfDiscrimination: {},
    fileInTime: {},
    otherProceedings: {},
    remedies: {},
    mediation: {},
    statisticalInformation: {},
  };
  details = [];
  newFormData = JSON.parse(
    `{"representative":{
        "Is the representative:": "An organization",
        "Organization Name": "123",
        "Individual Legal name – First name": "123",
        "Individual Legal Name – Last name": "123",
        "Preferred name": "123",
        "Use my preferred name": [
          "When talking to me"
        ],
        "Title": "other",
        "Pronoun": "other",
        "Select only one option:": "A lawyer for the Representative",
        "First name": "John",
        "Last name": "Doe", 
        "Representative Preferred name": "12312312",
        "Representative Organization Name": "12313123123",
        "Representative Title": "other",
        "Representative Pronoun": "other",
        "Mailing address": "321 tesr st",
        "City": "Vanvouver",
        "Province": "Alberta",
        "Postal Code": "e3e3e3",
        "Phone number": "1231231231",
        "Email": "312@boss.ca",
        "Title-Comment": "1231312312Other3123",
        "Pronoun-Comment": "1231231123123Other123123",
        "Representative Title-Comment": "Other1",
        "Representative Pronoun-Comment": "Other2"
      },"repSutability":{
        "Are you a member of the group or class?": "Yes",
        "Why are you filing the complaint?": "1231231212",
        "Are your interests in the complaint different from the group or class members’ interests?": "Yes",
        "If yes, explain the differences between your interests and the interests of the group or class members’ interests": "123123",
        "Do you have reason to believe that group or class members may not want you to make this complaint on their behalf?": "Yes",
        "If yes, explain. ": "12312312312",
        "Have you notified the group or class about the complaint?": "Yes",
        "If yes, please explain how you notified the group or class about the complaint.": "12312312",
        "How will you communicate with the group or class members?": "123123123",
        "Declarations": [
          "understand the nature of the proceeding;",
          "will resign as Representative if a conflict of interest arises;",
          "have no interest that conflicts with those of the group or class members;",
          "will act in good faith;",
          "will give information to the group or class about my role, how the complaint process works, how long it takes, and what the outcomes may be;",
          " will focus on the group or class members’ rights to protection against discrimination under the Human Rights Code;",
          "will keep the group or class members up-to-date about what steps I have taken, what stage we are at, and what to expect next;",
          "will be available to the group or class members to answer their questions;",
          "will do the jobs of a Representative, including: ",
          "will tell the group or class members my plan for how they may take part in the process;  ",
          "ask the Tribunal to accommodate the needs of group or class members so they can take part in the process;",
          "learn about the complaint process;",
          "gather evidence to support the complaint and put forward the best possible case to the Tribunal; and",
          "decide whether to hire a lawyer or legal advocate and instruct that person."
        ]
      },"complaintSutability":{"Describe the Group or Class":"312123","Explain how the alleged discrimination is similar for all group or class members":"123213"},"respondentContact":{"Respondents Contact Information":[
        {
          "Name of the Respondent": "JHJ",
          "Mailing address": "V6N 2Z7",
          "City": "VANCOUVER",
          "Province": "British Columbia",
          "Relationship to group or class members": "123",
          "Respondent Contact Email": "123",
          "Respondent Contact Phone number": "123",
          "Respondent Contact Cell Phone number": "123",
          "Respondent Contact Fax": "123",
          "Postal Code": "123"
        }
      ]},"areaAndGrounds":{"areas":[{"What is the Area of Discrimination?":"Employment","If your complaint is about employment, check if it’s about":["A job ad"],"What are the Grounds of Discrimination?":["Ancestry"],"Details - Ancestry":"123"},{"What is the Area of Discrimination?":"Services ","What are the Grounds of Discrimination?":["Colour"],"Details - Colour":"3212312312312"}]},"detailsOfDiscrimination":{
        "Details of the Discrimination for each Respondent": [
          {
            "Respondent": "asdasdasdas",
            "Describe the harm the group or class members experienced in a few words": "The class members lose their jobs and felt terrible.",
            "Explain how the harm relates to the grounds you have selected before": "The employer said group or class members have to work Saturdays. Their religion does not allow them to work Saturdays.",
            "Give details about this Respondent’s conduct that you say is discrimination": [
              {
                "Conduct": "Conduct can be what someone did or didn’t do. The legal term is “acts or omissions.”",
                "Date": "2020-05-19"
              }
            ]
          }
        ]
      },"fileInTime":{
        "There is a 1-year time limit for filing a complaint": [
          {
            "Respondent name": "123",
            "What is the date of the most recent event that you say is discrimination?": "2020-05-13",
            "Did the most recent conduct happen in the last year?": "No"
          }
        ],
        "Did all of the conduct happen in the last year for all Respondents?": "No",
        "Is all of the conduct related or similar?": "Yes",
        "Explain how the conduct is similar or related": "123",
        "Explain any gaps in time": "123",
        "Why did you file late?": "123",
        "How will accepting your complaint benefit the public?": "12312",
        "Why would the delay in filing not harm anyone else?": "31231212"
      },"otherProceedings":{"Does the group or class have another proceeding about the same events?":"Yes","What kind of proceeding is it?":"3333","What stage is that proceeding at?":"1213123312312123","Do you want the Tribunal to wait to deal with the complaint?":"Yes","Explain why you want the Tribunal to wait to deal with the complaint":"312312312312"},"remedies":{"Select the kinds of remedies you want":["Declaration that the conduct is discrimination","Steps or programs to address the discrimination (examples: training, policy)","Compensation for lost waged or expenses or other expenses such as moving expenses, photocopying, costs of attending the hearing (keep receipts)"]},"mediation":{"Do you want to attend a mediation?":"Yes"},"statisticalInformation":{"Indigenous Identity":"First Nations","Racial Identity":"Indigenous","Immigration Status":"Canadian citizen","Primary Language":"English","Disability requiring accommodation in employment and services":"Yes - physical","Gender Identity":"Woman","Sexual Orientation":"LGBQ","Age":"Under 19","Household":"Single parent","Household Income After Tax":"Under $20,000"}}`
  );
  show: boolean = false;
  getCurrentDate() {
    const today = new Date();
    const date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1 < 10
        ? "0" + (today.getMonth() + 1)
        : today.getMonth() + 1) +
      "-" +
      (today.getDate() + 1 < 10
        ? "0" + (today.getDate() + 1)
        : today.getDate() + 1);
    return date;
  }
  constructor(
    private missionService: MissionService,
    private router: Router,
    private http: HttpClient,
    private platformLocation: PlatformLocation
  ) {
    this.subscription = missionService.missionAnnounced$.subscribe(
      (allFormData) => {
        console.log("allFormData", allFormData);
        if (allFormData) {
          this.formData = allFormData;
          // this.formData = this.newFormData;
          console.log(this.formData);
          for (let key in this.formData) {
            if (key == "home") {
              continue;
            }
            if (key === "respondents") {
              console.log(allFormData.respondents);
              let respondents = allFormData.respondents.Respondents;
              let result = respondents.reduce((acc, current) => {
                return (
                  current[
                    "Did all the conduct you say is discrimination happen in the last one year?"
                  ] === "No" && acc
                );
              }, true);
              console.log(result);
              this.result = result;
            }
          }

          for (let key in this.formData["areaAndGrounds"]) {
            console.log(key);
            if (key.includes("Details - ")) {
              this.details.push({
                key: key.replace("Details - ", ""),
                val: this.formData["areaAndGrounds"][key],
              });
            }
          }
          console.log(this.details, "+++++++++++++++++++++++++++");

          // this.complainants = Object.keys(this.formData.complainant)
          this.show = true;
        }
        this.subscription.unsubscribe();
      }
    );
  }

  ngOnInit() {
    console.log(this.formData);
  }
  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
  handleClickEvent(event) {
    console.log(event.target.dataset);
  }
  handleCheckboxChange(event) {
    const value = event.target.checked;
    this.checkbox = value;
    if (value) {
      this.buttonClass = "btn btn-default";
    } else {
      this.buttonClass = "btn btn-inactive";
    }
  }
  handleSubmit() {
    if (this.checkbox) {
      console.log("Happy!");

      const attachment_html = document.getElementById("pdf-container")
        .innerHTML;
      console.log(attachment_html);
      const case_type = "Group";
      this.formData.home = {
        case_type: case_type,
        attachment_html: attachment_html,
      };
      console.log(this.formData);

      this.loading = true;
      this.http
        .post(
          this.platformLocation.getBaseHrefFromDOM() +
            "api/v1/survey-submit/test_collection/test_key",
          this.formData
        )
        .toPromise()
        .then((res) => {
          console.log(res);
          this.error = false;
          this.router.navigateByUrl("hrt-group/thank-you");
        })
        .catch((err) => {
          console.warn(err);
          this.loading = false;
        });
    } else {
      this.error = true;
    }
  }
  handleBackBtnClick() {
    this.router.navigateByUrl("hrt-group/progress");
  }
}
