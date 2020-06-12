import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";

// import service
import { MissionService } from "../mission.service";
import { Subscription } from "rxjs";

import { Router } from "@angular/router";
import { PlatformLocation } from "@angular/common";

@Component({
  selector: "app-hrt-review-page",
  templateUrl: "./hrt-review-page.component.html",
  styleUrls: ["./hrt-review-page.component.scss"],
})
export class HrtReviewPageComponent implements OnInit, OnDestroy {
  result: boolean;
  buttonClass = "btn btn-inactive";
  error = false;
  checkbox = false;
  complainants: any;
  subscription: Subscription;
  loading = false;
  formData = {
    indigenous: false,
    home: {
      case_type: "Individual",
      attachment_html: "",
    },
    respondents: [],
    complainant: {},
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
    `{"home":{"form_timeout":"I am using a public computer (i.e. library, internet café, Service BC location)"},"complainant":{"Legal Name - First Name":"123","Legal Name - Last Name":"123","Preferred name - e.g. traditional name, nickname, alias":"123","Use my preferred name":["When talking to me"],"Title":"other","Pronoun":"other","Select only one option":"A lawyer for the complainant","First name":"123","Last name":"123","Organization name":"123","Complainant Contact Mailing address":"123123Broadway","Complainant Contact City":"123","Complainant Contact Province":"Québec","Complainant Contact Postal Code":"123","Complainant Contact Phone number":"123","Complainant Contact Fax":"123","Complainant Contact Email":"123","Respondents Contact Information":[{"Name of the Respondent":"te te","Relationship to you":"Canada","Respondent Contact Email":"dsa@da.com","Mailing address":"te","City":"te","Province":"British Columbia","Postal Code":"a3e 3e3","Respondent Contact Phone number":"1231231231"}],"Title-Comment":"123","Pronoun-Comment":"123"},"areaAndGrounds":{"areas":[{"What is the Area of Discrimination?":"Employment","If your complaint is about employment, check if it’s about":["Lower rate of pay based on sex for similar work","A job ad","A job"],"What are the Grounds of Discrimination?":["Colour","Race"],"Details - Colour":"123","Details - Race":"123"},{"What is the Area of Discrimination?":"Services ","What are the Grounds of Discrimination?":["Sexual Orientation"],"Details - Sexual Orientation":"123"}]},"detailsOfDiscrimination":{"Details of the Discrimination for each Respondent":[{"Respondent":"R1","Describe the harm you experienced in a few words":"My landlord evicted me based on my race. My co-worker said things that made work very uncomfortable for me.Give a short answer. Your short answer helps us understand the details you give below.","Explain how the harm relates to the grounds you have selected before":"This organization refused to provide an interpreter which I need because I am Deaf.","Give details about this Respondent’s conduct that you say is discrimination":[{"Conduct":"Conduct can be what someone did or didn’t do. The legal term is “acts or omissions.”","Date":"2005-10-19"},{"Conduct":"Do not say, “This person threatened me.” Write out their words and actions.","Date":"2020-01-01"}]}]},"fileInTime":{"There is a 1-year time limit for filing a complaint":[{"Respondent name":"321","What is the date of the most recent event that you say is discrimination?":"2006-02-17","Did the most recent conduct happen in the last year?":"No"}],"Did all of the conduct happen in the last year for all Respondents?":"No","Is all of the conduct related or similar?":"Yes","Explain how the conduct is similar or related":"123Explain how the conduct is similar or related * ","Explain any gaps in time":"Explain any gaps in time * ","Why did you file late?":"Why did you file late? * ","How will accepting your complaint benefit the public?":"How will accepting your complaint benefit the public? * ","Why would the delay in filing not harm anyone else?":"Why would the delay in filing not harm anyone else? * "},"otherProceedings":{"Do you have another proceeding about the same events?":"Yes","What kind of proceeding is it?":"What kind of proceeding is it? * ","What stage is that proceeding at?":"What stage is that proceeding at? * ","Do you want the Tribunal to wait to deal with your complaint?":"Yes","Explain why you want the Tribunal to wait to deal with your complaint":"Explain why you want the Tribunal to wait to deal with your complaint *"},"remedies":{"Select the kinds of remedies you want":["Order to stop the discrimination","Declaration that the conduct is discrimination", "other"],"Select the kinds of remedies you want-Comment":"detail of specific"},"mediation":{"Do you want to attend a mediation?":"Yes"}}`
  );

  show = false;
  getCurrentDate() {
    const today = new Date();
    const date =
      today.getFullYear() +
      "-" +
      ((today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1)) +
      "-" +
      ((today.getDate() + 1) < 10 ? '0' + (today.getDate() + 1) : (today.getDate() + 1));
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
          this.formData = this.newFormData
          //   console.log(this.formData);
          for (const key in this.formData) {
            if (key === "home") {
              continue;
            }
            if (key === "respondents") {
              console.log(allFormData.respondents);
              const respondents = allFormData.respondents.Respondents;
              const result = respondents.reduce((acc, current) => {
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

          for (const key in this.formData["areaAndGrounds"]) {
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

    // for (let key in this.formData) {
    //   if (key == 'home') {
    //     continue;
    //   }
    //   if (key === 'respondents') {
    //     // console.log(allFormData.respondents)
    //     let respondents = this.formData.respondents ? this.formData.respondents.Respondents : []
    //     let result = respondents.reduce((acc, current) => {
    //       return current['Did all the conduct you say is discrimination happen in the last one year?'] === 'No' && acc
    //     }, true)
    //     console.log(result)
    //     this.result = result
    //   }
    // }
    // this.complainants = Object.keys(this.formData.complainant)
    // this.show = true
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
    }
  }
  handleSubmit() {
    if (this.checkbox) {
      console.log("Happy!");
      const attachment_html = document.getElementById("pdf-container")
        .innerHTML;
      console.log(attachment_html);
      const case_type = "Individual";

      this.formData.home = {
        case_type: case_type,
        attachment_html: attachment_html,
      };

      this.loading = true;
      // console.log(this.loading)
      //   return
      //   console.log(this.formData)
      console.log(
        this.platformLocation.getBaseHrefFromDOM() +
          "/api/v1/survey-submit/test_collection/test_key"
      );
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
          this.router.navigateByUrl("hrt/thank-you");
        })
        .catch((err) => {
          console.warn(err);
          this.loading = false;
          window.alert("Something went wrong.");
        });
    } else {
      this.error = true;
    }
  }
  handleBackBtnClick() {
    this.router.navigateByUrl("hrt/progress");
  }
}
