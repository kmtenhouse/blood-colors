$(document).ready(function () {

    displayAllTiers();

//    $(document).on("mouseover", ".colorbox", createDropDown);


function displayAllTiers() {
    $.get("/api/tiers", function (results) {
        Window.allTiers = results.map(tier => ({_id: tier._id, name: tier.name}));
       
        //Create a tier for each result we have
        for (var i = 0; i < results.length; i++) {
            var currentTier = results[i];
            displayOneTier(currentTier, $("#spectrum"));
        }
    })
        .fail(function (err) {
            $("#spectrum").append(`<div>Sorry, the color service is unavailable at this time. Please try again later.</div>`)
            console.log(err);
        });
}

//Renders a tier and attaches it to a target
function displayOneTier(currentTier, target) {
    //Create and append the header
    var tierBox = $("<div>").addClass("tier").attr("id", currentTier._id);
    var tierHeader = $("<div>").addClass("tier__header");
    //Standardize the color for the heading
    if (currentTier.displayColor && isValidColor(currentTier.displayColor.hex) && isValidColor(currentTier.displayColor.contrastColor)) {
        tierHeader.css("background-color", currentTier.displayColor.hex);
        tierHeader.css("color", currentTier.displayColor.contrastColor);
    }
    //Add a name for the tier (if available)
    var displayName = (currentTier.name ? currentTier.name.charAt(0).toUpperCase() + currentTier.name.slice(1).toLowerCase() : '');
    var tierH2 = $("<h2>").addClass("tier__title").text(displayName);
    tierHeader.append(tierH2);
    //Append the header
    tierBox.append(tierHeader);

    //Create and append the existing colors
    var tierCollection = $("<div>").addClass("tier__collection").attr("id", "pallette-" + currentTier._id).text("Loading...");
    tierBox.append(tierCollection);
    target.append(tierBox);
    //Kick off the download of the colors
    displayPallette(currentTier._id);
}

function displayPallette(tierID) {
    var currentPallette = $(`#pallette-${tierID}`);

    $.get(`/api/tiers/${tierID}`, function (results) {
        currentPallette.text("");
        //create a colorBox for each result we have
        for (var i = 0; i < results.colors.length; i++) {
            var currentColor = results.colors[i];
            var newColorBox = createColorBox(currentColor, tierID);
            currentPallette.append(newColorBox);
        }
    })
        .fail(function (err) {
            currentPallette.append(`<div>Sorry, the color service is unavailable at this time. Please try again later.</div>`)
            console.log(err);
        });
}

function createColorBox(colorInfo, tierID) {
    //define the style for this particular colorbox
    var colorBox = $("<div>").addClass("colorbox");
    var colorLabels = $("<ul>").addClass("colorbox__info");

    if (isValidColor(colorInfo.hex) && isValidColor(colorInfo.contrastColor)) {
        colorBox.css("background-color", colorInfo.hex);
        colorBox.css("color", colorInfo.contrastColor);
        var hexLabel = $("<li>").addClass("colorbox__label").text(colorInfo.hex).css("color", colorInfo.contrastColor);
        colorLabels.append(hexLabel);
    }

    if (typeof colorInfo.name === "string") {
        var nameLabel = $("<li>").addClass("colorbox__label").text(colorInfo.name).css("color", colorInfo.contrastColor);
        colorLabels.append(nameLabel);
    }

    if(Window.allTiers && Window.allTiers.length > 0) {
        var dropDownLabel = $("<li>").addClass("colorbox__label");
        var select = $("<select>").addClass("colorbox__select");
        for(let i = 0; i < Window.allTiers.length; i++) {
            var option = $("<option>").text(Window.allTiers[i].name).val(Window.allTiers[i]._id);
            if(tierID===Window.allTiers[i]._id) {
                option.prop("selected", true);
            }
            select.append(option);
        }
        dropDownLabel.append(select);
        colorLabels.append(dropDownLabel);
    }

    colorBox.append(colorLabels);
    return colorBox;
}

function isValidColor(str) {
    return /^#?[0-9a-fA-F]{6}$/.test(str);
}

});