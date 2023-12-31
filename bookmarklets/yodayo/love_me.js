javascript:(function() {

    function doThing() {
        var svgAttributeD = 'M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5';

        var n=0;
        var svgElements = document.querySelectorAll('svg');
        for (var i = 0; i < svgElements.length; i++) {
            var svgElement = svgElements[i];
            var pathElements = svgElement.querySelectorAll('path');
            
            var fill = svgElement.getAttribute('fill');

            if( fill === 'none')
            {
                for (var j = 0; j < pathElements.length; j++) {
                    var pathElement = pathElements[j];
                    var dAttribute = pathElement.getAttribute('d');
                    
                    if (dAttribute && dAttribute == svgAttributeD) {
                        console.log("fill is none: ", svgElement);
                        svgElement.parentElement.click();
                        console.log("click!", svgElement.parentElement);
                        return svgElement.parentElement;
                    }
                }
            }
        }

        return false;
    }

    function startInterval() {
        var interval = setInterval(function() {
            if (!doThing()) {
                clearInterval(interval);
                alert('Done clicking!');
            }
        }, Math.random() * 500 + 500);
    }

    startInterval()
})();
