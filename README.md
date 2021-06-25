# Getting Started

0. Install the Atlassian SDK
1. Create a Hello-World Plugin project
2. Modify the plugin
3. Modify using QuickReload
 
Congrats, you have successfully created an Atlassian Plugin!

## Command line arguments

Here are the SDK commands you'll use immediately:

* atlas-run   -- installs this plugin into the product and starts it on localhost
* atlas-debug -- same as atlas-run, but allows a debugger to attach at port 5005
* atlas-help  -- prints description for all commands in the SDK

Full documentation is always available at this [link](https://developer.atlassian.com/display/DOCS/Introduction+to+the+Atlassian+Plugin+SDK).

## Motivation

The goal of this will be to create a plugin that provides some gadgets. Plugin is an app that can be installed in JIRA software while gadget will be just the representation. 

## Description

This is a JIRA Server plugin.

The plugin consists of gadget which will show some data (in my case) in chart format (line / pie). Unfortunately there is no good documentation
on how to develop those plugins so I hope this is a bit helpful.

In the `atlassian-plugin.xml` file is the XML file of the plugin. There we pack the gadgets and all other resources for each gadget. 

`linegadget.xml` and `piegadget.xml` are the XML files of the gadgets. There can add more filters and customize it better. For more information check the file as is well commented.

In `.js` folder are the javascript files where all the functions are implemented. 

`myPlugin.js` consists of some common code for both gadgets.

`linechart.js` has specific code for 'linegadget.xml' and same for the other. Both files are commented.

`java` files are generated when you create your project.

View of what is happening:

|===========|                   |===========|
|           |       Data        |           |
|           |     <-------      |           |
|           |     ------->      |           |
|___________|       Req         |___________|
(jira server)                  (jira database)
      |
      |
      |
      |
|===========|
|           |
|           |
|           |
|___________|
(show the data)

## Installation

* Install the **Atlassian SDK** - the [link](https://developer.atlassian.com/server/framework/atlassian-sdk/install-the-atlassian-sdk-on-a-linux-or-mac-system/) can be used for Linux / Mac: 
* Fork my repository to a folder (i.e.: /myJiraPlugin) and go there
* You can compile with: **atlas-compile**
* You can build and wrap your plugin with: **atlas-package**
* You can clean the run-time generated files with: **atlas-clean** - the [link](https://developer.atlassian.com/server/framework/atlassian-sdk/automatic-plugin-reinstallation-with-quickreload/) can be used for more commands:
* To check you plugin / gadget just download the .jar file to you JIRA Software (Server) as a normal application
      
## References

* [Ref_1](https://developer.atlassian.com/server/framework/atlassian-sdk/create-a-helloworld-plugin-project/)
* [Ref_2](https://developer.atlassian.com/server/framework/atlassian-sdk/modify-the-plugin/)
* [Ref_3](https://developer.atlassian.com/server/framework/atlassian-sdk/modify-the-plugin-using-quickreload/)
* [Ref_4](https://community.atlassian.com/)
