var FieldValidationMMS001 = (function() {
    function FieldValidationMMS001(args) {
        this.controller = args.controller;
    }

    FieldValidationMMS001.prototype.onRequesting = function(args) {
        var var1 = ScriptUtil.GetFieldValue("MMDWNO");
        if (args.commandType == "KEY" && args.commandValue == "ENTER") {
            if (var1) {
                // console.log("Let go");
            } else {
                // args.cancel = true;
                this.__proto__.ShowMessage("Drawing number cannot be empty!");
                args.cancel = true;
            }
        }
    };

    FieldValidationMMS001.prototype.attachEvents = function(controller) {
        var _this = this;
        controller.Requesting.On(function(e) {
            _this.onRequesting(e);
        });
    };
    FieldValidationMMS001.prototype.ShowMessage = function(message) {
        ConfirmDialog.ShowMessageDialog({
            dialogType: "Information",
            header: "From FieldValidationMMS001.js",
            message: message,
        });
    };
    FieldValidationMMS001.prototype.run = function() {
        var controller = this.controller;
        var key = this.scriptName;
        var cache = InstanceCache;
        // Add a key to the instance cache to prevent other instances of this script on the same program instance.
        cache.Add(controller, key, true);
        // Attach events.
        this.attachEvents(controller);
    };
    /**
     * Script initialization function.
     */
    FieldValidationMMS001.Init = function(args) {
        new FieldValidationMMS001(args).run();
    };
    return FieldValidationMMS001;
}());
