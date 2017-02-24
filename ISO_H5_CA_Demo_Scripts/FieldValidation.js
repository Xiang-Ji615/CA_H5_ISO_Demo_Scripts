var FieldValidation = (function() {
    function FieldValidation(args) {
        this.controller = args.controller;
    }

    FieldValidation.prototype.onRequesting = function(args) {
        var var1 = ScriptUtil.GetFieldValue("WFSLC2");
        if (args.commandType == "KEY" && args.commandValue == "ENTER") {
            if (var1) {
                // console.log("Let go");
            } else {
                // args.cancel = true;
                this.__proto__.ShowMessage("Left Item Group can Not be empty!");
                args.cancel = true;
            }
        }
    };

    FieldValidation.prototype.attachEvents = function(controller) {
        var _this = this;
        controller.Requesting.On(function(e) {
            _this.onRequesting(e);
        });
    };
    FieldValidation.prototype.ShowMessage = function(message) {
        ConfirmDialog.ShowMessageDialog({
            dialogType: "Information",
            header: "From FieldValidation.js",
            message: message,
        });
    };
    FieldValidation.prototype.run = function() {
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
    FieldValidation.Init = function(args) {
        new FieldValidation(args).run();
    };
    return FieldValidation;
}());
