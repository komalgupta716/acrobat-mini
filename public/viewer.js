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
    processUser()
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
                'text': document.getElementById("commentText").value
            }]).then(function() {
                window.alert('Message sent');
            }).catch(function(error) {
                window.alert('Error sending message: ' + error);
            });
        }
    });

    // // get profile call
    // document.getElementById('getProfileButton').addEventListener('click', function() {
    //     liff.getProfile().then(function(profile) {
    //         document.getElementById('userIdProfileField').textContent = profile.userId;
    //         document.getElementById('displayNameField').textContent = profile.displayName;

    //         const profilePictureDiv = document.getElementById('profilePictureDiv');
    //         if (profilePictureDiv.firstElementChild) {
    //             profilePictureDiv.removeChild(profilePictureDiv.firstElementChild);
    //         }
    //         const img = document.createElement('img');
    //         img.src = profile.pictureUrl;
    //         img.alt = 'Profile Picture';
    //         profilePictureDiv.appendChild(img);

    //         document.getElementById('statusMessageField').textContent = profile.statusMessage;
    //         toggleProfileData();
    //     }).catch(function(error) {
    //         window.alert('Error getting profile: ' + error);
    //     });
    // });
}

function processUser()
  {
    var parameters = location.search.substring(1).split("&");
    if(parameters.length!=0)
    {
        var temp = parameters[0].split("=");
        l = unescape(temp[1]);
        document.getElementById("embedView").data = l;
        document.getElementById("objectView").data = l;
        document.getElementById("fileLink").href = l;
        document.getElementById("text").innerHTML = l;
    }
    // document.getElementById("embedView").src = l;
  }
