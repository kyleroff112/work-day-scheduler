$(function () {
  console.log("ready!");
  // Get the current hour
  const currentHour = new Date().getHours();

  // Get saved data from local storage
  const savedData = JSON.parse(localStorage.getItem("scheduleData")) || {};

  // Update the description in local storage when the save button is clicked
  $(".saveBtn").click(function () {
    const parentBlock = $(this).parent();
    const id = parentBlock.attr("id");
    const textarea = parentBlock.find("textarea");
    const description = textarea.val();
    savedData[id] = description;
    localStorage.setItem("scheduleData", JSON.stringify(savedData));
  });

  // Apply past, present, or future class to each time block based on the current hour
  $(".time-block").each(function () {
    const id = $(this).attr("id");
    const hour = parseInt(id.split("-")[1]);
    if (hour < currentHour) {
      $(this).removeClass();
      $(this).addClass("row time-block past");
    } else if (hour === currentHour) {
      $(this).removeClass();
      $(this).addClass("row time-block present");
    } else {
      $(this).removeClass();
      $(this).addClass("row time-block future");
    }
  });

  // Populate textareas with saved data
  Object.entries(savedData).forEach(([id, description]) => {
    const textarea = $(`#${id} textarea`);
    textarea.val(description);
  });

  // Display the current date in the header of the page
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  $("#currentDay").text(currentDate);
});

