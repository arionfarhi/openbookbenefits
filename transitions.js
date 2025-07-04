const variables = [
["First Name", ""], 
["Last Name", ""], 
  ["Insurance Name", ""], //I find this based on their selection, then shortened
  ["Is Active", ""],
  ["Renewal Date", "01/01/2026"],
  ["Termination Date", ""],
  ["Maximum", ""],
  ["Maximum Used", ""],
  ["Deductible", ""], //ignored for now
  ["Deductible Used", ""], //ignored for now
  ["Prev %", ""],
  ["Basic %", ""],
  ["Major %", ""], //if anything is covered at 0% then it shows up as Not Covered as opposed to 0% - it makes more sense
  ["Not Covered:", ], 
  ["Frequencies:", //the cleaning and exams & xrays will always be there
  ["Cleaning: twice per year"],
  ["Exams & X-Rray: twice per year"] 
  ],
  ["Active Waiting Periods:", /*["Basic: 06/01/2025"]*/ ], //Inputs: Prev, Basic, Major 
  ["Ortho Lifetime Maximum", "no info"],
  ["Insurance Phone Number", "their customer service number"]
  ];

  /* global variables needed */
var rootCanalMajor = false; //records if root canal is basic or major
var extMajor = false; //records if extraction is basic or major
var userIsPremium = false;
var DOB = ""; //global variable - to use for sending email
let procedureCoverages = //records if these procedures are not covered
{
  rootCanal: null,
  extraction: null,
  bridges: null,
  dentures: null,
  crowns: null,
  implants: null,
  deepCleaning: null
};
let procedureFrequencies = {
  rootCanals: null,
  extractions: null,
  bridges: null,
  dentures: null,
  crowns: null,
  implants: null,
  deepCleanings: null
};
let waitingPeriods = {
  preventive: null,
  basic: null,
  major: null
};



/*FOR TESTING!*/
document.addEventListener('DOMContentLoaded', function()
{
  variables[0][1] = "Arion";
  variables[1][1] = "Farhi";
  DOB = "04/18/02"
  variables[2][1] = "Delta Dental";
  variables[6][1] = "$1000";
  variables[7][1] = "$200";
  maximumRemaining = "$800";
  percentOfMaxUsed = "80%"
  variables[10][1] = "100%";
  variables[11][1] = "80%";
  variables[12][1] = "50%";
  userIsPremium = false;
  //console.log(variables);

  document.getElementsByClassName("content")[0].style.opacity = "0";
  document.getElementsByClassName("content-bottom")[0].style.opacity = "0";
  document.getElementById("submit").style.opacity = "0";
  document.getElementById("main-form").style.pointerEvents = "none";
  document.getElementById("submit").style.pointerEvents = "none";
  document.getElementsByClassName("second-content")[0].style.pointerEvents = "auto";
  document.getElementById("tabs-div").style.pointerEvents = "auto";
  document.getElementById("tabs-div").style.zIndex = "9999";
  document.getElementsByClassName("content")[0].style.zIndex = "-999";
  document.getElementsByClassName("content-bottom")[0].style.zIndex = "-999";
  document.getElementsByClassName("second-content")[0].style.zIndex = "999";
  showNext();
});

const insuranceCompanies = [
"Delta Dental of Michigan", "Delta Dental of Alabama", "Delta Dental of Florida", "Delta Dental of Georgia", "Delta Dental of Louisiana", "Delta Dental of Mississippi", "Delta Dental of Montana", "Delta Dental of Nevada", "Delta Dental of Texas", "Delta Dental of Utah", "Delta Dental of Minnesota", "Delta Dental of New Jersey", "Delta Dental of Connecticut", "Delta Dental of Illinois", "Delta Dental of Maryland", "Delta Dental of Pennsylvania", "Delta Dental of Oregon", "Delta Dental of Alaska", "Delta Dental of New York", "Delta Dental of Colorado", "Delta Dental of Arkansas", "Delta Dental of North Carolina", "Delta Dental of Northeast", "Delta Dental of Iowa - Dental Wellness Plan", "Delta Dental of District of Colombia", "Delta Dental of California", "Delta Dental of Washington", "Delta Dental of Massachusetts", "Delta Dental of Missouri", "Delta Dental of Virginia", "Delta Dental of Ohio", "Delta Dental of Kansas", "Delta Dental of Wisconsin", "Delta Dental of Tennessee", "Delta Dental of Kentucky", "Delta Dental of Idaho", "Delta Dental of Arizona", "Delta Dental of Indiana", "Delta Dental of Rhode Island", "Delta Dental of Iowa", "Delta Dental of New Mexico", "Delta Dental of Oklahoma", "Delta Dental of Nebraska", "Delta Dental of Delaware", "Delta Dental of Wyoming", "Delta Dental of South Carolina", "Delta Dental of West Virginia", "Delta Dental of Puerto Rico", "Delta Dental of South Dakota", "Metlife", "Aetna", "Cigna", "UnitedHealthCare", "DentaQuest", "Guardian", "Humana", "Ameritas", "United Concordia - Dental Plus", "United Concordia - Tricare Dental", "United Concordia Fee-for-Service ", "Blue Cross of Idaho", "Blue Cross Blue Shield of Texas", "Anthem Blue Cross Blue Shield of California", "Blue Cross Blue Shield of Illinois", "Horizon Blue Cross Blue Shield of New Jersey", "Blue Cross Blue Shield Massachusetts", "Anthem Blue Cross Blue Shield of New York", "Wellmark Blue Cross Blue Shield of Iowa and South Dakota", "Anthem Blue Cross Blue Shield of Indiana", "Blue Cross Blue Shield of North Carolina", "Blue Cross Blue Shield of Michigan", "Independence Blue Cross Pennsylvania", "Premera Blue Cross of Washington", "Anthem Blue Cross Blue Shield of Virginia", "Blue Cross Blue Shield Of Alabama", "Anthem Blue Cross Blue Shield of Colorado", "Anthem Blue Cross Blue Shield of Georgia", "Anthem Blue Cross Blue Shield Ohio", "Blue Cross Blue Shield of South Carolina", "Blue Cross Blue Shield of Florida", "Anthem Blue Cross Blue Shield of Connecticut", "Anthem Blue Cross Blue Shield Dental", "Premera Blue Cross Alaska", "Anthem Blue Cross Blue Shield Missouri", "Capital Blue Cross of Pennsylvania", "CareFirst Blue Cross Blue Shield Maryland", "Blue Cross Blue Shield of Kansas City", "Anthem Blue Cross Blue Shield Nevada", "Blue Cross Blue Shield of Arkansas", "Blue Cross Blue Shield of Michigan/Medicare Advantage", "Anthem Blue Cross Blue Shield New Hampshire", "Anthem Blue Cross Blue Shield of Wisconsin", "Anthem Blue Cross Blue Shield of Maine", "Blue Cross Blue Shield of Wyoming", "Blue Cross Blue Shield of Nebraska", "Blue Cross Blue Shield of Vermont", "Blue Cross Blue Shield Rhode Island", "Blue Cross Blue Shield of Kansas", "Blue Cross Blue Shield of New Mexico", "Highmark Blue Cross Blue Shield of West Virginia", "Blue Cross Blue Shield of North Dakota", "Blue Cross Blue Shield of Montana", "Blue Cross Illinois Medicare Advantage", "Excellus Blue Cross Blue Shield New York Rochester Area", "Blue Cross Community Options", "Highmark Blue Cross Blue Shield (NY) - Medicaid and CHP", "Blue Cross Blue Shield New Jersey", "Arizona Blue (Blue Cross Blue Shield Arizona)", "Highmark Blue Cross Blue Shield (NY) - Medicaid and CHP", "Blue Cross Blue Shield Texas Medicaid STAR CHIP", "Excellus Blue Cross Blue Shield New York Central", "CareFirst BlueCross BlueShield District of Columbia (NCA)", "Blue Cross Blue Shield of Minnesota - Commercial and Medicare", "Blue Cross Blue Shield Oklahoma", "Blue Cross Blue Shield of Tennessee", "Regence BlueCross BlueShield of Oregon", "Anthem BlueCross BlueShield Kentucky", "Blue Cross Blue Shield Louisiana Blue Advantage", "Highmark Blue Cross Blue Shield of Delaware", "Blue Cross Blue Shield of Minnesota Blue Plus Medicaid", "Blue Cross Blue Shield Louisiana", "Blue Cross Blue Shield Mississippi", "Anthem Blue Cross of New York Dental", "Excellus Blue Cross Blue Shield New York Utica Watertown", "Blue Cross Blue Shield of Hawaii", "Anthem Blue Cross Blue Shield (Ohio Medicaid)", "Blue Cross Blue Shield Anthem Vivity", "Blue Cross New York Northeastern", "Empire Blue Cross Blue Shield New York", "Blue Cross Blue Shield of Kentucky (FEP)", "Blue Cross Blue Shield of Ohio (FEP)", "Blue Cross Blue Shield Minnesota", "Blue Cross Blue Shield of Minnesota (FEP)", "Blue Cross Blue Shield of Washington DC", "CareFirst BlueCross BlueShield Community Health Plan Maryland", "BCBS Michigan and Blue Care Network", "Blue Cross Community Centennial", "Blue Cross Blue Shield Pennsylvania Northeast", "BlueCross BlueShield of Puerto Rico (Triple-S Salud)", "BlueCross BlueShield of Tennessee (Chattanooga HMO Plans)", "HealthNow BlueCross BlueShield New York Northeastern", "Highmark Blue Cross Blue Shield Pennsylvania Institutional", "Blue Cross Blue Shield FEP BlueDental", "Excellus BlueCross BlueShield of New York", "Blue Cross Blue Shield Delaware", "BlueCross BlueShield of South Carolina Federal Employee Program", "Blue Cross Blue Shield of Connecticut- Family Plan", "Regence BlueCross BlueShield of Utah", "Blue Cross Blue Shield Pennsylvania Northwest", "Blue Cross Blue Shield South Carolina State Health Plan", "Blue Cross Blue Shield South Carolina Medicare Blue", "Mountain State Blue Cross Blue Shield West Virginia", "Delta Dental of North Dakota", "Delta Dental of Maine", "Delta Dental of New Hampshire", "Delta Dental of Vermont", "Principal Financial Group", "Sunlife", "Assurant Health", "Kaiser Permanente Northern California", "Kaiser Permanente Health Plan Hawaii", "Kaiser Permanente Georgia", "Ambetter", "HAP CareSource MI Health Link (Medicare-Medicaid Plan)", "Maine Medicaid", "Humana - Healthy Horizons (Ohio Medicaid)", "Medicaid Washington", "Medicaid Massachusetts", "Indiana Medicaid", "Medicaid Oregon", "Medicaid Texas - CHIP", "North Carolina Medicaid", "Highmark Blue Cross Blue Shield (NY) - Medicaid and CHP", "Medicaid Illinois", "Medicaid Rhode Island", "Medicaid Idaho", "United HealthCare Ohio Medicaid Managed Care Entity (MCE)", "Blue Cross Blue Shield Texas Medicaid STAR CHIP", "Centene Ohio Medicaid Managed Care Entity", "AmeriHealth Caritas Ohio Medicaid MCE", "Medicaid Louisiana", "Aetna OhioRise Medicaid Managed Care Entity", "Medicaid California Medi-Cal", "Medicaid New York", "Medicaid Texas - Acute", "West Virginia Medicaid", "CareSource Medicaid Ohio", "Blue Cross Blue Shield of Minnesota Blue Plus Medicaid", "Medicaid Kentucky", "Medicaid South Carolina", "Medicaid New Hampshire", "Medicaid Alabama", "Molina Ohio Medicaid Managed Care Entity", "Medicaid Vermont", "Medicaid South Dakota", "Anthem Blue Cross Blue Shield (Ohio Medicaid)", "Medicaid Missouri", "Medicaid Michigan", "Medicaid Ohio", "Medicaid Connecticut", "Medicaid Alaska", "Amerigroup-Medicaid", "Medicaid Arizona", "Medicaid Georgia", "Medicaid Maryland", "Medicaid Nevada", "Medicaid Pennsylvania", "Medicaid Oklahoma", "Medicaid Virginia", "Texas Children's Health Plan (Medicaid) CHIP", "Medicaid Montana", "Medicaid Tennessee", "Medicaid Florida", "Medicaid Iowa", "Medicaid of Virginia", "Medicaid Wisconsin", "Medicaid New Jersey", "Medicaid Tennessee BlueCare TennCare Select", "Aetna Medicaid Illinois", "McLaren Medicaid", "Medicaid Maryland Department of Health and Mental Hygiene", "Medicaid New Mexico", "CareSource Ohio Medicaid Managed Care Entity", "FirstCare Star Medicaid", "Medicaid North Dakota", "Medicaid Hawaii", "Medicaid Kansas", "Medicaid Arkansas", "Medicaid District of Columbia", "CareSource of Michigan Medicaid", "Medicaid Delaware", "Medicaid of Kentucky (Region 3 - Doral Dental)", "Christus Health Plan Medicaid", "Medicaid Wyoming", "Medicaid Louisiana Durable Medical Equipment Claims", "Medicaid Mississippi", "Blue Cross Blue Shield of Texas"
];

const insuranceCompaniesWCodes = [
["Delta Dental of Michigan", "DELTA"],
["Delta Dental of Alabama", "94276"],
["Delta Dental of Florida", "94276"],
["Delta Dental of Georgia", "94276"],
["Delta Dental of Louisiana", "94276"],
["Delta Dental of Mississippi", "94276"],
["Delta Dental of Montana", "94276"],
["Delta Dental of Nevada", "94276"],
["Delta Dental of Texas", "94276"],
["Delta Dental of Utah", "94276"],
["Delta Dental of Minnesota", "07000"],
["Delta Dental of New Jersey", "22189"],
["Delta Dental of Connecticut", "22189"],
["Delta Dental of Illinois", "05030"],
["Delta Dental of Maryland", "23166"],
["Delta Dental of Pennsylvania", "23166"],
["Delta Dental of Oregon", "CDOR1"],
["Delta Dental of Alaska", "CDOR1"],
["Delta Dental of New York", "11198"],
["Delta Dental of Colorado", "DDPCO"],
["Delta Dental of Arkansas", "CDAR1"],
["Delta Dental of North Carolina", "56101"],
["Delta Dental of Northeast", "02027"],
["Delta Dental of Iowa - Dental Wellness Plan", "CDIAM"],
["Delta Dental of District of Colombia", "52147"],
["Delta Dental of California", "77777"],
["Delta Dental of Washington", "91062"],
["Delta Dental of Massachusetts", "04614"],
["Delta Dental of Missouri", "43090"],
["Delta Dental of Virginia", "CDVA1"],
["Delta Dental of Ohio", "DELTO"],
["Delta Dental of Kansas", "CDKS1"],
["Delta Dental of Wisconsin", "39069"],
["Delta Dental of Tennessee", "DELTN"],
["Delta Dental of Kentucky", "CDKY1"],
["Delta Dental of Idaho", "82029"],
["Delta Dental of Arizona", "86027"],
["Delta Dental of Indiana", "DELTI"],
["Delta Dental of Rhode Island", "05029"],
["Delta Dental of Iowa", "CDIA1"],
["Delta Dental of New Mexico", "DELTM"],
["Delta Dental of Oklahoma", "DELTOK"],
["Delta Dental of Nebraska", "072027"],
["Delta Dental of Delaware", "51022"],
["Delta Dental of Wyoming", "CDWY1"],
["Delta Dental of South Carolina", "43091"],
["Delta Dental of West Virginia", "31096"],
["Delta Dental of Puerto Rico", "66043"],
["Delta Dental of South Dakota", "54097"],
["Metlife", "10134"],
["Aetna", "60054"],
["Cigna", "62308"],
["UnitedHealthCare", "87726"],
["DentaQuest", "CX014"],
["Guardian", "64246"],
["Humana", "61101"],
["Ameritas", "AMTAS00425"],
["United Concordia - Dental Plus", "CX013"],
["United Concordia - Tricare Dental", "CX002"],
["United Concordia Fee-for-Service ", "CX007"],
["Blue Cross of Idaho", "BLUEC"],
["Blue Cross Blue Shield of Texas", "G84980"],
["Anthem Blue Cross Blue Shield of California", "040"],
["Blue Cross Blue Shield of Illinois", "G00621"],
["Horizon Blue Cross Blue Shield of New Jersey", "22099"],
["Blue Cross Blue Shield Massachusetts", "SB700"],
["Anthem Blue Cross Blue Shield of New York", "803"],
["Wellmark Blue Cross Blue Shield of Iowa and South Dakota", "88848"],
["Anthem Blue Cross Blue Shield of Indiana", "130"],
["Blue Cross Blue Shield of North Carolina", "BCSNC"],
["Blue Cross Blue Shield of Michigan", "00710"],
["Independence Blue Cross Pennsylvania", "100337"],
["Premera Blue Cross of Washington", "00430"],
["Anthem Blue Cross Blue Shield of Virginia", "423"],
["Blue Cross Blue Shield Of Alabama", "00510BC"],
["Anthem Blue Cross Blue Shield of Colorado", "050"],
["Anthem Blue Cross Blue Shield of Georgia", "00601"],
["Anthem Blue Cross Blue Shield Ohio", "00834"],
["Blue Cross Blue Shield of South Carolina", "00401"],
["Blue Cross Blue Shield of Florida", "BCBSF"],
["Anthem Blue Cross Blue Shield of Connecticut", "00060"],
["Anthem Blue Cross Blue Shield Dental", "84105"],
["Premera Blue Cross Alaska", "00934"],
["Anthem Blue Cross Blue Shield Missouri", "241"],
["Capital Blue Cross of Pennsylvania", "100952"],
["CareFirst Blue Cross Blue Shield Maryland", "00580"],
["Blue Cross Blue Shield of Kansas City", "47171"],
["Anthem Blue Cross Blue Shield Nevada", "00265"],
["Blue Cross Blue Shield of Arkansas", "00520"],
["Blue Cross Blue Shield of Michigan/Medicare Advantage", "BBMDQ"],
["Anthem Blue Cross Blue Shield New Hampshire", "00770"],
["Anthem Blue Cross Blue Shield of Wisconsin", "450"],
["Anthem Blue Cross Blue Shield of Maine", "180"],
["Blue Cross Blue Shield of Wyoming", "53767"],
["Blue Cross Blue Shield of Nebraska", "77780"],
["Blue Cross Blue Shield of Vermont", "BCBSVT"],
["Blue Cross Blue Shield Rhode Island", "SB870"],
["Blue Cross Blue Shield of Kansas", "47163"],
["Blue Cross Blue Shield of New Mexico", "00790"],
["Highmark Blue Cross Blue Shield of West Virginia", "54828"],
["Blue Cross Blue Shield of North Dakota", "55891"],
["Blue Cross Blue Shield of Montana", "G00751"],
["Blue Cross Illinois Medicare Advantage", "66006"],
["Excellus Blue Cross Blue Shield New York Rochester Area", "SB804"],
["Blue Cross Community Options", "MCDIL"],
["Highmark Blue Cross Blue Shield (NY) - Medicaid and CHP", "246"],
["Blue Cross Blue Shield New Jersey", "100046"],
["Arizona Blue (Blue Cross Blue Shield Arizona)", "53589"],
["Highmark Blue Cross Blue Shield (NY) - Medicaid and CHP", "BCBSCAIDWNY"],
["Blue Cross Blue Shield Texas Medicaid STAR CHIP", "HCSV2"],
["Excellus Blue Cross Blue Shield New York Central", "SB805"],
["CareFirst BlueCross BlueShield District of Columbia (NCA)", "SB580"],
["Blue Cross Blue Shield of Minnesota - Commercial and Medicare", "00720"],
["Blue Cross Blue Shield Oklahoma", "00840"],
["Blue Cross Blue Shield of Tennessee", "SB890"],
["Regence BlueCross BlueShield of Oregon", "00851"],
["Anthem BlueCross BlueShield Kentucky", "00660"],
["Blue Cross Blue Shield Louisiana Blue Advantage", "72107"],
["Highmark Blue Cross Blue Shield of Delaware", "00570"],
["Blue Cross Blue Shield of Minnesota Blue Plus Medicaid", "00726"],
["Blue Cross Blue Shield Louisiana", "53120"],
["Blue Cross Blue Shield Mississippi", "00230"],
["Anthem Blue Cross of New York Dental", "CBNY1"],
["Excellus Blue Cross Blue Shield New York Utica Watertown", "SB806"],
["Blue Cross Blue Shield of Hawaii", "100937"],
["Anthem Blue Cross Blue Shield (Ohio Medicaid)", "0002937"],
["Blue Cross Blue Shield Anthem Vivity", "10993"],
["Blue Cross New York Northeastern", "100954"],
["Empire Blue Cross Blue Shield New York", "00803R"],
["Blue Cross Blue Shield of Kentucky (FEP)", "TLU90"],
["Blue Cross Blue Shield of Ohio (FEP)", "TLU91"],
["Blue Cross Blue Shield Minnesota", "220"],
["Blue Cross Blue Shield of Minnesota (FEP)", "TLU22"],
["Blue Cross Blue Shield of Washington DC", "TLY47"],
["CareFirst BlueCross BlueShield Community Health Plan Maryland", "45281"],
["BCBS Michigan and Blue Care Network", "00210"],
["Blue Cross Community Centennial", "GNMMD1"],
["Blue Cross Blue Shield Pennsylvania Northeast", "100900"],
["BlueCross BlueShield of Puerto Rico (Triple-S Salud)", "BCPRC"],
["BlueCross BlueShield of Tennessee (Chattanooga HMO Plans)", "SB891"],
["HealthNow BlueCross BlueShield New York Northeastern", "SB800"],
["Highmark Blue Cross Blue Shield Pennsylvania Institutional", "54771I"],
["Blue Cross Blue Shield FEP BlueDental", "BCAFD"],
["Excellus BlueCross BlueShield of New York", "10323"],
["Blue Cross Blue Shield Delaware", "100026"],
["BlueCross BlueShield of South Carolina Federal Employee Program", "00402"],
["Blue Cross Blue Shield of Connecticut- Family Plan", "00700"],
["Regence BlueCross BlueShield of Utah", "00910"],
["Blue Cross Blue Shield Pennsylvania Northwest", "100338"],
["Blue Cross Blue Shield South Carolina State Health Plan", "400"],
["Blue Cross Blue Shield South Carolina Medicare Blue", "00C63"],
["Mountain State Blue Cross Blue Shield West Virginia", "MTNST"],
["Delta Dental of North Dakota", "07000"],
["Delta Dental of New Hampshire", "02027"],
["Delta Dental of Vermont", "02027"],
["Principal Financial Group", "00143MC"],
["Sunlife", "70408"],
["Assurant Health", "70408"],
["Kaiser Permanente Northern California", "KSRCN"],
["Kaiser Permanente Health Plan Hawaii", "94123"],
["Kaiser Permanente Georgia", "21313"],
["Ambetter", "68069"],
["HAP CareSource MI Health Link (Medicare-Medicaid Plan)", "MIMCRCS1"],
["Maine Medicaid", "SKME0"],
["Humana - Healthy Horizons (Ohio Medicaid)", "61103"],
["Medicaid Washington", "A1DWA"],
["Medicaid Massachusetts", "100199"],
["Indiana Medicaid", "IHCP"],
["Medicaid Oregon", "AIDOR"],
["Medicaid Texas - CHIP", "10186"],
["North Carolina Medicaid", "NCMCD"],
["Highmark Blue Cross Blue Shield (NY) - Medicaid and CHP", "246"],
["Medicaid Illinois", "IL621"],
["Medicaid Rhode Island", "SKRI0"],
["Medicaid Idaho", "ID"],
["United HealthCare Ohio Medicaid Managed Care Entity (MCE)", "88337"],
["Blue Cross Blue Shield Texas Medicaid STAR CHIP", "HCSV2"],
["Centene Ohio Medicaid Managed Care Entity", "0004202"],
["AmeriHealth Caritas Ohio Medicaid MCE", "35374"],
["Medicaid Louisiana", "100193"],
["Aetna OhioRise Medicaid Managed Care Entity", "45221"],
["Medicaid California Medi-Cal", "100065"],
["Medicaid New York", "100231"],
["Medicaid Texas - Acute", "86916"],
["West Virginia Medicaid", "100305"],
["CareSource Medicaid Ohio", "31114"],
["Blue Cross Blue Shield of Minnesota Blue Plus Medicaid", "00726"],
["Medicaid Kentucky", "KYMEDICAID"],
["Medicaid South Carolina", "SCMED"],
["Medicaid New Hampshire", "100228"],
["Medicaid Alabama", "SKAL0"],
["Molina Ohio Medicaid Managed Care Entity", "0007316"],
["Medicaid Vermont", "100302"],
["Medicaid South Dakota", "SD"],
["Anthem Blue Cross Blue Shield (Ohio Medicaid)", "0002937"],
["Medicaid Missouri", "100211"],
["Medicaid Michigan", "D00111"],
["Medicaid Ohio", "MMISODFS"],
["Medicaid Connecticut", "CTMCD"],
["Medicaid Alaska", "SKAK0"],
["Amerigroup-Medicaid", "AGPMEDICAID"],
["Medicaid Arizona", "AZ"],
["Medicaid Georgia", "GAMEDICAID"],
["Medicaid Maryland", "100198"],
["Medicaid Nevada", "NV"],
["Medicaid Pennsylvania", "236003113"],
["Medicaid Oklahoma", "SKOK0"],
["Medicaid Virginia", "10198"],
["Texas Children's Health Plan (Medicaid) CHIP", "76048"],
["Medicaid Montana", "MT"],
["Medicaid Tennessee", "TN"],
["Medicaid Florida", "77027"],
["Medicaid Iowa", "100171"],
["Medicaid of Virginia", "CKVA1"],
["Medicaid Wisconsin", "100306"],
["Medicaid New Jersey", "100229"],
["Medicaid Tennessee BlueCare TennCare Select", "MC390"],
["Aetna Medicaid Illinois", "26337"],
["McLaren Medicaid", "3833C"],
["Medicaid Maryland Department of Health and Mental Hygiene", "526002033"],
["Medicaid New Mexico", "77048"],
["CareSource Ohio Medicaid Managed Care Entity", "0003150"],
["FirstCare Star Medicaid", "94998"],
["Medicaid North Dakota", "NDDHS"],
["Medicaid Hawaii", "SKHI0"],
["Medicaid Kansas", "00005"],
["Medicaid Arkansas", "ARMCD"],
["Medicaid District of Columbia", "100121"],
["CareSource of Michigan Medicaid", "MIMCDCS1"],
["Medicaid Delaware", "SKDE0"],
["Medicaid of Kentucky (Region 3 - Doral Dental)", "CKKY3"],
["Christus Health Plan Medicaid", "45210"],
["Medicaid Wyoming", "77046"],
["Medicaid Louisiana Durable Medical Equipment Claims", "SKLA1"],
["Medicaid Mississippi", "100209"],
["Blue Cross Blue Shield of Texas", "G84980"]
];

function shortenNames(name) //keep adding on
{
  if (name.toLowerCase().includes("delta"))
  {
    return "Delta Dental";
  }
  else if (name.toLowerCase().includes("blue cross"))
  {
    return "Blue Cross";
  }
  else if (name.toLowerCase().includes("metlife"))
  {
    return "Metlife";
  }
  else if (name.toLowerCase().includes("medicaid"))
  {
    return "Medicaid";
  }
  else if (name.toLowerCase().includes("united concordia"))
  {
    return "United Concordia";
  }
  else
  {
    return name;
  }
}


function runBackend()
{
  const name = nameInput.value;
  const [firstName, lastName] = name.split(" ");
  variables[0][1] = firstName || "";
  variables[1][1] = lastName || "";
  DOB = document.getElementById("dob").value;
  const memberID = document.getElementById("memberId").value;
  const insName = document.getElementById("insuranceName").value;
  const shortName = shortenNames(insName);
  let code = "";
  for (let i = 0; i < insuranceCompaniesWCodes.length; i++)
  {
    if (insuranceCompaniesWCodes[i][0].toLowerCase() === insName.toLowerCase())
    {
      code = insuranceCompaniesWCodes[i][1];
      break;
    }
  }

  //return fetch('http://localhost:3000/check-eligibility',  //for testing with backend.js (not in production)!
  return fetch('https://gutqn1nstl.execute-api.us-east-1.amazonaws.com/prod/check-eligibility', //for production with API gateway and lambda!
  {
    method: 'POST',
    headers:
    {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
    {
      controlNumber: "123456789",
      tradingPartnerServiceId: code,
      encounter:
      {
        dateOfService: (() =>
        {
          const today = new Date();
          const year = today.getFullYear();
          const month = String(today.getMonth() + 1).padStart(2, '0');
          const day = String(today.getDate()).padStart(2, '0');
          return `${year}${month}${day}`;
        })(),
        serviceTypeCodes: ["35"]
      },
      provider:
      {
        organizationName: "Avalon Dental",
        npi: "1639235187",
        taxId: "217-63-5324"
      },
      subscriber:
      {
        memberId: memberID,
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: (() =>
        {
          let [m, d, y] = DOB.split('/').map(Number);
          y = y < 100 ? (y <= 30 ? 2000 + y : 1900 + y) : y;
          return `${y}${String(m).padStart(2, '0')}${String(d).padStart(2, '0')}`;
        })()
      }
    })
  })
  .then(res => res.json())
  .then(data =>
  {
    console.log(JSON.stringify(data, null, 2));

    if (data.isPremium) 
    {
      userIsPremium = true;
      showPremiumBanner();
    } 
    else if (data.fromCache)
    {
     showCacheBanner(data.cachedAt, variables[4][1]); // Only show cache banner for free users
   }
   else {}


    // Handle cached data first - skip ALL API processing
  if (data.fromCache && data.cachedVariables) 
  {
    console.log('Using cached variables, skipping all API processing');

      // Restore cached variables
      for (let i = 0; i < data.cachedVariables.length && i < variables.length; i++) {
        variables[i] = [...data.cachedVariables[i]];
      }
      
      // Recalculate the parsed values
      maximumRemaining = parseInt(variables[6][1].replace("$", "")) - parseInt(variables[7][1].replace("$", ""));
      maximumRemaining = `$${maximumRemaining}`;
      percentOfMaxUsed = (maximumRemaining.replace("$", "") / parseInt(variables[6][1].replace("$", ""))) * 100 + "%";
      if (percentOfMaxUsed == "0%") {
        percentOfMaxUsed = "2%";
      }
      deductibleRemaining = parseInt(variables[8][1].replace("$", "")) - parseInt(variables[9][1].replace("$", ""));
      deductibleRemaining = `$${deductibleRemaining}`;
      if (decrementDate(variables[4][1]).split("/")[0] == "12" && decrementDate(variables[4][1]).split("/")[1] == "31") {
        calendarYear = true;
      }

      return data; // Return early, skip everything below
    }

    // EXISTING CODE: Only runs for non-cached API responses
    const stringData = JSON.stringify(data, null, 2);

    if (stringData.includes("Patient Birth Date Does Not Match That for the Patient on the Database") || stringData.includes("the length of the value must be `>=") || stringData.includes("The payer or clearinghouse rejected the request with validation errors.") || stringData.includes("Please Correct and Resubmit") || stringData.includes("the value must match the pattern"))
    {
      if (memberID.toLowerCase() !== "bypass")
      {
        variables[2][1] = "Not Found";
        variables[3][1] = "Active";
      }
    }
    else if (stringData.includes("Rate limit exceeded: Maximum") && stringData.includes("per hour"))
    {
      variables[3][1] = "Timeout";
    }
    else if (stringData.includes("Rate limit exceeded: Maximum") && stringData.includes("per day"))
    {
      variables[3][1] = "TimeoutDay";
    }
    else if (stringData.includes("Daily cost limit exceeded"))
    {
      variables[3][1] = "TimeoutAll";
    }
    else
    {
        //assign dental insurance name
        variables[2][1] = shortName;

        if (data.planStatus && data.planStatus.length > 0)
        {
          const status = data.planStatus[0].status; // This gets "Active Coverage"
          variables[3][1] = status === "Active Coverage" ? "Active" : "Inactive";

          if (variables[3][1] == "Inactive")
          {
            return;
          }
        }

        //find renewal date
        if (data.planDateInformation)
        {
          let endDate;

          // Handle new format with separate planEnd field
          if (data.planDateInformation.planEnd)
          {
            endDate = data.planDateInformation.planEnd;
          }
          // Handle old format with combined plan field
          else if (data.planDateInformation.plan)
          {
            endDate = data.planDateInformation.plan.split('-')[1];
          }

          if (endDate)
          {
            const formatDate = (dateStr) => `${dateStr.slice(4,6)}/${dateStr.slice(6,8)}/${dateStr.slice(0,4)}`;
            const formatDatePlusOneDay = (dateStr) =>
            {
              const year = parseInt(dateStr.slice(0, 4));
              const month = parseInt(dateStr.slice(4, 6)) - 1; // months are 0-indexed
              const day = parseInt(dateStr.slice(6, 8));
              const date = new Date(year, month, day);
              date.setDate(date.getDate() + 1);
              return `${(date.getMonth()+1).toString().padStart(2,'0')}/${date.getDate().toString().padStart(2,'0')}/${date.getFullYear()}`;
            };

            const endYear = parseInt(endDate.substring(0, 4));
            const renewalDate = formatDatePlusOneDay(endDate);
            endDate = formatDate(endDate);
            variables[4][1] = renewalDate;
            variables[5][1] = endDate;
          }
        }

        // Process benefits information
        if (data.benefitsInformation)
        {
          const benefits = data.benefitsInformation;

          // Find maximum benefit (individual dental care)
          const maxBenefit = benefits.find(b =>
            b.code === "F" &&
            b.name === "Limitations" &&
            b.coverageLevelCode === "IND" &&
            b.serviceTypeCodes && (b.serviceTypeCodes.includes("35") || b.serviceTypeCodes.includes("24") || b.serviceTypeCodes.includes("26") || b.serviceTypeCodes.includes("38") || b.serviceTypeCodes.includes("30")) //general dental codes
            &&
            (b.timeQualifierCode === "23" || b.timeQualifierCode === "22" || b.timeQualifierCode === "25") //contract or calendar year (some have just one)
            ) || benefits.find(b =>
            b.code === "F" &&
            b.name === "Limitations" &&
            b.timeQualifierCode === "22" &&
            b.compositeMedicalProcedureIdentifier?.procedureCode === "D0150"
            );

            if (maxBenefit)
            {
              variables[6][1] = `$${parseInt(maxBenefit.benefitAmount)}`;
            }

          // Find maximum used (remaining amount)
          const remainingBenefit = benefits.find(b =>
            b.code === "F" &&
            b.name === "Limitations" &&
            b.coverageLevelCode === "IND" &&
            b.serviceTypeCodes && (b.serviceTypeCodes.includes("35") || b.serviceTypeCodes.includes("24") || b.serviceTypeCodes.includes("26") || b.serviceTypeCodes.includes("38") || b.serviceTypeCodes.includes("30")) &&
            b.timeQualifierCode === "29" //remaining benefit
            );

          if (remainingBenefit && maxBenefit)
          {
            const total = parseInt(maxBenefit.benefitAmount);
            const remaining = parseInt(remainingBenefit.benefitAmount);
            const used = total - remaining;
            variables[7][1] = `$${used}`;
          }
          else //if cannot find anything, assume $0 used
          {
            variables[7][1] = `$0`;
          }

          // Find deductible
          const deductible = benefits.find(b =>
            b.code === "C" &&
            b.name === "Deductible" &&
            b.coverageLevelCode === "IND" &&
            b.serviceTypeCodes && (b.serviceTypeCodes.includes("35") || b.serviceTypeCodes.includes("24") || b.serviceTypeCodes.includes("26") || b.serviceTypeCodes.includes("38") || b.serviceTypeCodes.includes("30")) &&
            (b.timeQualifierCode === "23" || b.timeQualifierCode === "22") //contract or calendar year (some have just one)
            );

          if (deductible)
          {
            variables[8][1] = `$${deductible.benefitAmount}`;
          }

          // Find deductible used (remaining amount)
          const remainingDeductible = benefits.find(b =>
            b.code === "C" &&
            b.name === "Deductible" &&
            b.coverageLevelCode === "IND" &&
            b.serviceTypeCodes && (b.serviceTypeCodes.includes("35") || b.serviceTypeCodes.includes("24") || b.serviceTypeCodes.includes("26") || b.serviceTypeCodes.includes("38")) &&
            b.timeQualifierCode === "29"
            );

          if (remainingDeductible && deductible)
          {
            const total = parseInt(deductible.benefitAmount);
            const remaining = parseInt(remainingDeductible.benefitAmount);
            const used = total - remaining;
            variables[9][1] = `$${used}`;
          }

          //get ortho information
          const orthodonticLifetime = benefits.find(b =>
            b.code === "F" &&
            b.name === "Limitations" &&
            b.coverageLevelCode === "IND" &&
            b.serviceTypeCodes && b.serviceTypeCodes.includes("38") &&
            b.timeQualifierCode === "32" && // Lifetime
            b.inPlanNetworkIndicatorCode === "Y"
            );

          if (orthodonticLifetime)
          {
            const amount = Math.round(parseFloat(orthodonticLifetime.benefitAmount));
            variables[16][1] = `a $${amount} lifetime maximum`;
          }

          // Find customer service phone number
          if (data.payer && data.payer.contactInformation && data.payer.contactInformation.contacts)
          {
            const phoneContact = data.payer.contactInformation.contacts.find(contact =>
              contact.communicationMode === "Telephone"
              );
            if (phoneContact && phoneContact.communicationNumber)
            {
              let phoneNumber = phoneContact.communicationNumber;

              // Remove all non-digit characters
              const digitsOnly = phoneNumber.replace(/\D/g, '');

              // Format as (XXX) XXX-XXXX if we have 10 digits
              if (digitsOnly.length === 10)
              {
                phoneNumber = `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6)}`;
              }
              // Format as X-XXX-XXX-XXXX if we have 11 digits (with country code)
              else if (digitsOnly.length === 11 && digitsOnly.startsWith('1'))
              {
                phoneNumber = `1-(${digitsOnly.slice(1, 4)}) ${digitsOnly.slice(4, 7)}-${digitsOnly.slice(7)}`;
              }
              // Otherwise, keep the original format

              variables[17][1] = phoneNumber;
            }
          }

          // Extract coverage percentages from co-insurance data - only in network
          const coInsuranceData = benefits.filter(b => b.code === "A" && b.name === "Co-Insurance" && (b.inPlanNetworkIndicatorCode === "Y" || b.inPlanNetworkIndicatorCode === "W"));
          let preventiveSet = false;
          let basicSet = false;
          let basicHighest = 0;
          var basicBackup = 0; //if nothing found
          let majorSet = false;
          let rootCanalCoverage = null;
          let extractionCoverage = null;

          function extractFrequencyFromBenefit(benefit)
          {
            if (!benefit.benefitsServiceDelivery || benefit.benefitsServiceDelivery.length === 0)
            {
              return null;
            }

            const delivery = benefit.benefitsServiceDelivery[0];
            const quantity = delivery.quantity;
            const numPeriods = delivery.numOfPeriods;
            const timePeriodQualifier = delivery.timePeriodQualifier;
            const timePeriodQualifierCode = delivery.timePeriodQualifierCode;

            if (!quantity) return null;

            // Handle the case where we have numPeriods (like "24" months = "2 years")
            if (numPeriods && timePeriodQualifier)
            {
              const periods = parseInt(numPeriods);
              const timeUnit = timePeriodQualifier.toLowerCase();

              if (quantity == 1)
              {
                // Convert months to years when appropriate
                if (timeUnit === "month" || timeUnit === "months")
                {
                  if (periods === 12) return "once per year";
                  if (periods === 24) return "once per 2 years";
                  if (periods === 36) return "once per 3 years";
                  if (periods === 60) return "once per 5 years";
                  if (periods > 12 && periods % 12 === 0)
                  {
                    return `once per ${periods / 12} years`;
                  }
                  return `once per ${periods} months`;
                }
                return `once per ${periods} ${timeUnit}`;
              }
              else
              {
                return `${quantity} times per ${periods} ${timeUnit}`;
              }
            }

            // Handle simple cases without numPeriods
            if (timePeriodQualifier)
            {
              const period = timePeriodQualifier.toLowerCase();
              if (quantity == 1)
              {
                return `once per ${period}`;
              }
              else
              {
                return `${quantity} times per ${period}`;
              }
            }

            // Fallback for timePeriodQualifierCode
            if (timePeriodQualifierCode)
            {
              const timePeriodMap = {
                "32": "lifetime",
                "34": "month",
                "23": "year",
                "22": "calendar year",
                "25": "contract year"
              };

              const periodText = timePeriodMap[timePeriodQualifierCode] || "period";

              if (quantity == 1)
              {
                return `once per ${periodText}`;
              }
              else
              {
                return `${quantity} times per ${periodText}`;
              }
            }

            return null;
          }

          function extractWaitingPeriodFromDescription(description)
          {
            // Look for patterns like "6 months", "12 months", "18 months", etc.
            const monthMatch = description.match(/(\d+)\s*months?/i);
            if (monthMatch)
            {
              const months = parseInt(monthMatch[1]);
              // Calculate the date when waiting period ends
              const today = new Date();
              const endDate = new Date(today.getFullYear(), today.getMonth() + months, today.getDate());
              const month = String(endDate.getMonth() + 1).padStart(2, '0');
              const day = String(endDate.getDate()).padStart(2, '0');
              const year = endDate.getFullYear();
              return `${month}/${day}/${year}`;
            }

            return null;
          }

          for (const benefit of coInsuranceData)
          {
            // Break early if all sections are already set
            if (preventiveSet && basicSet && majorSet)
            {
              break;
            }

            const patientPercent = parseFloat(benefit.benefitPercent || 0);
            const insurancePercent = Math.round((1 - patientPercent) * 100);

            if (benefit.serviceTypes || benefit.compositeMedicalProcedureIdentifier)
            {
              const serviceTypes = benefit.serviceTypes ? benefit.serviceTypes.join(", ").toLowerCase() : "";
              const procedureCode = benefit.compositeMedicalProcedureIdentifier?.procedureCode || "";

              // Check procedure codes for better categorization
              const preventiveCodes = ['D0120', 'D0140', 'D0150', 'D0210', 'D0270', 'D0272', 'D0274', 'D0330', 'D1110', 'D1120', 'D1206', 'D1208', 'D1351'];
              const basicCodes = ["D2140", "D2150", "D2160", "D2161", "D2330", "D2331", "D2332", "D2335", "D2391", "D2392", "D2393", "D2394", "D2910", "D2915", "D2920", "D2929", "D2930", "D2931", "D2932", "D2933", "D2934", "D2940", "D2950", "D2951", "D2952", "D2953", "D2955", "D2957", "D2960", "D2961", "D2962", "D2980", "D2981", "D2982", "D2983", "D2990"];
              const majorCodes = ['D2720', 'D2721', 'D2722', 'D2740', 'D2750', 'D2751', 'D2752', 'D2753', 'D2790', 'D2791', 'D2792', 'D2794'];

              if (!preventiveSet && (preventiveCodes.includes(procedureCode) ||
                serviceTypes.includes("preventive") ||
                serviceTypes.includes("diagnostic") ||
                serviceTypes.includes("routine")))
              {
                variables[10][1] = `${insurancePercent}%`;
                preventiveSet = true;
              }
              else if (!basicSet && serviceTypes.includes("restorative") || serviceTypes.includes("endodontics"))
              {
                if (insurancePercent > basicHighest) //get the highest number
                {
                  variables[11][1] = `${insurancePercent}%`;
                  basicHighest = insurancePercent;
                }
              }
              else if (majorCodes.includes(procedureCode) || serviceTypes.includes("prosthodontics") || serviceTypes.includes("crowns") || serviceTypes.includes("bridges") || serviceTypes.includes("dentures"))
              { //takes lowest non-zero value, unless there are none
                if (!majorSet)
                {
                  // First major service found - set it
                  variables[12][1] = `${insurancePercent}%`;
                  majorSet = true;
                }
                else
                {
                  // Compare with existing value
                  const currentMajorPercent = parseInt(variables[12][1].replace('%', ''));

                  if (currentMajorPercent === 0)
                  {
                    // Current is zero, take any non-zero value
                    if (insurancePercent > 0)
                    {
                      variables[12][1] = `${insurancePercent}%`;
                    }
                  }
                  else if (insurancePercent > 0 && insurancePercent < currentMajorPercent)
                  {
                    // Take the lower non-zero value
                    variables[12][1] = `${insurancePercent}%`;
                  }
                  else if (insurancePercent === 0 && currentMajorPercent > 0)
                  {
                    // Keep the non-zero value, don't replace with zero
                    // Do nothing
                  }
                }
              }
              if (basicCodes.includes(procedureCode)) //record highest out of all basic codes
              {
                const currentBackupPercent = basicBackup ? parseInt(basicBackup.replace('%', '')) : 0;
                if (insurancePercent > currentBackupPercent)
                {
                  basicBackup = `${insurancePercent}%`;
                }
              }

              // Capture specific coverages to see if not covered or has frequency
              //check for root canals
              if (serviceTypes.includes("endodontics") || procedureCode === "D3310" || procedureCode === "D3320" || procedureCode === "D3330")
              {
                if (rootCanalCoverage === null || insurancePercent > rootCanalCoverage)
                {
                  rootCanalCoverage = insurancePercent;
                }

                // Check for frequency information
                if (benefit.benefitsServiceDelivery && procedureFrequencies.rootCanals === null)
                {
                  const frequency = extractFrequencyFromBenefit(benefit);
                  if (frequency)
                  {
                    procedureFrequencies.rootCanals = frequency;
                  }
                }
              }
              //check for extractions
              if (serviceTypes.includes("oral surgery") || procedureCode === "D7140")
              {
                if (extractionCoverage === null || insurancePercent > extractionCoverage)
                {
                  extractionCoverage = insurancePercent;
                }

                // Check for frequency information
                if (benefit.benefitsServiceDelivery && procedureFrequencies.extractions === null)
                {
                  const frequency = extractFrequencyFromBenefit(benefit);
                  if (frequency)
                  {
                    procedureFrequencies.extractions = frequency;
                  }
                }
              }
              // Check for bridges
              if (serviceTypes.includes("prosthodontics") || serviceTypes.includes("bridges") || procedureCode.startsWith("D6") || procedureCode === "D6210" || procedureCode === "D6240" || procedureCode === "D6250")
              {
                if (procedureCoverages.bridges === null || insurancePercent > procedureCoverages.bridges)
                {
                  procedureCoverages.bridges = insurancePercent;
                }

                // Check for frequency information
                if (benefit.benefitsServiceDelivery && procedureFrequencies.bridges === null)
                {
                  const frequency = extractFrequencyFromBenefit(benefit);
                  if (frequency)
                  {
                    procedureFrequencies.bridges = frequency;
                  }
                }
              }
              // Check for dentures
              if (serviceTypes.includes("dentures") || serviceTypes.includes("removable prosthodontics") || procedureCode.startsWith("D51") || procedureCode.startsWith("D52") || procedureCode.startsWith("D53") || procedureCode.startsWith("D54"))
              {
                if (procedureCoverages.dentures === null || insurancePercent > procedureCoverages.dentures)
                {
                  procedureCoverages.dentures = insurancePercent;
                }

                // Check for frequency information
                if (benefit.benefitsServiceDelivery && procedureFrequencies.dentures === null)
                {
                  const frequency = extractFrequencyFromBenefit(benefit);
                  if (frequency)
                  {
                    procedureFrequencies.dentures = frequency;
                  }
                }
              }
              // Check for crowns
              if (serviceTypes.includes("crowns") || serviceTypes.includes("prosthodontics") || procedureCode === "D2740")
              {
                if (procedureCoverages.crowns === null || insurancePercent > procedureCoverages.crowns)
                {
                  procedureCoverages.crowns = insurancePercent;
                }

                // Check for frequency information
                if (benefit.benefitsServiceDelivery && procedureFrequencies.crowns === null)
                {
                  const frequency = extractFrequencyFromBenefit(benefit);
                  if (frequency)
                  {
                    procedureFrequencies.crowns = frequency;
                  }
                }
              }
              // Check for implants
              if (serviceTypes.includes("implant") || procedureCode.startsWith("D60") || procedureCode.startsWith("D61"))
              {
                if (procedureCoverages.implants === null || insurancePercent > procedureCoverages.implants)
                {
                  procedureCoverages.implants = insurancePercent;
                }

                // Check for frequency information
                if (benefit.benefitsServiceDelivery && procedureFrequencies.implants === null)
                {
                  const frequency = extractFrequencyFromBenefit(benefit);
                  if (frequency)
                  {
                    procedureFrequencies.implants = frequency;
                  }
                }
              }
              // Check for deep cleanings
              if (serviceTypes.includes("periodontics") || serviceTypes.includes("scaling") || serviceTypes.includes("deep cleaning") || procedureCode === "D4341" || procedureCode === "D4342" || procedureCode === "D4910")
              {
                if (procedureCoverages.deepCleaning === null || insurancePercent > procedureCoverages.deepCleaning)
                {
                  procedureCoverages.deepCleaning = insurancePercent;
                }

                // Check for frequency information
                if (benefit.benefitsServiceDelivery && procedureFrequencies.deepCleanings === null)
                {
                  const frequency = extractFrequencyFromBenefit(benefit);
                  if (frequency)
                  {
                    procedureFrequencies.deepCleanings = frequency;
                  }
                }
              }
            }

            // Check for waiting periods in additional information
            if (benefit.additionalInformation)
            {
              benefit.additionalInformation.forEach(info =>
              {
                const description = info.description?.toLowerCase() || '';

                if (description.includes('waiting period') || description.includes('waiting') || description.includes('wait'))
                {
                  // Determine category based on service types or procedure codes
                  const serviceTypes = benefit.serviceTypes ? benefit.serviceTypes.join(", ").toLowerCase() : "";
                  const procedureCode = benefit.compositeMedicalProcedureIdentifier?.procedureCode || "";

                  // Check if it's preventive
                  if (serviceTypes.includes("preventive") || serviceTypes.includes("diagnostic") ||
                    preventiveCodes.includes(procedureCode))
                  {
                    if (waitingPeriods.preventive === null)
                    {
                      const waitingInfo = extractWaitingPeriodFromDescription(description);
                      if (waitingInfo)
                      {
                        waitingPeriods.preventive = waitingInfo;
                      }
                    }
                  }
                  // Check if it's basic
                  else if (serviceTypes.includes("restorative") || serviceTypes.includes("endodontics") ||
                    basicCodes.includes(procedureCode))
                  {
                    if (waitingPeriods.basic === null)
                    {
                      const waitingInfo = extractWaitingPeriodFromDescription(description);
                      if (waitingInfo)
                      {
                        waitingPeriods.basic = waitingInfo;
                      }
                    }
                  }
                  // Check if it's major
                  else if (serviceTypes.includes("prosthodontics") || majorCodes.includes(procedureCode))
                  {
                    if (waitingPeriods.major === null)
                    {
                      const waitingInfo = extractWaitingPeriodFromDescription(description);
                      if (waitingInfo)
                      {
                        waitingPeriods.major = waitingInfo;
                      }
                    }
                  }
                }
              });
            }
          }

          //if no basic percentage found, use backup by using procedureCode
          if (variables[11][1] === "")
          {
            variables[11][1] = basicBackup;
          }

          //see if root canal are major or basic
          const majorPercentage = parseInt(variables[12][1].replace('%', '')) || 0;
          const basicPercentage = parseInt(variables[11][1].replace('%', '')) || 0;
          if (majorPercentage !== basicPercentage) // Only set boolean flags if major and basic percentages are different
          {
            if (rootCanalCoverage !== null && rootCanalCoverage === majorPercentage)
            {
              rootCanalMajor = true;
            }
            if (extractionCoverage !== null && extractionCoverage === majorPercentage)
            {
              extMajor = true;
            }
          }

          //see if other procedures are not covered
          const procedureNames = {
            rootCanal: "Root Canals",
            extraction: "Extractions",
            bridges: "Bridges",
            dentures: "Dentures",
            crowns: "Crowns",
            implants: "Implants",
            deepCleaning: "Deep Cleanings"
          };
          Object.keys(procedureCoverages).forEach(procedureKey => // Check each procedure for 0% coverage
          {
            const coverage = procedureCoverages[procedureKey];

            const procedureName = procedureNames[procedureKey];

              // If coverage is exactly 0%, add to not covered list
              if (coverage === 0)
              {
                // Find the "Not Covered" array in variables
                for (let i = 0; i < variables.length; i++)
                {
                  if (variables[i][0] === "Not Covered:")
                  {
                    // Check if not already in the list
                    const alreadyExists = variables[i].slice(1).some(item =>
                    {
                      const itemName = Array.isArray(item) ? item[0] : item;
                      return itemName === procedureName;
                    });

                    if (!alreadyExists)
                    {
                      variables[i].push([procedureName]);
                    }
                    break;
                  }
                }
              }
            });

          //If Basic section is 0% covered, add all basic procedures to not covered
          if (basicPercentage === 0)
          {
           const basicProcedures = ["Fillings", "Extractions", "Root Canals", "Deep Cleanings"];

           basicProcedures.forEach(procedureName =>
           {
             // Find the "Not Covered" array in variables
             for (let i = 0; i < variables.length; i++)
             {
               if (variables[i][0] === "Not Covered:")
               {
                 // Check if not already in the list
                 const alreadyExists = variables[i].slice(1).some(item =>
                 {
                   const itemName = Array.isArray(item) ? item[0] : item;
                   return itemName === procedureName;
                 });

                 if (!alreadyExists)
                 {
                   variables[i].push([procedureName]);
                 }
                 break;
               }
             }
           });
         }
         // If Major section is 0% covered, add all major procedures to not covered
         if (majorPercentage === 0)
         {
           const majorProcedures = ["Crowns", "Bridges", "Dentures", "Implants"];

           majorProcedures.forEach(procedureName =>
           {
             // Find the "Not Covered" array in variables
             for (let i = 0; i < variables.length; i++)
             {
               if (variables[i][0] === "Not Covered:")
               {
                 // Check if not already in the list
                 const alreadyExists = variables[i].slice(1).some(item =>
                 {
                   const itemName = Array.isArray(item) ? item[0] : item;
                   return itemName === procedureName;
                 });

                 if (!alreadyExists)
                 {
                   variables[i].push([procedureName]);
                 }
                 break;
               }
             }
           });
         }


         //Check Frequency further 
         benefits.forEach(benefit =>
         {
           const frequency = extractFrequencyFromBenefit(benefit);
           if (!frequency) return;
           const serviceTypes = benefit.serviceTypes ? benefit.serviceTypes.join(", ").toLowerCase() : "";
           const procedureCode = benefit.compositeMedicalProcedureIdentifier?.procedureCode || "";

           // Check for root canals/endodontics
           if (serviceTypes.includes("endodontics"))
           {
             if (procedureFrequencies.rootCanals === null)
             {
               procedureFrequencies.rootCanals = frequency;
             }
           }
           // Check for extractions/oral surgery
           if (serviceTypes.includes("oral surgery") || procedureCode === "D7140")
           {
             if (procedureFrequencies.extractions === null)
             {
               procedureFrequencies.extractions = frequency;
             }
           }
           // Check for bridges
           if (serviceTypes.includes("prosthodontics") || serviceTypes.includes("bridges") || procedureCode.startsWith("D6"))
           {
             if (procedureFrequencies.bridges === null)
             {
               procedureFrequencies.bridges = frequency;
             }
           }
           // Check for dentures
           if (serviceTypes.includes("dentures") || serviceTypes.includes("removable prosthodontics") ||
             procedureCode.startsWith("D51") || procedureCode.startsWith("D52") ||
             procedureCode.startsWith("D53") || procedureCode.startsWith("D54"))
           {
             if (procedureFrequencies.dentures === null)
             {
               procedureFrequencies.dentures = frequency;
             }
           }
           // Check for crowns
           if (serviceTypes.includes("crowns") || serviceTypes.includes("prosthodontics") || procedureCode === "D2740")
           {
             if (procedureFrequencies.crowns === null)
             {
               procedureFrequencies.crowns = frequency;
             }
           }
           // Check for implants
           if (serviceTypes.includes("implant") || procedureCode.startsWith("D60") || procedureCode.startsWith("D61"))
           {
             if (procedureFrequencies.implants === null)
             {
               procedureFrequencies.implants = frequency;
             }
           }
           // Check for deep cleanings/periodontics
           if (serviceTypes.includes("periodontics") || serviceTypes.includes("scaling") ||
             serviceTypes.includes("deep cleaning"))
           {
             if (procedureFrequencies.deepCleanings === null)
             {
               procedureFrequencies.deepCleanings = frequency;
             }
           }
         });


         // Add frequencies to the variables array
         if (Object.values(procedureFrequencies).some(freq => freq !== null))
         {
           // Find the frequencies array in variables
           for (let i = 2; i < variables.length; i++)
           {
             if (variables[i][0] === "Frequencies:")
             {
               // Add any found frequencies
               Object.entries(procedureFrequencies).forEach(([procedure, frequency]) =>
               {
                 if (frequency)
                 {
                   let procedureName = procedure.charAt(0).toUpperCase() + procedure.slice(1);
                   if (procedure === 'rootCanals') procedureName = 'Root Canals';
                   if (procedure === 'deepCleanings') procedureName = 'Deep Cleanings';

                   variables[i].push([`${procedureName}: ${frequency}`]);
                 }
               });
               break;
             }
           }
         }

         // Add waiting periods to the variables array
         if (Object.values(waitingPeriods).some(period => period !== null))
         {
           // Find the waiting periods array in variables
           for (let i = 0; i < variables.length; i++)
           {
             if (variables[i][0] === "Active Waiting Periods:")
             {
               // Add any found waiting periods
               Object.entries(waitingPeriods).forEach(([category, endDate]) =>
               {
                 if (endDate)
                 {
                   const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
                   variables[i].push([`${categoryName}: ${endDate}`]);
                 }
               });
               break;
             }
           }
         }


         //this prints out all not covered
         /*
         const notCoveredProcedures = [];
         coInsuranceData.forEach(benefit =>
         {
           if (parseFloat(benefit.benefitPercent || 0) === 1.0)
           {
             // This means 100% patient responsibility = not covered
             if (benefit.compositeMedicalProcedureIdentifier)
             {
               notCoveredProcedures.push(benefit.compositeMedicalProcedureIdentifier.procedureCode);
             }
           }
         });

         if (notCoveredProcedures.length > 0)
         {
           variables[13] = ["Not Covered:", ...notCoveredProcedures.map(p => [p])];
         }
         */
       }
     }

     //PARSE VARIABLES

     console.log(variables);

     maximumRemaining = parseInt(variables[6][1].replace("$", "")) - parseInt(variables[7][1].replace("$", "")); //see how much $ is left
     maximumRemaining = `$${maximumRemaining}`;
     percentOfMaxUsed = (maximumRemaining.replace("$", "") / parseInt(variables[6][1].replace("$", ""))) * 100 + "%";
     if (percentOfMaxUsed == "0%")
     {
       percentOfMaxUsed = "2%"; //styles a little better
     }
     deductibleRemaining = parseInt(variables[8][1].replace("$", "")) - parseInt(variables[9][1].replace("$", "")); //see how much $ is left
     deductibleRemaining = `$${deductibleRemaining}`;
     if (decrementDate(variables[4][1]).split("/")[0] == "12" && decrementDate(variables[4][1]).split("/")[1] == "31")
     {
       calendarYear = true;
     }

     /* If successful and has renewal date, send the parsed variables back to cache */
     if (variables[3][1] === "Active" && variables[4][1]) 
     { 
       fetch('https://gutqn1nstl.execute-api.us-east-1.amazonaws.com/prod/check-eligibility', 
       {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify({
           firstName: firstName,
           lastName: lastName,
           memberId: memberID,
           dateOfBirth: DOB,
           variables: variables // Send the parsed variables array
         })
       }).catch(err => {
         console.log('Cache storage failed:', err);
         // Don't fail the user experience if caching fails
       });
     }

     return data; // Return the data for further processing
   })
.catch(err =>
{
 console.log(err.message);
 variables[2][1] = "Not Found";
 throw err;
});
}




var maximumRemaining = "";
var percentOfMaxUsed = "";
var deductibleRemaining = "";
var calendarYear = false;


function showLoading()
{
  clearExistingErrors();

  // Start the loading animation
  loadingTimer = setTimeout(() =>
  {
    document.getElementsByClassName("loading-container")[0].style.opacity = 1;
    const dots = document.querySelectorAll(".loading-dot");
    dots.forEach(dot =>
    {
      dot.style.animation = "none";
    });
    dots[0].offsetWidth;
    dots[1].offsetWidth;
    dots[2].offsetWidth;
    dots[0].style.animation = "dot1 1s infinite 0s";
    dots[1].style.animation = "dot2 1s infinite 0.33s";
    dots[2].style.animation = "dot3 1s infinite 0.66s";
  }, 500);

  // Wait for the backend response
  runBackend()
  .then(data =>
  {
      // ALWAYS hide loading regardless of cache or API
      if (loadingTimer) {
        clearTimeout(loadingTimer);
      }
      document.getElementsByClassName("loading-container")[0].style.opacity = "0";
      doneLoading = true;

      setTimeout(() =>
      {
        // Check if insurance is found based on the response
        if (data.fromCache) 
        {
          showNext();
        }
        else if (variables[3][1] == "Timeout") {
          showInsuranceError(3);
        }
        else if (variables[3][1] == "TimeoutDay") {
          showInsuranceError(5);
        }
        else if (variables[3][1] == "TimeoutAll") {
          showInsuranceError(4);
        }
        else if (variables[3][1] != "Active") {
          showInsuranceError(2);
        }
        else if ((variables[2][1] == "Not Found")) {
          showInsuranceError(1);
        }
        else {
          showNext();
        }
      }, 300);
    })
  .catch(err =>
  {
      // ALWAYS hide loading on error too
      if (loadingTimer) {
        clearTimeout(loadingTimer);
      }
      document.getElementsByClassName("loading-container")[0].style.opacity = "0";
      doneLoading = true;

      setTimeout(() =>
      {
        showInsuranceError(1);
      }, 300);
    });
}




/* LOADING IN ANIMATION AND CURSOR AND RIPPLE EFFECT */
document.addEventListener('DOMContentLoaded', function()
{
  const heading = document.querySelector('h2');
  const formContainer = document.getElementById('form-sans-submit');
  const submitButton = document.getElementById('submit');

  //Style for transitions
  const style = document.createElement('style');
  style.textContent = `
  @keyframes selectPulse {
    0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(41, 128, 185, 1); background-color: white; color: black; }
    50% { transform: scale(1.1); box-shadow: 0 0 0 10px rgba(41, 128, 185, 0); background-color: #333; color: white; }
    100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(41, 128, 185, 0); background-color: black; color: white; }
  }
  #typed-text {
    display: inline-block;
    margin: 0;
    padding: 0;
    font-weight: 750;
    color: rgba(41, 128, 185, 0.64); 
    position: relative;
    letter-spacing: 0.5px;
    transition: color 0.3s ease;
  }
  .cursor-modern {
    display: inline-block;
    width: 2px; /* Thin line */
    height: 1.1em; /* Match text height */
    background-color: #5DADE2;
    margin-left: 2px;
    vertical-align: middle;
    animation: cursor-pulse 1.75s infinite ease-in-out;
  }
  @keyframes cursor-pulse {
    50% { opacity: 1; transform: scaleY(1); }
    0%, 100% { opacity: 0.5; transform: scaleY(0.9); }
  }`;
  document.head.appendChild(style);

  // Initialize HTML without the cursor

  setTimeout(function()
  {
    setTimeout(function()
    {
      setTimeout(function()
      {
        // Wait for submit button animation to complete before showing cursor
        setTimeout(function()
        {
          document.getElementById('cursor-container').innerHTML = "<span class='cursor-modern'></span>";
          setTimeout(startTypingAnimation, 1000); //first word delay
        }, 8000); //cursor delay
      }, 400); //continue button delay
    }, 800); //form button delay
  }, 500); //beginning of first animation delay

  function startTypingAnimation()
  {
    const typedTextElement = document.getElementById('typed-text');
    let cursor = document.getElementsByClassName("cursor-modern")[0];
    let wordIndex = 0;
    let charIndex = typedTextElement.textContent.length; // Start from end of current word
    let isDeleting = true; // Start with deleting
    let typingSpeed = 100; // Faster initial deleting speed
    let isShowingCursor = false;

    function typeLoop()
    {
      const wordsToType = ["free.", "tips.", "clarity.", "copays.", "providers.", "verification."];
      const currentWord = wordsToType[wordIndex];

      if (isDeleting)
      {
        // Keep cursor visible during deletion
        cursor.style.display = "inline-block";
        isShowingCursor = true;
      }
      else if (!isDeleting && charIndex < currentWord.length)
      {
        // Keep cursor visible during typing
        cursor.style.display = "inline-block";
        isShowingCursor = true;
      }
      else if (isDeleting && charIndex === 0)
      {
        // Keep cursor visible when word is fully deleted
        cursor.style.display = "inline-block";
        isShowingCursor = true;
      }

      // Typing speed logic
      if (isDeleting)
      {
        typingSpeed = 125; // Deleting speed
      }
      else if (charIndex === currentWord.length)
      {
        typingSpeed = 10000; // Pause before deleting
      }
      else
      {
        typingSpeed = 200; // Normal typing speed
      }

      // Typing/deleting logic
      if (!isDeleting && charIndex < currentWord.length)
      {
        typedTextElement.textContent += currentWord.charAt(charIndex);
        charIndex++;
      }
      else if (isDeleting && charIndex > 0)
      {
        typedTextElement.textContent = typedTextElement.textContent.substring(0, charIndex - 1);
        charIndex--;
      }
      else if (isDeleting && charIndex === 0)
      {
        // Finished deleting, move to next word
        isDeleting = false;
        wordIndex = (wordIndex + 1) % wordsToType.length;
        typingSpeed = 1000; // Brief pause before typing next word
      }
      else if (!isDeleting && charIndex === currentWord.length)
      {
        // Finished typing, wait then start deleting
        isDeleting = true;
        // Hide cursor after typing is complete until just before deletion
        setTimeout(() =>
        {
          cursor.style.display = "none";
          isShowingCursor = false;
        }, 750);
        setTimeout(() =>
        {
          cursor.style.display = "inline-block";
          isShowingCursor = true;
        }, 13500); //1.5 seconds before running
      }

      setTimeout(typeLoop, typingSpeed);
    }
    // Start the animation immediately
    typeLoop();
  }
});

document.addEventListener('DOMContentLoaded', function()
{
  // Get the submit button
  const submitButton = document.getElementById('submit');

  // Add ripple container to the button
  const rippleContainer = document.createElement('div');
  rippleContainer.className = 'ripple-container';
  submitButton.appendChild(rippleContainer);

  // Function to create ripple effect
  function createRipple(event)
  {
    // Remove any existing ripples
    const existingRipples = rippleContainer.querySelectorAll('.ripple');
    existingRipples.forEach(ripple =>
    {
      ripple.remove();
    });

    // Create new ripple element
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    rippleContainer.appendChild(ripple);

    // Get position and size data
    const buttonRect = submitButton.getBoundingClientRect();
    const diameter = Math.max(buttonRect.width, buttonRect.height);
    const radius = diameter / 2;

    // Get coordinates for the ripple center
    // For touch events, use the first touch point
    let x, y;

    if (event.touches && event.touches[0])
    {
      // Touch event
      x = event.touches[0].clientX - buttonRect.left;
      y = event.touches[0].clientY - buttonRect.top;
    }
    else
    {
      // Mouse event
      x = event.clientX - buttonRect.left;
      y = event.clientY - buttonRect.top;
    }

    // If coordinates are not available (keyboard event or programmatic trigger)
    // center the ripple
    if (isNaN(x) || isNaN(y))
    {
      x = buttonRect.width / 2;
      y = buttonRect.height / 2;
    }

    // Style the ripple with the calculated dimensions
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${x - radius}px`;
    ripple.style.top = `${y - radius}px`;

    // Add active class to the button (optional but adds to the effect)
    submitButton.classList.add('button-pressed');

    // Remove ripple after animation completes
    setTimeout(() =>
    {
      ripple.remove();

      // Remove active class if button is no longer being pressed
      if (!submitButton.matches(':active'))
      {
        submitButton.classList.remove('button-pressed');
      }
    }, 750); // Match the ripple animation duration
  }

  // Add event listeners for both mouse and touch events
  submitButton.addEventListener('mousedown', createRipple);
  submitButton.addEventListener('touchstart', createRipple,
  {
    passive: true
  });

  // Remove active class when button is released
  submitButton.addEventListener('mouseup', () =>
  {
    setTimeout(() =>
    {
      submitButton.classList.remove('button-pressed');
    }, 150);
  });

  submitButton.addEventListener('touchend', () =>
  {
    setTimeout(() =>
    {
      submitButton.classList.remove('button-pressed');
    }, 150);
  });
});

/* Make it so when I press go the form gets submitted */
const inputs = document.querySelectorAll('#main-form input');
inputs.forEach(input =>
{
  input.addEventListener('keydown', function(event)
  {
    if (event.key === 'Enter')
    {
      event.preventDefault(); // stop form from refreshing or submitting the wrong way
      input.blur();
      formValidation(); // manually call your handler
    }
  });
});



/* Fixes autofill glitch with background color */
// Improved autofill detection for focus changes
document.addEventListener('DOMContentLoaded', function()
{
  const inputs = document.querySelectorAll('#main-form input');

  inputs.forEach(input =>
  {
    // When an input gets focus, check if it was autofilled
    input.addEventListener('focus', function()
    {
      // Small delay to let autofill complete
      setTimeout(() =>
      {
        if (this.value)
        {
          this.classList.add('has-autofill-value');
        }
      }, 10);
    });

    // When input loses focus, check if it still has value
    input.addEventListener('blur', function()
    {
      if (this.value)
      {
        this.classList.add('has-autofill-value');
      }
      else
      {
        this.classList.remove('has-autofill-value');
      }
    });

    // Regular input changes
    input.addEventListener('input', function()
    {
      if (this.value)
      {
        this.classList.add('has-autofill-value');
      }
      else
      {
        this.classList.remove('has-autofill-value');
      }
    });
  });

  // Detect autofill completion and force focus state
  document.addEventListener('change', function(e)
  {
    if (e.target.matches('#main-form input'))
    {
      // After autofill, find the focused element
      setTimeout(() =>
      {
        const focusedElement = document.activeElement;
        if (focusedElement && focusedElement.matches('#main-form input'))
        {
          focusedElement.classList.add('force-focus-state');

          // Remove the class when focus changes
          focusedElement.addEventListener('blur', function()
          {
            this.classList.remove('force-focus-state');
          },
          {
            once: true
          });
        }
      }, 50);
    }
  });
});

/* Make "How Does This Work" display popup */
function showHowItWorks(event)
{
  event.preventDefault();
  event.stopPropagation();

  const learnMoreLink = document.getElementById('learn-more-link');
  const learnMoreContainer = document.getElementById('learn-more-container');
  let tooltip = document.querySelector('#custom-learn-more-tooltip');

  // Create the tooltip if it doesn't exist
  if (!tooltip)
  {
    // Create the tooltip with custom ID
    tooltip = document.createElement('div');
    tooltip.id = 'custom-learn-more-tooltip';

    // Apply all styling directly
    tooltip.style.position = 'fixed';
    tooltip.style.bottom = '40px';
    tooltip.style.left = '50%';
    tooltip.style.transform = 'translateX(-50%)';
    tooltip.style.width = '300px';
    tooltip.style.padding = '14px 30px 14px 18px';
    tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
    tooltip.style.color = 'white';
    tooltip.style.borderRadius = '8px';
    tooltip.style.fontSize = '13px';
    tooltip.style.lineHeight = '1.5';
    tooltip.style.fontWeight = "400";
    tooltip.style.zIndex = '999999';
    tooltip.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
    tooltip.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    tooltip.style.opacity = '0';
    tooltip.style.fontFamily = 'Montserrat';
    tooltip.style.textAlign = 'center';
    tooltip.style.display = 'none';

    // Add content with close button
    const closeBtn = document.createElement('span');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '-7.5px';
    closeBtn.style.right = '7.5px';
    closeBtn.style.fontSize = '40px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.color = '#fff';
    closeBtn.style.lineHeight = '1.4';
    closeBtn.style.fontWeight = 'normal';
    closeBtn.onclick = function()
    {
      tooltip.style.opacity = '0';
      tooltip.style.transform = 'translateX(-50%) scale(0.95)';
      setTimeout(() =>
      {
        tooltip.style.display = 'none';
        // Remove bold when closing via X
      }, 300);
      learnMoreLink.style.fontWeight = '500';
    };

    const content = document.createElement('div');
    content.innerHTML = 'We fetch your insurance details through an insurance API (that is HIPAA and PHI compliant) and transform them into a simple, easy-to-understand format. We do not store, sell, or share any data.<br><br>Click on <span style="font-weight: 700">How openbook Works</span> in the menu for more information.';

    // Add arrow/tail pointing down
    const arrow = document.createElement('div');
    arrow.style.position = 'absolute';
    arrow.style.bottom = '-8px';
    arrow.style.left = '50%';
    arrow.style.transform = 'translateX(-50%)';
    arrow.style.width = '0';
    arrow.style.height = '0';
    arrow.style.borderLeft = '8px solid transparent';
    arrow.style.borderRight = '8px solid transparent';
    arrow.style.borderTop = '8px solid rgba(0, 0, 0, 0.85)';

    tooltip.appendChild(closeBtn);
    tooltip.appendChild(content);
    tooltip.appendChild(arrow);
    document.body.appendChild(tooltip);
  }

  // Toggle tooltip and text bold state
  if (tooltip.style.display === 'block')
  {
    tooltip.style.opacity = '0';
    tooltip.style.transform = 'translateX(-50%) scale(0.95)';
    setTimeout(() =>
    {
      tooltip.style.display = 'none';
    }, 300);
    // Remove bold when closing
    learnMoreLink.style.fontWeight = '500';
  }
  else
  {
    tooltip.style.display = 'block';
    setTimeout(() =>
    {
      tooltip.style.opacity = '1';
      tooltip.style.transform = 'translateX(-50%) scale(1)';
      // Add subtle pulse animation
      tooltip.style.animation = 'customPulse 2s ease-in-out infinite';
    }, 10);
    // Make text bold when opening
    learnMoreLink.style.fontWeight = '700';
  }

  // Add custom pulse animation if it doesn't exist
  if (!document.querySelector('#custom-pulse-style'))
  {
    const style = document.createElement('style');
    style.id = 'custom-pulse-style';
    style.textContent = `
    @keyframes customPulse {
      0% { transform: translateX(-50%) scale(1); }
      50% { transform: translateX(-50%) scale(1.01); }
      100% { transform: translateX(-50%) scale(1); }
    }
    `;
    document.head.appendChild(style);
  }

  // Hide tooltip when clicking anywhere else
  function hideTooltip(e)
  {
    if (tooltip.style.display === 'block' && !learnMoreContainer.contains(e.target) && !tooltip.contains(e.target))
    {
      tooltip.style.opacity = '0';
      tooltip.style.transform = 'translateX(-50%) scale(0.95)';
      setTimeout(() =>
      {
        tooltip.style.display = 'none';
      }, 300);
      learnMoreLink.style.fontWeight = '500';
    }
  }

  // Remove any existing listeners and add new one
  document.removeEventListener('click', window.customTooltipHide);
  window.customTooltipHide = hideTooltip;
  document.addEventListener('click', window.customTooltipHide);
}

/* Make the "Learn more" text in the form paragraph open hamburger menu directly to "How openbook Works" section */
function openHowItWorksFromForm(event)
{
  event.preventDefault();
  event.stopPropagation();

  const menu = document.getElementById('mobile-menu');
  const menuButton = document.querySelector('.menu-button');
  const hamburger = menuButton.querySelector('.hamburger');

  // Open the menu if it's not already open
  if (!menu.classList.contains('show'))
  {
    menu.classList.add('show');
    hamburger.classList.add('active');
    document.body.style.touchAction = "none";
  }

  // Directly show the "How openbook Works" content without any animations
  // First, hide all menu items
  const menuItems = menu.querySelectorAll('.menu-item');
  menuItems.forEach(menuItem =>
  {
    menuItem.style.display = 'none';
  });

  // Remove any existing content wrapper
  const existingWrapper = menu.querySelector('.menu-content-wrapper');
  if (existingWrapper)
  {
    existingWrapper.remove();
  }

  // Create and show the "How openbook Works" section directly
  showMenuSection("How openbook Works");
}

// Set up the "Learn more" text in the form paragraph to be clickable
document.addEventListener('DOMContentLoaded', function()
{
  // Find the paragraph in the main form and make the "Learn more" text clickable
  const formParagraph = document.querySelector('#main-form p');

  if (formParagraph)
  {
    // Find the span with "Learn more" text and make it clickable
    const spans = formParagraph.querySelectorAll('span');
    spans.forEach(span =>
    {
      if (span.textContent.includes('Learn more') && span.style.textDecoration.includes('underline'))
      {
        span.addEventListener('click', openHowItWorksFromForm);
        span.style.cursor = 'pointer';
        // Add a slight hover effect
        span.addEventListener('mouseenter', function()
        {
          this.style.opacity = '0.8';
        });
        span.addEventListener('mouseleave', function()
        {
          this.style.opacity = '1';
        });
      }
    });
  }
});


/* Make Search Function work */
window.insuranceCompanies = insuranceCompanies;
document.addEventListener('DOMContentLoaded', function()
{
  const insuranceInput = document.getElementById('insuranceName');
  if (!insuranceInput) return;

  insuranceInput.placeholder = 'Insurance Company Name';

  const dropdown = document.createElement('div');
  dropdown.id = 'insurance-dropdown';
  dropdown.className = 'insurance-dropdown';

  const inputContainer = insuranceInput.closest('.input-container');
  if (inputContainer)
  {
    inputContainer.appendChild(dropdown);

    const existingIcon = inputContainer.querySelector('.fas.fa-building');
    if (existingIcon)
    {
      existingIcon.className = 'fas fa-search';
    }
  }

  let isDropdownVisible = false;
  let selectedIndex = -1;
  let searchTimeout = null;

  function highlightMatch(text, searchTerm)
  {
    if (!searchTerm || !text)
    {
      return text;
    }

    // Split search term into individual words
    const searchWords = searchTerm.toLowerCase().split(/\s+/).filter(word => word.length > 0);

    if (searchWords.length === 0)
    {
      return text;
    }

    let result = text;

    // Highlight each word separately
    for (let i = 0; i < searchWords.length; i++)
    {
      const word = searchWords[i];
      const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

      // Use negative lookahead to avoid highlighting inside existing tags
      const regex = new RegExp('(?![^<]*>)(?![^<]*</span>)(' + escapedWord + ')(?![^<]*</span>)', 'gi');

      result = result.replace(regex, function(match)
      {
        return '<span class="match-highlight">' + match + '</span>';
      });
    }

    return result;
  }

  function showEmptyFieldState()
  {
    dropdown.innerHTML = '<div class="dropdown-item empty-field-item">Start typing to search insurance companies...</div>';
    dropdown.style.display = 'block';
    isDropdownVisible = true;
    selectedIndex = -1;
  }

  function showLoadingState()
  {
    dropdown.innerHTML = '<div class="dropdown-item loading-item"><i class="fas fa-spinner fa-spin"></i> Searching...</div>';
    dropdown.style.display = 'block';
    isDropdownVisible = true;
  }

  function showDropdown(searchTerm = '')
  {
    if (searchTerm.length < 1)
    {
      hideDropdown();
      return;
    }

    const filtered = insuranceCompanies.filter(company =>
    {
      const companyLower = company.toLowerCase();
      const searchLower = searchTerm.toLowerCase();
      const searchWords = searchLower.split(/\s+/).filter(word => word.length > 0);
      return searchWords.every(word => companyLower.includes(word));
    }).sort((a, b) =>
    {
      const aLower = a.toLowerCase();
      const bLower = b.toLowerCase();
      const searchLower = searchTerm.toLowerCase();

      if (aLower.startsWith(searchLower) && !bLower.startsWith(searchLower)) return -1;
      if (!aLower.startsWith(searchLower) && bLower.startsWith(searchLower)) return 1;

      const aIndex = aLower.indexOf(searchLower.split(' ')[0]);
      const bIndex = bLower.indexOf(searchLower.split(' ')[0]);
      return aIndex - bIndex;
    }).slice(0, 2);

    if (filtered.length === 0)
    {
      dropdown.innerHTML = '<div class="dropdown-item no-results">No insurance companies found</div>';
      dropdown.style.display = 'block';
      isDropdownVisible = true;
      return;
    }

    dropdown.innerHTML = '';

    const totalMatches = insuranceCompanies.filter(company =>
    {
      const companyLower = company.toLowerCase();
      const searchLower = searchTerm.toLowerCase();
      const searchWords = searchLower.split(/\s+/).filter(word => word.length > 0);
      return searchWords.every(word => companyLower.includes(word));
    }).length;

    filtered.forEach((company, index) =>
    {
      const item = document.createElement('div');
      item.className = 'dropdown-item';

      const highlightedText = highlightMatch(company, searchTerm);
      item.innerHTML = highlightedText;
      item.setAttribute('data-company-name', company);
      item.setAttribute('data-index', index);

      item.addEventListener('click', function(e)
      {
        e.preventDefault();
        e.stopPropagation();
        isSelecting = true; // Set flag to prevent blur
        const companyName = this.getAttribute('data-company-name');
        selectInsurance(companyName);
        setTimeout(() =>
        {
          isSelecting = false;
        }, 200);
      });

      dropdown.appendChild(item);
    });

    if (totalMatches > 2)
    {
      const moreItem = document.createElement('div');
      moreItem.className = 'dropdown-footer';
      moreItem.textContent = `+${totalMatches - 2} more companies...`;
      dropdown.appendChild(moreItem);
    }

    dropdown.style.display = 'block';
    isDropdownVisible = true;
    selectedIndex = -1;
  }

  function hideDropdown()
  {
    if (!isDropdownVisible) return;

    dropdown.classList.add('dropdown-hiding');
    setTimeout(() =>
    {
      dropdown.style.display = 'none';
      dropdown.classList.remove('dropdown-hiding');
      isDropdownVisible = false;
      selectedIndex = -1;
    }, 200);
  }

  let isSelecting = false;

  function selectInsurance(company)
  {
    insuranceInput.value = company;
    hideDropdown();
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile)
    {
      setTimeout(() =>
      {
        showFriendlyMessage(insuranceInput, "Great choice! We work with this insurer.", 'friendly-insurance');
        checkSuccessMessages();
        insuranceInput.blur();
      }, 100);
    }
  }

  function handleKeyNavigation(e)
  {
    if (!isDropdownVisible) return;

    const items = dropdown.querySelectorAll('.dropdown-item:not(.dropdown-header):not(.no-results):not(.empty-field-item):not(.dropdown-footer)');

    switch (e.key)
    {
      case 'ArrowDown':
      e.preventDefault();
      selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
      updateSelection(items);
      break;
      case 'ArrowUp':
      e.preventDefault();
      selectedIndex = Math.max(selectedIndex - 1, -1);
      updateSelection(items);
      break;
      case 'Enter':
      e.preventDefault();
      if (selectedIndex >= 0 && items[selectedIndex])
      {
        const company = items[selectedIndex].getAttribute('data-company-name');
        selectInsurance(company);
      }
      break;
      case 'Escape':
      hideDropdown();
      break;
    }
  }

  function updateSelection(items)
  {
    items.forEach((item, index) =>
    {
      if (index === selectedIndex)
      {
        item.classList.add('selected');
      }
      else
      {
        item.classList.remove('selected');
      }
    });
  }

  insuranceInput.addEventListener('input', function(e)
  {
    const value = e.target.value.trim();

    if (searchTimeout)
    {
      clearTimeout(searchTimeout);
    }

    if (this.value.length > 0)
    {
      clearInputError(this);
      const errorMsg = this.closest('.input-container').querySelector('.input-error-message');
      if (errorMsg)
      {
        errorMsg.classList.add('hide');
        setTimeout(() =>
        {
          if (errorMsg.parentNode)
          {
            errorMsg.parentNode.removeChild(errorMsg);
          }
        }, 300);
      }
    }

    searchTimeout = setTimeout(() =>
    {
      showDropdown(value);
    }, 150);
  });

  insuranceInput.addEventListener('focus', function(e)
  {
    const value = e.target.value.trim();

    const isValidInsurance = insuranceCompanies.some(company =>
      company.toLowerCase() === value.toLowerCase()
      );

    if (value.length > 0 && !isValidInsurance)
    {
      showLoadingState();
      setTimeout(() =>
      {
        showDropdown(value);
      }, 200);
    }
    else if (value.length === 0)
    {
      showEmptyFieldState();
    }
  });

  insuranceInput.addEventListener('blur', function(e)
  {
    setTimeout(() =>
    {
      // Don't run if we're currently selecting an item
      if (isSelecting) return;

      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile && isDropdownVisible)
      {
        const firstItem = dropdown.querySelector('.dropdown-item:not(.dropdown-header):not(.no-results):not(.empty-field-item):not(.dropdown-footer)');
        if (firstItem)
        {
          const company = firstItem.getAttribute('data-company-name');
          selectInsurance(company);
          showFriendlyMessage(insuranceInput, "Great choice! We work with this insurer.", 'friendly-insurance');
          return;
        }
      }

      if (insuranceInput.value.trim().length > 0)
      {
        const enteredValue = insuranceInput.value.trim();
        const isValidInsurance = insuranceCompanies.some(company =>
          company.toLowerCase() === enteredValue.toLowerCase()
          );

        if (!isValidInsurance)
        {
          insuranceInput.value = '';
          showInputError(insuranceInput, "Please select a valid insurance company from the dropdown");
        }
      }

      hideDropdown();
    }, 150);
  });

  insuranceInput.addEventListener('keydown', handleKeyNavigation);

  document.addEventListener('click', function(e)
  {
    if (!inputContainer.contains(e.target))
    {
      hideDropdown();
    }
  });
});

const insuranceSearchStyles = document.createElement('style');
insuranceSearchStyles.id = 'insurance-search-styles';
insuranceSearchStyles.textContent = `
.insurance-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #FCFEFD;
  border: 2px solid #666;
  border-top: none;
  border-bottom-left-radius: 12.5px;
  border-bottom-right-radius: 12.5px;
  max-height: 320px;
  overflow-y: auto;
  z-index: 10001;
  display: none;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.dropdown-header {
  padding: 8px 15px;
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #666;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.dropdown-item {
  padding: 12px 15px 12px 55px;
  cursor: pointer;
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.87);
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.2s ease, color 0.2s ease;
  line-height: 1.4;
}

.dropdown-item.empty-field-item {
  color: #999;
  font-style: italic;
  cursor: default;
  padding-left: 55px;
  font-size: 15px;
}

.dropdown-item.empty-field-item:hover {
  background-color: transparent;
  color: #999;
}

.dropdown-footer {
  padding: 8px 15px;
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #666;
  background-color: #f8f9fa;
  border-top: 1px solid #e9ecef;
  text-align: center;
  font-style: italic;
}

.dropdown-item .match-highlight {
  font-weight: 650;
  color: inherit; 
}

.dropdown-item.loading-item {
  padding-left: 45px;
  color: #666;
  font-style: italic;
}

.dropdown-item.loading-item i {
  position: absolute;
  left: 15px;
  color: rgba(41, 128, 185, 0.7);
}

.dropdown-item.no-results {
  color: #999;
  font-style: italic;
  cursor: default;
  padding-left: 55px;
}

.dropdown-item.no-results:hover {
  background-color: transparent;
  color: #999;
}

.dropdown-item:hover,
.dropdown-item.selected {
  background-color: rgba(41, 128, 185, 0.08);
  color: rgba(41, 128, 185, 0.9);
}


.dropdown-item:active {
  background-color: rgba(41, 128, 185, 0.15);
}

.dropdown-item:last-child {
  border-bottom: none;
  border-bottom-left-radius: 12.5px;
  border-bottom-right-radius: 12.5px;
}

.input-container:nth-child(4) {
  position: relative;
  overflow: visible;
}

.input-container:nth-child(4):has(.insurance-dropdown[style*="display: block"]) {
  z-index: 1001;
}

.input-container:nth-child(4):has(.insurance-dropdown[style*="display: block"]) input {
  border-bottom-left-radius: 0px !important;
  border-bottom-right-radius: 0px !important;
  border-bottom: none !important;
  padding-bottom: 2px;
  box-shadow: 0 2px 8px rgba(41, 128, 185, 0.1);
}

.insurance-dropdown::-webkit-scrollbar {
  width: 6px;
}

.insurance-dropdown::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.insurance-dropdown::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.insurance-dropdown::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

@keyframes dropdownSlideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes dropdownSlideOut {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-15px);
  }
}

.insurance-dropdown[style*="display: block"] {
  animation: dropdownSlideIn 0.3s ease-out;
}

.insurance-dropdown.dropdown-hiding {
  animation: dropdownSlideOut 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.input-container:nth-child(4) input:focus {
  border-color: rgba(41, 128, 185, 0.8);
  box-shadow: 0 0 0 2px rgba(41, 128, 185, 0.1);
}
`;
document.head.appendChild(insuranceSearchStyles);




/* MAKE IT SO WHEN YOU PRESS CONTINUE BUTTON IT RIPPLES */
const continueButton = document.getElementById("submit");
continueButton.addEventListener("touchstart", buttonPressed);
continueButton.addEventListener("mousedown", buttonPressed);
continueButton.addEventListener("touchend", buttonReleased);
continueButton.addEventListener("mouseup", buttonReleased);
continueButton.addEventListener("mouseleave", buttonReleased);
continueButton.addEventListener("touchcancel", buttonReleased);

function buttonPressed()
{
  continueButton.classList.add('button-pressed');
}

function buttonReleased()
{
  continueButton.classList.remove('button-pressed');
}

/* MAKE IT SO WHEN I PRESS HEADER BUTTONS IT TRANSITIONS AND GOES BACK */
const logo = document.querySelector('.logo-container');

logo.addEventListener('touchstart', () =>
{
  logo.classList.add('logo-tap-feedback');
});

logo.addEventListener('touchend', () =>
{
  setTimeout(() =>
  {
    window.location.reload(true);
  }, 200); // short visual feedback before redirect
});

/* Transition between "continue" and "loading" */
const nameInput = document.getElementById("fullName")
var nameError = false;
const dateInput = document.getElementById("dob");
var dateError = false;
const idInput = document.getElementById('memberId');
var idError = false;

function formValidation()
{
  // First, clear any existing errors
  clearFormErrors();

  let hasErrors = false;

  // Name validation
  if (nameInput.value.trim().split(" ").length >= 2 && nameInput.value.trim().length >= 4)
  {
    nameError = false;
  }
  else
  {
    nameError = true;
    hasErrors = true;
    showInputError(nameInput, "Please enter a valid full name (first and last)");
  }

  // Date validation - NOTE: get fullYear when running through API!
  if (dateInput.value.replace(/\D/g, "").length < 6 || dateInput.value.replace(/\D/g, "").length > 8 || dateInput.value.replace(/\D/g, "").length == 7)
  {
    // Length check - must have at least 6 digits (MM/DD/YY) and at most 8 (MM/DD/YYYY)
    dateError = true;
    hasErrors = true;
    showInputError(dateInput, "Please enter a valid date of birth (MM/DD/YYYY)");
  }
  else
  {
    // Extract date components
    const month = parseInt(dateInput.value.slice(0, 2));
    const day = parseInt(dateInput.value.slice(3, 5));
    let year = parseInt(dateInput.value.slice(6));

    // Convert 2-digit year to 4-digit year for validation only
    let fullYear = year;
    if (year < 100)
    {
      // Use sliding window: 00-30 -> 2000-2030, 31-99 -> 1931-1999
      fullYear = year <= 30 ? 2000 + year : 1900 + year;
    }

    // Validate the date with the converted year (but don't modify the input)
    const dateObj = new Date(fullYear, month - 1, day);

    if (
      dateObj.getDate() !== day || // Day is invalid
      month < 1 || month > 12 || // Month is invalid
      fullYear < 1900 || fullYear > 2100 // Year range check with converted year
      )
    {
      dateError = true;
      hasErrors = true;
      showInputError(dateInput, "Please enter a valid date of birth (MM/DD/YYYY)");
    }
    else
    {
      dateError = false;
      // Keep the original user input, don't modify the display
    }
  }

  // ID validation
  if (idInput.value.trim().length == 0)
  {
    idError = true;
    hasErrors = true;
    showInputError(idInput, "Please enter a member ID");
  }
  else
  {
    idError = false;
  }

  //Insurance Name Validation
  const insuranceInput = document.getElementById('insuranceName');
  var insuranceError = false;

  if (insuranceInput.value.trim().length == 0)
  {
    insuranceError = true;
    hasErrors = true;
    showInputError(insuranceInput, "Please enter an insurance company name");
  }
  else
  {
    // Check if the entered value matches any insurance company from dropdown
    const enteredValue = insuranceInput.value.trim();
    const isValidInsurance = insuranceCompanies.some(company =>
      company.toLowerCase() === enteredValue.toLowerCase()
      );

    if (!isValidInsurance)
    {
      insuranceError = true;
      hasErrors = true;
      showInputError(insuranceInput, "Please select a valid insurance company from the dropdown");
    }
    else
    {
      insuranceError = false;
    }
  }


  if (!hasErrors)
  {
    processTransition();
  }
}

/* FUNCTIONS TO MAKE ERRORS WORK SEAMLESSLY*/

function showInputError(input, errorMessage)
{
  const container = input.closest('.input-container');
  if (!container) return;

  // Remove existing error if any
  const existingError = container.querySelector('.input-error-message');
  if (existingError)
  {
    existingError.remove();
  }

  // Add error state to input
  container.classList.add('has-error-transition');
  input.classList.add('error-input');

  // Create error message element
  const errorElement = document.createElement('div');
  errorElement.className = 'input-error-message';
  errorElement.textContent = errorMessage;

  // Add to container
  container.appendChild(errorElement);

  // Trigger animation
  setTimeout(() =>
  {
    errorElement.classList.add('show');
  }, 10);
}

function clearInputError(input)
{
  const container = input.closest('.input-container');
  if (!container) return;

  input.classList.remove('error-input');

  // Keep the transition class for a bit longer to prevent flash
  setTimeout(() =>
  {
    container.classList.remove('has-error-transition');
  }, 800); // Remove after transition completes
}
// Function to clear all form errors
function clearFormErrors()
{
  // Remove error classes from inputs
  document.querySelectorAll('.error-input').forEach(input =>
  {
    clearInputError(input);
  });

  // Remove error messages
  document.querySelectorAll('.input-error-message').forEach(error =>
  {
    error.classList.add('hide');
    setTimeout(() =>
    {
      if (error.parentNode)
      {
        error.parentNode.removeChild(error);
      }
    }, 300);
  });
}

nameInput.addEventListener("input", function(event)
{
  doneLoading = false; //if changes then loading restarts
  if (this.value.trim().length > 0)
  {
    clearInputError(this);
    const errorMsg = this.closest('.input-container').querySelector('.input-error-message');
    if (errorMsg)
    {
      errorMsg.classList.add('hide');
      setTimeout(() =>
      {
        if (errorMsg.parentNode)
        {
          errorMsg.parentNode.removeChild(errorMsg);
        }
      }, 300);
    }
    nameError = false;
  }
  event.target.value = event.target.value.replace(/[^a-zA-Z ]/g, "");
});

dateInput.addEventListener("input", function(event)
{
  doneLoading = false; //if changes then loading restarts
  if (this.value.length > 0)
  {
    clearInputError(this);
    const errorMsg = this.closest('.input-container').querySelector('.input-error-message');
    if (errorMsg)
    {
      errorMsg.classList.add('hide');
      setTimeout(() =>
      {
        if (errorMsg.parentNode)
        {
          errorMsg.parentNode.removeChild(errorMsg);
        }
      }, 300);
    }
    dateError = false;
  }

  let value = event.target.value.replace(/\D/g, "");

  if (value.length > 8)
  {
    value = value.slice(0, 8); // Limit to 8 characters
  }
  if (value.length >= 3)
  {
    value = value.slice(0, 2) + "/" + value.slice(2); // Add slash after the first 2 digits
  }
  if (value.length >= 6)
  {
    value = value.slice(0, 5) + "/" + value.slice(5); // Add slash after the second 2 digits
  }
  event.target.value = value;
});

idInput.addEventListener("input", function(event)
{
  doneLoading = false; //if changes then loading restarts
  if (this.value.length > 0)
  {
    clearInputError(this);
    const errorMsg = this.closest('.input-container').querySelector('.input-error-message');
    if (errorMsg)
    {
      errorMsg.classList.add('hide');
      setTimeout(() =>
      {
        if (errorMsg.parentNode)
        {
          errorMsg.parentNode.removeChild(errorMsg);
        }
      }, 300);
    }
    idError = false;
  }
});


/* Show Messages Upon Blur */

const originalShowInputError = showInputError;

nameInput.addEventListener("blur", function()
{
  const trimmedValue = this.value.trim();
  if (trimmedValue.length === 0)
  {
    return;
  }
  if (trimmedValue.split(" ").length < 2 || trimmedValue.length < 4)
  {
    originalShowInputError(this, "Please enter a valid full name (first and last)");
    nameError = true;
    return;
  }
  const firstName = trimmedValue.split(" ")[0];
  showFriendlyMessage(this, `Great name! Nice to meet you.`, 'friendly-name');
  nameError = false;
});

dateInput.addEventListener("blur", function()
{
  const trimmedValue = this.value.trim();
  if (trimmedValue.length === 0)
  {
    return;
  }
  if (dateInput.value.replace(/\D/g, "").length < 6 || dateInput.value.replace(/\D/g, "").length > 8 || dateInput.value.replace(/\D/g, "").length == 7)
  {
    originalShowInputError(this, "Please enter a valid date of birth (MM/DD/YYYY)");
    dateError = true;
    return;
  }
  const month = parseInt(trimmedValue.slice(0, 2));
  const day = parseInt(trimmedValue.slice(3, 5));
  let year = parseInt(trimmedValue.slice(6));
  let fullYear = year < 100 ? (year <= 30 ? 2000 + year : 1900 + year) : year;
  const dateObj = new Date(fullYear, month - 1, day);
  if (!(dateObj.getDate() === day && month >= 1 && month <= 12 && fullYear >= 1900 && fullYear <= 2100))
  {
    originalShowInputError(this, "Please enter a valid date of birth (MM/DD/YYYY)");
    dateError = true;
    return;
  }
  showFriendlyMessage(this, "Perfect age for insurance insights!", 'friendly-date');
  dateError = false;
});

idInput.addEventListener("blur", function()
{
  if (this.value.trim().length === 0)
  {
    return;
  }
  showFriendlyMessage(this, "Got your ID, we're almost there!", 'friendly-id');
  idError = false;
});

const friendlyStyle = document.createElement('style');
friendlyStyle.textContent = `
.friendly-message 
{
  position: absolute;
  bottom: -1px;
  left: 70.5px;
  color: #2ECC71;
  font-size: 9.25px;
  font-weight: 550;
  padding-bottom: 4.5px;
  opacity: 0;
  transform: translateY(7.5px);
  transition: opacity 0.5s ease-out, transform 0.7s cubic-bezier(0.18, 0.89, 0.32, 1.28);
  z-index: 10;
  pointer-events: none;
}
.friendly-message.show 
{
  opacity: 1;
  transform: translateY(0px);
}
.friendly-message.hide {
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.3s ease, transform 0.4s ease;
}


.friendly-message::before 
{
  content: "✓";
  position: absolute;
  left: -13.5px;
  top: 34%;
  transform: translateY(-50%);
  width: 9px;
  height: 9px;
  background-color: #2ECC71;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 8px;
  font-weight: bold;
}



.input-container:has(.friendly-input) i {
  color: #2ECC71 !important;
  opacity: 1 !important;
}

`;
document.head.appendChild(friendlyStyle);

function showFriendlyMessage(input, message, emojiClass)
{
  const container = input.closest('.input-container');

  // Check if a friendly message already exists
  const existingMsg = container.querySelector('.friendly-message');

  // If a friendly message already exists with the same class, just update text if needed
  if (existingMsg && existingMsg.classList.contains(emojiClass))
  {
    if (existingMsg.textContent !== message)
    {
      existingMsg.textContent = message;
    }
    return; // Exit early - no need to recreate or animate
  }

  // Remove any existing friendly messages if it's different
  if (existingMsg) existingMsg.remove();

  // Create new friendly message
  const messageEl = document.createElement('div');
  messageEl.className = `friendly-message ${emojiClass}`;
  messageEl.textContent = message;

  // Add to container
  container.appendChild(messageEl);

  // Style the input field with green highlight
  input.classList.add('friendly-input');

  // Make icon friendly colored
  const icon = container.querySelector('i');
  if (icon)
  {
    icon.classList.add('friendly');
    icon.style.color = '#2ECC71';
    icon.style.opacity = '1';
  }

  // Show with animation - only for new messages
  setTimeout(() =>
  {
    messageEl.classList.add('show');
  }, 10);

  // Remove friendly message when user types in the input
  // Check if we already have an input listener to avoid duplicates
  if (!input._hasFriendlyListener)
  {
    input._hasFriendlyListener = true;

    input.addEventListener('input', function removeFriendlyMessage()
    {
      // Hide message with animation
      const msgToRemove = container.querySelector('.friendly-message');
      if (msgToRemove)
      {
        msgToRemove.classList.remove('show');
        msgToRemove.classList.add('hide');

        // Remove the message after animation completes
        setTimeout(() =>
        {
          if (msgToRemove.parentNode)
          {
            msgToRemove.remove();
          }
        }, 400);
      }

      // Remove friendly styling from input
      input.classList.remove('friendly-input');

      // Reset icon styling
      if (icon)
      {
        icon.classList.remove('friendly');
        icon.style.color = '';
        icon.style.opacity = '';
      }

      // Remove this flag
      input._hasFriendlyListener = false;

      // Remove this event listener to prevent multiple calls
      input.removeEventListener('input', removeFriendlyMessage);
    });
  }
}

/* ERROR MESSAGE CSS */
const errorStyle = document.createElement('style');
errorStyle.textContent = `
.input-container {
  position: relative;
}
.error-input::placeholder
{
  color: #e74c3c !important;
  opacity: 0.8 !important;
}
.input-container:has(.error-input) i {
  color: #e74c3c !important;
  opacity: 1 !important;
}
.input-error-message {
  position: absolute;
  bottom: -1px;
  left: 70.5px;
  color: #e74c3c;
  font-size: 9.25px;
  font-weight: 550;
  padding-bottom: 4.5px;
  background-color: transparent;
  transform: translateY(7.5px);
  transition: opacity 0.5s ease-out, transform 0.7s cubic-bezier(0.18, 0.89, 0.32, 1.28);
  border: none;
  opacity: 0;
  white-space: nowrap;
  z-index: 10;
  will-change: transform, opacity;
  pointer-events: none;
}
.input-error-message::before {
  content: "!";
  position: absolute;
  left: -13.5px;
  top: 34%;
  transform: translateY(-50%);
  width: 9px;
  height: 9px;
  background-color: #e74c3c;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 8px;
  font-weight: bold;
}
.input-error-message.show 
{
  opacity: 1;
  transform: translateY(0px);
}
.input-error-message.hide {
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.3s ease, transform 0.4s ease;
}

`;
document.head.appendChild(errorStyle);



function displayError(message = null, highlightInputs = true)
{
  var duration = 4500;
  if (message != null)
  {
    duration = 99999999; // longer error message for Not Found and Not Active
  }

  // Find and remove any existing popups
  const existingPopup = document.querySelector('.error-popup');
  if (existingPopup)
  {
    // Add hide class for exit animation
    existingPopup.classList.remove('show');
    existingPopup.classList.add('hide');

    // Remove from DOM after animation completes
    setTimeout(() =>
    {
      if (document.body.contains(existingPopup))
      {
        document.body.removeChild(existingPopup);
      }
    }, 500); // Match exit animation duration
  }

  // Clear red borders from all inputs
  clearInputError(nameInput);
  clearInputError(dateInput);
  clearInputError(idInput);
  // Determine error message
  let errorMessage = message || "Please enter ";
  let errorList = [];

  if (highlightInputs)
  {
    if (nameError)
    {
      nameInput.classList.add("error-input");
      errorList.push("a valid full name");
    }
    if (dateError)
    {
      dateInput.classList.add("error-input");
      errorList.push("a valid date of birth");
    }
    if (idError)
    {
      idInput.classList.add("error-input");
      errorList.push("a member ID");
    }

    if (!message)
    {
      if (errorList.length === 1)
      {
        errorMessage += errorList[0];
      }
      else if (errorList.length === 2)
      {
        errorMessage += `${errorList[0]} and ${errorList[1]}`;
      }
      else if (errorList.length === 3)
      {
        errorMessage += `${errorList[0]}, ${errorList[1]}, and ${errorList[2]}`;
      }
    }
  }

  // Create popup element with enhanced structure
  const popup = document.createElement('div');
  popup.className = 'error-popup';

  // Add icon element
  const icon = document.createElement('i');
  icon.className = 'fas fa-exclamation-circle';

  // Add message element
  const messageElement = document.createElement('span');
  messageElement.className = 'error-message';
  messageElement.innerHTML = errorMessage;

  // Add close button
  const closeButton = document.createElement('button');
  closeButton.className = 'error-close-btn';
  closeButton.innerHTML = '×';

  // Append elements
  popup.appendChild(icon);
  popup.appendChild(messageElement);
  popup.appendChild(closeButton);
  document.body.appendChild(popup);

  // Force reflow before adding show class to ensure animation works
  void popup.offsetHeight;

  // Add show class to trigger entrance animation
  popup.classList.add('show');

  // Function to close the popup
  function closePopup()
  {
    popup.classList.remove('show');
    popup.classList.add('hide');

    setTimeout(() =>
    {
      if (document.body.contains(popup))
      {
        document.body.removeChild(popup);
      }
    }, 500);
  }

  // Close button click handler
  closeButton.addEventListener('click', (e) =>
  {
    e.stopPropagation();
    closePopup();
  });

  // Close on input click
  const inputs = document.querySelectorAll('#main-form input');

  function inputClickHandler()
  {
    closePopup();
    // Remove the event listeners after closing
    inputs.forEach(input =>
    {
      input.removeEventListener('click', inputClickHandler);
    });
  }

  inputs.forEach(input =>
  {
    input.addEventListener('click', inputClickHandler);
  });

  // Auto-hide the popup after delay
  const hideTimeout = setTimeout(() =>
  {
    closePopup();
  }, duration);

  // Clear timeout if manually closed
  closeButton.addEventListener('click', () =>
  {
    clearTimeout(hideTimeout);
  });
}


//Show dulled button until 4 success messages
const incompleteStyle = document.createElement('style');
incompleteStyle.textContent = `
#submit.incomplete 
{
  background-color: rgba(41, 128, 185, .32);
  box-shadow: none;
}
#submit 
{
  transition: background-color 0.6s ease-in, box-shadow 0.6s ease-in;
}
#submit:not(.incomplete) 
{
  transform: scale(1) !important;
  box-shadow: 0 0 0 1px rgba(41, 128, 185, 0.64);
}
`;
document.head.appendChild(incompleteStyle);

// Initialize button as incomplete
document.addEventListener('DOMContentLoaded', function()
{
  document.getElementById('submit').classList.add('incomplete');
});

// Check if 4 success messages exist
function checkSuccessMessages()
{
  const successMessages = document.querySelectorAll('.friendly-message.show');
  const submitBtn = document.getElementById('submit');

  if (successMessages.length >= 4)
  {
    submitBtn.classList.remove('incomplete');
  }
  else
  {
    submitBtn.classList.add('incomplete');
  }
}

// Check whenever a friendly message is shown
const originalShowFriendlyMessage = showFriendlyMessage;
showFriendlyMessage = function(input, message, emojiClass)
{
  originalShowFriendlyMessage(input, message, emojiClass);
  setTimeout(checkSuccessMessages, 20);
};

// Also check when messages are removed (when user starts typing)
document.addEventListener('input', function()
{
  setTimeout(checkSuccessMessages, 20);
});



var doneLoading = false;
var loadingTimer = null;
var completionTimer = null;
var tabNumber = 1;
var currentTab3Section = 1;

// Modify the processTransition function to disable form clicks
function processTransition()
{
  document.getElementsByClassName("content")[0].style.opacity = "0";
  document.getElementsByClassName("content-bottom")[0].style.opacity = "0";
  document.getElementById("submit").style.opacity = "0";
  document.getElementById("main-form").style.pointerEvents = "none";
  document.getElementById("submit").style.pointerEvents = "none";
  document.getElementsByClassName("second-content")[0].style.pointerEvents = "auto";
  document.getElementById("tabs-div").style.pointerEvents = "auto";
  document.getElementById("tabs-div").style.zIndex = "9999";
  document.getElementsByClassName("content")[0].style.zIndex = "-999";
  document.getElementsByClassName("content-bottom")[0].style.zIndex = "-999";
  document.getElementsByClassName("second-content")[0].style.zIndex = "999";
  showLoading();

}


function clearExistingErrors()
{
  const existingPopup = document.querySelector('.error-popup');
  if (existingPopup)
  {
    // Add hide class for exit animation
    existingPopup.classList.remove('show');
    existingPopup.classList.add('hide');

    // Remove from DOM after animation completes
    setTimeout(() =>
    {
      if (document.body.contains(existingPopup))
      {
        document.body.removeChild(existingPopup);
      }
    }, 300); // Shorter time for quicker removal
  }
}

function showInsuranceError(type)
{
  if (type == 1)
  {
    displayError("<span class='error-header'>We did not find any insurance with your information.</span><br><br>1. Double-check that your member ID is correct.<br>2. Try entering the policyholder's information if you are a dependant.<br>3. Reach out to your HR department for additional help.<br>4. Please also note that we are only compatible with dental insurance at the moment.", true);
  }
  if (type == 2)
  {
    displayError("<span class='error-header'>The coverage under this plan is no longer active.</span><br><br>This may be due to a recent change in employment or a change in insurance policy. Please double check that you do not have a new plan.<br>If you are not sure why this plan is not active, reach out to your HR department for additional help.", true);
  }
  if (type == 3)
  {
    displayError("<span class='error-header'>Please slow down a bit!</span><br><br>To keep our insurance verification service affordable for everyone, we limit how often it can be used. You've reached your hourly limit.<br><br>Please try again in about an hour. Thanks for understanding!", true);
  }
  if (type == 4)
  {
    displayError("<span class='error-header'>We have reached our global daily limit!</span><br><br>To keep our insurance verification service affordable for everyone, we have a daily spending limit across all users. We've reached that limit for today.<br><br>Please try again tomorrow. Thanks for understanding!", true);
  }
  if (type == 5)
  {
    displayError("<span class='error-header'>Please slow down a bit!</span><br><br>To keep our insurance verification service affordable for everyone, we limit how often it can be used. You've reached your daily limit.<br><br>Please try again tomorrow. Thanks for understanding!", true);
  }


  // Wait for the error to display before returning to main page
  setTimeout(() =>
  {
    // Reset the second screen flag
    secondScreen = false;

    // Hide loading elements
    document.getElementsByClassName("loading-container")[0].style.opacity = "0";
    document.getElementsByClassName("second-content")[0].style.opacity = 0;
    document.getElementById("tabs-div").style.opacity = 0;

    // Reset z-index values
    document.getElementById("tabs-div").style.zIndex = "1";
    document.getElementById("tabs-div").style.pointerEvents = "none";
    document.getElementsByClassName("content")[0].style.zIndex = "999";
    document.getElementsByClassName("second-content")[0].style.zIndex = "-999";

    // Re-enable form interaction
    document.getElementById("main-form").style.pointerEvents = "auto";
    document.getElementById("submit").style.pointerEvents = "auto";

    // Show the main content again
    setTimeout(() =>
    {
      document.getElementsByClassName("content")[0].style.opacity = "1";
      document.getElementsByClassName("content-bottom")[0].style.opacity = "1";
    }, 0);

    // Clear any existing timers
    if (loadingTimer) clearTimeout(loadingTimer);
    if (completionTimer) clearTimeout(completionTimer);



    // Reset loading status
    doneLoading = false;
  }, 0);
}

if (!document.getElementById('error-popup-styles'))
{
  const errorPopupStyle = document.createElement('style');
  errorPopupStyle.id = 'error-popup-styles';
  errorPopupStyle.textContent = `
  /* Error popup styling */
  .error-popup .error-header
  {
    text-align: center;
    font-weight: 700;
    font-size: 15px;
  }
  .error-popup 
  {
    position: fixed;
    bottom: 15px;
    left: 50%;
    width: 90%;
    transform: translateX(-50%) translateY(100px);
    background-color: rgb(234, 90, 76); /* Simulates 92% opaque red on white */
    color: white;
    padding: 16px 20px;
    padding-right: 35px; /* Make room for close button */
    border-radius: 12px;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    z-index: 99999;
    max-width: 90%;
    min-width: 250px;
    display: flex;
    align-items: center;
    gap: 12px;
    opacity: 0;
    transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    animation: subtlePulse 2s ease-in-out infinite; /* Add pulsing animation */
  }
  @keyframes subtlePulse {
    /*
    0%, 100% { 
      transform: scale(1.0) translateX(-50%);
    }
    50% { 
      transform: scale(1.005) translateX(-50%);
    }
    */
  }
  .error-close-btn 
  {
    position: absolute;
    top: 25px;
    right: 5px;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: white;
    font-size: 32px;
    line-height: 1;
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0.7;
    transition: all 0.2s ease;
    padding: 0;
    border-radius: 50%;
  }
  .error-close-btn:active 
  {
    transform: translateY(-50%) scale(0.9);
  }
  .error-popup i 
  {
    font-size: 22px;
    flex-shrink: 0;
    animation: iconPulse 2s infinite;
    position: absolute;
    top: 15px;
    left: 10px;
  }
  .error-popup .error-message {
    line-height: 1.4;
    text-align: left;
    flex: 1;
    padding-left: 7.5%;
    padding-right: 1%;
  }
  .error-popup.show {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  .error-popup.hide 
  {
    opacity: 0;
    transform: translateX(-50%) translateY(100px);
  }
  @keyframes iconPulse {
    0%, 100% { 
      transform: scale(1); 
      opacity: 0.8; 
    }
    50% { 
      transform: scale(1.1); 
      opacity: 1; 
    }
  }
  `;
  document.head.appendChild(errorPopupStyle);
}



/* Transition between "continue" and Next - parse Variables data */


function decrementYear(dateString)
{
  let [month, day, year] = dateString.split("/");
  year = parseInt(year) - 1;
  const newDateString = `${month}/${day}/${year}`;
  return newDateString;
}

function decrementDate(dateString)
{
  if (!dateString || !/^\d{2}\/\d{2}\/\d{4}$/.test(dateString))
  {
    throw new Error("Invalid date format. Please use MM/DD/YYYY format.");
  }
  const [month, day, year] = dateString.split('/').map(part => parseInt(part, 10));
  const date = new Date(year, month - 1, day, 12);
  date.setTime(date.getTime() - 86400000);
  const newMonth = String(date.getMonth() + 1).padStart(2, '0');
  const newDay = String(date.getDate()).padStart(2, '0');
  const newYear = date.getFullYear();
  return `${newMonth}/${newDay}/${newYear}`;
}

function formatDateString(dateString)
{
  const [month, day, year] = dateString.split("/");

  // Validate inputs are numbers and defined
  if (!month || !day || !year || isNaN(month) || isNaN(day) || isNaN(year))
  {
    return "Invalid Date";
  }

  const monthNum = parseInt(month, 10) - 1;
  const dayNum = parseInt(day, 10);
  const yearNum = parseInt(year, 10);

  // Basic bounds check
  if (monthNum < 0 || monthNum > 11 || dayNum < 1 || dayNum > 31)
  {
    return "Invalid Date";
  }
  const date = new Date(yearNum, monthNum, dayNum);

  if (isNaN(date.getTime()))
  {
    return "Invalid Date";
  }

  const options = {
    month: "short",
    day: "numeric"
  };

  const formatted = date.toLocaleDateString("en-US", options);
  const yearSuffix = String(yearNum).slice(-2);

  return `${formatted}, <span class='tiny-year'>${yearNum}</span>`;
}

/* Transition between "continue" and Next and between tabs - actual code */

function showNext()
{
  var secondPage = document.getElementsByClassName("second-content")[0];

  secondPage.style.opacity = 1;
  document.body.style.overflow = "auto";
  document.body.style.touchAction = "auto"
  document.getElementById("tabs-div").style.opacity = 1;
  makeTabActive();
  runLoadingAnimation();

  // Add fade-in animation for the initial load
  if (!secondPage.hasAttribute('data-initialized'))
  {
    secondPage.style.opacity = '0';
    secondPage.style.animation = 'none';
    void secondPage.offsetHeight; // Force reflow
    requestAnimationFrame(() =>
    {
      secondPage.style.animation = 'fadeInSlideUp .75s forwards';
    });
    secondPage.setAttribute('data-initialized', 'true');
  }
  else
  {
    requestAnimationFrame(() =>
    {
      secondPage.style.animation = 'fadeInSlideUp .75s forwards';
    });
  }

  if (tabNumber == 1)
  {
    secondPage.innerHTML = ` 
    <div id=summary-div>

    <div id=summary-row-1 class="pop-in">

    <div id="summary-card-eligibility">
    <h3 class='summary-title'>Eligibility </h3>
    <span class='eligibility-status-row'><i class="fas fa-check-circle"></i><h4>Active</h4></span>
    <p><i class="fas fa-id-card"></i> Your insurance <br>is <span style='font-weight:675'>${variables[2][1]}</span></p>
    </div> 

    <div id="summary-card-renewal" class="pop-in">
    <h3 class='summary-title' id='renewal-summary-title'> Renewal </h3>
    <span class='renewal-status-row'><i class="fas fa-clock"></i><h4>${formatDateString(variables[4][1])}</h4></span>
    <p><i class="fas fa-sync-alt"></i> Your benefits will<br>renew <span style='font-weight:675'>to ${variables[6][1]}</span></p>

    </div>

    </div>


    <div id='summary-card-benefits' class='benefits-transition'>
    <!-- see initializeTab1() function for html and css -->
    </div>

    </div>

    `;
  }
  else if (tabNumber == 2)
  {
    secondPage.innerHTML = `
    <div id="coverage-div" class='loading-up'>
    <div class="coverage-section">
    <h3 class="coverage-heading">Routine: <span class='coverage-heading-covered'>${variables[10][1]} Covered</span></h3>
    <div class="coverage-grid">
    <div class="coverage-item">
    <div class="coverage-icon"><i class="fas fa-tooth"></i></div>
    <div class="coverage-name">Cleanings</div>
    </div>
    <div class="coverage-item">
    <div class="coverage-icon"><i class="fas fa-vial"></i></div>
    <div class="coverage-name">Exams <br>& X-Rays</div>
    </div>
    <div class="coverage-item">
    <div class="coverage-icon"><i class="fas fa-exclamation-triangle"></i></div>
    <div class="coverage-name">Emerg. Exams</div>
    </div>
    </div>
    </div>

    <div class="coverage-section">
    <h3 class="coverage-heading">Basic: <span class='coverage-heading-covered'>${variables[11][1]} Covered</span></h3>
    <div class="coverage-grid">
    <div class="coverage-item">
    <div class="coverage-icon"><i class="fas fa-fill-drip"></i></div>
    <div class="coverage-name">Fillings</div>
    </div>
    <div class="coverage-item">
    <div class="coverage-icon"><i class="fas fa-hand-holding-medical"></i></div>
    <div class="coverage-name">Extrac- tions</div>
    </div>
    <div class="coverage-item">
    <div class="coverage-icon"><i class="fas fa-tools"></i></div>
    <div class="coverage-name">Root Canals</div>
    </div>
    <div class="coverage-item">
    <div class="coverage-icon"><i class="fas fa-shower"></i></div>
    <div class="coverage-name">Deep Cleanings</div>
    </div>
    </div>
    </div>

    <div class="coverage-section">
    <h3 class="coverage-heading">Major: <span class='coverage-heading-covered'>${variables[12][1]} Covered</span></h3>
    <div class="coverage-grid">
    <div class="coverage-item">
    <div class="coverage-icon"><i class="fas fa-crown"></i></div>
    <div class="coverage-name">Crowns</div>
    </div>
    <div class="coverage-item">
    <div class="coverage-icon"><i class="fas fa-bezier-curve"></i></div>
    <div class="coverage-name">Bridges</div>
    </div>
    <div class="coverage-item">
    <div class="coverage-icon"><i class="fas fa-teeth"></i></div>
    <div class="coverage-name">Dentures</div>
    </div>
    <div class="coverage-item">
    <div class="coverage-icon"><i class="fas fa-thumbtack"></i></div>
    <div class="coverage-name">Implants</div>
    </div>
    </div>
    </div>

    <div class="coverage-section" id='notCovered-section'>
    <h3 class="coverage-heading">Not Covered</h3>
    <div class="coverage-grid">
    </div>
    </div>
    </div>
    </div>
    `
  }
  else if (tabNumber == 3)
  {
   if (currentTab3Section === 1 && !userIsPremium) 
   {
    secondPage.innerHTML = `
    <div id="next-steps-div">
    <!-- Section Toggle Header -->
    <div class="tab3-section-toggle">
    <button class="section-btn active" onclick="switchTab3Section(1)">
    <i class="fas fa-route"></i> Next Steps
    </button>
    <button class="section-btn" onclick="switchTab3Section(2)">
    <i class="fas fa-info-circle"></i> Learn More
    </button>
    </div>

    <!-- One-Time Check Notice Section -->
    <div class="info-section" id="one-time-check-section">
    <div class="section-icon-container">
    <div class="section-icon">
    <span class="section-number">1</span>
    </div>
    </div>
    <h3 class="info-heading">Important: Data Won't Update Until Renewal</h3>
    <div class="info-content">
    <p><span class='fun-text'><b>This data is a snapshot from your first check this year and will not update again until your plan renews on ${formatDateStringFull(variables[4][1])}.</b></span></p>
    <p>Any changes to your coverage or benefits won't be shown here until renewal. But don’t worry — you can come back and view these saved results anytime.</p>
    <p>We’ll notify you as soon as your new benefit data becomes available. Just enter your email below to get a reminder when your insurance renews:</p>
    <div class="email-signup-form">
    <div class="email-input-container">
    <input type="email" id="email-signup" placeholder="Enter your email address" class="email-input">
    <button class="email-submit-btn" id="email-submit-2" onclick="submitEmail()">
    <i class="fas fa-paper-plane"></i> 
    </button>
    </div>
    </div>
    </div>
    </div>

    <!-- Premium Service Section -->
    <div class="info-section" id="premium-service-section">
    <div class="section-icon-container">
    <div class="section-icon">
    <span class="section-number">2</span>
    </div>
    </div>
    <h3 class="info-heading"><i class="fas fa-crown" style="color: #ffd700; position: relative; bottom: calc(var(--spacing-sm) * .35); font-size: calc(var(--spacing-md) * .7); background-color: #317568; padding: calc(var(--spacing-sm) * .7); border-radius: 50%;"></i> Premium: Unlimited Access To Real-Time Data </h3>
    <div class="info-content">
    <p><b>For just $1/month, always see the latest data, as frequently as you would like — no waiting for renewal.</b></p>
    <ul class="benefit-list">
    <li><i class="fas fa-check"></i> See up-to-date benefit data and verify coverage before every appointment</li>
    <li><i class="fas fa-check"></i> Track your remaining benefits in real-time</li>
    <li><i class="fas fa-check"></i> View updates after your visits</li>
    <li><i class="fas fa-check"></i> No more surprises or outdated estimates</li>
    </ul>
    <button class="premium-upgrade-btn" onclick="upgradeToPremium()">
    <i class="fas fa-info-circle"></i> Learn More
    </button>
    </div>
    </div>


    <!-- Share Section -->
    <div class="info-section" id="share-section">
    <div class="section-icon-container">
    <div class="section-icon">
    <span class="section-number">3</span>
    </div>
    </div>
    <h3 class="info-heading">Know Someone Who Needs This?</h3>
    <div class="info-content">
    <p><span class='fun-text'><b>Help friends and family take control of their dental costs! Perfect for anyone who wants to:</b></span></p>
    <ul class="benefit-list">
    <li><i class="fas fa-check"></i> Understand Their Benefits </li>
    <li><i class="fas fa-check"></i> Get Personalized Tips </li>
    <li><i class="fas fa-check"></i> Become Aware of Costs </li>
    <li><i class="fas fa-check"></i> Verify Coverage </li>
    <li><i class="fas fa-check"></i> Find In-Network Providers </li>
    </ul>

    <div class="share-buttons">
    <button class="share-btn text-btn" onclick="shareViaText()">
    <i class="fas fa-sms"></i> Text a Friend
    </button>
    <button class="share-btn tweet-btn" onclick="shareViaX()">
    <i class="fab fa-twitter"></i> Post on X
    </button>
    <button class="share-btn email-btn" onclick="shareViaEmail()">
    <i class="fas fa-envelope"></i> Email
    </button>
    <button class="share-btn copy-btn" onclick="copyLink()">
    <i class="fas fa-copy"></i> Copy Link
    </button>
    </div>
    </div>
    </div>

    <!-- Provider Registration Section -->
    <div class="info-section" id="provider-registration-section">
    <div class="section-icon-container">
    <div class="section-icon">
    <span class="section-number">4</span>
    </div>
    </div>
    <h3 class="info-heading">Are You a Dental Provider?</h3>
    <div class="info-content">
    <p><span class='fun-text'><b>Join our network directory and reach more patients!</b></span></p>
    <p>Add your practice to our network and connect with patients seeking in-network dental care. Book a demo to get started.</i></p>

    <button class="provider-learn-more-btn" onclick="showProviderModal()">
    <i class="fas fa-info-circle"></i> Book a Demo
    </button>
    </div>
    </div>
    </div>
    `;
  }
  else if (currentTab3Section === 1 && userIsPremium)
  {
   secondPage.innerHTML = `
   <div id="next-steps-div">
   <!-- Section Toggle Header -->
   <div class="tab3-section-toggle">
   <button class="section-btn active" onclick="switchTab3Section(1)">
   <i class="fas fa-route"></i> Next Steps
   </button>
   <button class="section-btn" onclick="switchTab3Section(2)">
   <i class="fas fa-info-circle"></i> Learn More
   </button>
   </div>

   <!-- Premium Status Section -->
   <div class="info-section" id="premium-status-section" style="background: linear-gradient(135deg, #BCE2C5 0%, #BCE2C5 100%); outline: calc(var(--spacing-xs) * 0.6) solid #317568; outline-offset: calc(var(--spacing-xs) * -0.6);">
   <div class="section-icon-container">
   <div class="section-icon" style="background-color: #317568;">
   <i class="fas fa-crown" style="color: #ffd700; font-size: calc(var(--spacing-md) * 1.25);"></i>
   </div>
   </div>
   <h3 class="info-heading" style="color: #317568;">Your Premium Membership is Active!</h3>
   <div class="info-content">
   <p><span class='fun-text'><b>You get unlimited access to real time data! Benefits include:</b></span></p>
   <ul class="benefit-list">
   <li><i class="fas fa-check"></i> Seeing up-to-date benefit data and verifying coverage before every appointment</li>
   <li><i class="fas fa-check"></i> Tracking your remaining benefits in real-time</li>
   <li><i class="fas fa-check"></i> Viewing updates after your visits</li>
   <li><i class="fas fa-check"></i> No more surprises or outdated estimates</li>
   </ul>
   <div style="margin-top: calc(var(--spacing-md) * 1.5); display: flex; flex-direction: row; gap: calc(var(--spacing-sm) * 0.8);">
   <button class="email-submit-btn" onclick="window.open('mailto:contact@openbookbenefits.com', '_blank')" style="background: #2980b9e6; opacity: .8; padding: calc(var(--spacing-sm) * 0.8) calc(var(--spacing-md) * 1); font-size: calc(var(--font-base) * 0.85); flex: 1; display: flex; justify-content: center; align-items: center;">
   <i class="fas fa-headset"></i> Support
   </button>
   <button class="email-submit-btn" onclick="cancelPremium()" style="background: #dc2626; opacity: .7; padding: calc(var(--spacing-sm) * 0.8) calc(var(--spacing-md) * 1); font-size: calc(var(--font-base) * 0.85); flex: 1; display: flex; justify-content: center; align-items: center;">
   <i class="fas fa-times-circle"></i> Cancel
   </button>
   </div>
   <p style="margin-top: calc(var(--spacing-sm) * 0.8); font-size: calc(var(--font-base) * 0.73); color: #64748b; text-align: center; font-style: italic;">
   You can upgrade again anytime. No recurring charges.
   </p>
   </div>
   </div>

   <!-- One-Time Check Notice Section -->
   <div class="info-section" id="one-time-check-section">
   <div class="section-icon-container">
   <div class="section-icon">
   <span class="section-number">1</span>
   </div>
   </div>
   <h3 class="info-heading">Stay Updated on Your Benefits</h3>
   <div class="info-content">
   <p><span class='fun-text'><b>Your data is always fresh with Premium, but insurance plans can still change at renewal.</b></span></p>
   <p>Get notified when your plan renews on ${formatDateStringFull(variables[4][1])} to see if there are any benefit changes or updates.</p>
   <div class="email-signup-form">
   <div class="email-input-container">
   <input type="email" id="email-signup" placeholder="Enter your email address" class="email-input">
   <button class="email-submit-btn" id="email-submit-2" onclick="submitEmail()">
   <i class="fas fa-paper-plane"></i> 
   </button>
   </div>
   </div>
   </div>
   </div>

   <!-- Share Section -->
   <div class="info-section" id="share-section" style="background: #D4E8F2; outline: calc(var(--spacing-xs) * 0.6) solid #2980b9e6; outline-offset: calc(var(--spacing-xs) * -0.6);">
   <div class="section-icon-container">
   <div class="section-icon" style="background-color: #2980b9e6;">
   <span class="section-number">2</span>
   </div>
   </div>
   <h3 class="info-heading" style="color: #2980b9e6;">Know Someone Who Needs This?</h3>
   <div class="info-content">
   <p><span class='fun-text'><b>Help friends and family take control of their dental costs! Perfect for anyone who wants to:</b></span></p>
   <ul class="benefit-list">
   <li><i class="fas fa-check"></i> Understand Their Benefits </li>
   <li><i class="fas fa-check"></i> Get Personalized Tips </li>
   <li><i class="fas fa-check"></i> Become Aware of Costs </li>
   <li><i class="fas fa-check"></i> Verify Coverage </li>
   <li><i class="fas fa-check"></i> Find In-Network Providers </li>
   </ul>
   <div class="share-buttons">
   <button class="share-btn text-btn" onclick="shareViaText()">
   <i class="fas fa-sms"></i> Text a Friend
   </button>
   <button class="share-btn tweet-btn" onclick="shareViaX()">
   <i class="fab fa-twitter"></i> Post on X
   </button>
   <button class="share-btn email-btn" onclick="shareViaEmail()">
   <i class="fas fa-envelope"></i> Email
   </button>
   <button class="share-btn copy-btn" onclick="copyLink()">
   <i class="fas fa-copy"></i> Copy Link
   </button>
   </div>
   </div>
   </div>

   <!-- Provider Registration Section -->
   <div class="info-section" id="provider-registration-section" style="background: #f3e8ff; outline: calc(var(--spacing-xs) * 0.6) solid #8b5cf6; outline-offset: calc(var(--spacing-xs) * -0.6);">
   <div class="section-icon-container">
   <div class="section-icon" style="background-color: #8b5cf6;">
   <span class="section-number">3</span>
   </div>
   </div>
   <h3 class="info-heading" style="color: #8b5cf6;">Are You a Dental Provider?</h3>
   <div class="info-content">
   <p><span class='fun-text'><b>Join our network directory and reach more patients!</b></span></p>
   <p>Add your practice to our network and connect with patients seeking in-network dental care. Book a demo to get started.</i></p>
   <button class="provider-learn-more-btn" onclick="showProviderModal()">
   <i class="fas fa-info-circle"></i> Book a Demo
   </button>
   </div>
   </div>
   </div>
   `;
 }
  else //tab 3 section 2 
  {
    secondPage.innerHTML = `
    <div id="info-div">
    <!-- Section Toggle Header -->
    <div class="tab3-section-toggle">
    <button class="section-btn" onclick="switchTab3Section(1)">
    <i class="fas fa-route"></i> Next Steps
    </button>
    <button class="section-btn active" onclick="switchTab3Section(2)">
    <i class="fas fa-info-circle"></i> Learn More
    </button>
    </div>

    <div class="info-section" id="insurance-info">
    <div class="section-icon-container">
    <div class="section-icon">
    <i class="fas fa-shield-alt"></i>
    </div>
    </div>
    <h3 class="info-heading">A Note on Insurance</h3>
    <div class="info-content">
    <p><span class='fun-text'>Ever feel like insurance is designed to be confusing?</span><br></p>
    <p>This is indeed by design — most insurance deliberately limit access to coverage information and have dozens of hidden clauses. The information displayed here represents our best estimate based on the limited data that insurance companies make available.</p>
    <p>As a result, we <b>strongly recommend</b> asking your dentist to submit a predetermination request for expensive procedures. This is the most accurate way to get an estimated copay from a procedure. </p>
    </div>
    </div>

    <div class="info-section" id="pricing-info">
    <div class="section-icon-container">
    <div class="section-icon">
    <i class="fas fa-tag"></i>
    </div>
    </div>
    <h3 class="info-heading">A Note on Pricing</h3>
    <div class="info-content">
    <p><span class='fun-text'>All prices shown are average estimates based on in-network providers, kind of like the <i>"blue book value"</i> for dental work.</span></p>
    <p>In-network essentially means your dental provider is contractually obligated to offer lower prices. Always confirm that your dentist is in your insurance network, as out-of-network costs can be substantially higher.</p>
    <span class='spacing'></span>
    <p>Procedure costs can also vary based on complexity. We simply averaged the costs.</p>
    <div class="procedure-cost-grid">
    <div class="procedure-cost-item">
    <i class="fas fa-tooth"></i>
    <div class="procedure-cost-text">
    <b>Fillings:</b><br> Price varies by number of surfaces and material used
    </div>
    </div>
    <div class="procedure-cost-item">
    <i class="fas fa-hand-holding-medical"></i>
    <div class="procedure-cost-text">
    <b>Extractions:</b> Simple extractions cost less than surgical ones
    </div>
    </div>
    <div class="procedure-cost-item">
    <i class="fas fa-teeth"></i>
    <div class="procedure-cost-text">
    <b>Dentures:</b> Partial dentures cost less than full dentures
    </div>
    </div>
    <div class="procedure-cost-item">
    <i class="fas fa-tools"></i>
    <div class="procedure-cost-text">
    <b>Root Canals:</b> Front teeth typically cost less than molars
    </div>
    </div>
    </div>
    <p> Lastly, please note that if you have gotten work done recently, there may be <b>pending claims</b> that aren't reflected in your current benefits remaining. Think of this like a check that hasn't yet cleared. You can add this work to your Total Estimated Copay to get an accurate copay for all other work.</b>
    </div>
    </div>

    <div class="disclaimer">
    <p><i class="fas fa-info-circle"></i> This information is provided for educational purposes only and is not a guarantee of insurance coverage or costs. Always verify coverage with your insurance provider before undergoing any dental procedure.</p>
    </div>
    </div>
    `;
  }
}
else if (tabNumber == 4)
{
  secondPage.innerHTML = `
  <div id="insights-div">

  <!-- Row 1: Orthodontic Coverage (Large) -->
  <div id="insights-row-1" class="pop-in">
  <div id="insights-card-orthodontics" class="full-width-card">
  <h3 class='insights-title'><i class="fas fa-magic"></i> Personalized Tip 1</h3>
  <h4 class='insight-subtitle'>Your Orthodontic Coverage <i class="fas fa-teeth"></i></h4>
  <p>Many plans include additional ortho benefits for treatment like braces.<br><br><b>We found <u>${variables[16][1]}</u> in regards to your ortho benefits</b>.<br>However, this often has caveats, so we would reccomend calling your insurance to ensure coverage.</p>
  </div>
  </div>

  <!-- Row 2: Call Insurance (Large) -->
  <div id="insights-row-2" class="pop-in">
  <div id="insights-card-contact" class="full-width-card">
  <h3 class='insights-title'><i class="fas fa-magic"></i> Personalized Tip 2</h3>
  <h4 class='insight-subtitle'>Call With Questions <i class="fas fa-phone"></i></h4>
  <p>Contact ${variables[2][1]} <b>at ${variables[17][1]}</b> to confirm orthodontic eligibility, pre-authorization requirements, and any other questions you may have.</p>
  </div>
  </div>

  <!-- Row 3: Two Tips Side by Side -->
  <div id="insights-row-3" class="pop-in">

  <div id="insights-card-cleaning">
  <h3 class='insights-title'><i class="fas fa-magic"></i> Pers. Tip 3</h3>
  <h4 class='insight-subtitle'>Prevention Pays<i class="fas fa-piggy-bank"></i></h4>
  <p>Your cleanings are covered at <b>${variables[10][1]} twice per year.</b> Use these benefits to prevent expensive problems later.</p>
  </div>

  <div id="insights-card-verification">
  <h3 class='insights-title'><i class="fas fa-magic"></i> Pers. Tip 4</h3>
  <h4 class='insight-subtitle'>Verify Coverage<i class="fas fa-check-circle"></i></h4>
  <p>Your insurance is <b>currently active!</b><br>Verify coverage with openbook before every visit to avoid surprise bills.</p>
  </div>

  </div>

  <!-- Row 5: Time Your Benefits (Large) -->
  <div id="insights-row-5" class="pop-in">
  <div id="insights-card-renewal-full" class="full-width-card">
  <h3 class='insights-title'><i class="fas fa-magic"></i> Personalized Tip 5</h3>
  <h4 class='insight-subtitle'>Time Your Benefits <i class="fas fa-calendar-alt"></i></h4>
  <p>You currently have <b>${maximumRemaining}</b> in benefits remaining. This will <b>renew to ${variables[6][1]} on ${formatDateStringFull(variables[4][1])}</b>.<br><br>To get the most out of your coverage, aim to use your full benefit amount without going over. If you need multiple procedures that would exceed your limit, consider splitting them across two benefit periods. </p>
  </div>
  </div>

  <!-- Row 6: Always Go In Network (Large) -->
  <div id="insights-row-6" class="pop-in">
  <div id="insights-card-timing-full" class="full-width-card">
  <h3 class='insights-title'><i class="fas fa-magic"></i> Personalized Tip 6</h3>
  <h4 class='insight-subtitle'>Always Go In-Network <i class="fas fa-network-wired"></i></h4>
  <p> Find a dental provider that is in-network with ${variables[2][1]}. In-network dentists are contractually obligated to offer lower prices. The best way to make sure your dental provider is in-network is to call and ask:<br><br>"Are you guys <b>in-network</b> with ${variables[2][1]}?" </p>
  </div>
  </div>

  </div>
  `;
}
else
{
  secondPage.innerHTML = `
  <div id="network-div">
  <!-- Search Section -->
  <div class="network-search-section">
  <div class="network-info-header">
  <i class="fas fa-search"></i>
  <h3>Find ${variables[2][1]} Dentists</h3>
  </div>
  <p class="network-info-subtitle">Save money by choosing dentists in your <b>${variables[2][1]}</b> network. Out-of-network providers may cost significantly more.</p>

  <div class="search-input-container">
  <input type="text" class="search-input" id="location-search" placeholder="Enter ZIP code, city, or neighborhood">
  <i class="fas fa-map-marker-alt search-input-icon"></i>
  </div>

  <div class="search-filters">
  <select class="filter-select" id="specialty-filter">
  <option value="">All Specialties</option>
  <option value="general">General Dentistry</option>
  <option value="orthodontics">Orthodontics</option>
  <option value="oral-surgery">Oral Surgery</option>
  <option value="endodontics">Endodontics</option>
  <option value="periodontics">Periodontics</option>
  <option value="pediatric">Pediatric Dentistry</option>
  <option value="cosmetic">Cosmetic Dentistry</option>
  </select>

  <select class="filter-select" id="distance-filter">
  <option value="25">Within 25 miles</option>
  <option value="5">Within 5 miles</option>
  <option value="10">Within 10 miles</option>
  <option value="50">Within 50 miles</option>
  </select>
  </div>

  <button class="search-button" id="search-providers">
  <i class="fas fa-search"></i>Search Providers
  </button>
  </div>

  <!-- Results Section -->
  <div class="network-results-section" id="results-section" style="display: none;">
  <div class="results-header">
  <div class="results-count" id="results-count">0 providers found</div>
  <select class="sort-dropdown" id="sort-results">
  <option value="distance">Sort by Distance</option>
  <option value="rating">Sort by Rating</option>
  <option value="name">Sort by Name</option>
  </select>
  </div>

  <div id="providers-container">
  <!-- Provider cards will be dynamically inserted here -->
  </div>
  </div>

  <!-- Loading State -->
  <div class="loading-results" id="loading-state" style="display: none;">
  <div class="loading-spinner"></div>
  <p>Searching for in-network providers...</p>
  </div>

  <!-- Empty State -->
  <div class="empty-results" id="empty-state" style="display: none;">
  <i class="fas fa-search"></i>
  <h4>No providers found</h4>
  <p>Try expanding your search area or removing filters to see more results.</p>
  </div>
  </div>
  `;
}
}

/* MAKE TAB APPEAR AS ACTIVE */
document.getElementById("tab1").addEventListener("click", function()
{
  tabNumber = 1;
  showNext();
});
document.getElementById("tab2").addEventListener("click", function()
{
  tabNumber = 2;
  scrollTop();
  showNext();
});
document.getElementById("tab3").addEventListener("click", function() 
{
  tabNumber = 3;
  scrollTop();
  showNext();
});
document.getElementById("tab4").addEventListener("click", function()
{
  tabNumber = 4;
  scrollTop();
  showNext();
});
document.getElementById("tab5").addEventListener("click", function()
{
  tabNumber = 5;
  scrollTop();
  showNext();
});
/* COOL FADE IN ANIMATION */
document.querySelectorAll('.tab').forEach(tab =>
{
  tab.addEventListener('click', function()
  {
    const secondContent = document.querySelector('.second-content');

    // Start fresh - turn off content and reset any animations
    secondContent.style.opacity = '0';
    secondContent.style.animation = 'none';

    // Force reflow
    void secondContent.offsetHeight;

    // Wait a tiny bit, then start the fade-in animation
    requestAnimationFrame(() =>
    {
      // Apply the same fade-in animation as initial load
      secondContent.style.animation = 'fadeInSlideUp .75s forwards';
    });
  });
});



function testTab2Overflow() //returns true if 5+ majors AND not covered has items
{
  // Get all coverage sections in Tab 2
  const sections = document.querySelectorAll('.coverage-section');

  // Get the major section (index 2) and not covered section (index 3)
  const majorSection = sections[2]; // Major section
  const notCoveredSection = sections[3]; // Not covered section

  // Count major section items
  let majorItemCount = 0;
  if (majorSection)
  {
    const majorItems = majorSection.querySelectorAll('.coverage-item');
    const style = window.getComputedStyle(majorSection);
    const isMajorVisible = style.display !== 'none' && style.visibility !== 'hidden';

    if (isMajorVisible)
    {
      majorItemCount = majorItems.length;
    }
  }

  // Check if not covered section has items
  let notCoveredHasItems = false;
  if (notCoveredSection)
  {
    const notCoveredItems = notCoveredSection.querySelectorAll('.coverage-item');
    const style = window.getComputedStyle(notCoveredSection);
    const isNotCoveredVisible = style.display !== 'none' && style.visibility !== 'hidden';

    if (isNotCoveredVisible && notCoveredItems.length > 0)
    {
      notCoveredHasItems = true;
    }
  }

  // Return true if major section has 5+ items AND not covered section has items
  return (majorItemCount >= 5 && notCoveredHasItems);
}


function makeTabActive()
{
  const tabs = document.querySelectorAll(".tab");
  const activeTab = document.getElementById(`tab${tabNumber}`);

  // Reset all tabs first
  tabs.forEach(tab =>
  {
    tab.classList.remove("active-tab");
    tab.style.opacity = .7;
    const span = tab.querySelector("span");
    const icon = tab.querySelector("i");
    if (span)
    {
      span.style.fontWeight = "400";
      span.style.color = "#9F9F9F";
      span.style.transform = "scale(1)";
    }
    if (icon)
    {
      icon.style.fontWeight = "400";
      icon.style.color = "#9F9F9F";
      icon.style.transform = "translateY(0)";
    }
  });

  // Add active styles with smooth transitions
  activeTab.classList.add("active-tab");

  activeTab.style.opacity = 1;
  const activeSpan = activeTab.querySelector("span");
  const activeIcon = activeTab.querySelector("i");
  if (activeSpan)
  {
    activeSpan.style.fontWeight = "600";
    activeSpan.style.color = "#2980b9";
    activeSpan.style.opacity = ".9";
    activeSpan.style.transition = "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.3s ease";
  }
  if (activeIcon)
  {
    activeIcon.style.fontWeight = "600";
    activeIcon.style.color = "#2980b9";
    activeSpan.style.opacity = ".9";
    activeIcon.style.transition = "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.3s ease";
  }
}

/* THIS FUNCTION IS ABLE TO IDENTIFY WHEN AN ELEMENT LOADS INTO THE DOM (IMPORTANT FOR .innerHTML) THEN LOADS IT IN */
function waitForElement(selector, callback)
{
  const observer = new MutationObserver((mutations, obs) =>
  {
    const element = document.querySelector(selector);
    if (element)
    {
      callback(element);
      obs.disconnect(); // Stop observing once the element is found
    }
  });
  // Start observing the document for changes
  observer.observe(document,
  {
    childList: true,
    subtree: true
  });
}

function runLoadingAnimation() //where I have how it for tab 1
{
  waitForElement(".pop-in", () =>
  {
    const popInElements = document.querySelectorAll(".pop-in");
    // Add pop-in animation style if it doesn't exist yet
    if (!document.getElementById('pop-in-style'))
    {
      const popInStyle = document.createElement('style');
      popInStyle.id = 'pop-in-style';
      popInStyle.textContent = `
      @keyframes popInAnimation {
        0% {
          opacity: 0;
          transform: scale(0.85);
        }
        70% {
          opacity: 1;
          transform: scale(1.05);
        }
        100% {
          opacity: 1;
          transform: scale(1);
        }
      }
      `;
      document.head.appendChild(popInStyle);
    }
    // Apply animation to each element with a slight delay between them
    popInElements.forEach((element, index) =>
    {
      // Set initial state
      element.style.opacity = "0";
      element.style.transform = "scale(0.85)";
      element.style.transformOrigin = "center";
      void element.offsetWidth;
      // Apply animation with increasing delay based on index
      element.style.animation = `popInAnimation 0.65s forwards ease-out`;
      element.style.animationDelay = `${0.15 * index}s`;
      // Apply final state after animation completes
      const animationDuration = 650 + (150 * index); // match the animation duration + delay
      setTimeout(() =>
      {
        element.style.opacity = "1";
        element.style.transform = "scale(1)";
      }, animationDuration);
    });
  });

  waitForElement(".coverage-section", (element) =>
  {
    if (!document.getElementById('pop-in-animation-style'))
    {
      const popInStyle = document.createElement('style');
      popInStyle.id = 'pop-in-animation-style';
      popInStyle.textContent = `
      @keyframes popIn {
        0% {
          opacity: 0;
          transform: scale(0.85);
        }
        70% {
          opacity: 1;
          transform: scale(1.05);
        }
        100% {
          opacity: 1;
          transform: scale(1);
        }
      }
      
      @keyframes itemHopIn {
        0% { 
          opacity: 0; 
          transform: translateY(9px) scale(0.85);
        }
        60% { 
          opacity: .9; 
          transform: translateY(-8px) scale(1.05);
        }
        80% {
          transform: translateY(3px) scale(0.98);
        }
        100% { 
          opacity: .9; 
          transform: translateY(0) scale(1);
        }
      }
      `;
      document.head.appendChild(popInStyle);
    }

    // Get sections and make all items initially hidden
    const sections = document.querySelectorAll(".coverage-section");
    const allItems = document.querySelectorAll(".coverage-item");
    allItems.forEach(item =>
    {
      item.style.opacity = "0";
    });

    // Apply pop-in animation to each section
    sections.forEach((section, index) =>
    {
      section.style.opacity = "0";
      section.style.transform = "scale(0.9)";
      section.style.transformOrigin = "center";
      section.style.animation = "popIn 0.75s forwards ease-out";
      section.style.animationDelay = `${0.15 * index}s`;

      // Get items in this section and prepare for hop animation
      const items = section.querySelectorAll(".coverage-item");

      // Make items hop in after section appears
      setTimeout(() =>
      {
        items.forEach((item, itemIndex) =>
        {
          // Clear any previous animation
          item.style.animation = "none";
          void item.offsetWidth; // Force reflow
          setTimeout(() =>
          {
            item.style.opacity = "";
            item.style.animation = "itemHopIn 0.5s forwards ease-out";

            setTimeout(() =>
            {
              item.style.animation = "shake 3s linear infinite";
            }, 500); //needs to be short to prevent glitch
          }, 40 * itemIndex); // Stagger items
        });
      }, 200 + (100 * index)); // Time after section appears
    });
  });

  waitForElement(".benefits-transition", (element) =>
  {
    element.style.position = "relative";
    element.style.transform = "translateY(20px)";
    element.style.opacity = "0";
    element.style.filter = "blur(0.5px)";
    void element.offsetWidth;
    element.style.transition = "transform 0.75s ease-out, opacity 0.75s ease-out, filter 0.6s ease";
    setTimeout(() =>
    {
      element.style.transform = "translateY(0)";
      element.style.opacity = "1";
      element.style.filter = "blur(0)";
    }, 200);
  });

  // Add subtle animations for eligibility and renewal status
  waitForElement(".eligibility-status-row", (element) =>
  {
    const statusText = element.querySelector('h4');
    const icon = element.querySelector('i');

    if (statusText && statusText.textContent === "Active")
    {
      // First, hide the elements
      statusText.style.opacity = "0";
      statusText.style.transform = "scale(0.3)";
      if (icon)
      {
        icon.style.opacity = "0";
        icon.style.transform = "rotate(-45deg) scale(0.3)";
      }

      // Add animation styles
      if (!document.getElementById('status-entrance-animation'))
      {
        const animStyle = document.createElement('style');
        animStyle.id = 'status-entrance-animation';
        animStyle.textContent = `
        @keyframes expand-active {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          60% {
            transform: scale(1.1);
            opacity: 1;
          }
          80% {
            transform: scale(0.95);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes check-rotate-in {
          0% {
            transform: rotate(-45deg) scale(0.3);
            opacity: 0;
          }
          60% {
            transform: rotate(10deg) scale(1.15);
            opacity: 1;
          }
          80% {
            transform: rotate(-5deg) scale(0.95);
          }
          100% {
            transform: rotate(0deg) scale(1);
            opacity: 1;
          }
        }
        `;
        document.head.appendChild(animStyle);
      }

      // Delay slightly after page load
      setTimeout(() =>
      {
        statusText.style.opacity = "";
        statusText.style.transform = "";
        statusText.style.animation = "expand-active .85s ease-out forwards";
        statusText.style.display = "inline-block";

        if (icon)
        {
          icon.style.opacity = "";
          icon.style.transform = "";
          icon.style.animation = "check-rotate-in .85s ease-out forwards";
          icon.style.transformOrigin = "center";
        }
      }, 250);
    }
  });

  waitForElement(".renewal-status-row", (element) =>
  {
    const dateText = element.querySelector('h4');
    const icon = element.querySelector('i');

    if (dateText)
    {
      // First, hide the elements
      dateText.style.opacity = "0";
      dateText.style.transform = "translateY(20px)";
      if (icon)
      {
        icon.style.opacity = "0";
        icon.style.transform = "rotate(45deg) scale(0.3)";
      }

      // Add animation styles
      if (!document.getElementById('date-entrance-animation'))
      {
        const animStyle = document.createElement('style');
        animStyle.id = 'date-entrance-animation';
        animStyle.textContent = `
        @keyframes date-slide-up {
         0% {
          transform: scale(0.3);
          opacity: 0;
        }
        60% {
          transform: scale(1.02);
          opacity: 1;
        }
        80% {
          transform: scale(0.95);
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }

      @keyframes clock-spin-in {
        0% {
          transform: rotate(45deg) scale(0.3);
          opacity: 0;
        }
        65% {
          transform: rotate(-10deg) scale(1.2);
          opacity: 1;
        }
        85% {
          transform: rotate(5deg) scale(0.95);
        }
        100% {
          transform: rotate(0deg) scale(1);
          opacity: 1;
        }
      }
      `;
      document.head.appendChild(animStyle);
    }
    setTimeout(() =>
    {
      dateText.style.opacity = "";
      dateText.style.transform = "";
      dateText.style.animation = "date-slide-up .85s ease-out forwards";

      if (icon)
      {
        icon.style.opacity = "";
        icon.style.transform = "";
        icon.style.animation = "clock-spin-in .85s ease-out forwards";
        icon.style.transformOrigin = "center";
      }
    }, 450);
  }
});

  if (tabNumber == 1)
  {
    initializeTab1();
  }
  if (tabNumber === 2)
  {
    initializeTab2();
  }
  if (tabNumber === 3)
  {
    initializeTab3();
  }
  if (tabNumber == 4)
  {
    initializeTab4();
  }
  if (tabNumber == 5)
  {
    initializeTab5();
  }
}


function showCacheBanner(cachedAt, renewalDate) 
{
  // Remove any existing banner
  const existingBanner = document.getElementById('cache-banner');
  if (existingBanner) {
    existingBanner.remove();
  }

  // Format the cached date
  let cachedDateFormatted = 'recently';
  if (cachedAt) {
    try {
      const date = new Date(cachedAt);
      cachedDateFormatted = date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
      });
    } catch (e) {
      cachedDateFormatted = 'recently';
    }
  }

  // Create banner
  const banner = document.createElement('div');
  banner.id = 'cache-banner';
  banner.innerHTML = `
  <div class="cache-banner-content">
  <div class="cache-banner-main">
  <span class="cache-banner-text">
  This data is from ${cachedDateFormatted} and will not update until your renewal date.
  Get real-time updates with <span onclick=showPremiumModal() class='premium-link'>Premium.</span>
  </span>
  </div>
  <button class="cache-banner-close">&times;</button>
  </div>
  `;

  // Insert at the top of the page
  document.body.insertBefore(banner, document.body.firstChild);

  // Set initial state (completely hidden)
  banner.style.opacity = '0';
  banner.style.transform = 'translateY(-100%)';
  banner.style.animation = 'none';

  // First delay - start the slide down
  setTimeout(() => {
    banner.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.4s ease';
    banner.style.opacity = '1';
    banner.style.transform = 'translateY(0)';
  }, 800); // 800ms delay


  // Close button functionality
  banner.querySelector('.cache-banner-close').addEventListener('click', function() {
    banner.style.animation = 'cacheBannerSlideUp 0.3s ease-out forwards';
    setTimeout(() => {
      if (banner.parentNode) {
        banner.parentNode.removeChild(banner);
      }
    }, 300);
  });
}

function showPremiumBanner() 
{
  const existingBanner = document.getElementById('cache-banner');
  if (existingBanner) {
    existingBanner.remove();
  }
  const banner = document.createElement('div');
  banner.id = 'cache-banner';
  banner.innerHTML = `
  <div class="cache-banner-content">
  <div class="cache-banner-main">
  <span class="cache-banner-text">
  Your insurance data <b>is in real-time.</b><br>
  Thank you for being a premium member!</span>
  </span>
  </div>
  <button class="cache-banner-close">&times;</button>
  </div>
  `;
  
  document.body.insertBefore(banner, document.body.firstChild);

  // Set initial state (completely hidden)
  banner.style.opacity = '0';
  banner.style.transform = 'translateY(-100%)';
  banner.style.animation = 'none';

  // First delay - start the slide down
  setTimeout(() => {
    banner.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.4s ease';
    banner.style.opacity = '1';
    banner.style.transform = 'translateY(0)';
  }, 800); // 800ms delay


  // Close button functionality
  banner.querySelector('.cache-banner-close').addEventListener('click', function() {
    banner.style.animation = 'cacheBannerSlideUp 0.3s ease-out forwards';
    setTimeout(() => {
      if (banner.parentNode) {
        banner.parentNode.removeChild(banner);
      }
    }, 300);
  });
}





function initializeTab1()
{
  waitForElement("#summary-card-benefits", (element) =>
  {
    let targetAmount = 0; //default
    const amountStr = maximumRemaining.replace('$', '').trim();
    const parsedAmount = parseInt(amountStr);
    if (!isNaN(parsedAmount))
    {
      targetAmount = parsedAmount;
    }

    let fillPercentage = 100; //default
    fillPercentage = parseFloat(percentOfMaxUsed.replace('%', ''));
    if (isNaN(fillPercentage) || fillPercentage < 2)
    {
      fillPercentage = 2; // Minimum 2% for visibility
    }
    // Make sure it's never more than 100
    if (fillPercentage > 100)
    {
      fillPercentage = 100;
    }
    const svgSize = 180;
    const strokeWidth = 16;
    const radius = (svgSize / 2) - (strokeWidth / 2);
    const circumference = 2 * Math.PI * radius;
    const dashArray = circumference;
    const dashOffset = circumference * (1 - (fillPercentage / 100));

    const infographicHTML = `
    <h3>Your Benefits</h3>
    <div class="svg-circle-container">
    <svg class="svg-circle" width="${svgSize}" height="${svgSize}" viewBox="0 0 ${svgSize} ${svgSize}">
    <!-- Background circle -->
    <circle class="svg-circle-bg" 
    cx="${svgSize/2}" 
    cy="${svgSize/2}" 
    r="${radius}" 
    stroke-width="${strokeWidth}">
    </circle>

    <!-- Progress circle that will animate -->
    <circle class="svg-circle-progress" 
    cx="${svgSize/2}" 
    cy="${svgSize/2}" 
    r="${radius}" 
    stroke-width="${strokeWidth}"
    stroke-dasharray="${dashArray}"
    stroke-dashoffset="${circumference}">
    </circle>
    </svg>
    <div class="svg-circle-text">
    <span class="big-bold" id="benefits-counter">$0</span>
    <span class="remaining-text">remaining</span>
    </div>
    </div>
    <div id='summary-ps'>
    <p class='summary-benefits-info'><i class="fas fa-info-circle" id='first-benefit-i'></i>Your insurance pays a set percentage of your dental costs until your benefits run out</p>
    <p class='summary-benefits-info' id='info2'>For more information, visit the <span style='font-weight:675'>Coverage</span> tab</p>
    </div>`


    element.innerHTML = infographicHTML;


    // Add CSS for the SVG circle progress
    const style = document.createElement('style');
    style.id = 'svg-circle-styles';
    style.textContent = `
    .svg-circle-container {
      position: relative;
      width: ${svgSize}px;
      height: ${svgSize}px;
      margin: 20px auto;
      margin-bottom: 20px;
    }
    .svg-circle {
      transform: rotate(-90deg);
      overflow: visible;
    }
    .svg-circle-bg {
      fill: none;
      stroke: #2980b933;
    }
    .svg-circle-progress {
      fill: none;
      stroke: url(#stripe-pattern);
      stroke-linecap: round;
      transform-origin: center;
      transition: stroke-dashoffset 1s cubic-bezier(0.42, 0, 0.58, 1) .1s;
      will-change: stroke-dashoffset;
      transform: translateZ(0);
      backface-visibility: hidden;
    }

    .svg-circle-text {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .remaining-text {
      font-size: 14px;
      margin-top: 4px;
    }
    `;
    document.head.appendChild(style);

    // Add the SVG pattern definition for LARGER stripes
    const patternSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    patternSvg.style.width = "0";
    patternSvg.style.height = "0";
    patternSvg.innerHTML = `
    <defs>
    <pattern id="stripe-pattern" patternUnits="userSpaceOnUse" width="20" height="20" patternTransform="rotate(45)">
    <rect width="10" height="20" fill="#2980b9" opacity=".9" />
    <rect x="10" width="10" height="20" fill="rgba(41, 128, 185, 0.8)" />
    </pattern>
    </defs>
    `;
    document.body.appendChild(patternSvg);

    // Counter animation - starting from $0
    const counterElement = document.getElementById('benefits-counter');
    if (counterElement)
    {
      counterElement.textContent = maximumRemaining;
      /*
      const startValue = 0;
      const duration = 1375; //duration of counting up animation 
      const startTime = performance.now();
      
      function updateCounter(currentTime) 
      {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        const easeOutExpo = 1 - Math.pow(2, -5 * progress);

        const currentValue = Math.max(Math.round(startValue + (targetAmount - startValue) * easeOutExpo),0);
        counterElement.textContent = `$${currentValue}`;
        
        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counterElement.textContent = maximumRemaining;
        }
      }
      setTimeout(() => {
        requestAnimationFrame(updateCounter);
      }, 0); //delay for number
      */
    }

    setTimeout(() =>
    {
      const progressCircle = document.querySelector('.svg-circle-progress');
      if (progressCircle)
      {
        progressCircle.style.strokeDashoffset = dashOffset;
      }
    }, 50); //delay for circle
  });
}

function initializeTab3() {
  waitForElement(".info-section", () => {
    const sections = document.querySelectorAll('.info-section');

    // DISABLE CSS transitions before starting JS animations
    sections.forEach(section => {
      section.style.transition = 'none';
    });

    // Force a reflow to ensure transitions are disabled
    void document.body.offsetHeight;

    // Add pop-in animation style if it doesn't exist yet
    if (!document.getElementById('info-pop-in-style')) {
      const popInStyle = document.createElement('style');
      popInStyle.id = 'info-pop-in-style';
      popInStyle.textContent = `
      @keyframes infoPopInAnimation {
        0% {
          opacity: 0;
          transform: scale(0.85);
        }
        70% {
          opacity: 1;
          transform: scale(1.05);
        }
        100% {
          opacity: 1;
          transform: scale(1);
        }
      }
      `;
      document.head.appendChild(popInStyle);
    }

    // Apply animation to each section with a slight delay between them
    sections.forEach((section, index) => {
      // Set initial state
      section.style.opacity = "0";
      section.style.transform = "scale(0.85)";
      section.style.transformOrigin = "center";
      void section.offsetWidth;

      // Apply animation with increasing delay based on index
      section.style.animation = `infoPopInAnimation 0.65s forwards ease-out`;
      section.style.animationDelay = `${0.15 * index}s`;

      // Apply final state after animation completes
      const animationDuration = 650 + (150 * index);
      setTimeout(() => {
        section.style.opacity = "1";
        section.style.transform = "scale(1)";
        section.classList.add('shown');

        // RE-ENABLE CSS transitions after JS animation completes
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      }, animationDuration);
    });

    // Initialize scroll-based animations for elements that need it
    if (currentTab3Section === 2) {
      detectVisibleElements();
    }
    
    document.body.style.overflow = "auto";
    document.body.style.touchAction = 'auto';
  });
}



function detectVisibleElements()
{
  const pricingItems = document.querySelectorAll('#pricing-info .procedure-cost-item');
  const timingItems = document.querySelectorAll('#timing-info .info-list li');
  pricingItems.forEach(item =>
  {
    item.style.opacity = '0';
  });
  timingItems.forEach(item =>
  {
    item.style.opacity = '0';
  });

  function isInViewport(element)
  {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    // This makes elements only appear after they're 20% into the viewport
    const visibilityThreshold = 0.08;
    return (
      // Element's top is at least 20% into the viewport
      rect.top <= (windowHeight * (1 - visibilityThreshold)) &&
      // Element's bottom is still in view
      rect.bottom >= 0 &&
      // Element is horizontally in view
      rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
      rect.right >= 0
      );
  }

  function checkAllElements()
  {
    // Check pricing items
    pricingItems.forEach((item, index) =>
    {
      if (isInViewport(item) && item.style.opacity === '0')
      {
        // Add animation with delay based on index
        item.style.animation = `itemAppear 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`;
        item.style.animationDelay = `${0.15 + (0.1 * index)}s`;
      }
    });
    // Check timing items
    timingItems.forEach((item, index) =>
    {
      if (isInViewport(item) && item.style.opacity === '0')
      {
        item.style.animation = `listItemAppear 0.5s forwards`;
        item.style.animationDelay = `${0.15 + (0.1 * index)}s`;
      }
    });
  }
  // Add scroll listener to the container
  const infoDiv = document.getElementById('info-div');
  if (infoDiv)
  {
    infoDiv.addEventListener('scroll', checkAllElements,
    {
      passive: true
    });
    // Also listen to window scroll in case infoDiv doesn't scroll
    window.addEventListener('scroll', checkAllElements,
    {
      passive: true
    });
    // Also call after a short delay to detect initial items
    setTimeout(checkAllElements, 100);
    // Call again after a longer delay in case of slow rendering
    setTimeout(checkAllElements, 500);
    // One more check for really slow devices
    setTimeout(checkAllElements, 1500);
  }
  // Run immediately
  checkAllElements();
}




function switchTab3Section(sectionNumber) 
{
  currentTab3Section = sectionNumber;
  showNext(); // Refresh the content
}
function submitEmail() {
  const emailInput = document.getElementById('email-signup');
  const email = emailInput.value.trim();
  const button = document.querySelector('#email-submit-2');

  button.style.transform = 'scale(0.9)';
  button.style.transition = 'all 0.2s ease';
  button.disabled = true;
  
  // Comprehensive email validation first - should really never go to errors so it looks bettter
  if (!email || email.length < 5 || email.length > 254 || !email.includes('@') || !email.includes('.') || email.indexOf('@') === 0 || email.indexOf('@') === email.length - 1 || email.indexOf('.') === 0 || email.indexOf('.') === email.length - 1 || email.indexOf('@') > email.lastIndexOf('.') || email.split('@').length !== 2 || email.includes('..') || email.includes('@.') || email.includes('.@') || email.includes(' ') || email.split('@')[0].length === 0 || email.split('@')[1].length === 0 || email.split('@')[1].split('.').some(part => part.length === 0) || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) 
  {
    button.innerHTML = '<i class="fas fa-times"></i>';
    
    emailInput.style.animation = 'shake2 0.4s ease-in-out';
    setTimeout(() => {
      emailInput.style.animation = '';
      button.style.transform = 'scale(1)';
      button.innerHTML = '<i class="fas fa-paper-plane"></i>';
      button.disabled = false;
    }, 400);
    return;
  }

  
  setTimeout(() => {
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
  }, 0);
  
  // Get user data from variables array and global DOB
  const firstName = variables[0][1]; // First Name
  const lastName = variables[1][1];  // Last Name  
  const renewalDate = variables[4][1]; // Renewal Date
  
  // Call the new email reminder API
  fetch('https://gutqn1nstl.execute-api.us-east-1.amazonaws.com/prod/email-reminder', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      email: email,
      renewalDate: renewalDate,
      dateOfBirth: DOB
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      // Show success animation
      button.style.transformOrigin = 'center';
      button.style.transform = 'scale(0.9)';
      
      setTimeout(() => {
        button.innerHTML = '<i class="fas fa-check"</i>';
        button.style.transform = 'scale(1)';
        showEmailSuccessPopup();
        
        // Reset button after success
        setTimeout(() => {
          button.innerHTML = '<i class="fas fa-paper-plane"></i>';
          button.disabled = false;
        }, 3500);
      }, 400);
    } else {
      // Handle API error - back to airplane (should be very rare)
      button.innerHTML = '<i class="fas fa-times-circle"></i>';
      
      emailInput.style.animation = 'shake2 0.4s ease-in-out';
      setTimeout(() => {
        emailInput.style.animation = '';
        button.style.transform = 'scale(1)';
        button.innerHTML = '<i class="fas fa-paper-plane"></i>';
        button.disabled = false;
      }, 400);
    }
  })
  .catch(error => {
    // Handle any error - back to airplane (should be very rare)
    button.innerHTML = '<i class="fas fa-times"></i>';
    
    emailInput.style.animation = 'shake2 0.4s ease-in-out';
    setTimeout(() => {
      emailInput.style.animation = '';
      button.style.transform = 'scale(1)';
      button.innerHTML = '<i class="fas fa-paper-plane"></i>';
      button.disabled = false;
    }, 400);
  });
}
function showEmailSuccessPopup() 
{
  // Remove any existing popup
  const existingPopup = document.querySelector('.email-success-popup');
  if (existingPopup) {
    existingPopup.remove();
  }

  // Create popup element
  const popup = document.createElement('div');
  popup.className = 'email-success-popup';
  popup.innerHTML = `
  <div class="email-popup-content">
  <div class="email-popup-icon">
  <i class="fas fa-check"></i>
  </div>
  <div class="email-popup-text">
  <h4>Success!</h4>
  <p>Email submitted successfully. We'll notify you when your benefits renew.</p>
  </div>
  `;

  document.body.appendChild(popup);

  // Force reflow before adding show class
  void popup.offsetHeight;

  // Add show class to trigger entrance animation
  popup.classList.add('show');

  // Auto-hide the popup after delay
  setTimeout(() => {
    popup.classList.remove('show');
    popup.classList.add('hide');
    
    setTimeout(() => {
      if (document.body.contains(popup)) {
        document.body.removeChild(popup);
      }
    }, 500);
  }, 3500);
}


function providerLearnMore() 
{
  window.open('provider-portal.html', '_blank', 'noopener,noreferrer');
}


function upgradeToPremium() 
{
  showPremiumModal();
}
function showPremiumModal() 
{
  const modalHTML = `
  <div class="premium-modal-overlay" id="premium-modal">
  <div class="premium-modal">
  <button class="premium-modal-close" onclick="closePremiumModal()">&times;</button>

  <div class="premium-container">
  <!-- Hero Section -->
  <section class="fade-in" style="text-align: center; padding: calc(var(--spacing-lg) * 0.8) var(--spacing-md); background: linear-gradient(135deg, #317568 0%, #2d6a5e 100%); border-radius: var(--spacing-md); margin: var(--spacing-md) 0; position: relative; overflow: hidden; box-shadow: 0 calc(var(--spacing-md) * 1) calc(var(--spacing-lg) * 0.5) rgba(0,0,0,0.1);">
  <div style="position: relative; z-index: 2; margin-bottom: var(--spacing-md);">
  <div style="width: calc(var(--spacing-lg) * 1.6); height: calc(var(--spacing-lg) * 1.6); background: #317568; backdrop-filter: blur(10px); border: calc(var(--scale-factor) * 2px) solid rgba(255, 255, 255, 0.3); border-radius: 50%; margin: 0 auto; display: flex; align-items: center; justify-content: center;">
  <i class="fas fa-crown" style="font-size: calc(var(--font-base) * 2.2); color: #ffd700;"></i>
  </div>
  </div>
  <h1 style="font-size: calc(var(--font-large) * 1.1); font-weight: 800; color: white; margin-bottom: calc(var(--spacing-md) * 0.6); position: relative; z-index: 2;">openbook Premium</h1>
  <p style="font-size: calc(var(--font-base) * 1.1); color: rgba(255, 255, 255, 0.9); font-weight: 500; margin-bottom: calc(var(--spacing-lg) * 0.6); position: relative; z-index: 2; line-height: 1.4;">Never wait for insurance updates again</p>

  <div class="price-highlight" style="background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px); border-radius: var(--spacing-md); padding: var(--spacing-md); position: relative; z-index: 2; box-shadow: 0 calc(var(--spacing-sm) * 1) calc(var(--spacing-md) * 1.5) rgba(0,0,0,0.1); cursor: pointer;">
  <div style="display: flex; align-items: baseline; justify-content: center; gap: calc(var(--spacing-sm) * 0.8); margin-bottom: calc(var(--spacing-sm) * 0.8);">
  <span style="font-size: calc(var(--font-large) * 1.65); font-weight: 900; color: #317568;">$1</span>
  <span style="font-size: calc(var(--font-base) * 1.2); color: #64748b; font-weight: 600;">/month</span>
  </div>
  <p style="font-size: calc(var(--font-base) * 0.85); color: #64748b; font-weight: 500;">Billed yearly • Cancel anytime</p>
  </div>
  </section>

  <!-- Problem-Solution Section -->
  <section class="fade-in" style="background: white; border-radius: var(--spacing-md); padding: calc(var(--spacing-md) * 1.5); margin: var(--spacing-md) 0; box-shadow: 0 calc(var(--spacing-xs) * 0.8) calc(var(--spacing-md) * 1.2) rgba(0,0,0,0.1); border: calc(var(--scale-factor) * 1px) solid #e5e7eb; text-align: center;">
  <h2 style="font-size: calc(var(--font-base) * 1.45); font-weight: 700; color: #1e293b; margin-bottom: calc(var(--spacing-md) * 0.8);">Why Upgrade to Premium?</h2>
  <p style="font-size: calc(var(--font-base) * 1.05); color: #64748b; font-weight: 500; margin-bottom: calc(var(--spacing-md) * 1.2); line-height: 1.6;">The difference is simple: with free, your benefit data updates just once per year. With Premium, get unlimited real-time updates whenever you need them.</p>

  <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: calc(var(--spacing-md) * 0.8); padding: calc(var(--spacing-md) * 1.2); border: calc(var(--scale-factor) * 1px) solid #e2e8f0;">
  <p style="font-size: calc(var(--font-base) * 0.95); line-height: 1.6; color: #1e293b; margin-bottom: var(--spacing-md);">
  Right now, you're seeing <span style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 0; border-radius: calc(var(--spacing-sm) * 0.6); font-weight: 600; color: #92400e;">old data</span> that won't refresh until your insurance renews. Miss important coverage changes, never know your real remaining benefits, and risk surprises at appointments.
  </p>
  <p style="font-size: calc(var(--font-base) * 0.95); line-height: 1.6; color: #1e293b;">
  With Premium, you get <span style="background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%); padding: 0; border-radius: calc(var(--spacing-sm) * 0.6); font-weight: 600; color: #065f46;">unlimited real-time updates</span> so you always see current benefit information, track usage throughout the year, and never get caught off guard by coverage changes.
  </p>
  </div>
  </section>

  <!-- Comparison -->
  <section class="fade-in" style="margin: calc(var(--spacing-lg) * 0.6) 0;">
  <h2 style="font-size: calc(var(--font-base) * 1.45); font-weight: 700; color: #1e293b; text-align: center; margin-bottom: var(--spacing-md);">Free vs Premium</h2>
  <div style="display: grid; grid-template-columns: 1fr; gap: var(--spacing-md);">
  <div style="background: white; border-radius: var(--spacing-md); padding: var(--spacing-md); text-align: center; position: relative; box-shadow: 0 calc(var(--spacing-xs) * 0.8) calc(var(--spacing-md) * 1.2) rgba(0,0,0,0.1); border: calc(var(--scale-factor) * 2px) solid #e5e7eb;">
  <h3 style="font-size: calc(var(--font-base) * 1.1); font-weight: 700; margin-bottom: var(--spacing-md); color: #1e293b;">Free</h3>
  <div style="display: flex; align-items: center; justify-content: space-between; padding: calc(var(--spacing-md) * 0.6) 0; border-bottom: calc(var(--scale-factor) * 1px) solid #f1f5f9; font-size: calc(var(--font-base) * 0.85);">
  <span style="font-weight: 600; color: #1e293b;">Data Updates</span>
  <span style="font-weight: 700; color: #ef4444;">Once/Year</span>
  </div>
  <div style="display: flex; align-items: center; justify-content: space-between; padding: calc(var(--spacing-md) * 0.6) 0; border-bottom: calc(var(--scale-factor) * 1px) solid #f1f5f9; font-size: calc(var(--font-base) * 0.85);">
  <span style="font-weight: 600; color: #1e293b;">Real-Time Benefits</span>
  <span style="font-weight: 700; color: #ef4444;">✗</span>
  </div>
  <div style="display: flex; align-items: center; justify-content: space-between; padding: calc(var(--spacing-md) * 0.6) 0; font-size: calc(var(--font-base) * 0.85);">
  <span style="font-weight: 600; color: #1e293b;">Renewal Alerts</span>
  <span style="font-weight: 700; color: #10b981;">✓</span>
  </div>
  </div>

  <div style="background: linear-gradient(135deg, white 0%, #f0fdf4 100%); border-radius: var(--spacing-md); padding: var(--spacing-md); text-align: center; position: relative; box-shadow: 0 calc(var(--spacing-xs) * 0.8) calc(var(--spacing-md) * 1.2) rgba(0,0,0,0.1); border: calc(var(--scale-factor) * 2px) solid #317568;">
  <div style="position: absolute; top: calc(var(--spacing-sm) * -1); left: 50%; transform: translateX(-50%); background: #317568; color: white; padding: calc(var(--spacing-xs) * 0.8) calc(var(--spacing-md) * 0.6); border-radius: calc(var(--spacing-md) * 0.6); font-size: calc(var(--font-base) * 0.73); font-weight: 700;">NEW</div>
  <h3 style="font-size: calc(var(--font-base) * 1.1); font-weight: 700; margin-bottom: var(--spacing-md); color: #317568;">Premium</h3>
  <div style="display: flex; align-items: center; justify-content: space-between; padding: calc(var(--spacing-md) * 0.6) 0; border-bottom: calc(var(--scale-factor) * 1px) solid #f1f5f9; font-size: calc(var(--font-base) * 0.85);">
  <span style="font-weight: 600; color: #1e293b;">Data Updates</span>
  <span style="font-weight: 700; color: #10b981;">Unlimited</span>
  </div>
  <div style="display: flex; align-items: center; justify-content: space-between; padding: calc(var(--spacing-md) * 0.6) 0; border-bottom: calc(var(--scale-factor) * 1px) solid #f1f5f9; font-size: calc(var(--font-base) * 0.85);">
  <span style="font-weight: 600; color: #1e293b;">Real-Time Benefits</span>
  <span style="font-weight: 700; color: #10b981;">✓</span>
  </div>
  <div style="display: flex; align-items: center; justify-content: space-between; padding: calc(var(--spacing-md) * 0.6) 0; font-size: calc(var(--font-base) * 0.85);">
  <span style="font-weight: 600; color: #1e293b;">Renewal Alerts</span>
  <span style="font-weight: 700; color: #10b981;">✓</span>
  </div>
  </div>
  </div>
  </section>

  <!-- Call to Action -->
  <section class="cta-section fade-in" style="text-align: center; padding: calc(var(--spacing-lg) * 0.8) var(--spacing-md); background: white; border-radius: calc(var(--spacing-md) * 1); margin: calc(var(--spacing-lg) * 0.6) 0; box-shadow: 0 calc(var(--spacing-sm) * 2) calc(var(--spacing-lg) * 0.75) rgba(0,0,0,0.1);">
  <h2 style="font-size: calc(var(--font-large) * 0.97); font-weight: 800; color: #1e293b; margin-bottom: calc(var(--spacing-md) * 0.6);">Ready to Upgrade?</h2>
  <p style="font-size: calc(var(--font-base) * 1.1); color: #64748b; margin-bottom: calc(var(--spacing-lg) * 0.6); line-height: 1.4;">Join thousands who never worry about outdated dental benefits</p>

  <button id="upgrade-btn" onclick="handlePremiumUpgrade()" style="background: linear-gradient(135deg, #317568 0%, #2d6a5e 100%); color: white; padding: var(--spacing-md) calc(var(--spacing-lg) * 0.64); border: none; border-radius: calc(var(--spacing-md) * 0.6); font-size: calc(var(--font-base) * 1.1); font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: calc(var(--spacing-sm) * 1); text-decoration: none; font-family: inherit; position: relative; overflow: hidden; box-shadow: 0 calc(var(--spacing-xs) * 0.8) calc(var(--spacing-md) * 1.2) rgba(0,0,0,0.15); transition: all 0.3s ease;">
  <i class="fas fa-crown" style="font-size: calc(var(--font-base) * 1.2);"></i>
  Upgrade to Premium
  </button>

  <div style="text-align: center; margin-top: calc(var(--spacing-md) * 1.5); padding: var(--spacing-xs); background: rgba(16, 185, 129, 0.1); border-radius: calc(var(--spacing-md) * 0.6); border: calc(var(--scale-factor) * 1px) solid rgba(16, 185, 129, 0.2);">
  <p style="font-size: calc(var(--font-base) * 0.75); color: #10b981; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: calc(var(--spacing-sm) * 0.8);">
  <i class="fas fa-piggy-bank"></i>
  Save hundreds for $1 a month
  </p>
  </div>
  </section>
  </div>
  </div>
  </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  const modal = document.getElementById('premium-modal');
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
  setTimeout(() => {
    modal.classList.add('show');
  }, 10);

  setTimeout(() => {
    runModalFunctions();
  }, 10);
}
function runModalFunctions()
{
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach((element) => {
      observer.observe(element);
    });
    

    /* Scrolls to the bottom if you click price highligh */
    const priceHighlight = document.querySelector('.price-highlight');
    const ctaSection = document.querySelector('.cta-section');

    priceHighlight.addEventListener('click', () => {
      ctaSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    });
  }
  function closePremiumModal() 
  {
    const modal = document.getElementById('premium-modal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
    setTimeout(() => {
      modal.remove();
    }, 400);
  }









  async function handlePremiumUpgrade() {
    const upgradeButton = document.getElementById('upgrade-btn');
    const originalContent = upgradeButton.innerHTML;

  // Check if user already has premium
  if (userIsPremium) {
    alert('Upgrade failed: You already own premium!');
    return;
  }
  
  // Get user data
  const firstName = variables?.[0]?.[1];
  const lastName = variables?.[1]?.[1];
  const dateOfBirth = DOB;
  
  // Check if we have required data
  if (!firstName || !lastName || !dateOfBirth) {
    alert('Upgrade failed: Please first log into your insurance benefits to buy premium');
    return;
  }

  // Show processing state
  upgradeButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
  upgradeButton.disabled = true;

  try {
    // Create renewal date
    const nextYear = new Date();
    nextYear.setFullYear(nextYear.getFullYear() + 1);
    const renewalDate = `${String(nextYear.getMonth() + 1).padStart(2, '0')}/${String(nextYear.getDate()).padStart(2, '0')}/${nextYear.getFullYear()}`;

    // Call Lambda to create checkout session
    const response = await fetch('https://u4dksufwtwaxeivrmhrqqur6x40ggnsk.lambda-url.us-east-1.on.aws/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: dateOfBirth,
        renewalDate: renewalDate
      })
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const sessionData = await response.json();
    
    // Open Stripe checkout in new tab
    window.open(sessionData.checkoutUrl, '_blank');
    
    
    // Reset button immediately
    upgradeButton.innerHTML = originalContent;
    upgradeButton.disabled = false;

  } catch (error) {
    console.error('Payment error:', error);
    
    // Reset button
    upgradeButton.innerHTML = originalContent;
    upgradeButton.disabled = false;
    
    alert('Payment failed: ' + error.message + '. Please try again.');
  }
}





function checkPaymentStatus() 
{
  const urlParams = new URLSearchParams(window.location.search);
  const status = urlParams.get('status');
  if (status === 'success') 
  {
    // Show success banner
    const banner = document.createElement('div');
    banner.id = 'cache-banner';
    banner.innerHTML = `
    <div class="cache-banner-content">
    <div class="cache-banner-main">
    <span class="cache-banner-text">
    Your insurance data <b>is in real-time.</b><br>
    Thank you for being a premium member!</span>
    </span>
    </div>
    <button class="cache-banner-close">&times;</button>
    </div>
    `;

    document.body.insertBefore(banner, document.body.firstChild);

    // Set initial state (completely hidden)
    banner.style.opacity = '0';
    banner.style.transform = 'translateY(-100%)';
    banner.style.animation = 'none';

    // First delay - start the slide down
    setTimeout(() => {
      banner.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.4s ease';
      banner.style.opacity = '1';
      banner.style.transform = 'translateY(0)';
    }, 800); // 800ms delay


    // Close button functionality
    banner.querySelector('.cache-banner-close').addEventListener('click', function() {
      banner.style.animation = 'cacheBannerSlideUp 0.3s ease-out forwards';
      setTimeout(() => {
        if (banner.parentNode) {
          banner.parentNode.removeChild(banner);
        }
      }, 300);
    });
  }
  else if (status === 'cancelled') 
  {
    // Show cancelled message
    const banner = document.createElement('div');
    banner.style.cssText = `
    position: fixed; 
    top: 0; 
    left: 0; 
    width: 100%; 
    background: #EF4444; 
    color: white; 
    text-align: center; 
    padding: 15px; 
    z-index: 99999;
    font-weight: bold;
    `;
    banner.innerHTML = '❌ Payment was cancelled. You can try upgrading again anytime.';
    document.body.appendChild(banner);
    setTimeout(() => banner.remove(), 8000);
  }
  if (status) {
    window.history.replaceState({}, document.title, window.location.pathname);
  }
}
window.addEventListener('load', checkPaymentStatus);
if (document.readyState === 'complete') {
  checkPaymentStatus();
}



/*
async function handlePremiumUpgrade() 
{
  const upgradeButton = document.getElementById('upgrade-btn');
  const originalContent = upgradeButton.innerHTML;
  
  // Check if user data exists
  const firstName = variables?.[0]?.[1];
  const lastName = variables?.[1]?.[1];
  const dateOfBirth = DOB;
  const renewalDate = variables?.[4]?.[1];
  
  // Processing animation
  upgradeButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
  upgradeButton.disabled = true;
  upgradeButton.style.opacity = '0.7';
  
  try {
    console.log('Attempting premium upgrade for:', firstName, lastName);
    
    // Make the API call directly here
    const response = await fetch('https://gutqn1nstl.execute-api.us-east-1.amazonaws.com/prod/email-reminder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: dateOfBirth,
        renewalDate: renewalDate,
        upgradeToPremium: true
      })
    });

    console.log('Response status:', response.status);
    const data = await response.json();
    console.log('Response data:', data);

    if (userIsPremium)
    {
      alert(`Upgrade failed: You already own premium!`);
      upgradeButton.innerHTML = '<i class="fas fa-check"></i> Premium Activated!';
      upgradeButton.style.backgroundColor = '#10b981';
      setTimeout(() =>{
        showPremiumBanner();
          //tabNumber = 3; //go to tab 3 to confirm it is active
          showNext();
          scrollTop();
          closePremiumModal();
        }, 1600);
    }
    else if (data.success) {
      // Success animation
      upgradeButton.innerHTML = '<i class="fas fa-check"></i> Premium Activated!';
      upgradeButton.style.backgroundColor = '#10b981';
      
      // Close modal after success
      setTimeout(() => {
        userIsPremium = true; 
        const existingBanner = document.getElementById('cache-banner');
        if (existingBanner) {
          existingBanner.remove();
        }
        showPremiumBanner();
        //tabNumber = 3; //go to tab 3 to confirm it is active
        showNext();
        scrollTop();
        closePremiumModal();
      }, 1600);
      
    } 
    else 
    {
      // Error handling
      upgradeButton.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Upgrade Failed';
      upgradeButton.style.backgroundColor = '#ef4444';
      
      alert(`Upgrade failed: Please first log into your insurance benefits to buy premium`);
      setTimeout(() => {
        closePremiumModal();
      }, 400);
      
      // Reset after delay
      setTimeout(() => {
        upgradeButton.innerHTML = originalContent;
        upgradeButton.style.backgroundColor = '';
        upgradeButton.disabled = false;
        upgradeButton.style.opacity = '';
      }, 3000);
    }
    
  } 
  catch (error) 
  {
    console.error('Premium upgrade error:', error);
    
    // Error animation
    upgradeButton.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error';
    upgradeButton.style.backgroundColor = '#ef4444';
    
    alert('An error occurred during the upgrade process. Please try again.');
    
    // Reset after delay
    setTimeout(() => {
      upgradeButton.innerHTML = originalContent;
      upgradeButton.style.backgroundColor = '';
      upgradeButton.disabled = false;
      upgradeButton.style.opacity = '';
    }, 3000);
  }
}
*/

async function cancelPremium() 
{
  if (!confirm('Are you sure you want to cancel Premium?\n\n• You\'ll lose real-time data updates\n• Data will only refresh on your renewal date\n\nYou can upgrade again anytime.')) {
    return;
  }
  const button = event.target;
  const originalContent = button.innerHTML;
  try {
    // Show loading state
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    button.disabled = true;
    
    const response = await fetch('https://gutqn1nstl.execute-api.us-east-1.amazonaws.com/prod/email-reminder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: variables[0][1],
        lastName: variables[1][1],
        dateOfBirth: DOB,
        renewalDate: variables[4][1], 
        downgradePremium: true
      })
    });
    const data = await response.json();
    if (data.success) {
      // Success state
      button.innerHTML = '<i class="fas fa-check"></i> Cancelled!';
      button.style.backgroundColor = '#10b981';
      
      // Update global state and refresh
      setTimeout(() => {
        userIsPremium = false;
        showNext();
        scrollTop();
        const existingBanner = document.getElementById('cache-banner');
        if (existingBanner) {
          existingBanner.remove();
        }
        showCacheBanner();
        //do other stuff linke banner management and such
      }, 1500);
      
    } else {
      throw new Error(data.error || 'Cancellation failed');
    }
  } catch (error) {
    console.error('Cancellation error:', error);
    button.innerHTML = originalContent;
    button.disabled = false;
    alert('Cancellation failed. Please try again or contact support.');
  }
}






function shareViaText() 
{
  message = "";
  const url = window.location.href;
  window.open(`sms:?body=${encodeURIComponent(message + ' ' + url)}`);
}
function shareViaX() 
{
  message = "";
  const url = window.location.href;
  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(url)}`);
}
function shareViaEmail() 
{
  message = "";
  const subject = "Check out this dental insurance tool";
  const body = "I found this helpful tool that explains dental insurance benefits and helps avoid surprise bills. Thought you might find it useful!\n\n" + window.location.href;
  window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
}
function copyLink() 
{
  navigator.clipboard.writeText(window.location.href).then(() => {
    const button = document.querySelector('.copy-btn');
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i> Copied!';
    button.style.backgroundColor = '#27ae60';

    setTimeout(() => {
      button.innerHTML = originalText;
      button.style.backgroundColor = '';
    }, 2000);
  });
}



// Cal.com integration
function showProviderModal() {
  window.open('https://cal.com/arion-7dq23t/30min?overlayCalendar=true', '_blank', 'width=800,height=600');
}


function initializeTab2()
{
  waitForElement(".coverage-item", () =>
  {
    processTab2Items();
    updateProcedureCosts();
  });
  createProcedurePopup(); // Create the popup if it doesn't exist
  setupCoverageItemsClickHandler(); // Set up the event delegation for coverage items
  addPulseAnimationAfterDelay(); // Prompts user to click on procedure if not clicked for time period
}

// Process and move procedures marked as "Not Covered" in the variables array - and move around ext or root to major if necessary
function processTab2Items()
{
  const allSections = document.querySelectorAll(".coverage-section");
  allSections.forEach(section =>
  {
    const grid = section.querySelector(".coverage-grid");
    if (!grid) return;

    const items = grid.querySelectorAll(".coverage-item");
    const itemCount = items.length;

    if (itemCount > 0)
    {
      // Use columns equal to the number of items
      grid.style.gridTemplateColumns = `repeat(${itemCount}, 1fr)`;

      // Calculate exact width needed for perfect centering - USE CONSISTENT VALUES
      const itemWidth = 91.5; // Width of each item in px (consistent with other sections)
      const gap = 4; // Gap between items in px (consistent with other sections)
      const newWidth = (itemCount * itemWidth) + ((itemCount - 1) * gap);

      // Apply precision centering
      grid.style.maxWidth = `${newWidth}px`;
      grid.style.margin = "0 auto";
    }
  });

  // Find the "Not Covered" array from the variables
  let notCoveredItems = [];
  for (let i = 0; i < variables.length; i++)
  {
    if (variables[i][0] === "Not Covered:")
    {
      notCoveredItems = variables[i].slice(1); // Get all items after the label
      break;
    }
  }

  // If there are no not-covered items, hide the section instead of removing it
  if (!notCoveredItems || notCoveredItems.length === 0)
  {
    const coverageSections = document.querySelectorAll(".coverage-section");
    if (coverageSections.length >= 4)
    {
      const notCoveredSection = coverageSections[3]; // The 4th section
      if (notCoveredSection)
      {
        notCoveredSection.style.display = 'none'; // Hide instead of remove
      }
    }
    // Continue to process root canal/extraction moves even if no not-covered items
  }
  else
  {
    // Find the coverage sections
    const coverageSections = document.querySelectorAll(".coverage-section");
    if (coverageSections.length < 4) return; // Need at least 4 sections
    const notCoveredSection = coverageSections[3]; // The 4th section
    if (!notCoveredSection) return;

    // Make sure the not covered section is visible
    notCoveredSection.style.display = '';

    // Update the 4th section to match the styling of other sections
    // Update the "Not Covered" heading to match other headings
    const notCoveredHeading = notCoveredSection.querySelector(".coverage-heading");
    if (notCoveredHeading)
    {
      notCoveredHeading.textContent = "Not Covered";
      notCoveredHeading.style.textAlign = "center";
      notCoveredHeading.style.color = "#f5f5f5"; // Light grey text
    }

    // Get or create grid for the not covered items
    let notCoveredGrid = notCoveredSection.querySelector(".coverage-grid");
    if (!notCoveredGrid)
    {
      notCoveredGrid = document.createElement("div");
      notCoveredGrid.className = "coverage-grid";
      notCoveredSection.appendChild(notCoveredGrid);
    }

    // Process each "Not Covered" item
    notCoveredItems.forEach(notCoveredItem =>
    {
      let itemName = "";
      if (Array.isArray(notCoveredItem))
      {
        itemName = notCoveredItem[0];
      }
      else
      {
        itemName = notCoveredItem;
      }

      // Find items to move across all coverage sections
      let itemToMove = null;
      let sourceSection = null;
      let sourceGrid = null;
      let sourceSectionIndex = -1;

      // Search through all other sections (100%, 80%, 50%)
      for (let i = 0; i < 3; i++)
      {
        const section = coverageSections[i];
        const items = section.querySelectorAll(".coverage-item");
        items.forEach(item =>
        {
          const name = item.querySelector(".coverage-name");
          if (name && name.textContent.toLowerCase().includes(itemName.toLowerCase()))
          {
            itemToMove = item;
            sourceSection = section;
            sourceGrid = section.querySelector(".coverage-grid");
            sourceSectionIndex = i;
          }
        });
      }

      // Now move the item if found
      if (itemToMove && sourceGrid)
      {
        // Remove from original parent
        if (itemToMove.parentNode)
        {
          itemToMove.parentNode.removeChild(itemToMove);
        }

        // Add to Not Covered section
        notCoveredGrid.appendChild(itemToMove);

        // Reset the animation
        itemToMove.style.opacity = 0;
        itemToMove.style.animationDelay = `${0.1 * notCoveredGrid.children.length}s`;
      }
    });
  }

  // NEW: Move root canals and extractions from basic to major if their booleans are true
  const coverageSections = document.querySelectorAll(".coverage-section");
  if (coverageSections.length >= 3)
  {
    const basicSection = coverageSections[1]; // Basic section (index 1)
    const majorSection = coverageSections[2]; // Major section (index 2)

    if (basicSection && majorSection)
    {
      const basicItems = basicSection.querySelectorAll(".coverage-item");
      const majorGrid = majorSection.querySelector(".coverage-grid");

      if (majorGrid)
      {
        basicItems.forEach(item =>
        {
          const nameElement = item.querySelector(".coverage-name");
          if (nameElement)
          {
            const procedureName = nameElement.textContent.toLowerCase();

            // Check if this is a root canal and should be moved to major
            if (rootCanalMajor && procedureName.includes("root canal"))
            {
              // Remove from basic section
              if (item.parentNode)
              {
                item.parentNode.removeChild(item);
              }
              // Add to major section
              majorGrid.appendChild(item);
              // Reset animation
              item.style.opacity = 0;
              item.style.animationDelay = `${0.1 * majorGrid.children.length}s`;
            }

            // Check if this is an extraction and should be moved to major
            if (extMajor && (procedureName.includes("extract") || procedureName.includes("extrac-")))
            {
              // Remove from basic section
              if (item.parentNode)
              {
                item.parentNode.removeChild(item);
              }
              // Add to major section
              majorGrid.appendChild(item);
              // Reset animation
              item.style.opacity = 0;
              item.style.animationDelay = `${0.1 * majorGrid.children.length}s`;
            }
          }
        });
      }
    }
  }

  // Track which sections had items removed for grid adjustments
  const sectionsToCheck = [0, 1, 2]; // indexes of sections to check for emptiness
  const sectionsModified = new Set();

  // Check if any source sections have become empty and need to be hidden
  sectionsModified.forEach(index =>
  {
    const section = coverageSections[index];
    const grid = section.querySelector(".coverage-grid");
    if (grid && grid.querySelectorAll(".coverage-item").length === 0)
    {
      // This section is now empty, hide it instead of removing
      section.style.display = 'none';
      // Also add a class to mark it as empty for potential future reference
      section.classList.add('empty-section');
    }
  });

  // Handle not covered section display logic
  const notCoveredSection = coverageSections[3];
  if (notCoveredSection)
  {
    const notCoveredGrid = notCoveredSection.querySelector(".coverage-grid");

    // If no items were found/moved to the not covered section, hide the section
    if (!notCoveredGrid || notCoveredGrid.children.length === 0)
    {
      notCoveredSection.style.display = 'none';
    }
    else
    {
      // Handle multiple rows when more than 4 items
      const itemCount = notCoveredGrid.children.length;

      // Set up grid properties
      notCoveredGrid.style.display = "grid";
      notCoveredGrid.style.rowGap = "10px";
      notCoveredGrid.style.columnGap = "5px"; // Consistent with other sections

      // Calculate columns and rows
      const maxColumns = Math.min(itemCount, 4);
      notCoveredGrid.style.gridTemplateColumns = `repeat(${maxColumns}, 1fr)`;

      // If we have more than 4 items, explicitly set the rows
      if (itemCount > 4)
      {
        const rowCount = Math.ceil(itemCount / 4);
        notCoveredGrid.style.gridTemplateRows = `repeat(${rowCount}, auto)`;
      }

      // Calculate width for centering - USE CONSISTENT VALUES
      const itemWidth = 91.5; // Width of each item in px (same as other sections)
      const gap = 4; // Gap between items in px (same as other sections)
      const newWidth = (maxColumns * itemWidth) + ((maxColumns - 1) * gap);

      // Apply the precise width to center perfectly
      notCoveredGrid.style.maxWidth = `${newWidth}px`;
      notCoveredGrid.style.margin = "0 auto";

      // Remove the left offset for items when less than 4
      if (itemCount < 4 && itemCount > 0)
      {
        Array.from(notCoveredGrid.children).forEach(child =>
        {
          child.style.left = ""; // Remove any left positioning
        });
      }

      // Add more vertical spacing between sections if we have multiple rows
      if (itemCount > 4)
      {
        notCoveredSection.style.paddingBottom = "15px";
      }
    }
  }

  for (let i = 0; i < coverageSections.length; i++)
  {
    // Skip hidden sections
    if (coverageSections[i].style.display === 'none')
    {
      continue;
    }

    const section = coverageSections[i];
    if (!section) continue;

    const grid = section.querySelector(".coverage-grid");
    if (!grid) continue;

    const items = grid.querySelectorAll(".coverage-item");
    const itemCount = items.length;

    if (itemCount > 0)
    {
      // Special handling for major section (index 2) and not covered section (index 3)
      if (i === 2 || i === 3)
      {
        // Handle multiple rows when more than 4 items (same as not covered logic)

        // Set up grid properties
        grid.style.display = "grid";
        grid.style.rowGap = "10px";
        grid.style.columnGap = "5px"; // Consistent with other sections

        // Calculate columns and rows
        const maxColumns = Math.min(itemCount, 4);
        grid.style.gridTemplateColumns = `repeat(${maxColumns}, 1fr)`;

        // If we have more than 4 items, explicitly set the rows
        if (itemCount > 4)
        {
          const rowCount = Math.ceil(itemCount / 4);
          grid.style.gridTemplateRows = `repeat(${rowCount}, auto)`;
        }

        // Calculate width for centering - USE CONSISTENT VALUES
        const itemWidth = 91.5; // Width of each item in px (same as other sections)
        const gap = 4; // Gap between items in px (same as other sections)
        const newWidth = (maxColumns * itemWidth) + ((maxColumns - 1) * gap);

        // Apply the precise width to center perfectly
        grid.style.maxWidth = `${newWidth}px`;
        grid.style.margin = "0 auto";

        // Remove the left offset for items when less than 4
        if (itemCount < 4 && itemCount > 0)
        {
          Array.from(grid.children).forEach(child =>
          {
            child.style.left = ""; // Remove any left positioning
          });
        }

        // Add more vertical spacing between sections if we have multiple rows
        if (itemCount > 4)
        {
          section.style.paddingBottom = "15px";
        }
      }
      else
      {
        // Original logic for preventive and basic sections (single row only)
        // Set grid to match exact number of items
        grid.style.gridTemplateColumns = `repeat(${itemCount}, 1fr)`;

        // Calculate exact width needed - USE CONSISTENT VALUES
        const itemWidth = 91.5; // Width of each item in px
        const gap = 4; // Gap between items in px
        const newWidth = (itemCount * itemWidth) + ((itemCount - 1) * gap);

        // Apply the precise width to center perfectly
        grid.style.maxWidth = `${newWidth}px`;
        grid.style.margin = "0 auto";
      }
    }
  }

  const majorSection = coverageSections[2]; // Major section (index 2)
  const notCoveredSection2 = coverageSections[3]; // Not Covered section (index 3)

  if (majorSection)
  {
    const majorGrid = majorSection.querySelector(".coverage-grid");
    const majorItemCount = majorGrid ? majorGrid.querySelectorAll(".coverage-item").length : 0;

    // Check if Not Covered section is hidden or has no items
    const notCoveredVisible = notCoveredSection2 &&
    notCoveredSection2.style.display !== 'none' &&
    notCoveredSection2.querySelector(".coverage-grid") &&
    notCoveredSection2.querySelector(".coverage-grid").children.length > 0;

    // Add margin bottom if major has more than 4 items and no Not Covered section
    if (majorItemCount > 4 && !notCoveredVisible)
    {
      majorSection.style.marginBottom = "calc(var(--spacing-lg)*1.7)";
    }
    else
    {
      // Reset margin if conditions aren't met
      majorSection.style.marginBottom = "";
    }
  }


  // delete empty sections
  allSections.forEach((section, index) =>
  {
    const grid = section.querySelector('.coverage-grid');
    const items = grid ? grid.querySelectorAll('.coverage-item') : [];

    // If section has no items, hide it
    if (items.length === 0)
    {
      section.style.display = 'none';
      section.classList.add('empty-section');
      const headingText = section.querySelector('.coverage-heading')?.textContent || `Section ${index}`;
    }
    else
    {
      // Make sure visible sections are displayed
      section.style.display = '';
      section.classList.remove('empty-section');
    }
  });



  // Modify showProcedurePopup function to handle not-covered items
  updateShowProcedurePopupFunction();
}




/// Function to modify showProcedurePopup to handle not-covered items
function updateShowProcedurePopupFunction()
{
  // Store the original function for future reference
  if (!window.originalShowProcedurePopup)
  {
    window.originalShowProcedurePopup = window.showProcedurePopup;
  }

  // Override the showProcedurePopup function to handle not-covered items
  window.showProcedurePopup = function(item)
  {
    // Call the original function first
    if (window.originalShowProcedurePopup)
    {
      window.originalShowProcedurePopup(item);
    }

    // Now check if this is a not-covered item
    const parentSection = item.closest(".coverage-section");
    if (parentSection)
    {
      const sectionIndex = Array.from(document.querySelectorAll('.coverage-section')).indexOf(parentSection);
      if (sectionIndex === 3)
      { // "Not Covered" section is the 4th (index 3)
    const popup = document.getElementById('procedure-popup');
    if (popup)
    {
      const popupContent = popup.querySelector('.popup-content');
      if (popupContent)
      {
            // Reset all class names and add 'not-covered'
            popupContent.className = 'popup-content not-covered';

            // Update icon class
            const popupIcon = popup.querySelector('.popup-icon');
            if (popupIcon)
            {
              popupIcon.className = 'popup-icon not-covered';
            }

            // Update coverage label to "Not Covered"
            const coverageLabel = popup.querySelector('.coverage-label');
            if (coverageLabel)
            {
              coverageLabel.className = 'coverage-label coverage-0';
              coverageLabel.textContent = 'Not Covered';
            }

            // Set warning message for not covered items
            const additionalInfo = popup.querySelector('.additional-info');
            if (additionalInfo)
            {
              additionalInfo.innerHTML = 'This procedure is <b>not covered</b> by your insurance. Explore all procedural alternatives before getting this procedure done.';
            }

            // Set copay information
            const copayAmount = popup.querySelector('.copay-amount');
            if (copayAmount)
            {
              const itemName = item.querySelector('.coverage-name')?.textContent;
              const costInfo = procedureCosts[itemName] ||
              {
                cost: 100,
                coverage: 0,
                patient: 100
              };
              copayAmount.textContent = `$${costInfo.cost}`;
            }

            // Set insurance pays to $0
            const insurancePays = popup.querySelector('.insurance-pays');
            if (insurancePays)
            {
              insurancePays.textContent = 'Benefits used: $0';
            }
          }
        }
      }
    }
  };
}

var firstClick = true;

function setupPopupInfoTooltip()
{
  // Remove existing event listeners first
  const oldInfoIcon = document.querySelector('.info-tooltip-icon');
  const oldTooltip = document.querySelector('.info-tooltip');

  if (oldInfoIcon && oldTooltip)
  {
    oldInfoIcon.replaceWith(oldInfoIcon.cloneNode(true));
  }
  const infoIcon = document.querySelector('.info-tooltip-icon');
  const tooltip = document.querySelector('.info-tooltip');
  if (!infoIcon || !tooltip) return;

  tooltip.classList.remove('show-tooltip');
  tooltip.classList.remove('hide-tooltip');
  infoIcon.style.opacity = "0.8";

  function hideTooltip()
  {
    tooltip.classList.remove('show-tooltip');
    tooltip.classList.add('hide-tooltip');
    infoIcon.style.opacity = "0.8";
  }

  function showTooltip()
  {
    hideTooltip();
    tooltip.classList.remove('hide-tooltip');
    tooltip.classList.add('show-tooltip');
    infoIcon.style.opacity = "1";
  }

  if (firstClick)
  {
    firstClick = false;
    setTimeout(() =>
    {
      showTooltip();
    }, 250);
  }

  // Click on info icon to toggle
  infoIcon.addEventListener('click', (e) =>
  {
    e.stopPropagation();

    if (tooltip.classList.contains('show-tooltip'))
    {
      hideTooltip();
    }
    else
    {
      showTooltip();
    }
  });

  // Click anywhere else to hide
  document.addEventListener('click', (e) =>
  {
    if (!infoIcon.contains(e.target) && !tooltip.contains(e.target) && tooltip.classList.contains('show-tooltip'))
    {
      hideTooltip();
    }
  });
}

// Helper function to match procedure names with frequency entries
function matchProcedureToFrequency(procedureName, frequencyText)
{
  if (!procedureName || !frequencyText)
  {
    return false;
  }
  procedureName = procedureName.toLowerCase().trim();
  frequencyText = frequencyText.toLowerCase().trim();

  // More direct matching for common dental procedures
  if (procedureName === "cleanings" && frequencyText.includes("cleaning"))
  {
    return true;
  }

  if (procedureName === "exams & x-rays" &&
    (frequencyText.includes("exam") || frequencyText.includes("x-ray")))
  {
    return true;
  }

  if (procedureName === "emergency exams" && frequencyText.includes("emerg"))
  {
    return true;
  }

  // More specific matches for other procedures
  if (procedureName.includes("crown") && frequencyText.includes("crown"))
  {
    return true;
  }

  if (procedureName.includes("bridge") && frequencyText.includes("bridge"))
  {
    return true;
  }

  if (procedureName.includes("filling") && frequencyText.includes("filling"))
  {
    return true;
  }

  if ((procedureName.includes("extract") || procedureName.includes("extraction")) &&
    frequencyText.includes("extract"))
  {
    return true;
  }

  if ((procedureName.includes("root canal") || procedureName === "root canals") &&
    frequencyText.includes("root"))
  {
    return true;
  }

  if ((procedureName.includes("deep cleaning") || procedureName === "deep cleanings") &&
    (frequencyText.includes("deep") || frequencyText.includes("scaling")))
  {
    return true;
  }

  if (procedureName.includes("denture") && frequencyText.includes("denture"))
  {
    return true;
  }

  if (procedureName.includes("implant") && frequencyText.includes("implant"))
  {
    return true;
  }

  return false;
}

function formatDateStringFull(dateString)
{
  const [month, day, year] = dateString.split("/");
  if (isNaN(month) || isNaN(day) || isNaN(year))
  {
    return "Invalid Date";
  }

  const monthNum = parseInt(month) - 1;
  const dayNum = parseInt(day);
  const yearNum = parseInt(year);

  if (monthNum < 0 || monthNum > 11 || dayNum < 1 || dayNum > 31)
  {
    return "Invalid Date";
  }

  const date = new Date(yearNum, monthNum, dayNum);
  if (isNaN(date.getTime()))
  {
    return "Invalid Date";
  }

  // Format month and day
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric"
  };

  return date.toLocaleDateString("en-US", options)
}

// Use event delegation for coverage items
function setupCoverageItemsClickHandler()
{
  // First, remove any existing document-level event listeners for procedure clicks
  if (window.procedureClickHandler)
  {
    document.removeEventListener('click', window.procedureClickHandler);
  }
  window.procedureClickHandler = function(event)
  {
    // Find if click was on a coverage item or its child
    let target = event.target;
    let coverageItem = null;
    // Traverse up to find coverage-item
    while (target && target !== document)
    {
      if (target.classList && target.classList.contains('coverage-item'))
      {
        coverageItem = target;
        break;
      }
      target = target.parentNode;
    }
    // If we found a coverage item, show popup
    if (coverageItem)
    {
      // Add click animation
      coverageItem.classList.add("clicked");
      setTimeout(() => coverageItem.classList.remove("clicked"), 250);
      showProcedurePopup(coverageItem);
    }
  };
  document.addEventListener('click', window.procedureClickHandler);
}

// Make sure tab switching correctly resets the event listeners
function setupTabEventListeners()
{
  // Set up tab 2 click handler 
  const tab2Element = document.getElementById("tab2");
  if (tab2Element)
  {
    tab2Element.addEventListener("click", function()
    {
      // Small timeout to ensure the DOM has updated
      setTimeout(function()
      {
        setupCoverageItemsClickHandler();

        // Ensure popup functionality is ready
        const popup = document.getElementById('procedure-popup');
        if (popup)
        {
          popup.setAttribute('data-enhanced', 'false'); // Reset so it can be enhanced again
        }
      }, 100);
    });
  }
}


function addPulseAnimationAfterDelay()
{
  if (window.tooltipDismissed)
  {
    return;
  }
  if (!document.getElementById('click-tooltip-style'))
  {
    const style = document.createElement('style');
    style.id = 'click-tooltip-style';
    style.textContent = `
    .click-hint-tooltip {
      position: absolute;
      background: linear-gradient(135deg, #ffffff 0%, #f8fffe 100%);
      padding: 8px 14px;
      border-radius: 8px;
      font-size: 11px;
      font-weight: 600;
      font-family: "Montserrat", sans-serif;
      white-space: nowrap;
      z-index: 1000;
      opacity: 0;
      transform: translateY(20px) scale(0.8);
      transition: none;
      pointer-events: none;
      letter-spacing: 0.4px;
      box-shadow: 
      0 8px 32px rgba(49, 117, 104, 0.25),
      0 4px 16px rgba(49, 117, 104, 0.15),
      0 2px 8px rgba(0, 0, 0, 0.1);
      border: 2px solid rgba(49, 117, 104, 0.2);
      color: #888;
      font-weight: 750;
    }

    .click-hint-tooltip::after {
      content: '';
      position: absolute;
      top: -8px;
      left: 50%;
      transform: translateX(-50%);
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 8px solid #ffffff;
      filter: drop-shadow(0 -2px 4px rgba(49, 117, 104, 0.1));
    }


    .click-hint-tooltip.loading 
    {
      animation: tooltipEntrance 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    }
    .click-hint-tooltip.floating 
    {

      transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
      animation: tooltipFloatEnhanced 2s ease-in-out infinite;
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    .click-hint-tooltip.exiting 
    {
      animation: tooltipExit 0.3s ease-out forwards;
    }

    @keyframes tooltipEntrance 
    {
      0% {
        opacity: 1;
        transform: translateY(-1px) scale(0);
      }
      100% {
        opacity: 1;
        transform: translateY(-1px) scale(1);
      }
    }
    @keyframes tooltipFloatEnhanced 
    {
      0%, 100% { 
        transform: translateY(-1px);
      }
      50% { 
        transform: translateY(-2px);
      }
    }
    @keyframes tooltipExit 
    {
      0% {
        opacity: 1;
        transform: translateY(-1px) scale(1);
      }
      100% {
        opacity: 0;
        transform: translateY(10px) scale(1);
      }
    }
    `;
    document.head.appendChild(style);
  }

  // Wait for coverage items to be loaded, then show tooltip
  setTimeout(() =>
  {
    showClickTooltip();
  }, 600);

  // Set up click listener to dismiss tooltip
  if (!window.tooltipClickListenerAdded)
  {
    document.addEventListener('click', function(e)
    {
      let target = e.target;
      while (target && target !== document)
      {
        if (target.classList && target.classList.contains('coverage-item'))
        {
          removeClickTooltip(1);
          window.tooltipDismissed = true;
          break;
        }
        target = target.parentNode;
      }
    });
    window.tooltipClickListenerAdded = true;
  }
}

function showClickTooltip()
{
  // Only show if we're on coverage tab and tooltip hasn't been dismissed
  if (tabNumber !== 2 || window.tooltipDismissed)
  {
    return;
  }

  // Find the cleaning item (first item in first section)
  const firstSection = document.querySelector('.coverage-section:first-child');
  if (!firstSection) return;

  const cleaningItem = firstSection.querySelector('.coverage-item');
  if (!cleaningItem) return;

  // Remove any existing tooltip
  removeClickTooltip(2);

  // Create tooltip with enhanced styling
  const tooltip = document.createElement('div');
  tooltip.className = 'click-hint-tooltip';
  tooltip.textContent = 'Click for details';
  tooltip.id = 'coverage-click-tooltip';

  // Add tooltip to body (not section) to escape stacking context issues
  document.body.appendChild(tooltip);

  // Get the section's position on the page
  const sectionRect = firstSection.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // Calculate vertical position relative to the section but positioned from page top
  const relativeTop = cleaningItem.offsetTop + cleaningItem.offsetHeight + 10;
  const absoluteTop = sectionRect.top + scrollTop + relativeTop;

  // Keep original horizontal centering exactly as it was
  tooltip.style.left = '50%';
  tooltip.style.marginLeft = '-' + (tooltip.offsetWidth / 2) + 'px';

  // Use absolute positioning from page top
  tooltip.style.top = absoluteTop + 'px';
  tooltip.style.position = 'absolute';
  tooltip.style.zIndex = '9999';

  // Start with loading animation
  requestAnimationFrame(() =>
  {
    tooltip.classList.add('loading');
  });

  // After loading animation completes, switch to floating
  setTimeout(() =>
  {
    tooltip.classList.remove('loading');
    tooltip.classList.add('floating');
  }, 600);
}


function removeClickTooltip(type)
{
  const tooltip = document.getElementById('coverage-click-tooltip');
  var wait = 0;
  if (type == 1)
  {
    wait = 300;
  }
  if (tooltip)
  {
    // Use smooth exit animation
    tooltip.classList.remove('loading', 'floating');
    tooltip.classList.add('exiting');

    setTimeout(() =>
    {
      if (tooltip.parentNode)
      {
        tooltip.parentNode.removeChild(tooltip);
      }
    }, wait); // Match exit animation duration
  }
}

// Enhanced tab switching with better cleanup
document.addEventListener('DOMContentLoaded', function()
{
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach((tab, index) =>
  {
    tab.addEventListener('click', function()
    {
      removeClickTooltip(2);
    });
  });
});




function createProcedurePopup()
{
  if (document.getElementById("procedure-popup"))
  {
    return;
  }

  const popup = document.createElement("div");
  popup.id = "procedure-popup";
  popup.style.display = "none"; // Ensure it's hidden by default

  // Create popup content using innerHTML for simplicity
  popup.innerHTML = `
  <div class="popup-content">
  <span id="popup-close">&times;</span>
  <div class="popup-icon"><i class=""></i></div>
  <h3 id="popup-title"></h3>
  <div class="coverage-label"></div>
  <div class="procedure-info"></div>

  <div class="popup-section">
  <div class="section-title insight-title"><i class="fas fa-lightbulb"></i>Your Insights</div>
  <div class="additional-info">No additional information available at this time</div>
  </div>

  <div class="popup-section">
  <div class="section-title frequency-title"><i class="fas fa-calendar-check"></i>Frequency Allowed</div>
  <div class="frequency-info"></div>
  </div>

  <div class="popup-spacer"></div>

  <div class="popup-bottom">
  <div class="copay-section">
  <div class="copay-label">
  Your Estimated Copay
  <i class="fas fa-info-circle info-tooltip-icon"></i>
  <div class="info-tooltip">Press <span style="font-weight:700">Add To Calculator</span><br>for a copay that factors in remaining benefits and combines multiple procedures.</div>
  </div>
  <div class="copay-amount">$0</div>
  <div class="insurance-pays">Benefits used: $0</div>
  </div>

  <div class="popup-bottom-controls">
  <div class="quantity-controls">
  <div class="quantity-btn decrease">-</div>
  <div class="quantity-value">1</div>
  <div class="quantity-btn increase">+</div>
  </div>
  <button class="add-to-estimate-btn">Add to Calculator</button>
  </div>
  </div>
  </div>
  `;

  document.body.appendChild(popup);

  // Set up close button with smooth exit animation
  const closeBtn = document.getElementById("popup-close");
  const popupContent = popup.querySelector('.popup-content');

  closeBtn.addEventListener("click", () =>
  {
    popupContent.classList.add('popup-closing');
    setTimeout(() =>
    {
      popup.style.display = "none";
      popupContent.classList.remove('popup-closing');
    }, 500); // Match animation duration
  });

  // Add touch feedback to close button
  closeBtn.addEventListener("touchstart", () =>
  {
    closeBtn.style.color = "#2980b9e6";
    closeBtn.style.transform = "scale(0.9)";
  });

  closeBtn.addEventListener("touchend", () =>
  {
    setTimeout(() =>
    {
      closeBtn.style.color = "#777";
      closeBtn.style.transform = "scale(1)";
    }, 150);

    popupContent.classList.add('popup-closing');
    setTimeout(() =>
    {
      popup.style.display = "none";
      popupContent.classList.remove('popup-closing');
    }, 500);
  });

  // Close if user taps outside the popup box with animation
  popup.addEventListener("click", (e) =>
  {
    if (e.target === popup)
    {
      popupContent.classList.add('popup-closing');
      setTimeout(() =>
      {
        popup.style.display = "none";
        popupContent.classList.remove('popup-closing');
      }, 500);
    }
  });
}

const procedureCosts = //the only legitimate numbers here are cost
{
  "Cleanings":
  {
    cost: 75,
    coverage: 100,
    patient: 0
  },
  "Exams & X-Rays":
  {
    cost: 60,
    coverage: 100,
    patient: 0
  },
  "Emergency Exams":
  {
    cost: 75,
    coverage: 100,
    patient: 0
  },
  "Fillings":
  {
    cost: 150,
    coverage: 80,
    patient: 36
  },
  "Extractions":
  {
    cost: 150,
    coverage: 80,
    patient: 40
  },
  "Root Canals":
  {
    cost: 750,
    coverage: 80,
    patient: 160
  },
  "Deep Cleanings":
  {
    cost: 600,
    coverage: 80,
    patient: 60
  },
  "Crowns":
  {
    cost: 900,
    coverage: 50,
    patient: 600
  },
  "Bridges":
  {
    cost: 2100,
    coverage: 50,
    patient: 1250
  },
  "Dentures":
  {
    cost: 900,
    coverage: 50,
    patient: 900
  },
  "Implants":
  {
    cost: 2800,
    coverage: 50,
    patient: 1500
  }
};

function updateProcedureCosts()
{
  if (tabNumber !== 2) return;
  const sections = document.querySelectorAll('.coverage-section');
  const procedureCoverageMap = {};
  sections.forEach((section) =>
  {
    const headingElement = section.querySelector('.coverage-heading');
    if (!headingElement) return;

    const headingText = headingElement.textContent.trim();
    let coveragePercentage = 0;
    const percentMatch = headingText.match(/(\d+)%/);
    if (percentMatch && percentMatch[1])
    {
      coveragePercentage = parseInt(percentMatch[1], 10);
    }
    else if (headingText.toLowerCase().includes('not covered'))
    {
      coveragePercentage = 0;
    }
    const procedureItems = section.querySelectorAll('.coverage-item');
    procedureItems.forEach(item =>
    {
      const nameElement = item.querySelector('.coverage-name');
      if (!nameElement) return;
      const procedureName = nameElement.textContent.trim();
      procedureCoverageMap[procedureName] = coveragePercentage;
    });
  });
  for (const procedureName in procedureCosts)
  {
    if (procedureCosts.hasOwnProperty(procedureName))
    {
      if (procedureCoverageMap.hasOwnProperty(procedureName))
      {
        const coverage = procedureCoverageMap[procedureName];
        const cost = procedureCosts[procedureName].cost;
        procedureCosts[procedureName].coverage = coverage;
        procedureCosts[procedureName].patient = Math.round(cost * (1 - coverage / 100));
      }
    }
  }
  return procedureCosts;
}

/* MUST BE ONE LINE */
const procedureDescriptions = {
  "Cleanings": "Helps prevent disease & decay",
  "Exams & X-Rays": "Comprehensive evaluation of oral health",
  "Emergency Exams": "Urgent evaluation to identify source of pain or trauma",
  "Fillings": "Restoration of decayed tooth structure",
  "Extractions": "Removal of teeth that cannot be saved",
  "Root Canals": "Removal of infected pulp tissue from inside the tooth",
  "Deep Cleanings": "Removal of plaque below the gumline",
  "Crowns": "Custom-made caps to restore shape, size, and strength",
  "Bridges": "Fixed prosthetic devices that replace missing teeth",
  "Dentures": "Removable prosthetic devices replacing missing teeth",
  "Implants": "Titanium posts to support replacement teeth"
};

function showProcedurePopup(item)
{

  // Create popup if it doesn't exist
  if (!document.getElementById('procedure-popup'))
  {
    createProcedurePopup();
  }

  const popup = document.getElementById('procedure-popup');
  if (!popup) return;


  document.body.style.touchAction = 'none';

  const popupContent = popup.querySelector('.popup-content');
  const popupIcon = popup.querySelector('.popup-icon i');
  if (popupIcon)
  {
    // Reset the animation state
    popupIcon.style.animation = 'none';
    // Force browser to recognize the change
    void popupIcon.offsetWidth;
    // Apply the animation again
    popupIcon.style.animation = 'iconEntrance 0.8s linear forwards';
  }
  const titleElement = document.getElementById('popup-title');
  const coverageElement = popup.querySelector('.coverage-label');
  const procedureInfo = popup.querySelector('.procedure-info');
  const frequencyInfo = popup.querySelector('.frequency-info');
  const additionalInfo = popup.querySelector('.additional-info');
  const copayAmount = popup.querySelector('.copay-amount');
  const insurancePays = popup.querySelector('.insurance-pays');

  // Get procedure name
  var name = item.querySelector(".coverage-name")?.textContent || "Procedure";
  if (name == "Emerg. Exams") name = "Emergency Exams";
  if (name == "Extrac- tions") name = "Extractions";

  // Get the procedure icon and copy it
  const itemIcon = item.querySelector(".coverage-icon i");
  if (itemIcon && popupIcon)
  {
    popupIcon.className = itemIcon.className;
  }

  // Get procedure cost information
  const costInfo = procedureCosts[name] ||
  {
    cost: 100,
    coverage: 0,
    patient: 100
  };

  // Update copay display
  if (copayAmount) copayAmount.textContent = `$${costInfo.patient}`;
  if (insurancePays) insurancePays.textContent = `Benefits used: $${costInfo.cost - costInfo.patient}`;

  // Determine coverage category
  let coverageCategory = "";
  let coveragePercent = "0%";
  let serviceCategory = ""; // Store which type of service this is (prev, basic, major)

  const parentSection = item.closest(".coverage-section");
  if (parentSection)
  {
    // Get the heading
    const heading = parentSection.querySelector(".coverage-heading");
    if (heading)
    {
      const coverageCategoryText = heading.textContent;
      // Based on the section index, assign appropriate category
      const sectionIndex = Array.from(document.querySelectorAll('.coverage-section')).indexOf(parentSection);

      if (sectionIndex === 0)
      {
        coverageCategory = "coverage-100";
        coveragePercent = coverageCategoryText.trim();
        serviceCategory = "prev";
        popupContent.className = "popup-content preventive";
        popupIcon.parentElement.className = "popup-icon preventive";
      }
      else if (sectionIndex === 1)
      {
        coverageCategory = "coverage-80";
        coveragePercent = coverageCategoryText.trim();
        serviceCategory = "basic";
        popupContent.className = "popup-content basic";
        popupIcon.parentElement.className = "popup-icon basic";
      }
      else if (sectionIndex === 2)
      {
        coverageCategory = "coverage-50";
        coveragePercent = coverageCategoryText.trim();
        serviceCategory = "major";
        popupContent.className = "popup-content major";
        popupIcon.parentElement.className = "popup-icon major";
      }
      else
      {
        coverageCategory = "coverage-0";
        coveragePercent = "Not Covered";
        serviceCategory = "Not Covered";
        popupContent.className = "popup-content notCovered";
        popupIcon.parentElement.className = "popup-icon notCovered";
      }
    }
  }

  // Set title
  if (titleElement) titleElement.textContent = name;

  // Set coverage label
  if (coverageElement)
  {
    coverageElement.className = `coverage-label ${coverageCategory}`;
    coverageElement.textContent = coveragePercent;
  }

  const procedureDescription = procedureDescriptions[name] ||
  "No detailed information available for this procedure.";
  if (procedureInfo) procedureInfo.innerHTML = procedureDescription;

  // Find frequency info
  let frequencyText = "No specified limits";

  // Search for frequency in variables array
  if (typeof variables !== 'undefined')
  {
    for (let i = 0; i < variables.length; i++)
    {
      if (variables[i][0] === "Frequencies:")
      {
        for (let j = 1; j < variables[i].length; j++)
        {
          let freqItem = variables[i][j];
          let freqString = Array.isArray(freqItem) ? freqItem[0] : freqItem;

          // Check if this frequency item matches the procedure name
          if (matchProcedureToFrequency(name, freqString))
          {
            // Extract the part after the colon
            let parts = freqString.split(":");
            if (parts.length > 1)
            {
              frequencyText = parts[1].trim();
            }
            break;
          }
        }
        break;
      }
    }
  }
  // Set frequency info
  if (frequencyInfo)
  {
    if (frequencyText && frequencyText !== "No specified limits")
    {
      // Add clarification for procedures that apply per tooth
      let clarification = "";
      const procedureName = titleElement.textContent;

      if (procedureName === "Crowns" || procedureName === "Root Canals" || procedureName === "Fillings" || procedureName === "Extractions")
      {
        clarification = " per tooth";
      }
      else if (procedureName === "Bridges")
      {
        clarification = " per bridge";
      }
      else if (procedureName === "Dentures")
      {
        clarification = " per arch (upper or lower)";
      }
      else if (procedureName === "Implants")
      {
        clarification = " per implant";
      }
      else if (procedureName === "Deep Cleanings")
      {
        clarification = " per quadrant";
      }

      frequencyInfo.innerHTML = "Your insurance will cover this procedure no more than <b>" + frequencyText + clarification + "</b>.";
    }
    else
    {
      frequencyInfo.innerHTML = "<span class='gray'>No specified limits</span>";
    }
    if (coverageCategory == "coverage-0")
    {
      frequencyInfo.innerHTML = "<span class='gray'>Not applicable due to no coverage<span>";
    }
  }
  // Reset additional info with default text
  if (additionalInfo)
  {
    additionalInfo.innerHTML = "No additional information available at this time.";
  }

  // Check for active waiting period for this service type
  let hasWaitingPeriod = false;
  let waitingPeriodDate = '';

  // Access variables directly - it should be in global scope
  // First make sure variables exists and is defined
  if (typeof variables !== 'undefined')
  {

    // Find all active waiting periods for the current service category
    for (let i = 0; i < variables.length; i++)
    {
      if (variables[i][0] === "Active Waiting Periods:")
      {

        for (let j = 1; j < variables[i].length; j++)
        {
          let waitingItem = variables[i][j];
          let waitingString = Array.isArray(waitingItem) ? waitingItem[0] : waitingItem;

          // Check if the waiting period applies to current service category
          if (waitingString.toLowerCase().includes(serviceCategory.toLowerCase() + ":"))
          {
            hasWaitingPeriod = true;

            // Extract date after the colon
            let parts = waitingString.split(":");
            if (parts.length > 1)
            {
              waitingPeriodDate = parts[1].trim();
            }
            break;
          }
        }
        break;
      }
    }
  }

  // Add warnings to additional info section instead of bottom notes
  if (additionalInfo)
  {
    let warningMessages = [];

    // Display appropriate waiting period warnings
    if (hasWaitingPeriod && waitingPeriodDate)
    {
      if (serviceCategory === "prev")
      {
        additionalInfo.innerHTML = `Wait until <b>${formatDateStringFull(waitingPeriodDate)}</b> to get this treatment done - insurance will not cover it until then due to a waiting period.`;
      }
      else if (serviceCategory === "basic")
      {
        additionalInfo.innerHTML = `Wait until <b>${formatDateStringFull(waitingPeriodDate)}</b> to get this treatment done - insurance will not cover it until then due to a waiting period.`;
      }
      else if (serviceCategory === "major")
      {
        additionalInfo.innerHTML = `Wait until <b>${formatDateStringFull(waitingPeriodDate)}</b> to get this treatment done - insurance will not cover it until then due to a waiting period.`;
      }
    }

    // If not waiting period text, add the text for Your Insights
    if (serviceCategory == "prev" && (!hasWaitingPeriod) && (titleElement.textContent == "Cleanings" || titleElement.textContent == "Exams & X-Rays"))
    {
      if (additionalInfo.textContent === "No additional information available at this time.") additionalInfo.textContent = "";
      additionalInfo.innerHTML = 'To utilize your benefits and prevent more serious dental issues, be sure to get your cleaning and exams <b>twice per year</b>.';
    }
    if (serviceCategory == "prev" && (!hasWaitingPeriod) && (titleElement.textContent == "Emergency Exams"))
    {
      if (additionalInfo.textContent === "No additional information available at this time.") additionalInfo.textContent = "";
      additionalInfo.innerHTML = 'Seeking an emergency exam at the <b>first sign</b> of pain or discomfort can help prevent more serious dental problems and potentially reduce the need for complex, costly procedures later.';
    }
    if (serviceCategory == "basic" && (!hasWaitingPeriod))
    {
      if (additionalInfo.textContent === "No additional information available at this time.") additionalInfo.textContent = "";
      additionalInfo.innerHTML = 'Address these issues <b>promptly</b> to prevent them from developing into more complex conditions that may require extensive and costlier treatments.';
    }
    if (serviceCategory == "major" && (!hasWaitingPeriod))
    {
      if (additionalInfo.textContent === "No additional information available at this time.") additionalInfo.textContent = "";
      additionalInfo.innerHTML = 'Ask your dentist to send a <b>pre-authorization</b> to insurance before completing this procedure to reduce the risk of claim denial.';
    }
    if (serviceCategory == "Not Covered")
    {
      if (additionalInfo.textContent === "No additional information available at this time.") additionalInfo.textContent = "";
      additionalInfo.innerHTML = 'This procedure is <b> not covered </b> by your insurance. Explore all procedural alternatives before getting this procedure done.';
    }

  }

  // Reset and trigger popup animation
  popupContent.style.animation = "none";
  void popupContent.offsetWidth; // force reflow
  popupContent.style.animation = "popupFadeIn .5s ease forwards";
  popup.style.display = "flex";

  setTimeout(() =>
  {
    setupPopupInfoTooltip();
  }, 50);
}

/*FADE IN AND OUT for popup*/
const originalShowProcedurePopup = window.showProcedurePopup;
window.showProcedurePopup = function(item)
{
  const popup = document.getElementById('procedure-popup');
  const popupContent = popup?.querySelector('.popup-content');
  const secondContent = document.getElementsByClassName("second-content")[0];
  const header = document.getElementsByClassName("header-container")[0];

  // Prevent scrolling when popup is open
  //document.body.style.overflow = "hidden";

  // Full screen overlay - apply to the popup container itself
  if (popup)
  {
    popup.style.background = "rgba(0, 0, 0, 0.5)";
  }

  // Apply blur to content
  if (secondContent)
  {
    secondContent.style.transition = "filter 0.4s ease";
  }

  // Also apply blur to header
  if (header)
  {
    header.style.transition = "filter 0.4s ease";
    header.style.pointerEvents = "none";
  }

  // Animation for the popup content
  if (popupContent)
  {
    popupContent.style.animation = "none";
    void popupContent.offsetWidth; // Force reflow
    popupContent.style.animation = "popupAppear 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards";
  }

  originalShowProcedurePopup(item);
};

document.addEventListener('click', function(event)
{
  if (event.target.id === 'popup-close' || event.target.id === 'procedure-popup')
  {
    const popup = document.getElementById('procedure-popup');
    const popupContent = popup?.querySelector('.popup-content');
    const tooltip = document.querySelector('.info-tooltip');
    const secondContent = document.getElementsByClassName("second-content")[0];
    const header = document.getElementsByClassName("header-container")[0];
    document.body.style.overflow = "auto";
    document.body.style.touchAction = 'auto';

    event.stopPropagation();

    // More dramatic downward closing animation
    if (popupContent)
    {
      popupContent.style.animation = "popupCloseDown 0.45s cubic-bezier(0.7, 0, 0.84, 0) forwards";
    }

    // Fade out the overlay
    if (popup)
    {
      popup.style.transition = "background 0.4s ease, backdrop-filter 0.4s ease";
      popup.style.background = "rgba(0, 0, 0, 0)";
    }

    // Reset content
    if (secondContent)
    {}

    // Reset header
    if (header)
    {
      header.style.pointerEvents = "auto";
    }

    document.body.style.overflow = "auto";
    document.body.style.touchAction = 'auto';

    // Hide popup after animation completes
    setTimeout(function()
    {
      popup.style.display = 'none';
      if (popupContent)
      {
        popupContent.style.animation = "";
      }
    }, 450); // Increased to match the longer animation
  }
});
const originalShowProcedurePopupWithIcons = window.showProcedurePopup;
window.showProcedurePopup = function(item)
{
  originalShowProcedurePopupWithIcons(item);
};

if (!document.querySelector('style#popup-animations'))
{
  const style = document.createElement('style');
  style.id = 'popup-animations';
  style.textContent = `
  @keyframes popupAppear {
    0% {
      opacity: 0;
      transform: translateY(20px) scale(0.96);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes popupCloseDown {
    0% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    100% {
      opacity: 0;
      transform: translateY(100vh) scale(0.98);
    }
  }

  /* Add smooth transitions to all elements */
  .popup-content {
    transition: transform 0.3s ease, opacity 0.3s ease;
    backface-visibility: hidden;
    will-change: transform, opacity;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.25);
  }

  /* Add a subtle shadow overlay to emphasize the popup */
  #procedure-popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    transition: background 0.4s ease, backdrop-filter 0.4s ease;
    z-index: 9999;
  }

  /* Enhance popup close button with smoother hover effect */
  #popup-close {
    transition: all 0.2s ease;
    opacity: 0.7;
  }

  #popup-close:hover {
    opacity: 1;
    transform: scale(1.05);
  }

  /* Style for section title icons */
  .section-title i {
    font-size: 1.1em;
    color: inherit;
    opacity: 0.85;
  }

  /* Category-specific styling for section icons */
  .popup-content.preventive .section-title i {
    color: #317568;
  }

  .popup-content.basic .section-title i {
    color: #AD8656;
  }

  .popup-content.major .section-title i {
    color: #9E5743;
  }
  `;
  document.head.appendChild(style);
}

// Store for calculator items 
let calculatorItems = {};

// Add quantity controls and calculator functionality to popup
function enhancePopupWithCalculator()
{
  // Make sure the popup exists
  if (!document.getElementById('procedure-popup')) return;

  const popup = document.getElementById('procedure-popup');
  const popupContent = popup.querySelector('.popup-content');

  // Check if the popup has already been enhanced
  if (popup.getAttribute('data-enhanced') === 'true') return;

  // 1. Add quantity controls to popup
  const popupBottom = popup.querySelector('.popup-bottom');
  if (!popupBottom) return;

  // Check if controls already exist
  if (!popup.querySelector('.quantity-controls'))
  {
    const quantityControls = document.createElement('div');
    quantityControls.className = 'quantity-controls';
    quantityControls.innerHTML = `
    <div class="quantity-btn decrease">-</div>
    <div class="quantity-value">1</div>
    <div class="quantity-btn increase">+</div>
    `;

    // Add the button to add to estimate
    const addButton = document.createElement('button');
    addButton.className = 'add-to-estimate-btn';
    addButton.textContent = 'Add to Calculator';

    // Create container for controls
    const bottomControls = document.createElement('div');
    bottomControls.className = 'popup-bottom-controls';
    bottomControls.appendChild(quantityControls);
    bottomControls.appendChild(addButton);

    // Add to popup
    popupBottom.appendChild(bottomControls);
  }

  // 2. Set up event listeners for quantity controls
  const decreaseBtn = popup.querySelector('.quantity-btn.decrease');
  const increaseBtn = popup.querySelector('.quantity-btn.increase');
  const quantityValue = popup.querySelector('.quantity-value');
  const addButton = popup.querySelector('.add-to-estimate-btn');
  const copayAmount = popup.querySelector('.copay-amount');
  const insurancePays = popup.querySelector('.insurance-pays');

  if (decreaseBtn && increaseBtn && quantityValue)
  {
    // Remove existing listeners first to prevent duplicates
    const newDecreaseBtn = decreaseBtn.cloneNode(true);
    const newIncreaseBtn = increaseBtn.cloneNode(true);

    decreaseBtn.parentNode.replaceChild(newDecreaseBtn, decreaseBtn);
    increaseBtn.parentNode.replaceChild(newIncreaseBtn, increaseBtn);

    // Add decrease listener
    newDecreaseBtn.addEventListener('click', function()
    {
      let quantity = parseInt(quantityValue.textContent);
      if (quantity > 1)
      {
        quantity--;
        quantityValue.textContent = quantity;

        // Update copay display if procedure info is available
        updatePopupCopayAmount(popup);
      }
    });

    // Add increase listener
    newIncreaseBtn.addEventListener('click', function()
    {
      let quantity = parseInt(quantityValue.textContent);
      quantity++;
      quantityValue.textContent = quantity;

      // Update copay display if procedure info is available
      updatePopupCopayAmount(popup);
    });
  }

  // 3. Set up add to estimate button
  if (addButton)
  {
    const newAddButton = addButton.cloneNode(true);
    addButton.parentNode.replaceChild(newAddButton, addButton);

    newAddButton.addEventListener('click', function()
    {
      if (Object.keys(calculatorItems).length === 0)
      { //if calculator not set up yet
        scrollTopAndLock();
      }
      document.body.style.overflow = "hidden";

      // Get current procedure details
      const titleElement = document.getElementById('popup-title');
      if (!titleElement) return;

      const procedureName = titleElement.textContent;
      const quantity = parseInt(quantityValue.textContent);

      // Close popup immediately when adding to estimate
      popup.style.display = 'none';

      // Check if already in calculator
      if (calculatorItems[procedureName])
      {
        // Remove from calculator
        delete calculatorItems[procedureName];

        // Find and update the item in the UI
        const items = document.querySelectorAll('.coverage-item');
        items.forEach(item =>
        {
          const name = item.querySelector('.coverage-name')?.textContent;
          if (name === procedureName ||
            (name === "Emerg. Exams" && procedureName === "Emergency Exams") ||
            (name === "Extrac- tions" && procedureName === "Extractions"))
          {
            item.classList.remove('in-calculator');

            // Remove quantity badge if it exists
            const badge = item.querySelector('.quantity-badge');
            if (badge)
            {
              badge.parentNode.removeChild(badge);
            }
          }
        });
      }
      else
      {
        // Add to calculator
        calculatorItems[procedureName] = {
          quantity: quantity,
          costInfo: getCostInfoForProcedure(procedureName)
        };

        // Find and update the item in the UI
        const items = document.querySelectorAll('.coverage-item');
        items.forEach(item =>
        {
          const name = item.querySelector('.coverage-name')?.textContent;
          if (name === procedureName ||
            (name === "Emerg. Exams" && procedureName === "Emergency Exams") ||
            (name === "Extrac- tions" && procedureName === "Extractions"))
          {
            item.classList.add('in-calculator');

            // Add quantity badge
            let badge = item.querySelector('.quantity-badge');
            if (!badge)
            {
              badge = document.createElement('div');
              badge.className = 'quantity-badge';
              item.appendChild(badge);
            }
            badge.textContent = quantity;
            badge.classList.add('show');
          }
        });
      }

      // Save to session storage to persist across tab changes
      saveCalculatorState();

      // Update calculator display
      updateCalculatorDisplay();

      // Return background to normal scale
      const secondContent = document.getElementsByClassName("second-content")[0];
      const header = document.getElementsByClassName("header-container")[0];

      if (secondContent)
      {
        secondContent.style.transform = "scale(1)";
        secondContent.style.borderRadius = "0px";
      }

      if (header)
      {
        header.style.transform = "scale(1)";
        header.style.borderRadius = "0px";
        header.style.pointerEvents = "auto";
      }
    });
  }

  // Mark popup as enhanced
  popup.setAttribute('data-enhanced', 'true');

  // Add styles for calculator
  addCalculatorStyles();
}

function resetNotCoveredItemStyle(item)
{
  // Check if this is a not-covered item
  const parentSection = item.closest('.coverage-section');
  if (parentSection)
  {
    const sectionIndex = Array.from(document.querySelectorAll('.coverage-section')).indexOf(parentSection);
    if (sectionIndex === 3)
    { // 4th section (not covered)
      // Reset all the inline styles
      item.style.backgroundColor = "#f0f0f0";
      item.style.borderColor = "#505050";
      item.style.color = "#505050";

      // Also reset the icon color
      const icon = item.querySelector('.coverage-icon');
      if (icon)
      {
        icon.style.color = "#505050";
      }
    }
  }
}
// Save calculator state to sessionStorage
function saveCalculatorState()
{
  sessionStorage.setItem('calculatorItems', JSON.stringify(calculatorItems));
  sessionStorage.setItem('calculatorActive', Object.keys(calculatorItems).length > 0);
}

// Load calculator state from sessionStorage
function loadCalculatorState()
{
  try
  {
    const savedItems = sessionStorage.getItem('calculatorItems');
    if (savedItems)
    {
      calculatorItems = JSON.parse(savedItems);

      // Re-apply UI changes for saved items
      const items = document.querySelectorAll('.coverage-item');
      items.forEach(item =>
      {
        const name = item.querySelector('.coverage-name')?.textContent;
        let translatedName = name;
        if (name === "Emerg. Exams") translatedName = "Emergency Exams";
        if (name === "Extrac- tions") translatedName = "Extractions";

        if (calculatorItems[translatedName])
        {
          // Add class for selected state
          item.classList.add('in-calculator');

          // Add quantity badge
          let badge = item.querySelector('.quantity-badge');
          if (!badge)
          {
            badge = document.createElement('div');
            badge.className = 'quantity-badge';
            item.appendChild(badge);
          }
          badge.textContent = calculatorItems[translatedName].quantity;
          badge.classList.add('show');
        }
      });

      // Check if calculator was active and update the display if needed
      const wasActive = sessionStorage.getItem('calculatorActive') === 'true';
      if (wasActive && Object.keys(calculatorItems).length > 0)
      {
        updateCalculatorDisplay();
      }
    }
  }
  catch (error)
  {
    calculatorItems = {};
  }
}

// Update the copay amount in the popup based on quantity
function updatePopupCopayAmount(popup)
{
  const quantityValue = popup.querySelector('.quantity-value');
  const copayAmount = popup.querySelector('.copay-amount');
  const insurancePays = popup.querySelector('.insurance-pays');
  const titleElement = document.getElementById('popup-title');

  if (!quantityValue || !copayAmount || !insurancePays || !titleElement) return;

  const procedureName = titleElement.textContent;
  const quantity = parseInt(quantityValue.textContent);
  const costInfo = getCostInfoForProcedure(procedureName);

  if (costInfo)
  {
    const patientCost = costInfo.patient * quantity;
    const totalCost = costInfo.cost * quantity;
    const insuranceCost = totalCost - patientCost;

    copayAmount.textContent = `$${patientCost}`;
    insurancePays.textContent = `Benefits used: $${insuranceCost}`;
  }
}

// Get cost info for a procedure
function getCostInfoForProcedure(name)
{
  // Handle the special cases for renamed procedures
  if (name === "Emergency Exams")
  {
    return procedureCosts["Emergency Exams"] ||
    {
      cost: 75,
      coverage: 100,
      patient: 0
    };
  }
  else if (name === "Extractions")
  {
    return procedureCosts["Extractions"] ||
    {
      cost: 150,
      coverage: 80,
      patient: 40
    };
  }
  return procedureCosts[name] ||
  {
    cost: 100,
    coverage: 0,
    patient: 100
  };
}

// Modify the setupCoverageItemsClickHandler function to handle deselection
function setupCoverageItemsClickHandler()
{
  // First, remove any existing document-level event listeners for procedure clicks
  if (window.procedureClickHandler)
  {
    document.removeEventListener('click', window.procedureClickHandler);
  }

  window.procedureClickHandler = function(event)
  {
    // Find if click was on a coverage item or its child
    let target = event.target;
    let coverageItem = null;

    // Traverse up to find coverage-item
    while (target && target !== document)
    {
      if (target.classList && target.classList.contains('coverage-item'))
      {
        coverageItem = target;
        break;
      }
      target = target.parentNode;
    }

    // If we found a coverage item, handle the click
    if (coverageItem)
    {
      const nameElement = coverageItem.querySelector('.coverage-name');
      if (!nameElement) return;

      let procedureName = nameElement.textContent;
      let mappedName = procedureName;

      // Map display names to actual procedure names
      if (procedureName === "Emerg. Exams") mappedName = "Emergency Exams";
      if (procedureName === "Extrac- tions") mappedName = "Extractions";

      // Check if this item is already in the calculator
      if (calculatorItems[mappedName])
      {
        // Item is already selected - remove it
        delete calculatorItems[mappedName];

        // Update the UI for this item
        coverageItem.classList.remove('in-calculator');
        resetNotCoveredItemStyle(coverageItem);

        // Remove quantity badge if it exists
        const badge = coverageItem.querySelector('.quantity-badge');
        if (badge)
        {
          badge.parentNode.removeChild(badge);
        }

        // Save state and update calculator display
        saveCalculatorState();
        updateCalculatorDisplay();
      }
      else
      {
        // Item is not selected - show popup to select it
        showProcedurePopup(coverageItem);
      }
    }
  };

  document.addEventListener('click', window.procedureClickHandler);
}



// Update the calculator display with current items and animate changes
function updateCalculatorDisplay()
{
  // Get second content container
  const secondContent = document.querySelector('.second-content');
  if (!secondContent) return;

  // Check if we have items in the calculator
  const hasItems = Object.keys(calculatorItems).length > 0;

  // Handle calculator heading
  let calculatorHeading = document.getElementById('calculator-heading');

  if (hasItems)
  {
    // Track previous values for animation
    let previousPatientCost = 0;
    let previousBenefitsRemaining = parseInt(maximumRemaining.replace('$', ''));

    if (calculatorHeading)
    {
      const estimatedCopay = document.getElementById('estimated-copay');
      if (estimatedCopay)
      {
        const dollarValue = estimatedCopay.textContent.replace(/[^\d]/g, '');
        previousPatientCost = parseInt(dollarValue) || 0;
      }

      const benefitsSpan = document.getElementById('benefits-remaining');
      if (benefitsSpan)
      {
        const remainingMatch = benefitsSpan.textContent.match(/\$?(\d+)/);
        if (remainingMatch && remainingMatch[1])
        {
          previousBenefitsRemaining = parseInt(remainingMatch[1]);
        }
      }
    }

    // Create calculator heading if it doesn't exist
    if (!calculatorHeading)
    {
      calculatorHeading = document.createElement('div');
      calculatorHeading.id = 'calculator-heading';
      calculatorHeading.className = 'calc-fade-in';
      calculatorHeading.innerHTML = `
      <h1>Total Estimated Copay</h1>
      <h1 id='estimated-copay'><span class="dollar-sign">$</span><span class="amount">0</span></h1>
      <h2 id='benefits-r'>Benefits Remaining: <span id="benefits-remaining">${maximumRemaining}</span> 
      <i class="fas fa-info-circle info-icon" id="benefits-info-icon"></i>
      <div class="benefits-info-tooltip">
      If your benefits run out, you'll need to pay out of pocket for any additional treatment until your plan renews. <br> In this case, consider splitting procedures across two years.
      </div>
      </h2>
      `;
      secondContent.appendChild(calculatorHeading);

      // Set up info icon tooltip
      setupBenefitsInfoTooltip();

      // Force a reflow
      void calculatorHeading.offsetHeight;
    }

    // Calculate totals
    let totalPatientCost = 0;
    let totalInsuranceCost = 0;

    Object.entries(calculatorItems).forEach(([name, details]) =>
    {
      const
      {
        quantity,
        costInfo
      } = details;
      totalPatientCost += costInfo.patient * quantity;
      totalInsuranceCost += (costInfo.cost - costInfo.patient) * quantity;
    });

    // Get max benefits amount
    const maxBenefits = parseInt(maximumRemaining.replace('$', ''));

    // Check if insurance cost exceeds available benefits
    if (totalInsuranceCost > maxBenefits)
    {
      // Calculate the overflow amount
      const overflow = totalInsuranceCost - maxBenefits;

      // Add the overflow to patient cost
      totalPatientCost += overflow;

      // Cap the insurance cost at max benefits
      totalInsuranceCost = maxBenefits;
    }

    // Update copay display with animation
    const estimatedCopay = document.getElementById('estimated-copay');
    if (estimatedCopay)
    {
      // Determine if cost is increasing or decreasing
      const isIncreasing = totalPatientCost > previousPatientCost;
      const isDecreasing = totalPatientCost < previousPatientCost;

      // Add appropriate color effect class
      if (isIncreasing)
      {
        estimatedCopay.classList.remove('decreasing-value');
        estimatedCopay.classList.add('increasing-value');
      }
      else if (isDecreasing)
      {
        estimatedCopay.classList.remove('increasing-value');
        estimatedCopay.classList.add('decreasing-value');
      }

      // Find or create the amount span
      let amountSpan = estimatedCopay.querySelector('.amount');
      if (!amountSpan)
      {
        // If using the old format, convert to new format
        const oldText = estimatedCopay.textContent;
        const value = oldText.replace(/[^\d]/g, '') || '0';
        estimatedCopay.innerHTML = `<span class="dollar-sign">$</span><span class="amount">${value}</span>`;
        amountSpan = estimatedCopay.querySelector('.amount');
      }

      // Animate only the number part
      if (amountSpan)
      {
        animateCounterText(amountSpan, totalPatientCost);
      }

      // Remove classes after animation
      setTimeout(() =>
      {
        estimatedCopay.classList.remove('increasing-value', 'decreasing-value');
      }, 1500);
    }

    // Update remaining benefits with animation
    const benefitsRemaining = document.getElementById('benefits-remaining');
    if (benefitsRemaining)
    {
      const maxBenefits = parseInt(maximumRemaining.replace('$', ''));
      const remainingBenefits = Math.max(0, maxBenefits - totalInsuranceCost);

      // Determine if benefits are increasing or decreasing
      const isIncreasing = remainingBenefits > previousBenefitsRemaining;
      const isDecreasing = remainingBenefits < previousBenefitsRemaining;

      // Add appropriate color effect class
      if (isIncreasing)
      {
        benefitsRemaining.classList.remove('decreasing-value');
        benefitsRemaining.classList.add('increasing-value');
      }
      else if (isDecreasing)
      {
        benefitsRemaining.classList.remove('increasing-value');
        benefitsRemaining.classList.add('decreasing-value');
      }

      // Animate the counter
      animateBenefitsValue(benefitsRemaining, remainingBenefits);

      // Remove classes after animation
      setTimeout(() =>
      {
        benefitsRemaining.classList.remove('increasing-value', 'decreasing-value');
      }, 1500);
    }

    // Make calculator visible with animation
    calculatorHeading.style.opacity = "1";
    calculatorHeading.style.transform = "translateY(0)";

    // Add a visible transition for the sections
    const coverageDiv = document.getElementById('coverage-div');
    if (coverageDiv)
    {
      // Add transition to ensure animation is visible
      coverageDiv.style.transition = "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)";
      coverageDiv.style.transform = "translateY(25px)";
    }

    // Adjust sections for calculator with visible transition
    const sections = document.querySelectorAll('.coverage-section');
    sections.forEach((section, index) =>
    {

      section.style.outline = "0px solid transparent";
      // Get the computed style (what's actually showing on screen)
      const computedStyle = window.getComputedStyle(section);

      // Apply the current background color as an inline style
      section.style.backgroundColor = computedStyle.backgroundColor;

      // Now you can transition this property
      section.style.transition = "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease;";

      // Force reflow
      void section.offsetHeight;
      section.style.position = 'relative';
      section.style.transform = `translateY(100px)`;
      section.style.backgroundColor = "transparent";
    });

    // Move items based on section and explicitly remove box shadows
    const items = document.querySelectorAll('.coverage-item');
    items.forEach((item) =>
    {
      // Explicitly remove all box shadows before any transitions start
      item.style.boxShadow = 'none';

      // Reset other styles and animations
      item.style.animation = 'none';
      item.style.transition = 'transform 1.1s ease, background-color 0.4s ease, color 0.4s ease, box-shadow 0.4s ease';
      item.style.transform = 'translateY(0)'; // Reset position

      // Force reflow to ensure changes take effect
      void item.offsetWidth;

      const parentSection = item.closest('.coverage-section');
      const notCoveredSection = document.querySelectorAll('.coverage-section')[3];
      notCoveredSection.classList.add('not-covered-section');
      const hasNotCoveredItems = notCoveredSection &&
      notCoveredSection.style.display !== 'none' &&
      notCoveredSection.querySelector('.coverage-grid') &&
      notCoveredSection.querySelector('.coverage-grid').children.length > 0;
      const emptySections = [];
      for (let i = 0; i < sections.length; i++)
      {
        if (sections[i].style.display === 'none' ||
          !sections[i].querySelector('.coverage-grid') ||
          sections[i].querySelector('.coverage-grid').children.length === 0)
        {
          emptySections.push(i);
        }
      }
      const visibleSectionsCount = 4 - emptySections.length;

      const scaleFactor = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scale-factor'));

      var spacing = Math.round(77 * scaleFactor); /* higher is closer */
      var topSpacing = 100;
      if (visibleSectionsCount === 4 || rootCanalMajor || extMajor)
      {
        spacing = Math.round(81 * scaleFactor);
        topSpacing = 90;

      }
      //change spacing if between 5-7 items in not covered, making it equivalent to having 4 sections
      const notCoveredItemCount = notCoveredSection ?
      notCoveredSection.querySelectorAll('.coverage-item').length : 0;
      if (notCoveredItemCount >= 5 && notCoveredItemCount < 8)
      {
        spacing = Math.round(81 * scaleFactor);
        topSpacing = 90;
      }



      if (parentSection)
      {
        const sections = document.querySelectorAll('.coverage-section');
        const emptyIndexes = [];

        // Check which sections are empty or hidden
        sections.forEach((section, idx) =>
        {
          const items = section.querySelectorAll('.coverage-item');
          const isHidden = section.style.display === 'none';

          if (items.length === 0 || isHidden)
          {
            emptyIndexes.push(idx);
          }
        });

        const calculateAdjustedPosition = (sectionIndex) =>
        {
          let adjustment = 0;

          // Count how many sections before this one are empty
          emptyIndexes.forEach(emptyIdx =>
          {
            if (emptyIdx < sectionIndex)
            {
              adjustment += 1;
            }
          });

          return adjustment;
        };

        if (!window.storedOverflowOffset && testTab2Overflow())
        {
          const majorSection = document.querySelectorAll('.coverage-section')[2];
          const notCoveredSection = document.querySelectorAll('.coverage-section')[3];
          if (majorSection && notCoveredSection)
          {
            const majorItems = majorSection.querySelectorAll('.coverage-item');
            const notCoveredItems = notCoveredSection.querySelectorAll('.coverage-item');
            if (majorItems.length > 0 && notCoveredItems.length > 0)
            {
              const lastMajorItem = majorItems[majorItems.length - 1];
              const firstNotCoveredItem = notCoveredItems[0];
              const majorY = lastMajorItem.getBoundingClientRect().top;
              const notCoveredY = firstNotCoveredItem.getBoundingClientRect().top;
              window.storedOverflowOffset = notCoveredY - majorY;
            }
          }
        }

        // Apply transformed positions with adjustments
        sections.forEach((section, sectionIndex) =>
        {
          // Skip if section is empty/hidden
          if (emptyIndexes.includes(sectionIndex))
          {
            return;
          }

          const items = section.querySelectorAll('.coverage-item');
          items.forEach(item =>
          {
            // Explicitly remove all box shadows before any transitions start
            item.style.boxShadow = 'none';

            // Reset other styles and animations
            item.style.animation = 'none';
            item.style.transition = 'transform 1.1s ease, background-color 0.4s ease, color 0.4s ease, box-shadow 0.4s ease';
            item.style.transform = 'translateY(0)'; // Reset position

            // Force reflow to ensure changes take effect
            void item.offsetWidth;

            // Calculate adjustment based on empty sections
            const adjustment = calculateAdjustedPosition(sectionIndex);

            // Apply position based on adjusted section index
            const adjustedIndex = sectionIndex - adjustment;
            var position = topSpacing - (spacing * adjustedIndex);


            // Then in your positioning logic:
            if (testTab2Overflow() && sectionIndex === 3)
            {
              position = topSpacing - (spacing * (sectionIndex - (adjustment + 1))) - window.storedOverflowOffset;
            }
            // Set the transform
            item.style.transform = `translateY(${position}px)`;
          });
        });
      }
    });

    // Make sure backdrop filter is removed
    const popup = document.getElementById('procedure-popup');
    if (popup)
    {
      popup.style.backdropFilter = "blur(0px)";
    }

    // Fade out section headings with visible transition
    const headings = document.querySelectorAll('.coverage-heading');
    headings.forEach(heading =>
    {
      // Add transition to ensure animation is visible
      heading.style.transition = "opacity 0.6s ease, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)";
      heading.style.opacity = "0";
      heading.style.transform = "translateY(15px)";
    });
  }
  else
  {
    if (calculatorHeading)
    {
      calculatorHeading.classList.add('calculator-exit');
      document.body.style.overflow = "auto";
      document.body.style.touchAction = 'auto';

      // Remove from DOM after animation completes
      setTimeout(() =>
      {
        if (calculatorHeading.parentNode)
        {
          calculatorHeading.parentNode.removeChild(calculatorHeading);
        }
      }, 850);

      // Reset sections to original position with visible transition
      const coverageDiv = document.getElementById('coverage-div');
      if (coverageDiv)
      {
        coverageDiv.style.transition = "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)";
        coverageDiv.style.transform = "translateY(0)";
      }

      // Smoothly reset all sections
      const sections = document.querySelectorAll('.coverage-section');
      sections.forEach((section, index) =>
      {
        // Restore original background colors
        if (index === 0)
        {
          section.style.backgroundColor = "#BCE2C5";
          section.style.outline = "3px solid #317568";
        }
        else if (index === 1)
        {
          section.style.backgroundColor = "#F8DDB2";
          section.style.outline = "3px solid #AD8656";
        }
        else if (index === 2)
        {
          section.style.backgroundColor = "#E6A099";
          section.style.outline = "3px solid #9E5743";
        }
        else if (index === 3)
        {
          section.style.backgroundColor = "#E0E0E0";
          section.style.outline = "3px solid #606060";
        }

        section.style.transition = "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), opacity 4s ease, background-color .75s ease, outline .5s ease";
        section.style.transform = "translateY(0)";
        section.style.opacity = "1";
      });

      // Reset all items and restore box shadows
      const items = document.querySelectorAll('.coverage-item');
      items.forEach((item) =>
      {
        item.style.transition = 'transform 0.8s ease, opacity 0.6s ease, box-shadow 0.8s ease, background-color 0.4s ease, color 0.4s ease';
        item.style.transform = 'translateY(0)';

        // Explicitly restore box shadow with a delay to ensure it's visible
        setTimeout(() =>
        {
          item.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        }, 400);

        // Restore animation after transition
        setTimeout(() =>
        {
          item.style.animation = 'shake 3s linear infinite';
        }, 800);
      });

      // Reset headings with visible transition
      const headings = document.querySelectorAll('.coverage-heading');
      headings.forEach(heading =>
      {
        heading.style.transition = "opacity 0.6s ease, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)";
        heading.style.opacity = "1";
        heading.style.transform = "translateY(0)";
      });
    }
  }
}


function setupBenefitsInfoTooltip()
{
  const infoIcon = document.getElementById('benefits-info-icon');
  const tooltip = document.querySelector('.benefits-info-tooltip');

  if (!infoIcon || !tooltip) return;

  let timeout;

  // Function to hide tooltip
  function hideTooltip()
  {
    tooltip.classList.remove('show-tooltip');
    tooltip.classList.add('hide-tooltip');
    infoIcon.style.opacity = "0.8";
    if (timeout)
    {
      clearTimeout(timeout);
    }
  }

  function showTooltip()
  {
    hideTooltip(); // Clear any existing state

    tooltip.classList.add('show-tooltip');
    infoIcon.style.opacity = "1";
  }

  // Click on info icon to toggle
  infoIcon.addEventListener('click', (e) =>
  {
    e.stopPropagation();

    if (tooltip.classList.contains('show-tooltip'))
    {
      hideTooltip();
    }
    else
    {
      showTooltip();
    }
  });

  // Click anywhere else to hide
  document.addEventListener('click', (e) =>
  {
    if (!infoIcon.contains(e.target) && !tooltip.contains(e.target))
    {
      hideTooltip();
    }
  });
  showTooltip();
}

// New animation function that updates just the text content
function animateCounterText(element, newValue)
{
  if (!element) return;

  const currentValue = parseInt(element.textContent.replace(/\D/g, '')) || 0;

  if (currentValue === newValue) return;

  const duration = 800; // milliseconds
  const startTime = performance.now();

  function updateValue(timestamp)
  {
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function for smooth animation
    const easeOutCubic = 1 - Math.pow(1 - progress, 3);

    const displayValue = Math.round(currentValue + (newValue - currentValue) * easeOutCubic);
    element.textContent = displayValue;

    if (progress < 1)
    {
      requestAnimationFrame(updateValue);
    }
  }

  requestAnimationFrame(updateValue);
}

// Animate benefits remaining value
function animateBenefitsValue(element, newValue)
{
  if (!element) return;

  const currentText = element.textContent;
  const currentValue = parseInt(currentText.replace(/\D/g, '')) || 0;

  if (currentValue === newValue) return;

  const duration = 800; // milliseconds
  const startTime = performance.now();

  function updateValue(timestamp)
  {
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function for smooth animation
    const easeOutCubic = 1 - Math.pow(1 - progress, 3);

    const displayValue = Math.round(currentValue + (newValue - currentValue) * easeOutCubic);
    element.textContent = `$${displayValue}`;

    if (progress < 1)
    {
      requestAnimationFrame(updateValue);
    }
  }

  requestAnimationFrame(updateValue);
}

// Keep calculator state when switching tabs
document.addEventListener('DOMContentLoaded', function()
{
  // Setup tab switching to preserve calculator state
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab =>
  {
    tab.addEventListener('click', function()
    {
      const tabId = this.id;
      const tabNum = parseInt(tabId.replace('tab', ''));

      // If we're going from coverage tab to another tab, save state
      if (tabNumber === 2 && tabNum !== 2)
      {
        saveCalculatorState();
      }

      // If we're clicking the coverage tab again while on the coverage tab, reset
      if (tabNumber === 2 && tabNum === 2)
      {
        // Clear calculator
        calculatorItems = {};
        saveCalculatorState();

        // Reset UI
        const items = document.querySelectorAll('.coverage-item');
        items.forEach(item =>
        {
          item.classList.remove('in-calculator');
          const badge = item.querySelector('.quantity-badge');
          if (badge) badge.parentNode.removeChild(badge);
        });

        // Update display
        updateCalculatorDisplay();
      }
    });
  });
});

// Updated addCalculatorStyles function
function addCalculatorStyles()
{
  const popup = document.getElementById('procedure-popup');
  const decreaseBtn = popup.querySelector('.quantity-btn.decrease');
  const increaseBtn = popup.querySelector('.quantity-btn.increase');
  addTouchFeedback(decreaseBtn);
  addTouchFeedback(increaseBtn);

  if (document.getElementById('calculator-styles')) return;

  const style = document.createElement('style');
  style.id = 'calculator-styles';
  style.textContent = `
  /* Quantity controls in popup */
  .popup-bottom-controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
  }

  .quantity-controls {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .quantity-btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid #2980b9e6;
    background: white;
    color: #2980b9e69;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 2px 8px rgba(41, 128, 185, 0.1);
  }


  .quantity-value {
    font-size: 20px;
    font-weight: 700;
    margin: 0 15px;
    min-width: 25px;
    text-align: center;
    color: #333;
  }

  .add-to-estimate-btn {
    background-color: #2980b9e6;
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 8px;
    font-weight: 700;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
    flex-grow: 1;
    margin-left: 18px;
    letter-spacing: .75px

  }

  .add-to-estimate-btn:active {
    transform: translateY(0);
    transform: scale(0.95); /* Scale down slightly when pressed */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Add some depth */
  }

  .add-to-estimate-btn.remove {
    background-color: #e74c3c;
  }

  /* Enhanced quantity badge */
  .quantity-badge {
    position: absolute;
    top: -10px;
    right: -10px;
    background-color: #2980b9e6;
    color: white;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 700;
    box-shadow: 0 1px 1px rgba(0,0,0,0.2), 0 0 0 2.5px white;
    opacity: 0;
    transform: scale(0);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    z-index: 100;
    isolation: isolate
    filter: brightness (1.1);
  }


  .quantity-badge.show {
    opacity: 1;
    transform: scale(1);
  }

  /* Category-specific quantity badges */
  .coverage-section:nth-child(1) .quantity-badge {
    background-color: #317568;
  }
  .coverage-section:nth-child(2) .quantity-badge {
    background-color: #AD8656;
  }
  .coverage-section:nth-child(3) .quantity-badge {
    background-color: #9E5743;
  }
  .coverage-section:nth-child(4) .quantity-badge {
    background-color: #555555;
  }

  /* Styling for selected items - invert colors when in calculator */
  .coverage-item.in-calculator {
    background-color: #317568 !important;
    border: 2px solid #317568 !important;
    color: white !important;
    box-shadow: none !important;
    position: relative;
    z-index: 20;
  }

  .coverage-section 
  {
    position: relative;
    z-index: 100;
  }
  .coverage-item
  {
    position: relative;
    z-index: 10;
  }

  .coverage-item.in-calculator .coverage-icon {
    color: white !important;
  }

  /* Category-specific styling */
  .coverage-section:nth-child(1) .coverage-item.in-calculator {
    background-color: #317568 !important;
    border: 2px solid #317568 !important;
    color: white !important;
    box-shadow: none !important;
  }

  .coverage-section:nth-child(1) .coverage-item.in-calculator .coverage-icon {
    color: white !important;
  }

  .coverage-section:nth-child(1) .coverage-item.in-calculator .quantity-badge {
    background-color: #BCE2C5;
    color: #317568;
  }

  .coverage-section:nth-child(2) .coverage-item.in-calculator {
    background-color: #AD8656 !important;
    border: 2px solid #AD8656 !important;
    color: white !important;
    box-shadow: none !important;
  }

  .coverage-section:nth-child(2) .coverage-item.in-calculator .coverage-icon {
    color: white !important;
  }

  .coverage-section:nth-child(2) .coverage-item.in-calculator .quantity-badge {
    background-color: #F8DDB2;
    color: #AD8656;
  }

  .coverage-section:nth-child(3) .coverage-item.in-calculator {
    background-color: #9E5743 !important;
    border: 2px solid #9E5743 !important;
    color: white !important;
    box-shadow: none !important;
  }

  .coverage-section:nth-child(3) .coverage-item.in-calculator .coverage-icon {
    color: white !important;
  }

  .coverage-section:nth-child(3) .coverage-item.in-calculator .quantity-badge {
    background-color: #E6A099;
    color: #9E5743;
  }

  .coverage-section:nth-child(4) .coverage-item.in-calculator {
    background-color: #505050 !important;
    border: 2px solid #505050!important;
    color: white !important;
    box-shadow: none !important;
  }

  .coverage-section:nth-child(4) .coverage-item.in-calculator .coverage-icon {
    color: white !important;
  }

  .coverage-section:nth-child(4) .coverage-item.in-calculator .quantity-badge {
    background-color: #E0E0E0;
    color: #505050;
  }

  @keyframes calcDropIn {
    0% { 
      opacity: 0; 
      transform: translateY(-200px); 
    }
    70% { 
      opacity: 1; 
      transform: translateY(5px); 
    }
    85% { 
      transform: translateY(-2px); 
    }
    100% { 
      opacity: 1; 
      transform: translateY(0); 
    }
  }

  /* Floating animation - runs continuously */
  @keyframes calcFloat {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.01); }
  }

  /* Calculator heading with sequential animations */
  #calculator-heading {
    position: fixed;
    top: 17.5px;
    left: 7.5%;
    width: 85%;
    padding: 20px 5%;
    border-radius: 20px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08), 0 -2px 10px rgba(0, 0, 0, 0.08);
    font-weight: 500;
    text-align: left;
    line-height: 1.3;
    font-size: 15.5px;
    color: #555;
    background-color: #f8f8f8;
    border: 5px solid #D6D6D6;
    z-index: 900;
    transform-origin: top center;
    animation: calcDropIn 1.25s ease-out forwards, calcFloat 4s ease-in-out 1.15s infinite;
  }


  #calculator-heading h1 {
    font-size: 17px;
    font-weight: 700;
    margin-top: 0;
    margin-bottom: 8px;
    color: #555;
  }

  #calculator-heading #estimated-copay {
    margin-top: 8px;
    font-size: 40px;
    letter-spacing: 1.5px;
    font-weight: 700;
    margin-bottom: 16px;
    white-space: nowrap;
    color: #555;
  }

  #calculator-heading .dollar-sign {
    font-size: 36px;
    margin-right: 4px;
    display: inline-block;
  }

  #calculator-heading .amount {
    display: inline-block;
  }

  #calculator-heading h2 
  {
    position: relative;
    font-size: 13px;
    font-weight: 500;
    margin-top: 16px;
    text-align: left;
    color: #555;
    display: flex;
    align-items: center;
    gap: 5px;
  }


  /* Info icon styled for grey theme */
  .info-icon 
  {
    position: relative !important;
    font-size: 14px;
    color: #888;
    margin-left: 2px;
    cursor: pointer;
    opacity: 0.8;
    transition: all 0.3s ease;
    vertical-align: middle;
    padding: 3px 3px 3px 3px;
  }

  .benefits-info-tooltip {
    position: absolute;
    top: 0%;
    transform: translateY(-50%) scale(0.8);
    width: 140px; 
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 8px 12px; /* Reduced padding */
    border-radius: 10px; /* Slightly smaller border radius */
    font-size: 11px; 
    line-height: 1.4;
    text-align: center;
    z-index: 1000;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15); /* Softer shadow */
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    font-weight: 500;
    background-color: #FEFEFE;
    color: #555;
  }

  .benefits-info-tooltip::after {
    content: "";
    position: absolute;
    top: 55%;
    left: -6px; /* Positioned on the left side of the tooltip */
    transform: translateY(-50%);
    border-width: 6px 6px 6px 0; /* Arrow pointing left */
    border-style: solid;
    border-color: transparent #FEFEFE transparent transparent;
  }

  .benefits-info-tooltip.show-tooltip {
    opacity: 1;
    transform: translateY(-50%) scale(1);
    pointer-events: auto;
  }



  /* Value change animations */
  @keyframes greenGlow {
    0% { text-shadow: 0 0 0px rgba(46, 204, 113, 0.3); color: black; }
    50% { text-shadow: 0 0 15px rgba(46, 204, 113, 0.8); color: #27ae60; }
    100% { text-shadow: 0 0 0px rgba(46, 204, 113, 0.3); color: black; }
  }

  @keyframes redGlow {
    0% { text-shadow: 0 0 0px rgba(231, 76, 60, 0.3); color: black; }
    50% { text-shadow: 0 0 15px rgba(231, 76, 60, 0.8); color: #c0392b; }
    100% { text-shadow: 0 0 0px rgba(231, 76, 60, 0.3); color: black; }
  }

  .increasing-value .amount, .increasing-value {
    animation: greenGlow 1.5s ease;
  }

  .decreasing-value .amount, .decreasing-value {
    animation: redGlow 1.5s ease;
  }

  #benefits-remaining, #estimated-copay .amount {
    position: relative;
    display: inline-block;
  }

  /* Blur effects for value changes */
  .increasing-value .amount::after, #benefits-remaining.increasing-value::after {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    background-color: rgba(46, 204, 113, 0.15);
    border-radius: 10px;
    filter: blur(8px);
    z-index: -1;
    animation: blurPulseGreen 1.5s ease-out;
    pointer-events: none;
  }

  .decreasing-value .amount::after, #benefits-remaining.decreasing-value::after {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    background-color: rgba(231, 76, 60, 0.15);
    border-radius: 10px;
    filter: blur(8px);
    z-index: -1;
    animation: blurPulseRed 1.5s ease-out;
    pointer-events: none;
  }

  @keyframes blurPulseGreen {
    0% { opacity: 0; transform: scale(0.95); }
    50% { opacity: 1; transform: scale(1.05); }
    100% { opacity: 0; transform: scale(0.95); }
  }

  @keyframes blurPulseRed {
    0% { opacity: 0; transform: scale(0.95); }
    50% { opacity: 1; transform: scale(1.05); }
    100% { opacity: 0; transform: scale(0.95); }
  }

  /* Animation for calculator exit - going up */
  @keyframes calc-exit {
    0% { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(-200px); }
  }

  .calculator-exit {
    animation: calc-exit .85s forwards !important;
  }
  `;

  document.head.appendChild(style);
}

const touchFeedbackStyle = document.createElement('style');
touchFeedbackStyle.textContent = `
.quantity-btn.active 
{
  transform: scale(0.9);
}
.quantity-btn
{
  transition: transform .1s ease;
}
`;
document.head.appendChild(touchFeedbackStyle);

// Add this JavaScript when setting up your event listeners for quantity buttons and add to estimate button:
function addTouchFeedback(element)
{
  element.addEventListener('touchstart', function()
  {
    this.classList.add('active');
  },
  {
    passive: true
  });

  element.addEventListener('touchend', function()
  {
    this.classList.remove('active');
  },
  {
    passive: true
  });

  element.addEventListener('touchcancel', function()
  {
    this.classList.remove('active');
  },
  {
    passive: true
  });
}

// Initialize calculator when tab 2 is loaded
document.addEventListener('DOMContentLoaded', function()
{
  // When on tab 2, set up the calculator
  if (tabNumber === 2)
  {
    loadCalculatorState();
    setupCoverageItemsClickHandler();
  }

  // Set up tab switching handlers
  const tab2Element = document.getElementById('tab2');
  if (tab2Element)
  {
    tab2Element.addEventListener('click', function()
    {
      // Load calculator state when switching to tab 2
      setTimeout(function()
      {
        loadCalculatorState();
        setupCoverageItemsClickHandler();
      }, 100);
    });
  }
});

// Initialize popup enhancement when a popup opens
document.addEventListener('click', function(event)
{
  // Handle clicking on already selected items 
  let targetItem = event.target.closest('.coverage-item');
  if (targetItem)
  {
    // If the item is already selected, check if we need special handling
    if (targetItem.classList.contains('in-calculator'))
    {
      const nameElement = targetItem.querySelector('.coverage-name');
      if (!nameElement) return;

      let procedureName = nameElement.textContent;
      let mappedName = procedureName;

      // Map display names to actual procedure names
      if (procedureName === "Emerg. Exams") mappedName = "Emergency Exams";
      if (procedureName === "Extrac- tions") mappedName = "Extractions";

      if (calculatorItems[mappedName])
      {
        // Store the current item data before showing popup
        window.currentSelectedItem = {
          name: mappedName,
          quantity: calculatorItems[mappedName].quantity
        };
      }
    }

    // Delay slightly to ensure popup is created first
    setTimeout(function()
    {
      enhancePopupWithCalculator();

      // Check if this item is already in calculator for initial state
      const nameElement = targetItem.querySelector('.coverage-name');
      if (!nameElement) return;

      let procedureName = nameElement.textContent;
      let mappedName = procedureName;

      // Map display names to actual procedure names
      if (procedureName === "Emerg. Exams") mappedName = "Emergency Exams";
      if (procedureName === "Extrac- tions") mappedName = "Extractions";

      const popup = document.getElementById('procedure-popup');

      if (popup && mappedName)
      {
        const addButton = popup.querySelector('.add-to-estimate-btn');
        const quantityValue = popup.querySelector('.quantity-value');

        if (addButton && calculatorItems[mappedName])
        {
          // Item is in calculator
          addButton.textContent = 'Remove from Estimate';
          addButton.classList.add('remove');

          // Set quantity
          if (quantityValue)
          {
            quantityValue.textContent = calculatorItems[mappedName].quantity;
          }

          // Update copay display
          updatePopupCopayAmount(popup);
        }
        else if (addButton)
        {
          // Item is not in calculator
          addButton.textContent = 'Add to Calculator';
          addButton.classList.remove('remove');

          // Reset quantity
          if (quantityValue)
          {
            quantityValue.textContent = '1';
          }

          // Update copay display
          updatePopupCopayAmount(popup);
        }
      }
    }, 100);
  }
});

function scrollTopAndLock() //for calcualtor state
{
  // Scroll up more dramatically to ensure address bar appears
  window.scrollTo(0, -100); // Negative value forces a more dramatic scroll up

  // Make sure we also get to the top
  setTimeout(() =>
  {
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
  }, 20);
}

function scrollTop()
{
  // Scroll up more dramatically to ensure address bar appears
  window.scrollTo(0, -100); // Negative value forces a more dramatic scroll up

  // Make sure we also get to the top
  setTimeout(() =>
  {
    window.scrollTo(0, 0);
  }, 5);
}

function scrollTopSmallDistance()
{
  const currentPosition = window.scrollY;

  // If we're not already at the top, use multiple techniques to ensure we get there
  if (currentPosition > 0)
  {
    // Create a "bounce" effect to ensure address bar appears
    // First scroll up beyond the top (browser will normalize this)
    window.scrollTo(0, -120);

    // Create a series of rapid scrolls with varying timing and positions
    setTimeout(() =>
    {
      window.scrollTo(0, -80);

      setTimeout(() =>
      {
        window.scrollTo(0, -40);

        setTimeout(() =>
        {
          // Final position to the exact top
          window.scrollTo(0, 0);
        }, 30);
      }, 30);
    }, 30);
  }
  // If already at the top (or very close), we need a different approach
  else if (currentPosition < 3)
  {
    // Create small downward scroll first, then back to top
    // This can help "wake up" the browser UI
    window.scrollTo(0, 10);

    setTimeout(() =>
    {
      window.scrollTo(0, 0);
    }, 40);
  }

  // Final attempt with different method after all other attempts
  setTimeout(() =>
  {
    // If we're still not at the top, try a scroll with behavior: smooth
    if (window.scrollY > 0)
    {
      window.scrollTo(
      {
        top: 0,
        behavior: 'smooth'
      });
    }

    // Force a focus change which can help show address bar on some browsers
    const tempButton = document.createElement('button');
    tempButton.style.position = 'fixed';
    tempButton.style.top = '0';
    tempButton.style.left = '0';
    tempButton.style.opacity = '0';
    tempButton.style.pointerEvents = 'none';
    document.body.appendChild(tempButton);

    tempButton.focus();
    setTimeout(() =>
    {
      tempButton.blur();
      document.body.removeChild(tempButton);
    }, 100);
  }, 100);
}

// Cache for preloaded content
const tabContentCache = {
  tab1: null,
  tab2: null,
  tab3: null,
  tab4: null
};

// Function to preload tab1 in the background
function preloadTabContent()
{
  // Only preload tab1 if it's not the current tab and not already cached
  if (tabNumber !== 1 && !tabContentCache.tab1)
  {
    // Create a hidden container to render the content
    const preloadContainer = document.createElement('div');
    preloadContainer.style.position = 'absolute';
    preloadContainer.style.left = '-9999px';
    preloadContainer.style.visibility = 'hidden';
    preloadContainer.style.width = '100%';
    document.body.appendChild(preloadContainer);

    // Generate the summary tab content
    const summaryContent = `
    <div id="summary-div">
    <div id="summary-row-1" class="pop-in">
    <div id="summary-card-eligibility">
    <h3 class='summary-title'>Eligibility </h3>
    <span class='eligibility-status-row'><i class="fas fa-check-circle"></i><h4>Active</h4></span>
    <br>Your insurance is ${variables[2][1]}.
    </div> 
    <div id="summary-card-renewal" class="pop-in">
    <h3 class='summary-title' id='renewal-summary-title'> Renewal </h3>
    <span class='renewal-status-row'><i class="fas fa-clock"></i><h4>${formatDateString(variables[4][1])}</h4></span>
    With the same plan, your benefits will renew to <b>${variables[6][1]}</b>
    </div>
    </div>
    <div id='summary-card-benefits' class='benefits-transition'>
    <!-- Will be populated by initializeTab1() -->
    </div>
    </div>`;

    // Add content to preload container
    preloadContainer.innerHTML = summaryContent;

    // Initialize the benefits card separately
    const benefitsCard = preloadContainer.querySelector('#summary-card-benefits');
    if (benefitsCard)
    {
      let targetAmount = 0;
      const amountStr = maximumRemaining.replace('$', '').trim();
      const parsedAmount = parseInt(amountStr);
      if (!isNaN(parsedAmount))
      {
        targetAmount = parsedAmount;
      }

      let fillPercentage = 100;
      fillPercentage = parseFloat(percentOfMaxUsed.replace('%', ''));
      if (isNaN(fillPercentage) || fillPercentage < 2)
      {
        fillPercentage = 2;
      }
      if (fillPercentage > 100)
      {
        fillPercentage = 100;
      }

      const svgSize = 180;
      const strokeWidth = 16;
      const radius = (svgSize / 2) - (strokeWidth / 2);
      const circumference = 2 * Math.PI * radius;
      const dashArray = circumference;
      const dashOffset = circumference * (1 - (fillPercentage / 100));

      const infographicHTML = `
      <h3>Your Benefits</h3>
      <div class="svg-circle-container">
      <svg class="svg-circle" width="${svgSize}" height="${svgSize}" viewBox="0 0 ${svgSize} ${svgSize}">
      <circle class="svg-circle-bg" 
      cx="${svgSize/2}" 
      cy="${svgSize/2}" 
      r="${radius}" 
      stroke-width="${strokeWidth}">
      </circle>
      <circle class="svg-circle-progress" 
      cx="${svgSize/2}" 
      cy="${svgSize/2}" 
      r="${radius}" 
      stroke-width="${strokeWidth}"
      stroke-dasharray="${dashArray}"
      stroke-dashoffset="${circumference}">
      </circle>
      </svg>
      <div class="svg-circle-text">
      <span class="big-bold" id="benefits-counter">${maximumRemaining}</span>
      <span class="remaining-text">remaining</span>
      </div>
      </div>
      <p class='summary-benefits-info'> Your insurance pays a set percentage of your dental costs until your benefits run out. Your percentages are shown in <b>Coverage</b>. </p>`;
      benefitsCard.innerHTML = infographicHTML;
    }

    // Store in cache
    tabContentCache.tab1 = preloadContainer.innerHTML;

    // Clean up
    document.body.removeChild(preloadContainer);
  }
}

/* Preload Tab 1 */
document.addEventListener('DOMContentLoaded', function()
{
  // Preload after main content is ready
  setTimeout(preloadTabContent, 2000);
});
// Modify the tab1 click handler to use preloaded content
document.getElementById("tab1").addEventListener("click", function()
{
  if (tabNumber !== 1)
  {
    tabNumber = 1;
    // Fade out current content
    document.getElementsByClassName("second-content")[0].style.opacity = "0";

    // Use cached content if available
    setTimeout(() =>
    {
      const secondPage = document.getElementsByClassName("second-content")[0];
      if (tabContentCache.tab1)
      {
        // Use the cached content
        secondPage.innerHTML = tabContentCache.tab1;
        secondPage.style.opacity = "1";

        // Manually initialize any dynamic elements
        const svgCircle = secondPage.querySelector('.svg-circle-progress');
        if (svgCircle)
        {
          setTimeout(() =>
          {
            const dashOffset = parseFloat(svgCircle.getAttribute('stroke-dashoffset')) || 0;
            svgCircle.style.strokeDashoffset = dashOffset;
          }, 50);
        }

        document.getElementById("tabs-div").style.opacity = "1";
        makeTabActive();
        scrollTop();
      }
      else
      {
        // Fall back to regular loading if cache isn't available
        showNext();
      }
    }, 300);
  }
  else
  {
    // Already on this tab
    scrollTop();
  }
});

// Replace the existing mobile scroll lock code with this improved version

document.addEventListener('DOMContentLoaded', function()
{
  // Check if we're on a mobile device
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (!isMobile) return; // Only apply on mobile devices

  // Get all form inputs
  const inputs = document.querySelectorAll('#main-form input');

  // Store original body styles
  let originalStyles = {
    height: '',
    overflow: '',
    position: ''
  };

  // Create a fixed position overlay to block all scrolling
  const scrollBlocker = document.createElement('div');
  scrollBlocker.style.position = 'fixed';
  scrollBlocker.style.top = '0';
  scrollBlocker.style.left = '0';
  scrollBlocker.style.width = '100%';
  scrollBlocker.style.height = '100%';
  scrollBlocker.style.zIndex = '-1'; // Below content but above body
  scrollBlocker.style.display = 'none';
  document.body.appendChild(scrollBlocker);

  // Function to lock scrolling completely
  function lockScroll()
  {
    // Save current styles
    originalStyles.height = document.body.style.height;
    originalStyles.overflow = document.body.style.overflow;
    originalStyles.position = document.body.style.position;

    // Lock the body in place
    document.body.style.height = '100%';
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';

    // Show scroll blocker
    scrollBlocker.style.display = 'block';

    // Save current scroll position
    document.body.setAttribute('data-scroll-top', window.pageYOffset.toString());
  }

  // Function to unlock scrolling
  function unlockScroll()
  {
    // Restore original styles
    document.body.style.height = originalStyles.height;
    document.body.style.overflow = originalStyles.overflow;
    document.body.style.position = originalStyles.position;
    document.body.style.width = '';

    // Hide scroll blocker
    scrollBlocker.style.display = 'none';

    // Restore scroll position
    const scrollTop = parseInt(document.body.getAttribute('data-scroll-top') || '0');
    window.scrollTo(0, scrollTop);
  }

  // Track if any input is focused
  let inputFocused = false;
  let lockScrollTimeout = null;

  // Apply to each input
  inputs.forEach(input =>
  {
    // When input is focused
    input.addEventListener('focus', function()
    {
      if (!inputFocused)
      {
        inputFocused = true;

        // Clear any existing timeout
        if (lockScrollTimeout)
        {
          clearTimeout(lockScrollTimeout);
        }

        // Delay the scroll lock slightly to allow cursor to appear
        lockScrollTimeout = setTimeout(() =>
        {
          if (inputFocused)
          { // Double check input is still focused
            lockScroll();
          }
        }, 100); // Small delay to let cursor appear first
      }
    });

    // When input loses focus
    input.addEventListener('blur', function()
    {
      // Clear the lock timeout if it hasn't fired yet
      if (lockScrollTimeout)
      {
        clearTimeout(lockScrollTimeout);
        lockScrollTimeout = null;
      }

      // Check if focus moved to another input
      setTimeout(() =>
      {
        if (!document.activeElement || !document.activeElement.matches('#main-form input'))
        {
          unlockScroll();
          inputFocused = false;
        }
      }, 10);
    });

    // Add touchstart event to improve responsiveness
    input.addEventListener('touchstart', function()
    {
      // Pre-focus the input on touch to improve cursor response
      if (!inputFocused)
      {
        // Force focus slightly before the actual focus event
        setTimeout(() =>
        {
          if (!this.matches(':focus'))
          {
            this.focus();
          }
        }, 0);
      }
    });
  });

  // Block all touch move events when input is focused (but only after lock is applied)
  document.addEventListener('touchmove', function(e)
  {
    if (inputFocused && document.body.style.overflow === 'hidden')
    {
      e.preventDefault();
    }
  },
  {
    passive: false
  });

  // iOS safeguard - re-check on resize (keyboard appears/disappears)
  window.addEventListener('resize', function()
  {
    // If we have focused inputs but somehow scroll is unlocked
    if (inputFocused && document.body.style.overflow !== 'hidden')
    {
      // Only lock if we're not in the middle of a delayed lock
      if (!lockScrollTimeout)
      {
        lockScroll();
      }
    }
    // If no inputs are focused but we're still locked
    else if (!inputFocused && document.body.style.overflow === 'hidden')
    {
      // Double check no inputs are actually focused
      const hasFocusedInput = document.activeElement && document.activeElement.matches('#main-form input');
      if (!hasFocusedInput)
      {
        unlockScroll();
      }
    }
  });
});
/* Make header always stay fixed at the top for Tab 3 */
document.getElementById("tab3").addEventListener("click", function()
{
  // Wait for content to load
  setTimeout(function()
  {
    // Enable scrolling
    document.body.style.overflow = 'auto';
    document.body.style.touchAction = 'auto';

    // Set header to fixed position
    const header = document.querySelector('.header');
    if (header)
    {
      header.style.position = 'fixed';
      header.style.top = '0';
      header.style.width = '100%';
      header.style.zIndex = '1000';
    }
  }, 300);
});
document.getElementById("tab4").addEventListener("click", function()
{
  // Wait for content to load
  setTimeout(function()
  {
    // Enable scrolling
    document.body.style.overflow = 'auto';
    document.body.style.touchAction = 'auto';

    // Set header to fixed position
    const header = document.querySelector('.header');
    if (header)
    {
      header.style.position = 'fixed';
      header.style.top = '0';
      header.style.width = '100%';
      header.style.zIndex = '1000';
    }
  }, 300);
});




function initializeTab4()
{
  // Simple pop-in animations like the summary tab
  waitForElement(".pop-in", () =>
  {
    const popInElements = document.querySelectorAll(".pop-in");

    // Add pop-in animation style if it doesn't exist yet
    if (!document.getElementById('insights-pop-in-style'))
    {
      const popInStyle = document.createElement('style');
      popInStyle.id = 'insights-pop-in-style';
      popInStyle.textContent = `
      @keyframes popInAnimation {
        0% {
          opacity: 0;
          transform: scale(0.85);
        }
        70% {
          opacity: 1;
          transform: scale(1.05);
        }
        100% {
          opacity: 1;
          transform: scale(1);
        }
      }
      `;
      document.head.appendChild(popInStyle);
    }

    // Apply animation to each element with a slight delay between them
    popInElements.forEach((element, index) =>
    {
      // Set initial state
      element.style.opacity = "0";
      element.style.transform = "scale(0.85)";
      element.style.transformOrigin = "center";
      void element.offsetWidth;

      // Apply animation with increasing delay based on index
      element.style.animation = `popInAnimation 0.65s forwards ease-out`;
      element.style.animationDelay = `${0.15 * index}s`;

      // Apply final state after animation completes
      const animationDuration = 650 + (150 * index);
      setTimeout(() =>
      {
        element.style.opacity = "1";
        element.style.transform = "scale(1)";
      }, animationDuration);
    });
  });
}




window.initGoogleMaps = function()
{
  if (!window.currentLocationInput)
  {
    const inputContainer = document.querySelector('.search-input-container');
    if (inputContainer)
    {
      window.currentLocationInput = inputContainer;
    }
  }
  if (window.currentLocationInput)
  {
    setupGoogleAutocomplete(window.currentLocationInput);
  }
};

function initializeTab5()
{
  waitForElement(".network-search-section", () =>
  {
    const popInElements = document.querySelectorAll(".network-search-section");
    if (!document.getElementById('network-pop-in-style'))
    {
      const popInStyle = document.createElement('style');
      popInStyle.id = 'network-pop-in-style';
      popInStyle.textContent = `
      @keyframes networkPopInAnimation {
        0% {
          opacity: 0;
          transform: scale(0.85);
        }
        70% {
          opacity: 1;
          transform: scale(1.05);
        }
        100% {
          opacity: 1;
          transform: scale(1);
        }
      }
      `;
      document.head.appendChild(popInStyle);
    }

    // Apply animation to each element with a slight delay between them
    popInElements.forEach((element, index) =>
    {
      // Set initial state
      element.style.opacity = "0";
      element.style.transform = "scale(0.85)";
      element.style.transformOrigin = "center";
      void element.offsetWidth;
      // Apply animation with increasing delay based on index
      element.style.animation = `networkPopInAnimation 0.65s forwards ease-out`;
      element.style.animationDelay = `${0.15 * index}s`;
      // Apply final state after animation completes
      const animationDuration = 650 + (150 * index);
      setTimeout(() =>
      {
        element.style.opacity = "1";
        element.style.transform = "scale(1)";
      }, animationDuration);
    });
  });

  // Set up the search functionality
  setTimeout(setupSearchFunctionality, 100);
  setTimeout(addRippleToSearchButton, 150);

  function setupSearchFunctionality()
  {
    const searchButton = document.getElementById('search-providers');
    const locationInput = document.getElementById('location-search');
    const specialtyFilter = document.getElementById('specialty-filter');
    const distanceFilter = document.getElementById('distance-filter');
    const sortSelect = document.getElementById('sort-results');
    const resultsSection = document.getElementById('results-section');
    const loadingState = document.getElementById('loading-state');
    const emptyState = document.getElementById('empty-state');
    const resultsCount = document.getElementById('results-count');
    const providersContainer = document.getElementById('providers-container');


    const GOOGLE_MAPS_API_KEY = 'AIzaSyBPDGPtuHWhAhL15HOrFGIynFp0AMKxMiY';
    window.currentLocationInput = locationInput;
    if (window.google && window.google.maps && window.google.maps.places)
    {
      setupGoogleAutocomplete(locationInput);
    }

    // Setup Google Places Autocomplete (NEW API)
    function setupGoogleAutocomplete(inputContainer)
    {
      // Check if we got an input element or a container
      console.log('Input container type:', inputContainer.tagName);
      let inputElement;
      if (inputContainer.tagName === 'INPUT')
      {
        inputElement = inputContainer;
      }
      else
      {
        // It's a container, find or create the input
        inputElement = inputContainer.querySelector('input');

        if (!inputElement)
        {
          inputElement = document.createElement('input');
          inputElement.type = 'text';
          inputElement.className = 'search-input';
          inputElement.placeholder = 'Enter city, state, or zip code';
          inputContainer.appendChild(inputElement);
        }
      }
      const autocomplete = new google.maps.places.Autocomplete(inputElement,
      {
        types: ['geocode'],
        componentRestrictions:
        {
          country: 'us'
        }
      });

      // Implement scroll locking
      inputElement.addEventListener('focus', function()
      {
        console.log('Input focused - locking scroll');
      });

      // Handle place selection
      google.maps.event.addListener(autocomplete, 'place_changed', function()
      {
        const place = autocomplete.getPlace();
        if (place.geometry)
        {
          // Store coordinates globally so performSearch can use them
          window.currentUserCoordinates = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            formatted_address: place.formatted_address
          };

          console.log('Coordinates from autocomplete:', window.currentUserCoordinates);
        }

        /* //make it automatically search
        if (typeof performSearch === 'function') 
        {
          setTimeout(performSearch, 0);
        }
        */
      });

      return autocomplete;
    }




    // Enhanced distance calculation (when you have real coordinates)
    function calculateDistance(userLat, userLng, providerLat, providerLng)
    {
      const R = 3959; // Earth's radius in miles
      const dLat = (providerLat - userLat) * Math.PI / 180;
      const dLng = (providerLng - userLng) * Math.PI / 180;
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(userLat * Math.PI / 180) * Math.cos(providerLat * Math.PI / 180) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    }

    // Get user's insurance from variables - this is the key filtering logic
    function getInNetworkProviders()
    {
      const userInsurance = variables[2][1]; // e.g., "Delta Dental", "Blue Cross", etc.

      if (!userInsurance || userInsurance === "Not Found")
      {
        return []; // No providers if insurance not found
      }

      // Filter providers by insurance network
      return window.providerData.filter(provider =>
      {
        return provider.insuranceNetworks &&
        provider.insuranceNetworks.includes(userInsurance) && provider.acceptingPatients === true;
      });
    }

    function createProviderCard(provider) 
    {
      const stars = '★'.repeat(Math.floor(provider.rating)) +
      (provider.rating % 1 >= 0.5 ? '☆' : '') +
      '☆'.repeat(5 - Math.ceil(provider.rating));

      // Handle name display based on whether there's a separate practice name
      const displayName = provider.practice ? provider.name : provider.name;
      const practiceName = provider.practice || "";

      // Create specialty tags for header
      const specialtyTags = provider.primarySpecialties.map(specialty =>
        `<div class="specialty-tag-header">${specialty}</div>`
        ).join('');

      // Create amenities list (show first 6)
      const topAmenities = provider.amenities.slice(0, 6).map(amenity =>
        `<span class="amenity-tag">${amenity}</span>`
        ).join('');

      // Awards display - only show first award as badge in header
      const firstAward = provider.awards.length > 0 ? provider.awards[0] : null;
      const awardsInline = '';

      // Combine credentials (experience, languages, awards count)
      const credentialsItems = [
      {
        icon: 'fas fa-user-md',
        text: provider.credentials.experience
      },
      provider.credentials.languages.length > 1 ? {
        icon: 'fas fa-language',
        text: provider.credentials.languages.slice(0, 2).join(', ')
      } : null,
      provider.awards.length > 0 ? {
        icon: 'fas fa-award',
        text: provider.awards[0]
      } : null
      ].filter(Boolean);

      const credentialsHTML = credentialsItems.map(item =>
        `<div class="credential-item">
        <i class="${item.icon}"></i>
        <span>${item.text}</span>
        </div>`
        ).join('');

      return `
      <div class="provider-card">
      ${awardsInline}
      <div class="provider-distance"><i class="fas fa-map-marker-alt"></i> &nbsp;${provider.distance}</div>
      <!-- Header Section with Photo, Name, Address, and Basic Info -->
      <div class="provider-header">
      <div class="provider-image-container">
      <img src="${provider.image}" alt="${provider.name}" class="provider-image">
      <!-- Distance badge positioned over image -->
      </div>

      <div class="provider-main-info">
      <h4 class="provider-name">${displayName}</h4>
      ${practiceName ? `<div class="practice-name">${practiceName}</div>` : ''}
      <!-- Specialty tags -->
      <div class="provider-specialties-header">
      ${specialtyTags}
      </div>

      <!-- Address section - clickable for directions -->
      <div class="provider-address-section" onclick="getDirections('${provider.address}')">
      <i class="fas fa-map-marker-alt address-icon"></i>
      <span class="address-text">${provider.address}</span>
      </div>

      </div>
      </div>

      <!-- Rating Section -->
      <div class="provider-rating-section">
      <div class="provider-rating-compact">
      <span class="rating-stars">${stars}</span>
      <span class="rating-value">${provider.rating}</span>
      <span class="review-count">(${provider.reviewCount} reviews)</span>
      </div>
      </div>

      <!-- Combined credentials section -->
      <div class="provider-credentials-combined">
      ${credentialsHTML}
      </div>

      <!-- Description Section -->
      <div class="provider-description">
      <p>"${provider.description}"</p>
      </div>

      <!-- Amenities Section -->
      <div class="provider-amenities">
      <div class="amenities-label">Office Features</div>
      ${topAmenities}
      ${provider.amenities.length > 6 ? `<span class="amenity-more">+${provider.amenities.length - 6} more</span>` : ''}
      </div>

      <!-- Photo Gallery Preview -->
      ${provider.photos.length > 0 ? `
        <div class="photo-gallery-preview">
        <span class="gallery-label">Office Photos</span>
        <div class="gallery-images">
        ${provider.photos.slice(0, 4).map((photo, index) => 
          `<img src="${photo}" alt="Office photo ${index + 1}" class="gallery-thumb" onclick="openPhotoGallery(${provider.id}, ${index})">`
          ).join('')}
        ${provider.photos.length > 4 ? 
          `<div class="gallery-more" onclick="openPhotoGallery(${provider.id}, 4)">
          <span>+${provider.photos.length - 4}</span>
          </div>` : ''}
          </div>
          </div>` : ''}

          <!-- Action Buttons -->
          <div class="provider-actions">
          <div class="provider-actions-row-1">
          <a href="tel:${provider.phone}" class="action-button call-button">
          <i class="fas fa-phone"></i> Call Now
          </a>
          <button class="action-button directions-button" onclick="getDirections('${provider.address}')">
          <i class="fas fa-directions"></i> Directions
          </button>
          </div>
          <div class="provider-actions-row-2">
          <a href="https://${provider.website}" target="_blank" class="action-button website-button">
          <i class="fas fa-globe"></i> Visit Website
          </a>
          <button class="action-button details-button" onclick="showProviderDetails(${provider.id})">
          <i class="fas fa-info-circle"></i> More Details
          </button>
          </div>
          </div>
          </div>
          `;
        }

        function displayProviders(providers) 
        {
          const providersContainer = document.getElementById('providers-container');
          const resultsCount = document.getElementById('results-count');

          if (!providersContainer) return;

          providersContainer.innerHTML = '';

          if (providers.length === 0) {
            showEmptyState();
            return;
          }

          providers.forEach((provider, index) => {
            const cardHTML = createProviderCard(provider);
            providersContainer.insertAdjacentHTML('beforeend', cardHTML);

            const card = providersContainer.lastElementChild;

        // Enhanced animation with stagger
        card.style.opacity = '0';
        card.style.transform = 'translateY(60px) scale(0.95)';
        card.style.filter = 'blur(5px)';

        // Force reflow
        void card.offsetWidth;

        // Apply enhanced slide up animation with stagger
        setTimeout(() => {
          card.style.transition = 'all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)';
          card.style.transform = 'translateY(0) scale(1)';
          card.style.opacity = '1';
          card.style.filter = 'blur(0)';
          
          // Add subtle bounce effect after main animation
          setTimeout(() => {
            card.style.transform = 'translateY(-4px) scale(1.02)';
            setTimeout(() => {
              card.style.transform = 'translateY(0) scale(1)';
            }, 200);
          }, 600);
          
        }, 120 * index); // Stagger delay increased for better effect
      });

          const userInsurance = variables[2][1];
          resultsCount.innerHTML = `${providers.length} in-network provider${providers.length !== 1 ? 's' : ''} found with <strong>${userInsurance}</strong>`;
          showResultsSection();
        }

    // Function to show loading state
    function showLoadingState()
    {
      resultsSection.style.display = 'none';
      emptyState.style.display = 'none';
      loadingState.style.display = 'block';
    }

    // Function to show results section
    function showResultsSection()
    {
      loadingState.style.display = 'none';
      emptyState.style.display = 'none';
      resultsSection.style.display = 'block';
    }

    // Function to show empty state
    function showEmptyState()
    {
      loadingState.style.display = 'none';
      resultsSection.style.display = 'none';
      emptyState.style.display = 'block';

      // Update empty state message for insurance-specific context
      const emptyStateElement = document.getElementById('empty-state');
      if (emptyStateElement)
      {
        const userInsurance = variables[2][1];
        emptyStateElement.innerHTML = `
        <i class="fas fa-search"></i>
        <h4>No ${userInsurance} providers found</h4>
        <p>Try expanding your search area or contact ${userInsurance} directly for additional in-network providers in your area.</p>
        `;
      }
    }

    // Function to filter providers by specialty and distance
    function filterProviders(providers, specialty, distance)
    {
      let filtered = [...providers];

      // Filter by specialty
      if (specialty)
      {
        filtered = filtered.filter(provider =>
          provider.specialties.some(spec =>
            spec.toLowerCase().includes(specialty.toLowerCase()) ||
            (specialty === 'general' && spec.toLowerCase().includes('general'))
            )
          );
      }

      // Filter by distance - THIS IS THE KEY PART
      const maxDistance = parseInt(distance);
      filtered = filtered.filter(provider =>
      {
        // Parse the distance string "X.X miles" to get just the number
        const providerDistance = parseFloat(provider.distance.replace(' miles', ''));
        return providerDistance <= maxDistance;
      });

      return filtered;
    }

    // Function to sort providers
    function sortProviders(providers, sortBy)
    {
      const sorted = [...providers];

      switch (sortBy)
      {
        case 'distance':
        return sorted.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
        case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
        case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
        default:
        return sorted;
      }
    }

    // Enhanced search functionality that only shows in-network providers
    async function performSearch()
    {
      const location = locationInput.value.trim();
      const specialty = specialtyFilter.value;
      const distance = distanceFilter.value;
      const sortBy = sortSelect.value;

      // Show results if any text is entered in location field
      if (!location)
      {
        // Add shake animation to input
        locationInput.style.animation = 'shake2 0.5s ease-in-out';
        setTimeout(() =>
        {
          locationInput.style.animation = '';
        }, 500);
        return;
      }
      showLoadingState();

      // Get coordinates for real distance calculation (optional enhancement)
      let userCoordinates = window.currentUserCoordinates || null;
      try
      {
        if (userCoordinates)
        {
          console.log('Coordinates found:', userCoordinates);
        }
      }
      catch (error)
      {
        console.log('Using sample distances instead of real coordinates');
      }


      setTimeout(() =>
      {
        let inNetworkProviders = getInNetworkProviders();
        if (userCoordinates && inNetworkProviders.length > 0)
        {
          inNetworkProviders = inNetworkProviders.map(provider =>
          {
            const realDistance = calculateDistance(
              userCoordinates.lat, userCoordinates.lng,
              provider.lat, provider.lng
              );
            return {
              ...provider,
              distance: `${realDistance.toFixed(1)} miles`
            };
          });
        }

        let results = filterProviders(inNetworkProviders, specialty, distance);
        results = sortProviders(results, sortBy);
        displayProviders(results);
        setTimeout(() => scrollToFirstProvider(), 0);
      }, 750)
    }

    function scrollToFirstProvider() 
    {
      requestAnimationFrame(() => {
        const firstProvider = document.querySelector('#providers-container .provider-card:first-child') ||
        document.querySelector('.provider-card:first-child');
        let goTo = "";

        if (firstProvider) {
          goTo = document.querySelector('.network-results-section');
        } else {
          goTo = document.querySelector('.empty-results');
        }
        
        if (goTo) {
          // Get the actual position after animations
          const rect = goTo.getBoundingClientRect();
          const currentScrollY = window.pageYOffset;

          // Calculate the target position with better offset
          const headerHeight = document.querySelector('.header-container')?.offsetHeight || 80;
          const extraPadding = 30; // Increased padding for better spacing
          const targetY = currentScrollY + rect.top - headerHeight - extraPadding;

          // Enhanced smooth scroll with custom easing
          const startY = window.pageYOffset;
          const distance = Math.max(0, targetY) - startY;
          const duration = 800; // Longer duration for smoother feel
          let startTime = null;

          function easeInOutCubic(t) {
            return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
          }

          function scrollAnimation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = easeInOutCubic(progress);
            
            window.scrollTo(0, startY + (distance * ease));
            
            if (progress < 1) {
              requestAnimationFrame(scrollAnimation);
            }
          }
          requestAnimationFrame(scrollAnimation);
        }
      });
    }


    // Event listeners
    searchButton.addEventListener('click', performSearch);

    locationInput.addEventListener('keypress', function(e)
    {
      if (e.key === 'Enter')
      {
        performSearch();
      }
    });
    sortSelect.addEventListener('change', function()
    {
      if (resultsSection.style.display !== 'none')
      {
        const sortBy = this.value;

        // Get current provider data from displayed cards
        const currentProviders = Array.from(providersContainer.children).map(card =>
        {
          // Extract provider data from the card
          return {
            element: card,
            name: card.querySelector('.provider-name').textContent,
            rating: parseFloat(card.querySelector('.rating-value').textContent),
            distance: parseFloat(card.querySelector('.provider-distance').textContent.replace(' miles', ''))
          };
        });

        // Sort the array
        switch (sortBy)
        {
          case 'distance':
          currentProviders.sort((a, b) => a.distance - b.distance);
          break;
          case 'rating':
          currentProviders.sort((a, b) => b.rating - a.rating);
          break;
          case 'name':
          currentProviders.sort((a, b) => a.name.localeCompare(b.name));
          break;
        }

        // Reorder DOM elements
        currentProviders.forEach(provider =>
        {
          providersContainer.appendChild(provider.element);
        });
      }
    });
    // Add shake animation to CSS if not exists
    if (!document.getElementById('shake-animation'))
    {
      const shakeStyle = document.createElement('style');
      shakeStyle.id = 'shake-animation';
      shakeStyle.textContent = `
      @keyframes shake2 {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
      }
      `;
      document.head.appendChild(shakeStyle);
    }
  }
}

// Helper function for directions (opens in maps app)
function getDirections(address) 
{
  const encodedAddress = encodeURIComponent(address);
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    // Try to open in native maps app with fallback
    const mapsUrl = `https://maps.google.com/maps?daddr=${encodedAddress}`;
    const appleUrl = `http://maps.apple.com/?daddr=${encodedAddress}`;
    
    // Try Apple Maps first on iOS devices
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      window.open(appleUrl, '_system');
      // Fallback to Google Maps after a short delay
      setTimeout(() => {
        window.open(mapsUrl, '_blank');
      }, 1000);
    } else {
      window.open(mapsUrl, '_blank');
    }
  } 
  else 
  {
    // Open in Google Maps web
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`, '_blank');
  }
}




/* HELPER FUNCTIONS FOR MODALS */

function openPhotoGallery(providerId, startIndex = 0)
{
  const provider = window.providerData.find(p => p.id === providerId);
  if (!provider || !provider.photos.length) return;

  // Create modal overlay
  const modal = document.createElement('div');
  modal.className = 'photo-modal-overlay';
  modal.innerHTML = `
  <div class="photo-modal">
  <button class="photo-modal-close">&times;</button>
  <div class="photo-modal-content">
  <img src="${provider.photos[startIndex]}" alt="Office photo" class="photo-modal-image" id="modal-image">
  <div class="photo-modal-nav">
  <button class="photo-nav-btn prev-btn" onclick="changePhoto(-1)">&#8249;</button>
  <span class="photo-counter">${startIndex + 1} / ${provider.photos.length}</span>
  <button class="photo-nav-btn next-btn" onclick="changePhoto(1)">&#8250;</button>
  </div>
  </div>
  <div class="photo-thumbnails">
  ${provider.photos.map((photo, index) => 
    `<img src="${photo}" alt="Thumbnail ${index + 1}" class="photo-thumb ${index === startIndex ? 'active' : ''}" onclick="selectPhoto(${index})">`
    ).join('')}
  </div>
  </div>
  `;

  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';

  // Store current photo index and provider data
  window.currentPhotoIndex = startIndex;
  window.currentPhotos = provider.photos;

  // Close modal functionality
  modal.querySelector('.photo-modal-close').addEventListener('click', closePhotoModal);
  modal.addEventListener('click', (e) =>
  {
    if (e.target === modal) closePhotoModal();
  });
}

// Function to change photo in gallery
function changePhoto(direction)
{
  window.currentPhotoIndex += direction;

  if (window.currentPhotoIndex < 0)
  {
    window.currentPhotoIndex = window.currentPhotos.length - 1;
  }
  else if (window.currentPhotoIndex >= window.currentPhotos.length)
  {
    window.currentPhotoIndex = 0;
  }

  updateModalPhoto();
}

// Function to select specific photo
function selectPhoto(index)
{
  window.currentPhotoIndex = index;
  updateModalPhoto();
}

// Function to update modal photo
function updateModalPhoto()
{
  const modalImage = document.getElementById('modal-image');
  const counter = document.querySelector('.photo-counter');
  const thumbnails = document.querySelectorAll('.photo-thumb');

  if (modalImage && counter)
  {
    modalImage.src = window.currentPhotos[window.currentPhotoIndex];
    counter.textContent = `${window.currentPhotoIndex + 1} / ${window.currentPhotos.length}`;

    // Update thumbnail active state
    thumbnails.forEach((thumb, index) =>
    {
      thumb.classList.toggle('active', index === window.currentPhotoIndex);
    });
  }
}

// Function to close photo modal
function closePhotoModal()
{
  const modal = document.querySelector('.photo-modal-overlay');
  if (modal)
  {
    modal.remove();
    document.body.style.overflow = 'auto';
  }
}

// Function to show provider details modal
function showProviderDetails(providerId)
{
  const provider = window.providerData.find(p => p.id === providerId);
  if (!provider) return;

  // Create detailed modal
  const modal = document.createElement('div');
  modal.className = 'details-modal-overlay';
  modal.innerHTML = `
  <div class="details-modal">
  <div class="details-modal-header">
  <h3>${provider.practice ? provider.name : provider.name}</h3>
  ${provider.practice ? `<p class="practice-name-modal">${provider.practice}</p>` : ''}
  <button class="details-modal-close">&times;</button>
  </div>

  <div class="details-modal-content">
  <!-- Credentials Section -->
  <div class="details-section">
  <h4><i class="fas fa-graduation-cap"></i> Education & Credentials</h4>
  <div class="credentials-info">
  <p><strong>Education:</strong> ${provider.credentials.education}</p>
  <p><strong>Experience:</strong> ${provider.credentials.experience}</p>
  <p><strong>Certifications:</strong> ${provider.credentials.certifications.join(', ')}</p>
  <p><strong>Languages:</strong> ${provider.credentials.languages.join(', ')}</p>
  </div>
  </div>

  <!-- Services Section -->
  <div class="details-section">
  <h4><i class="fas fa-tools"></i> Services Offered</h4>
  <div class="services-grid">
  ${provider.allServices.map(service => 
    `<span class="service-tag">${service}</span>`
    ).join('')}
  </div>
  </div>

  <!-- Office Hours Section -->
  <div class="details-section">
  <h4><i class="fas fa-clock"></i> Office Hours</h4>
  <div class="hours-grid">
  ${Object.entries(provider.hours).map(([day, hours]) => 
    `<div class="hours-row">
    <span class="day">${day.charAt(0).toUpperCase() + day.slice(1)}:</span>
    <span class="time">${hours}</span>
    </div>`
    ).join('')}
  </div>
  </div>

  <!-- Amenities Section -->
  <div class="details-section">
  <h4><i class="fas fa-star"></i> Office Features</h4>
  <div class="amenities-grid">
  ${provider.amenities.map(amenity => 
    `<span class="amenity-tag-detailed">${amenity}</span>`
    ).join('')}
  </div>
  </div>

  <!-- Insurance Section -->
  <div class="details-section">
  <h4><i class="fas fa-shield-alt"></i> Insurances In-Network</h4>
  <div class="insurance-grid">
  ${provider.insuranceNetworks.map(insurance => 
    `<span class="insurance-tag">${insurance}</span>`
    ).join('')}
  </div>
  </div>

  ${provider.awards.length > 0 ? `
    <!-- Awards Section -->
    <div class="details-section">
    <h4><i class="fas fa-award"></i> Awards & Recognition</h4>
    <div class="awards-list">
    ${provider.awards.map(award => 
      `<div class="award-item"><i class="fas fa-trophy"></i> ${award}</div>`
      ).join('')}
    </div>
    </div>` : ''}
    </div>
    </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

  // Close modal functionality
  modal.querySelector('.details-modal-close').addEventListener('click', closeDetailsModal);
  modal.addEventListener('click', (e) =>
  {
    if (e.target === modal) closeDetailsModal();
  });
}

// Function to close details modal
function closeDetailsModal()
{
  const modal = document.querySelector('.details-modal-overlay');
  if (modal)
  {
    modal.remove();
    document.body.style.overflow = 'auto';
  }
}


// Add ripple effect to search provider button (works with dynamically created elements)
function addRippleToSearchButton() {
  // Get the search provider button
  const searchButton = document.getElementById('search-providers');
  
  // Only proceed if the button exists and doesn't already have ripple
  if (!searchButton || searchButton.querySelector('.ripple-container')) return;

  // Add ripple container to the button
  const rippleContainer = document.createElement('div');
  rippleContainer.className = 'ripple-container';
  searchButton.appendChild(rippleContainer);

  // Track if touch event occurred to prevent mouse event duplication
  let touchStarted = false;

  // Function to create ripple effect (identical to submit button)
  function createRipple(event) {
    // Prevent double ripple on devices that fire both touch and mouse events
    if (event.type === 'mousedown' && touchStarted) {
      return;
    }
    
    if (event.type === 'touchstart') {
      touchStarted = true;
      // Reset touch flag after a delay
      setTimeout(() => {
        touchStarted = false;
      }, 500);
    }

    // Remove any existing ripples
    const existingRipples = rippleContainer.querySelectorAll('.ripple');
    existingRipples.forEach(ripple => {
      ripple.remove();
    });

    // Create new ripple element
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    rippleContainer.appendChild(ripple);

    // Get position and size data
    const buttonRect = searchButton.getBoundingClientRect();
    const diameter = Math.max(buttonRect.width, buttonRect.height);
    const radius = diameter / 2;

    // Get coordinates for the ripple center
    // For touch events, use the first touch point
    let x, y;

    if (event.touches && event.touches[0]) {
      // Touch event
      x = event.touches[0].clientX - buttonRect.left;
      y = event.touches[0].clientY - buttonRect.top;
    } else {
      // Mouse event
      x = event.clientX - buttonRect.left;
      y = event.clientY - buttonRect.top;
    }

    // If coordinates are not available (keyboard event or programmatic trigger)
    // center the ripple
    if (isNaN(x) || isNaN(y)) {
      x = buttonRect.width / 2;
      y = buttonRect.height / 2;
    }

    // Style the ripple with the calculated dimensions
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${x - radius}px`;
    ripple.style.top = `${y - radius}px`;

    // Add active class to the button (optional but adds to the effect)
    searchButton.classList.add('button-pressed');

    // Remove ripple after animation completes
    setTimeout(() => {
      ripple.remove();

      // Remove active class if button is no longer being pressed
      if (!searchButton.matches(':active')) {
        searchButton.classList.remove('button-pressed');
      }
    }, 750); // Match the ripple animation duration
  }

  // Add event listeners for both mouse and touch events (identical to submit button)
  searchButton.addEventListener('mousedown', createRipple);
  searchButton.addEventListener('touchstart', createRipple, {
    passive: true
  });

  // Remove active class when button is released (identical to submit button)
  searchButton.addEventListener('mouseup', () => {
    setTimeout(() => {
      searchButton.classList.remove('button-pressed');
    }, 150);
  });

  searchButton.addEventListener('touchend', () => {
    setTimeout(() => {
      searchButton.classList.remove('button-pressed');
    }, 150);
  });
}



