
javascript:(function() {  

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

    function clickSubmitIfNothingToDo() { 
        var submitButton = document.querySelector('input[type="submit"][value="Process Users"]');  
        if (submitButton) {     submitButton.click(); } 
        else {     alert("Submit button with the value 'Process Users' not found."); }
    }  

    if(correctPageValidator())
    {
        clickSubmitIfNothingToDo();      
    }
})();
