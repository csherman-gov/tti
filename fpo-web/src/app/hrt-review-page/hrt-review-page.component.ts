import { Component, OnInit, Input, OnDestroy } from "@angular/core";

// import service
import { MissionService } from "../mission.service";
import { Subscription } from "rxjs";

import { Router } from "@angular/router";

@Component({
  selector: "app-hrt-review-page",
  templateUrl: "./hrt-review-page.component.html",
  styleUrls: ["./hrt-review-page.component.scss"],
})
export class HrtReviewPageComponent implements OnInit, OnDestroy {
  result: boolean;
  get showLateComplaints() {
    return this.result;
  }
  buttonClass = "btn btn-inactive";
  error = false;
  checkbox = false;
  complainants: any;
  subscription: Subscription;
  formData = {
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
    `{"home":{"form_timeout":"I am using a public computer (i.e. library, internet café, Service BC location)"},"complainant":{"Legal Name - First Name":"Joseph","Legal Name - Last Name":"Jin","Preferred name - e g  traditional name, nickname, alias":"Joe","Use my preferred name":["When talking to me","When writing to me"],"Title":"Mr.","Select only one option":"A lawyer for the complainant","Name of the person who will communicate with the Tribunal, if different from the Complainant":"Joseph Jin","First name":"John","Last name":"Doe","Contact Title":"Mr.","Pronoun":"She","Complainant Contact Mailing address":"123 test Drive","Complainant Contact City":"Burnaby","Complainant Contact Province":"Alberta","Complainant Contact Postal Code":"e3e3e3","Complainant Contact Phone number":"1231231231","Complainant Contact Email":"123@123.ca","Complainant Contact Cell Phone number":"7788887878","Respondents Contact Information":[{"Name of the Respondent":"Respondent 1","Relationship to you":"Boss","Mailing address":"321 test Drive","City:":"Burnaby","PROVINCE":"British Columbia","POSTAL CODE":"V5B1K2","Respondent Contact Phone number":"7788882949","Respondent Contact Cell Phone number":"7785256463","Respondent Contact Email":"res@res.com"},{"Name of the Respondent":"Respondent 2","Relationship to you":"Manager","Mailing address":"3211 Test Ave","City:":"Vancouver","PROVINCE":"British Columbia","POSTAL CODE":"E3E3E3","Respondent Contact Phone number":"2505555555","Respondent Contact Cell Phone number":"2506668484","Respondent Contact Email":"boss@boss.ca"}]},"areaAndGrounds":{"areas":[{"What is the Area of Discrimination?":"Services ","What are the Grounds of Discrimination?":["Family Status","Sex"],"Details - Family Status":"13","Please select which of the following Ground subcategories apply":["Breast-feeding"],"Details - Sex":"2121"},{"What is the Area of Discrimination?":"Employment","If your complaint is about employment, check if it’s about":["other"],"If your complaint is about employment, check if it’s about-Comment":"21231","What are the Grounds of Discrimination?":["Age (19 or over)"],"Details - Age (19 or over)":"2312313123"}]},"detailsOfDiscrimination":{"Describe what your complaint is about in a few words":"This person fired me based on my race. You can give details below.","Describe the harm in a few word":" I lost my job and I felt terrible. You can say what remedy you want below","Explain how the harm relates to the grounds you have selected before":"The words my manager used are slurs about my race","Describe what this Respondent did that harmed you based on the grounds":[{"Respondent":"Respondent 1","Event":"event 1","Date":"2019-05-06"},{"Respondent":"Respondent 2","Event":"event 2","Date":"2020-01-03"}]},"fileInTime":{"There is a one-year time limit for filing a complaint":[{"Respondent name":"Respondent 1","What is the date of the most recent event that you say is discrimination?":"2019-02-02","Did the most recent event happen in the last year?":"Yes"},{"Respondent name":"Respondent 2","What is the date of the most recent event that you say is discrimination?":"2020-02-01","Did the most recent event happen in the last year?":"No"}],"Did every event happen in the last year for all respondents?":"No","Are all the event Related or similar?":"Yes","Explain how the incidents are similar or related":" Explain how the incidents are similar or related ","Explain any gaps between events":"Explain any gaps between events *","Why did you file late?":"Because ....","How will accepting your complaint benefit the public?":"first of all ...","Why would the delay in filing not harm anyone else?":"Because ........ ......"},"otherProceedings":{"Do you have another proceeding about the same events?":"Yes","What kind of proceeding is it?":"Test","What stage is that proceeding at?":"draft","Do you want the Tribunal to wait to deal with your complaint?":"Yes","Explain why you want the Tribunal to wait to deal with your complaint":"because ......."},"remedies":{"Select the kinds of remedies you want":["Order to stop the discrimination"]},"mediation":{"Do you want to attend a mediation?":"Yes"}}`
  );
  show: boolean = false;
  constructor(private missionService: MissionService, private router: Router) {
    this.subscription = missionService.missionAnnounced$.subscribe(
      (allFormData) => {
        console.log("allFormData", allFormData);
        if (allFormData) {
          this.formData = allFormData;
          // this.formData = this.newFormData
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

      this.error = false;
      this.router.navigateByUrl("hrt/thank-you");
    } else {
      this.error = true;
    }
  }
  handleBackBtnClick() {
    this.router.navigateByUrl("hrt/progress");
  }
}
