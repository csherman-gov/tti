export default {
  "pages": [
    {
      "name": "Who experienced discrimination (Complainant)?",
      "elements": [
        {
          "type": "text",
          "name": "Legal Name - First Name",
          "isRequired": true
        },
        {
          "type": "text",
          "name": "Legal Name - Last Name",
          "isRequired": true
        },
        {
          "type": "text",
          "name": "Preferred name - e.g. traditional name, nickname, alias"
        },
        {
          "type": "checkbox",
          "name": "Use my preferred name",
          "choices": [
            {
              "value": "When talking to me",
              "text": "When talking to me"
            },
            {
              "value": "When writing to me",
              "text": "When writing to me"
            },
            {
              "value": "In decision in addition to my legal name",
              "text": "In decision in addition to my legal name"
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "Title",
          "title": "Title",
          "choices": [
            "Mr.",
            "Ms.",
            "Other"
          ]
        },
        {
          "type": "text",
          "name": "Other title",
          "visibleIf": "{Title} = ['item3']"
        }
      ],
      "title": "Who experienced discrimination (Complainant)?"
    },
    {
      "name": "Who will communicate with the Tribunal about this Complaint?",
      "elements": [
        {
          "type": "radiogroup",
          "name": "Select only one option:",
          "choices": [
            {
              "value": "The complainant",
              "text": "The complainant"
            },
            "A lawyer for the complainant",
            "A person in a legal clinic acting for the complainant",
            "Another person – You must file a Form 1.2 with this complaint (attach PDF of form 1.2)"
          ]
        }
      ],
      "title": "Who will communicate with the Tribunal about this Complaint?"
    },
    {
      "name": "Complainant Contact Information",
      "elements": [
        {
          "type": "text",
          "name": "Name of the person who will communicate with the Tribunal, if different from the Complainant"
        },
        {
          "type": "text",
          "name": "First name"
        },
        {
          "type": "text",
          "name": " Last name"
        },
        {
          "type": "radiogroup",
          "name": "Contact Title",
          "title": "Title",
          "choices": [
            "Mr.",
            "Ms.",
            "Other"
          ]
        },
        {
          "type": "radiogroup",
          "name": "Pronoun",
          "choices": [
            "She",
            "He",
            "They",
            "Other"
          ]
        },
        {
          "type": "text",
          "name": "Other pronoun",
          "visibleIf": "{Pronoun} = 'Other'"
        }
      ],
      "visibleIf": "{Select only one option:} = 'A lawyer for the complainant' or {Select only one option:} = 'A person in a legal clinic acting for the complainant' or {Select only one option:} = 'Another person – You must file a Form 1.2 with this complaint (attach PDF of form 1.2)'",
      "title": "Complainant Contact Information"
    },
    {
      "name": "Complainant’s address for Delivery",
      "elements": [
        {
          "type": "html",
          "name": "question1",
          "html": "<p><strong>Purpose of collecting contact information:</strong> The Tribunal and Respondents use your contact information to communicate with you about the complaint. The Tribunal may also use it to conduct surveys to evaluate and improve its services.</p>"
        },
        {
          "type": "html",
          "name": "question3",
          "html": "<p><strong>Mailing address: </strong> You must give a mailing address.</p>"
        },
        {
          "type": "html",
          "name": "question2",
          "html": "<p><strong>Email:</strong>The Tribunal usually communicates via email. If possible, give an email address where all parties can reach you. If you have confidential contact information, do not put it on this form. Put it in your cover email or letter.\n</p>"
        },
        {
          "type": "html",
          "name": "question4",
          "html": "<p><strong>Important information:</strong>A document sent to an address below is deemed to be received by the complainant. You must notify the Tribunal of any change to the address for delivery.\n</p>"
        },
        {
          "type": "text",
          "name": "Complainant Contact Mailing address",
          "title": "Mailing address",
          "isRequired": true
        },
        {
          "type": "text",
          "name": "Complainant Contact City ",
          "width": "30%",
          "title": "City ",
          "isRequired": true
        },
        {
          "type": "dropdown",
          "name": "Complainant Contact Province",
          "startWithNewLine": false,
          "title": "Province",
          "isRequired": true,
          "choices": [
            "Alberta",
            "British Columbia",
            "Manitoba",
            "New Brunswick",
            "Newfoundland and Labrador",
            "Nova Scotia",
            "Northwest Territories",
            "Nunavut",
            "Ontario",
            "Prince Edward Island",
            "Québec",
            "Saskatchewan",
            "Yukon"
          ]
        },
        {
          "type": "text",
          "name": "Complainant Contact Postal Code",
          "width": "30%",
          "startWithNewLine": false,
          "title": "Postal Code",
          "isRequired": true
        },
        {
          "type": "text",
          "name": "Complainant Contact Phone number  ",
          "width": "30%",
          "title": "Phone number  ",
          "isRequired": true
        },
        {
          "type": "text",
          "name": "Complainant Contact Email",
          "width": "40%",
          "title": "Email",
          "isRequired": true
        },
        {
          "type": "text",
          "name": "Complainant Contact Cell Phone number  ",
          "width": "30%",
          "startWithNewLine": false,
          "title": "Cellphone number  "
        },
        {
          "type": "text",
          "name": "Complainant Contact Fax",
          "width": "30%",
          "startWithNewLine": false,
          "title": "Fax"
        }
      ],
      "visibleIf": "{Select only one option:} <> 'The complainant'"
    }
  ]
}