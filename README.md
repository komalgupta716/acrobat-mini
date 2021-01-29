# LIFF Acrobat Mini starter app

This is a small web application that demonstrates the basic functionality of the [LINE Front-end Framework (LIFF)](https://developers.line.biz/en/docs/liff/overview/).

This has been designed to conduct a lab session on LINE Mini App development

### What you'll need

| Item | Description |
| ---- | ----------- |
| LINE Login channel | A LINE Login channel forms the connection between your app and LINE Login. Create a channel on the [LINE Developers Console](https://developers.line.biz/console/register/messaging-api/channel/). |
| Heroku account (optional) | [Heroku](https://www.heroku.com) is a cloud service that lets you deploy and serve web apps. You don't need a Heroku account if you're [deploying the app on another platform](#deploy-the-app-using-any-other-server-platform). |


## Customize the app and deploy it on Heroku via the terminal

Follow the below instructions to deploy your customized app using Heroku and Node.js.

### Install the app on your local machine

1. Make sure you have the following installed.

    - [Git](https://git-scm.com/)
    - [Node.js](https://nodejs.org/en/)
    - Items listed [here](#what-youll-need)

2. Clone the [line-liff-starter](https://github.com/komalgupta716/acrobat-mini.git) GitHub repository.

    ```shell
    git clone https://github.com/komalgupta716/acrobat-mini.git
    ```
3. `cd` into `acrobat-mini` directory.

4. Install the dependencies by running:
    ```shell
    $ npm install
    ```

### Link your local repository to Heroku

1. Log in to Heroku from the command line.

    ```shell
    $ heroku login
    ```

2. Create a named Heroku app.

    ```shell
    $ heroku create {Heroku app name}
    ```

3. Take a note of your app's URL (`https://{Heroku app name}.herokuapp.com`). You'll need it when you add the app to LIFF.

4. Add a remote for Heroku to your local repository.

    ```shell
    $ heroku git:remote -a {Heroku app name}
    ```

### Add the starter app to LIFF

1. In the **LINE Developers Console**, select the LINE Login channel to which you want to add the LIFF app and click the LIFF tab.
2. Click **shareTargetPicker**, carefully read the displayed contents and check I have read and agree to the Agreement Regarding Use of Information, then click Enable.
3. Enter the Endpoint URL - The URL of the LIFF web app (e.g. https://{Heroku app name}.herokuapp.com). This URL will be used when the LIFF app is launched using the LIFF URL.
4. Locate the **Scope** option and click the **Edit** button. Click the **View all** option, enable `chat_message.write`. This scope is required for the LIFF app to send messages on behalf of the user.
5. Take a note of your LIFF ID, because you'll need it for the next part. The LIFF ID is the final part of the **LIFF URL** shown in the console: `https://liff.line.me/{liffId}`.
6. Click the **View all** option, enable `chat_message.write`. This scope is required for the LIFF app to send messages on behalf of the user.

### Customize and deploy the app via terminal

1. Set your LIFF ID using an environment variable.

    ```shell
    heroku config:set MY_LIFF_ID={liffId}
    ``` 

2. Run the app locally to preview your changes:

    ```shell
    heroku local
    ```
   View the app by browsing to [localhost:5000](http://localhost:5000/).
   Connect to USA VPN for LIFF initialization.

3. If you're happy with your changes, stage, commit, and deploy the app.

    ```shell
    $ git add .
    $ git commit -m "My first commit"
    $ git push heroku master
    ```
    
4. Browse to your app's URL (`https://{Heroku app name}.herokuapp.com`) and confirm that your app is operational. You should see a list of files and should be able to open them. The Share button will not be functional at this stage.


## Trying the app

### Try the app in LINE

You can open your LIFF app in LINE by creating a simple link from any chat:

1. In any LINE chat, type `https://liff.line.me/{liffId}` and send the message. (For example, if your LIFF ID is `123456789`, send the message `https://liff.line.me/123456789`.)
2. Tap the link in your own message.
3. Agree to grant the required permissions to the LIFF app.

### Try the app in your browser

To open your LIFF app in your browser, enter the app's Heroku URL: `https://{Heroku app name}.herokuapp.com`


## Add Share and Commenting 
1. Uncomment code in liff-starter.js given under Step 1 to enable Share buttons. Add your liff Id.
2. Uncomment code in viewer.html given under Step 2(a) to display Add Comment option.
3. Uncomment code in Step 2(b) to enable sending comments to chats.
