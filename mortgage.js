(function () {
   /*months array*/
   var monthsArr = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],

   /*Mortgage and amortization global Variables initialized*/
loanAmonut = 0, firstPymntMonth, firstPymntDay, firstPymntYear, annualInterestRate = 0, totalPMI = 0,
monthlyPropertyTax = 0, annualPropertyTax = 0, monthlyPropertyInsurance = 0, annualPropertyInsurance = 0, monthlyPMI = 0,
annualMortgageTerm = 0, monthlyPymnt = 0, monthlyInterest = 0, PMI = 0, monthlyPrincipalPaid = 0, monthlyPrincipalOwed = 0,
totalMonths = 0, monthlyInterestsTotal = 0, monthlyInterestsTotals = 0, monthlyPrincipalsTotal = 0, taxTotal = 0,
insuranceTotal = 0, yearOnePrincipalTotal = 0, yearTwoPrincipalTotal = 0, yearThreePrincipalTotal = 0, yearFourPrincipalTotal = 0,
yearFivePrincipalTotal = 0, yearSixPrincipalTotal = 0, yearOneInterestTotal = 0, yearTwoInterestTotal = 0, yearThreeInterestTotal = 0,
yearFourInterestTotal = 0, yearFiveInterestTotal = 0, yearSixInterestTotal = 0, yearOneTaxAndInsTotal = 0, yearTwoTaxAndInsTotal = 0,
yearThreeTaxAndInsTotal = 0, yearFourTaxAndInsTotal = 0, yearFiveTaxAndInsTotal = 0, yearSixTaxAndInsTotal = 0, ii = 0,
interestTotalPercent = 0, principalTotalPercent = 0, taxAndInsuranceTotalPercent = 0, interestTotalGraphVal = 0, principalTotalGraphVal = 0,
PrincipalOwedYearlyVal = 0, taxAndInsuranceTotalGraphVal = 0; interestPrincipalTaxAndInsTotal = 0, interestYearlyVal = 0, principalYearlyVal = 0,
taxAndInsuranceYearlyVal = 0, yearlyInterestsTotals = 0, yearlyPymnt = 0;

   $("#datepickerCalc").datepicker({

       minDate: 0,
       onSelect: function (dateText, inst) {
           /*Datepicker*/
           var date;

           /*Get the day, month, and year from jQuery datepicker*/
           date = $("#datepickerCalc").datepicker('getDate');

           firstPymntMonth = date.getMonth() + 1,
    firstPymntDay = date.getDate(),
    firstPymntYear = date.getFullYear();
       }
   }).datepicker("setDate", "0");

   function resetAllFields() {
       $("#homeVal").val("");
       $("#downPymnt").val("");
       $("#annualInterestRt").val("");
       $("#numOfYears").val("");
       //$("#numOfYears").find(":selected").text("");
       $("#annualPropertyTx").val("");
       $("#annualPropertyIns").val("");
       $("#showAmort").hide();

       $("#propertyPayOffDate").val("");
       $("#monthlyPymntVal").val("");
       $("#monthlyinterestTtl").val("");
       $("#monthlyPrincipalTtl").val("");
       $("#taxAndInsuranceTtl").val("");
       $("#pmiMonthly").val("");
       $("#pmiTotal").val("");
       $("#totalPymnt").val("");
       $("#numOfmonths").val("");
       $("#numOfmonths").val("");
   }


   /*Reset all fields*/
   $("#resetBtn").click(function () {
       resetAllFields();
   });

      /*Format numbers*/                        
 /*  $('input').each(function(){
     $(this).val( $(this).val().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") );
    })
*/

   //Immediately invoked
   (function () {
       /*Rounded corners.*/
       //$("#Mainwrapper").corner("top wicked 35px");
       $("#Mainwrapper").corner("bottom 9px");
       $("#mortgageContainer").corner("top 7px");
       $("#mortgageGraphs").corner("bottom 7px");
       $("#wrapper").corner("7px");

       $(".dualPropertyText").corner("5px");
       $(".dualPropertyText").css({
           "padding": "2px",
           "margin": "3px",
           "border": "1px solid #edf0fd"
       });

       $(".dualPropertyTextMonthly").corner("5px");
       $(".dualPropertyTextMonthly").css({
           "padding": "2px",
           "margin": "2px",
           "padding-right": "0px",
           "background-color": "#f9fafb",
           "border": "1px solid #edf0fd",
           "width": "113px"
       });

       $(".dualPropertyTextBtn").corner("5px");
       $(".dualPropertyTextBtn").css({
           "padding": "2px",
           "margin": "3px",
           "margin-top": "13px",
           "background-color": "#2467a7",
           "width": "88px"
       });

       $(".dualPropertyTextAmortBtn").corner("5px");
       $(".dualPropertyTextAmortBtn").css({
           "padding": "2px",
           "margin": "1px",
           "margin-bottom": "10px",
           "background-color": "#2467a7"
       });

       $(".dualPropertyTextPrintBtn").corner("5px");
       $(".dualPropertyTextPrintBtn").css({
           "padding": "2px",
           "margin": "1px",
           "margin-top": "5px",
           "background-color": "#2467a7"
       });

       /*Set initial value for ii*/
       ii = 30 / 5;

       /*Lock monthly payment summaries textboxes */
       $('#monthlyPymnt input').attr('readonly', 'true');

       /*Format monthly payment summares textboxes*/
       $('#monthlyPymnt input').css({
           "padding": "4"
       });

       $('#calcMortgage input').css({
           "padding": "3"
       });

               /*Format numbers*/
        $('#monthlyPymnt input').each(function(){
           $(this).val( $(this).val().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") );
           })

              /*Format numbers*/
        /*$('#calcMortgage input').each(function(){
           $(this).val( $(this).val().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") );
           })*/

       
       $("#showAmort").hide();
       $(".dualPropertyTextAmortBtn").hide();

       /*Hide/show amortization table.*/
       $("#amortTblSect").css("display", "none");
       $("#printAmort").css("display", "none");
       $(".dualPropertyTextPrintBtn").css("display", "none");
       $("#showAmort").click(function () {
           $("#monthly").prop("checked", true);


           if (!$("#amortizationTbl > tr").length == "") {
               $("#amortizationTblAnnual").hide();
               $("#amortizationTbl").show();
               $("#printAmort").show();
               $(".dualPropertyTextPrintBtn").show();
           }

           $("#amortTblSect").toggle();

           if ($("#amortizationTbl").is(":hidden")) {
               $("#printAmort").hide();
               $(".dualPropertyTextPrintBtn").hide();
           }
       });

       /*Switch between monthly and annual amortizations*/
       $("#amortTblSectAnnual").css("display", "none");
       $('input:radio[name="annual"]').change(
       function () {
           if ($(this).val() == 'annualRb') {
               $("#amortizationTbl").hide();
               $("#amortizationTblAnnual").show();
           }
           else if ($(this).val() == 'monthlyRb') {
               $("#amortizationTblAnnual").hide();
               $("#amortizationTbl").show();
           }
       });
   } ());


   var originalValues = [];

   /*Textbox blur effect*/
   $("#calcMortgage input").focus(function () {

       if (!originalValues[this.id]) {
           originalValues[this.id] = $(this).val()
       }

       if ($(this).val() == originalValues[this.id]) {
           $(this).val('');
           $("#calculatemortgageBtn").val('Submit');
           $("#resetBtn").val('Reset');
       }
   });

   $("#calcMortgage input").blur(function () {
       if ($(this).attr("value") == "") {
           $(this).val(originalValues[this.id]);
       }
   });

   /*Set and compute mortgage values*/
   function computeMortgageValues() {
       var homeVal, downPymnt;

       /*Get the Down Payment, Loan Term (in years), Loan Start Date, Annual Interest Rate, Annual Property Tax, and Annual Property Insurance.*/
       homeVal = $("#homeVal").val();
       downPymnt = $("#downPymnt").val();
       annualInterestRate = $("#annualInterestRt").val();
       annualMortgageTerm = $("#numOfYears").val();
       //$("#numOfYears").find(":selected").val();
       annualPropertyTax = $("#annualPropertyTx").val();
       annualPropertyInsurance = $("#annualPropertyIns").val();

       /*Calculate Down Payment, Loan Amount, Annual Interest Rate, and PMI*/
       downPymnt = (downPymnt * homeVal) / 100.00;
       loanAmonut = homeVal - downPymnt;
       annualInterestRate = (annualInterestRate / 100) / 12;
       PMI = loanAmonut * .012;
       if ($("#downPymnt").val() > 10) {
           monthlyPMI = PMI / 12;
       }

       /*Calculate Annual Property Tax, Annual Property Insurance, Monthly Interest Paid, Monthly Payment, Monthly Principal Paid, and Monthly Principal Owed*/
       monthlyPropertyTax = annualPropertyTax / 12;
       monthlyPropertyInsurance = annualPropertyInsurance / 12;
       monthlyInterest = annualInterestRate * loanAmonut;
       interestYearlyVal = monthlyInterest;
       monthlyInterestsTotals = monthlyInterest;
       totalMonths = annualMortgageTerm * 12;
       monthlyPymnt = loanAmonut * annualInterestRate * ((Math.pow((1 + annualInterestRate), totalMonths)) / (Math.pow((1 + annualInterestRate), totalMonths) - 1));
       yearlyPymnt = monthlyPymnt * 12;
       taxAndInsuranceYearlyVal = ((monthlyPropertyTax * 12) + (monthlyPropertyInsurance * 12));
       monthlyPrincipalPaid = monthlyPymnt - monthlyInterest;
       principalYearlyVal = monthlyPrincipalPaid;
       monthlyPrincipalOwed = loanAmonut - monthlyPrincipalPaid;
   }

   computeMortgageValues();

   var data1, data3;
   $("#numOfYears").change(function () {
       annualMortgageTerm = $("#numOfYears").val();
       ii = 0;
       ii = annualMortgageTerm / 5;
   });


   var iii = totalMonths / 5;

   function updateChart() {
       for (var counter = 0; counter < totalMonths; counter++) {

           /*Monthly payment update*/
           monthlyInterest = annualInterestRate * monthlyPrincipalOwed;
           monthlyPrincipalPaid = monthlyPymnt - monthlyInterest;
           monthlyPrincipalOwed = monthlyPrincipalOwed - monthlyPrincipalPaid;

           interestTotalGraphVal += monthlyInterest;
           principalTotalGraphVal += monthlyPrincipalPaid;
           taxAndInsuranceTotalGraphVal += monthlyPropertyTax + monthlyPropertyInsurance;

           if (counter >= 0 && counter < iii) {
               yearOneInterestTotal += monthlyInterest;
               yearOnePrincipalTotal += monthlyPrincipalPaid;
               yearOneTaxAndInsTotal += monthlyPropertyTax + monthlyPropertyInsurance;
           }
           if (counter >= iii && counter < (iii * 2)) {
               yearTwoInterestTotal += monthlyInterest;
               yearTwoPrincipalTotal += monthlyPrincipalPaid;
               yearTwoTaxAndInsTotal += monthlyPropertyTax + monthlyPropertyInsurance;
           }
           if (counter >= (iii * 2) && counter < (iii * 3)) {
               yearThreeInterestTotal += monthlyInterest;
               yearThreePrincipalTotal += monthlyPrincipalPaid;

               yearThreeTaxAndInsTotal += monthlyPropertyTax + monthlyPropertyInsurance;
           }
           if (counter >= (iii * 3) && counter < (iii * 4)) {
               yearFourInterestTotal += monthlyInterest;
               yearFourPrincipalTotal += monthlyPrincipalPaid;
               yearFourTaxAndInsTotal += monthlyPropertyTax + monthlyPropertyInsurance;
           }
           if (counter >= (iii * 4) && counter < (iii * 5)) {
               yearFiveInterestTotal += monthlyInterest;
               yearFivePrincipalTotal += monthlyPrincipalPaid;
               yearFiveTaxAndInsTotal += monthlyPropertyTax + monthlyPropertyInsurance;
           }
       }

       monthlyInterest = annualInterestRate * loanAmonut;

       yearOneInterestTotal += monthlyInterest;
       yearTwoInterestTotal += monthlyInterest;
       yearThreeInterestTotal += monthlyInterest;
       yearFourInterestTotal += monthlyInterest;
       yearFiveInterestTotal += monthlyInterest;

       yearOnePrincipalTotal -= monthlyInterest;
       yearTwoPrincipalTotal -= monthlyInterest;
       yearThreePrincipalTotal -= monthlyInterest;
       yearFourPrincipalTotal -= monthlyInterest;
       yearFivePrincipalTotal -= monthlyInterest;

       interestTotalGraphVal += monthlyInterest;
       principalTotalGraphVal -= monthlyInterest;

       interestPrincipalTaxAndInsTotal = interestTotalGraphVal + principalTotalGraphVal + taxAndInsuranceTotalGraphVal;

       //data
       data1 = google.visualization.arrayToDataTable([
['Year', 'Principal', 'Interest', 'Tax & Insurance'],
[1 + "-" + (ii).toString(), yearOnePrincipalTotal, yearOneInterestTotal, yearOneTaxAndInsTotal],
[ii + "-" + (ii) * 2, yearTwoPrincipalTotal, yearTwoInterestTotal, yearTwoTaxAndInsTotal],
[(ii) * 2 + "-" + (ii) * 3, yearThreePrincipalTotal, yearThreeInterestTotal, yearThreeTaxAndInsTotal],
[(ii) * 3 + "-" + (ii) * 4, yearFourPrincipalTotal, yearFourInterestTotal, yearFourTaxAndInsTotal],
[(ii) * 4 + "-" + (ii) * 5, yearFivePrincipalTotal, yearFiveInterestTotal, yearFiveTaxAndInsTotal]
]);

       data3 = google.visualization.arrayToDataTable([
    ['Title', 'Percentages'],
    ['Principal', principalTotalGraphVal],
    ['Tax & insurance', taxAndInsuranceTotalGraphVal],
    ['Interest', interestTotalGraphVal]
  ]);

       yearOneInterestTotal = 0;
       yearTwoInterestTotal = 0;
       yearThreeInterestTotal = 0;
       yearFourInterestTotal = 0;
       yearFiveInterestTotal = 0;

       yearOnePrincipalTotal = 0;
       yearTwoPrincipalTotal = 0;
       yearThreePrincipalTotal = 0;
       yearFourPrincipalTotal = 0;
       yearFivePrincipalTotal = 0;

       yearOneTaxAndInsTotal = 0;
       yearTwoTaxAndInsTotal = 0;
       yearThreeTaxAndInsTotal = 0;
       yearFourTaxAndInsTotal = 0;
       yearFiveTaxAndInsTotal = 0;

       interestTotalGraphVal = 0;
       principalTotalGraphVal = 0;
       taxAndInsuranceTotalGraphVal = 0;
       interestPrincipalTaxAndInsTotal = 0;
   }


   incr = 30 / 5;
   google.load('visualization', '1', { packages: ['corechart'] });

   function drawVisualization() {
       //Some raw data
       var data = google.visualization.arrayToDataTable([
['Year', 'Principal', 'Interest', 'Tax & Insurance'],
[1 + "-" + (incr).toString(), 19695, 99638, 94750],
[incr + "-" + (incr) * 2, 11135, 81120, 21188],
[(incr) * 2 + "-" + (incr) * 3, 19857, 111167, 93797],
[(incr) * 3 + "-" + (incr) * 4, 19939, 91110, 98215],
[(incr) * 4 + "-" + (incr) * 5, 111136, 86991, 31166]
]);
       updateChart();

       var options = {
           title: 'Amortization Graph',
           colors: ['blue', '#C33E56', '#0a285d'],
           vAxis: { title: "Amount ($)" },
           hAxis: { title: "Years" },
           seriesType: "bars",
           width: "425",
           backgroundColor: "#f9fafb",
           series: { 4: { type: "line"} },
           animation: { duration: 1000, easing: "out" },
           chartArea: { left: 95, width: '50%' },
           position: "absolute"
       };
       var chart = new google.visualization.ComboChart(document.getElementById('graphOne'));
       chart.draw(data1, options);

       var data4 = google.visualization.arrayToDataTable([
    ['Title', 'Percentages'],
    ['Principal', 90000.00],
    ['Tax & insurance', 42750.00],
    ['Interest', 38108.57]
  ]);

       var optionst = {
           legend: 'none',
           title: 'Mortgage Payment Pie Chart Graph A',
           titleTextStyle: { color: 'black', fontName: 'Arial Bold', bold: true },
           colors: ['blue', '#C33E56', '#0a285d'],
           is3D: true,
           width: "290",
           height: "270",
           backgroundColor: '#f9fafb',
           chartArea: { top: 50, width: '70%', height: '70%' }
       };

       var chartt = new google.visualization.PieChart(document.getElementById('graphTwo'));
       chartt.draw(data4, optionst);


       $("#calculatemortgageBtn").click(function (e) {
           var isValid = true;

           $("#calcMortgage input").each(function () {
               if ($(this).val() < 0 || $.trim($(this).val()) == '' || isNaN($(this).val()) && !isNaN($("#datepickerCalc").val())) {
                   isValid = false;
                   $(this).css({
                       "border": "1px solid #FFCECE"
                   });
                   $("#calculatemortgageBtn").css({
                       "background": "#2467a7",
                       "border": ""
                   });
                   $("#resetBtn").css({
                       "background": "#2467a7",
                       "border": ""
                   });
                   $("#annualPropertyTx").css({
                       "background": "",
                       "border": ""
                   });
                   $("#annualPropertyIns").css({
                       "background": "",
                       "border": ""
                   });
               }
               else {
                   $(this).css({
                       "border": ""
                   });
                   $("#calculatemortgageBtn").css({
                       "background": "#2467a7",
                       "border": "#2467a7"
                   });
                   $("#resetBtn").css({
                       "background": "#2467a7",
                       "border": "#2467a7"
                   });

                   if ($("#annualPropertyTx").val() == '') {
                       $("#annualPropertyTx").val(0);
                   }
                   if ($("#annualPropertyIns").val() == '') {
                       $("#annualPropertyIns").val(0);
                   }
               }
           });

           if (isValid == false) {
               e.preventDefault();
           }
           else {
               $("#showAmort").show();
               $(".dualPropertyTextAmortBtn").show();
               computeMortgageValues();
               $("#amortizationTbl > tr").empty();
               computeMonthlyAmortization();
               computeMortgageValues();
               $("#amortizationTblAnnual > tr").empty();
               computeAnnualAmortization();

               computeMortgageValues();
               updateChart();
               chart.draw(data1, options);
               chartt.draw(data3, optionst);
           }
       });
   }
   google.setOnLoadCallback(drawVisualization);


   /*Update Monthly Interest Paid, Monthly Principal Paid, and Monthly Principal Owed*/
   function updateMonthlyPymnts() {

       /*Monthly payment update*/
       monthlyInterest = annualInterestRate * monthlyPrincipalOwed;
       monthlyPrincipalPaid = monthlyPymnt - monthlyInterest;
       monthlyPrincipalOwed -= monthlyPrincipalPaid;
       monthlyInterestsTotals += monthlyInterest;



       /*Totals for Monthly Interest, Monthly Principal, Annual Property Tax, Annual Property Insurance*/
       function sumMonthlyPymnts() {
           /*Monthly*/
           monthlyInterestsTotal += monthlyInterest;
           monthlyPrincipalsTotal += monthlyPrincipalPaid;
           taxTotal += monthlyPropertyTax;
           insuranceTotal += monthlyPropertyInsurance;
           totalPMI += monthlyPMI;

       }
       return sumMonthlyPymnts();
   }

   computeMortgageValues();

   /*Compute and display monthly view of amortization*/
   function computeMonthlyAmortization() {
       var tablearea = document.getElementById("amortTblSect"),
   amortTblSectTbl = document.getElementById("amortizationTbl"),
   selectedYear = firstPymntYear, Dates;

       d = $("#datepickerCalc").datepicker('getDate');
       month = d.getMonth() + 1,
              year = d.getFullYear();

       for (var months = 0; months < totalMonths; months++) {

           if (month >= 0 && month < 12) {

               Dates = monthsArr[month] + ", " + (year);
               month++;

               var tr = document.createElement("tr"), maxCol = 7, n = 0;

               while (n < maxCol) {
                   tr.appendChild(document.createElement("td"));
                   n++;
               }

               tr.cells[0].appendChild(document.createTextNode(Dates));
               tr.cells[1].appendChild(document.createTextNode("$ " + (monthlyPymnt + monthlyPropertyTax + monthlyPropertyInsurance).toFixed(2)));
               tr.cells[2].appendChild(document.createTextNode("$ " + monthlyInterest.toFixed(2)));
               tr.cells[3].appendChild(document.createTextNode("$ " + monthlyPrincipalPaid.toFixed(2)));
               tr.cells[4].appendChild(document.createTextNode("$ " + (monthlyPropertyTax + monthlyPropertyInsurance).toFixed(2)));
               tr.cells[5].appendChild(document.createTextNode("$ " + monthlyInterestsTotals.toFixed(2)));
               tr.cells[6].appendChild(document.createTextNode("$ " + monthlyPrincipalOwed.toFixed(2)));

               updateMonthlyPymnts();

               month == 12;
               if (month == 12) {
                   year++;
                   month = 0;
               }

               if (firstPymntMonth % 2 == 0) {
                   tr.style.backgroundColor = "#F5F5F5";
               }
               else {
                   tr.style.backgroundColor = "#FFF";
               }
           }
           amortTblSectTbl.appendChild(tr);
       }

       /*Update the year to the original which was selected.*/
       firstPymntYear = selectedYear;

       /*Add the table in this div*/
       tablearea.appendChild(amortTblSectTbl);

       computeTotalPymnts(Dates);

   }


   /*Compute and display annual view of amortization*/
   function computeAnnualAmortization() {
       var tableArea = document.getElementById("amortTblSect"),
   amortTblAnnual = document.getElementById("amortizationTblAnnual"),
   selectedYear = firstPymntYear, Dates, cnt = 0;

       d = $("#datepickerCalc").datepicker('getDate');
       month = d.getMonth() + 1,
              year = d.getFullYear() + 1;

       for (var years = 0; years < annualMortgageTerm; years++) {

           Dates = monthsArr[month] + ", " + (year);

           var tr = document.createElement("tr"), maxCol = 7, n = 0;

           while (n < maxCol) {
               tr.appendChild(document.createElement("td"));
               n++;
           }

           if (years == 0) {
               for (var i = 0; i < 11; i++) {
                   /*Monthly payment update*/
                   monthlyInterest = annualInterestRate * monthlyPrincipalOwed;
                   monthlyPrincipalPaid = monthlyPymnt - monthlyInterest;
                   monthlyPrincipalOwed = monthlyPrincipalOwed - monthlyPrincipalPaid;

                   interestYearlyVal += monthlyInterest;
                   principalYearlyVal += monthlyPrincipalPaid;
               }
           }
           else {
               for (var i = 0; i < 12; i++) {
                   /*Monthly payment update*/
                   monthlyInterest = annualInterestRate * monthlyPrincipalOwed;
                   monthlyPrincipalPaid = monthlyPymnt - monthlyInterest;
                   monthlyPrincipalOwed = monthlyPrincipalOwed - monthlyPrincipalPaid;

                   interestYearlyVal += monthlyInterest;
                   principalYearlyVal += monthlyPrincipalPaid;
               }
           }
           yearlyInterestsTotals += interestYearlyVal;

           tr.cells[0].appendChild(document.createTextNode(Dates));
           tr.cells[1].appendChild(document.createTextNode("$ " + (yearlyPymnt + taxAndInsuranceYearlyVal).toFixed(2)));
           tr.cells[2].appendChild(document.createTextNode("$ " + interestYearlyVal.toFixed(2)));
           tr.cells[3].appendChild(document.createTextNode("$ " + principalYearlyVal.toFixed(2)));
           tr.cells[4].appendChild(document.createTextNode("$ " + (taxAndInsuranceYearlyVal).toFixed(2)));
           tr.cells[5].appendChild(document.createTextNode("$ " + yearlyInterestsTotals.toFixed(2)));
           tr.cells[6].appendChild(document.createTextNode("$ " + monthlyPrincipalOwed.toFixed(2)));

           cnt++;

           interestYearlyVal = 0;
           principalYearlyVal = 0;
           PrincipalOwedYearlyVal = 0;

           year++;

           if (years % 2 == 0) {
               tr.style.backgroundColor = "#F5F5F5";
           }
           else {
               tr.style.backgroundColor = "#FFF";
           }
           amortTblAnnual.appendChild(tr);
       }

       /*Update the year to the original which was selected.*/
       firstPymntYear = selectedYear;

       /*Add the table in this div*/
       tableArea.appendChild(amortTblAnnual);

       interestYearlyVal = 0;
       principalYearlyVal = 0;
       PrincipalOwedYearlyVal = 0;
       yearlyInterestsTotals = 0;
   }

   /*Find the totals of mortgage payments and display them in the browser*/
   function computeTotalPymnts(dt) {
       var PymntsTotal = 0, taxesAndInsuranceTotal = 0;

       /*Monthly*/
       monthlyInterest = annualInterestRate * loanAmonut;
       monthlyInterestsTotal += monthlyInterest;
       monthlyPrincipalsTotal -= monthlyInterest;
       taxesAndInsuranceTotal = taxTotal + insuranceTotal;
       PymntsTotal = monthlyInterestsTotal + monthlyPrincipalsTotal + taxesAndInsuranceTotal;

       function setMortgageValues() {

           /*Monthly payment*/
           $("#propertyPayOffDate").val(dt);
           $("#monthlyPymntVal").val('$ ' + (monthlyPymnt + monthlyPropertyTax + monthlyPropertyInsurance).toFixed(2));
           $("#monthlyinterestTtl").val('$ ' + monthlyInterestsTotal.toFixed(2));
           $("#monthlyPrincipalTtl").val('$ ' + monthlyPrincipalsTotal.toFixed(2));
           $("#taxAndInsuranceTtl").val('$ ' + taxesAndInsuranceTotal.toFixed(2));

           $("#pmiMonthly").val('$ ' + monthlyPMI.toFixed(2));
           $("#pmiTotal").val('$ ' + totalPMI.toFixed(2));
           $("#totalPymnt").val('$ ' + PymntsTotal.toFixed(2));
           $("#numOfmonths").empty();
           $("#numOfmonths").text(totalMonths);

           function resetMortgageValues() {
               taxTotal = 0;
               PymntsTotal = 0;
               monthlyPymnt = 0;
               insuranceTotal = 0;
               monthlyInterestsTotal = 0;
               monthlyPrincipalsTotal = 0;
               taxesAndInsuranceTotal = 0;
               totalPMI = 0;
           }
           return resetMortgageValues();
       }
       return setMortgageValues();
   }

} ());
