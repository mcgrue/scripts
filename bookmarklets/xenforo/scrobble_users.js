
javascript:(function() {

	function rejectEverythingByDefault() {
		/* set everything to reject by default */
	    var radioButtons = document.querySelectorAll('.Disabler[type="radio"]');
	    for (var i = 0; i < radioButtons.length; i++) {
	        radioButtons[i].checked = true;
	    }
	}

    function uncheckAllNotificationsByDefault() {
	    /* get a set of all the labels containing this text */
		var labelText = "Notify user if action was taken";
		var labelElements = Array.from(document.querySelectorAll('label')).filter(function(label) {
		    return label.textContent.includes(labelText);
		});
		/* uncheck them all */
		for (var i = 0; i < labelElements.length; i++) {
		    var label = labelElements[i];
		    var checkbox = label.querySelector('input[type="checkbox"]');

		    if (checkbox !== null) {
		        checkbox.checked = false;
		    }
		}
	}

	function collectAllPotentiallyValidEmails() {
		var whitelistedEmailProviders = ['@gmail.', '@hotmail.', '@outlook.', '@apple.', '@yahoo.', '@msn.', '@protonmail.', '@mail.'];

		var ddElements = document.querySelectorAll('dd');

		var matchingTextContent = [];

		for (var i = 0; i < ddElements.length; i++) {
		    var dd = ddElements[i];
		    var text = dd.textContent;

		    if (whitelistedEmailProviders.some(function(literal) {
		        return text.includes(literal);
		    })) {
		        matchingTextContent.push(text.trim());
		    }
		}

		return matchingTextContent;
	}

	function filterEmailsForTooManyDots(inputArray) {
		var filteredArray = inputArray.filter(function(entry) {
		    var email = entry.match(/\S+@\S+/);

		    if (email) {
		        var username = email[0].split('@')[0];
		        var periodCount = (username.match(/\./g) || []).length;
		        return periodCount <= 2;
		    } else {
		        return true;
		    }
		});

		return filteredArray;
	}

	function clickSubmitIfNothingToDo() {
		var submitButton = document.querySelector('input[type="submit"][value="Process Users"]');

		if (submitButton) {
		    submitButton.click();
		} else {
		    alert("Submit button with the value 'Process Users' not found.");
		}
	}

	
	function correctPageValidator() {
	    var expectedURL = 'https://community.gaslampgames.com/admin.php?users/moderated';
	    var currentURL = window.location.href;
	    
	    if (currentURL !== expectedURL) {
	        alert('You are on the wrong page. You will be redirected to the correct page.');
	        window.location.href = expectedURL;
	    } else {
	        return true;
	    }
	};

	if( correctPageValidator() ) {
		rejectEverythingByDefault();
		uncheckAllNotificationsByDefault();
		var realWork = filterEmailsForTooManyDots(collectAllPotentiallyValidEmails());
	
		if(realWork.length == 0) {
			clickSubmitIfNothingToDo();
		} else {
			var msg = "Please manually review these emails: \n\n" + realWork.join('\n');
			alert(msg);
		}
	}
})();
