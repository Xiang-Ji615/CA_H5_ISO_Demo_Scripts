var AddFieldsToMform = new function() {
    this.Init = function(scriptArgs) {
        var renderEngine = scriptArgs.controller.RenderEngine,
            content = renderEngine.Content,
            myButton = this.CreateButtonElement(content, {
                name: "newButton1",
                value: "H5 New Button",
                top: 2,
                left: 40
            }),
            myTextBox = this.CreateTextBoxElement(content, {
                name: "myTextbox1",
                value: "",
                top: 2,
                left: 50,
                width: 10,
                height: 1,
                isUpper: false
            });

        ScriptUtil.AddEventHandler(myButton, "click", function(event) {
            ConfirmDialog.ShowMessageDialog({
                dialogType: "Information",
                header: "Script Tester",
                message: ScriptUtil.GetFieldValue("myTextbox1"),
            });
        });
    };


    this.CreateButtonElement = function(content, buttonData) {
        var buttonElement = new ButtonElement();

        buttonElement.Name = buttonData.name;
        buttonElement.Value = buttonData.value;
        buttonElement.Position = new PositionElement();
        buttonElement.Position.Top = buttonData.top;
        buttonElement.Position.Left = buttonData.left;

        return content.AddElement(buttonElement);
    };

    this.CreateTextBoxElement = function(content, textboxData) {
        var textboxElement = new TextBoxElement();

        textboxElement.Name = textboxData.name;
        textboxElement.Value = textboxData.value;

        textboxElement.Position = new PositionElement();
        textboxElement.Position.setValues(textboxData.top, textboxData.left, textboxData.width, textboxData.height); //params: Top, Left, Width, Height

        textboxElement.Constraint = new ConstraintElement();
        textboxElement.Constraint.IsUpper = textboxData.isUpper;
        return content.AddElement(textboxElement);
    };

    this.CreateLabelElement = function(content, labelData) {
        var labelElement = new LabelElement();

        labelElement.Name = labelData.name;
        labelElement.Value = labelData.value;

        labelElement.Position = new PositionElement();
        labelElement.Position.setValues(labelData.top, labelData.left, labelData.width, labelData.height);

        labelElement.Constraint = new ConstraintElement();
        labelElement.Constraint.IsColon = labelData.isColon;
        return content.AddElement(labelElement);
    };

}
