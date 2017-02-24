var LaunchProgramWithParams = (function () {
    function LaunchProgramWithParams(args) {
        this.controller = args.controller;
        this.log = args.log;
    }
    /**
    * Script initialization function.
    */
    LaunchProgramWithParams.Init = function (args) {
        new LaunchProgramWithParams(args).run();
    };
    LaunchProgramWithParams.prototype.run = function () {
        var _this = this;
        //Add button
        var buttonElement = new ButtonElement();
        buttonElement.Name = "btnRun";
        buttonElement.Value = "Automation MMS002";
        buttonElement.Position = new PositionElement();
        buttonElement.Position.Top = 1;
        buttonElement.Position.Left = 1;
        buttonElement.Position.Width = 5;
        var contentElement = this.controller.GetContentElement();
        var button = contentElement.AddElement(buttonElement);
        //Add click event handler to button
        ScriptUtil.AddEventHandler(button, "click", function (event) {
            _this.onClick();
        });
    };
    LaunchProgramWithParams.prototype.ShowMessage = function(message) {
        ConfirmDialog.ShowMessageDialog({
            dialogType: "Information",
            header: "From FieldValidation.js",
            message: message,
        });
    };
    LaunchProgramWithParams.prototype.onClick = function () {
        //Get value of first column of first selected row
        var selected = ListControl.ListView.GetValueByColumnIndex(0)[0];
        if (!selected) {
             this.__proto__.ShowMessage("No selected row");
            return;
        }
        //Build automation
        var auto = new MFormsAutomation();
        auto.addStep(ActionType.Run, "MMS002");
        auto.addStep(ActionType.Key, "ENTER");
        auto.addField("W1OBKV", selected);
        //Launch MForm
        var uri = auto.toEncodedUri();
        ScriptUtil.Launch(uri);
    };
    return LaunchProgramWithParams;
})();