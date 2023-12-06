//Ariana Brown ariana_brown@student.uml.edu

var generateTable = false;
var currentTab = 1;

// Function to create a multiplication table based on user input
function createNewTable(event) {
    // Retrieve input values for minimum and maximum rows and columns
    let minrow = parseInt(document.getElementById("minrow").value);
    let maxrow = parseInt(document.getElementById("maxrow").value);
    let mincolumn = parseInt(document.getElementById("mincolumn").value);
    let maxcolumn = parseInt(document.getElementById("maxcolumn").value);
  
    // Calculate the number of rows and columns
    var column = maxcolumn - mincolumn;
    var row = maxrow - minrow;
  
    // Log input values and calculated rows/columns for debugging
    // console.log("Min Row:", minrow);
    // console.log("Max Row:", maxrow);
    // console.log("Calculated Row:", row);
    // console.log("Min Column:", mincolumn);
    // console.log("Max Column:", maxcolumn);
    // console.log("Calculated Column:", column);
  
    // Validate input values for rows
    if (minrow > maxrow) {
      document.querySelector(".rowerror").innerHTML = "Enter a value between -50 and 50. The minimum value should be less than or equal to the maximum.";
      document.querySelector(".rowerror").style.display = "block";
      return false;
    }
    document.querySelector(".rowerror").innerHTML = "";
  
    // Validate input values for columns
    if (mincolumn > maxcolumn) {
      document.querySelector(".colerror").innerHTML = "Enter a value between -50 and 50. The minimum value should be less than or equal to the maximum.";
      document.querySelector(".colerror").style.display = "block";
      return false;
    }

    document.querySelector(".colerror").innerHTML = "";
  
    // Initialize the HTML variable for constructing the table
    var html = "<thead><tr> <th id=\"brick\"></th>";
  
    // Generate table header with row values
    for (var x = minrow; x <= maxrow; x++) {
      html += "<th>" + x + "</th>";
    }
    html += "</tr></thead><tbody> ";
  
    // Generate table body with multiplication values
    for (var x = mincolumn; x <= maxcolumn; x++) {
      html += "<tr><th>" + x + "</td>";
  
      for (var y = minrow; y <= maxrow; y++) {
        html += "<td>" + x * y + "</td>";
      }
  
      html += "</tr>";
    }
    html += "</tbody>";
  
    var tabTotal = $("div#tabs ul li").length;

    // Set the innerHTML of the target element to the generated HTML
    document.getElementById("mult_table" + tabTotal).innerHTML = html;
    generateTable = true;
  }

  //Label data
  function updateTable(event) {
    let mincolumn = parseInt(document.getElementById("mincolumn").value);
    let maxcolumn = parseInt(document.getElementById("maxcolumn").value);
    let minrow = parseInt(document.getElementById("minrow").value);
    let maxrow = parseInt(document.getElementById("maxrow").value);
  
  
    var column = maxcolumn - mincolumn;
    var row = maxrow - minrow;

    // Checks for valid columns
    if (mincolumn > maxcolumn){ 
      document.querySelector(".colerror").innerHTML = "Maximum column value should be larger than the minimum column value.";
      document.querySelector(".colerror").style.display = "block";
      return false;
    }
    document.querySelector(".colerror").innerHTML = "";

   // Checks for valid rows
    if (minrow > maxrow){ 
      document.querySelector(".rowerror").innerHTML = "Maximum row value should be larger than the minimum row value.";
      document.querySelector(".rowerror").style.display = "block";
      return false;
    }
    document.querySelector(".rowerror").innerHTML = "";
  
    var html = "<thead> <tr> <th id=\"brick\"> </th>";

    for (var x = minrow; x <= maxrow ;x++) {
      html += "<th>" + x + "</th>";
    }
    html += "</tr> </thead> <tbody> ";

    for (var x = mincolumn; x <= maxcolumn; x++){
      html += "<tr> <th>" + x + "</td>";
  
        for(var y = minrow; y <= maxrow; y++){
          html += "<td>" + x*y + "</td>";
        }
  
      html += "</tr>";
    }
    html += "</tbody>";
  
    //table update html
    document.getElementById("mult_table" + currentTab).innerHTML=html;
    generateTable = true;
  }
  

// code executes only after the DOM has fully loaded
$(document).ready(function(){
    // Validate form using jQuery
    $("#column_row").validate({
      rules:{
        // Validation rules for minimum rows input
        minrow:{
            required: true,
            int_check: true,
            range: [-50, 50]
        },
        // Validation rules for maximum rows input
        maxrow:{
            required: true,
            int_check: true,
            range: [-50, 50]
        },
        // Validation rules for minimum columns input
        mincolumn:{
            required: true,
            int_check: true,
            range: [-50, 50]
        },
        // Validation rules for maximum columns input
        maxcolumn:{
            required: true,
            int_check: true,
            range: [-50, 50]
        }
      },
      messages:{
        // Error messages for minimum rows input
        minrow:{
          range: "Enter a value between -50 and 50. The minimum value should be less than or equal to the maximum."
        },
        // Error messages for maximum rows input
        maxrow:{
          range: "Enter a value between -50 and 50. The minimum value should be less than or equal to the maximum."
        },
        // Error messages for minimum columns input
        mincolumn:{
          range: "Enter a value between -50 and 50. The minimum value should be less than or equal to the maximum."
        },
        // Error messages for maximum columns input
        maxcolumn:{
          range: "Enter a value between -50 and 50. The minimum value should be less than or equal to the maximum."
        }
      }
    });
});

// Custom validation method for checking if a value is a valid integer
jQuery.validator.addMethod("int_check", function(value, element) {
    return this.optional(element) || (Number.isInteger(parseFloat(value)));
}, "Enter a valid int.");

$(document).on('mouseup keyup', function () { // dynamically updates tables and activates button
  currentTab = $("#tabs").tabs('option', 'active') + 1;
  // console.log(currentTab);
  if ($('#column_row').validate().checkForm()) {
    $('#button').prop('disabled', false);
    if(generateTable) {
      updateTable(currentTab);
    }
  }
  else {
    $('#button').prop('disabled', true);
  }
});

// Set up sliders for input fields
$(function () {
    // Initialize sliders for column-related inputs
    $("#slider_one").slider({
      min: -50, max: 50, step: 1, value: 0,
      // Update corresponding input field when slider is moved
      slide: function(event, ui) {
        $("#minrow").val(ui.value);
      }
    });
  
    // Initialize sliders for column-related inputs
    $("#slider_two").slider({
      min: -50, max: 50, step: 1, value: 0,
      // Update the corresponding input field when the slider is moved
      slide: function(event, ui) {
        $("#maxrow").val(ui.value);
      }
    });
  
    // Initialize sliders for row-related inputs
    $("#slider_three").slider({
      min: -50, max: 50, step: 1, value: 0,
      // Update the corresponding input field when the slider is moved
      slide: function(event, ui) {
        $("#mincolumn").val(ui.value);
      }
    });
  
    // Initialize sliders for row-related inputs
    $("#slider_four").slider({
      min: -50, max: 50, step: 1, value: 0,
      // Update the corresponding input field when the slider is moved
      slide: function(event, ui) {
        $("#maxcolumn").val(ui.value);
      }
    });
  
    // Set initial values for corresponding input fields
    var first_val = $("#slider_one").slider("option", "value");
    $("#minrow").val(first_val);
    $("#maxrow").val(first_val);
    $("#mincolumn").val(first_val);
    $("#maxcolumn").val(first_val);
  
    // Handle changes in input fields and update sliders
    $("#minrow").change(function() {
      var before_value = $("#slider_one").slider("option", "value");
      var current_value = $(this).val();
      // Validate input and update either the input or the slider
      if (isNaN(current_value) || current_value < -50 || current_value > 50) {
        $("#minrow").val(before_value);
      } else {
        $("#slider_one").slider("option", "value", current_value);
      }
    });
    // Handle changes in input fields and update sliders
    $("#maxrow").change(function() {
        var before_value = $("#slider_two").slider("option", "value");
        var current_value = $(this).val();
        // Validate input and update either the input or the slider
        if (isNaN(current_value) || current_value < -50 || current_value > 50) {
          $("#maxrow").val(before_value);
        } else {
          $("#slider_two").slider("option", "value", current_value);
        }
    });
    // Handle changes in input fields and update sliders
    $("#mincolumn").change(function() {
        var before_value = $("#slider_three").slider("option", "value");
        var current_value = $(this).val();
        // Validate input and update either the input or the slider
        if (isNaN(current_value) || current_value < -50 || current_value > 50) {
          $("#mincolumn").val(before_value);
        } else {
          $("#slider_three").slider("option", "value", current_value);
        }
    });
    // Handle changes in input fields and update sliders
    $("#maxcolumn").change(function() {
        var before_value = $("#slider_four").slider("option", "value");
        var current_value = $(this).val();
        // Validate input and update either the input or the slider
        if (isNaN(current_value) || current_value < -50 || current_value > 50) {
          $("#maxcolumn").val(before_value);
        } else {
          $("#slider_four").slider("option", "value", current_value);
        }
    });

  });
  
  $(document).ready(function() { // tabs
    $("div#tabs").tabs();
  
    $("button#button").click(function() {
  
      var num_tabs = $("div#tabs ul li").length + 1;
  
      $("div#tabs ul").append(
        "<li><a href='#tab" + num_tabs + "'>" +
        $("#mincolumn").val() + " to " +
        $("#maxcolumn").val() + " by " +
        $("#minrow").val() + " to " +
        $("#maxrow").val() + "</a></li>"
      );
      $("div#tabs").append(
        "<div id='tab" + num_tabs + "'>#" + num_tabs + 
        "<table id='mult_table" + num_tabs + "'>" + "</table>" +
        "</div>"
      );
  
      $("div#tabs").tabs("refresh");
      createNewTable();
      $("div#tabs").tabs("refresh");
    });
  
    $("button#remove-tab").click(function() {
      var tabId = "#tab" + $("#tabremove").val();
      console.log(tabId);
      // Remove the panel
      $(tabId).remove();
      // Refresh the tabs widget
      $("div#tabs").tabs("refresh");
  
      // Remove the tab
      var href = "a[href='" + tabId + "']";
      $(href).closest("li").remove();
      $(href).closest("div").remove();
      $("div#tabs").tabs("refresh");
    });
  
    $("button#destroy").click(function() {
      var num_tabs = $("div#tabs ul li").length + 1;
      for (var i = 0; i < num_tabs; i++) {
        var tabId = "#tab" + i;
  
        // Remove the panel
        $(tabId).remove();
        // Refresh the tabs widget
        $("div#tabs").tabs("refresh");
  
        // Remove the tab
        var href= "a[href='" + tabId + "']";
        $(href).closest("li").remove();
        $(href).closest("div").remove();
        $("div#tabs").tabs("refresh");
      }
      TABINDEX = 1;
    });
});
//Sources used: class lectures/slides, W3Schools, graphicmama.com for color palette, previous self-learning