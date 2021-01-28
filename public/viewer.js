window.onload = function() {
    const useNodeJS = true;   // if you are not using a node server, set this value to false
    const defaultLiffId = "";   // change the default LIFF value if you are not using a node server

    // DO NOT CHANGE THIS
    let myLiffId = "";

    // if node is used, fetch the environment variable and pass it to the LIFF method
    // otherwise, pass defaultLiffId
    if (useNodeJS) {
        fetch('/send-id')
            .then(function(reqResponse) {
                return reqResponse.json();
            })
            .then(function(jsonResponse) {
                myLiffId = jsonResponse.id;
                initializeLiffOrDie(myLiffId);
            })
            .catch(function(error) {
                document.getElementById("viewerContent").classList.add('hidden');
                document.getElementById("nodeLiffIdErrorMessage").classList.remove('hidden');
            });
    } else {
        myLiffId = defaultLiffId;
        initializeLiffOrDie(myLiffId);
    }
};

/**
* Check if myLiffId is null. If null do not initiate liff.
* @param {string} myLiffId The LIFF ID of the selected element
*/
function initializeLiffOrDie(myLiffId) {
    if (!myLiffId) {
        document.getElementById("viewerContent").classList.add('hidden');
        document.getElementById("liffIdErrorMessage").classList.remove('hidden');
    } else {
        initializeLiff(myLiffId);
    }
}

/**
* Initialize LIFF
* @param {string} myLiffId The LIFF ID of the selected element
*/
function initializeLiff(myLiffId) {
    liff
        .init({
            liffId: myLiffId
        })
        .then(() => {
            // start to use LIFF's api
            initializeApp();
        })
        .catch((err) => {
            document.getElementById("viewerContent").classList.add('hidden');
            document.getElementById("liffInitErrorMessage").classList.remove('hidden');
        });
}

/**
 * Initialize the app by calling functions handling individual app components
 */
function initializeApp() {
    registerButtonHandlers();
    processFile()
    // check if the user is logged in/out, and disable inappropriate button
}

/**
* Register event handlers for the buttons displayed in the app
*/
function registerButtonHandlers() {

    // add comment
    document.getElementById('addCommentsButton').addEventListener('click', function() {
        if (!liff.isInClient()) {
            sendAlertIfNotInClient();
        } else {
            liff.sendMessages([{
                'type': 'text',
                'text': 'Comment added : ' + document.getElementById("commentText").value
            }]).then(function() {
                window.alert('Message sent');
                document.getElementById('commentText').innerHTML = "";
            }).catch(function(error) {
                window.alert('Error sending message: ' + error);
            });
        }
    });

    document.getElementById('closeWindowButton').addEventListener('click', function() {
        if (!liff.isInClient()) {
            sendAlertIfNotInClient();
        } else {
            liff.closeWindow();
        }
    });
}

function processFile()
  {
    var parameters = location.search.substring(1).split("&");
    if(parameters.length!=0)
    {
        var temp = parameters[0].split("=");
        val = unescape(temp[1]);
        if(hashMap.has(val))
        {
            l = hashMap.get(val);
            var fileViewer = document.getElementById("embedView");
            var clone = fileViewer.cloneNode(true);
            clone.setAttribute('src',l);
            fileViewer.parentNode.replaceChild(clone,fileViewer)
            document.getElementById("objectView").data = l;
            // document.getElementById("fileLink").href = l;
        }
    }
  }

  var hashMap = new Map([
    ["cryptography", "https://drive.google.com/file/d/0B61QNFCgSgUtMXRpQmlvRVF2aWc/preview"],
    ["spectrometry", "https://drive.google.com/file/d/14JDA5g73CEHSi1UeTpNdrQu8kLnGAVar/preview"],
    ["python", "https://drive.google.com/file/d/1y5paUXFSaex7yUNdVne3ggV6Kw8tjZUl/preview"],
    ["developer_guide", "https://drive.google.com/file/d/1WejH9ga1DVw1Vg88Zg7wKtmdNHYlJ9oM/preview"],
    ["polymer", "https://drive.google.com/file/d/1X1PujdXBLXpTBhCnCsCAFYmAhbAl1dke/preview"],
    ["stephen_covey", "https://drive.google.com/file/d/1WsXtPFH7lAcxHJBAvE6IJW3bPNJoMeUT/preview"]
]);
