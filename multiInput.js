(function () {
    let _shadowRoot;
    let div;
    let widgetName;
    var Ar = [];

    let tmpl = document.createElement("template");
    tmpl.innerHTML = `
      <style>
      </style>
    `;

    class MultiInput extends HTMLElement {

        constructor() {
            super();

            _shadowRoot = this.attachShadow({
                mode: "open"
            });
            _shadowRoot.appendChild(tmpl.content.cloneNode(true));


            //     id = loadScript();
            //    _shadowRoot.querySelector("#oView").id = "oView";

            this._export_settings = {};

            this.addEventListener("click", event => {
                console.log('click');

            });

            this._firstConnection = 0;
        }

        disconnectedCallback() {
            if (this._subscription) { // react store subscription
                this._subscription();
                this._subscription = null;
            }
        }

        onCustomWidgetBeforeUpdate(changedProperties) {
            if ("designMode" in changedProperties) {
                this._designMode = changedProperties["designMode"];
            }
        }

        onCustomWidgetAfterUpdate(changedProperties) {
            var that = this;
            loadthis(that, changedProperties);
        }

        _renderExportButton() {
            let components = this.metadata ? JSON.parse(this.metadata)["components"] : {};
        }

        _firePropertiesChanged() {
            this.unit = "";
            this.dispatchEvent(new CustomEvent("propertiesChanged", {
                detail: {
                    properties: {
                        unit: this.unit
                    }
                }
            }));
        }
    }

    customElements.define("com-fd-djaja-sap-sac-multiinput", MultiInput);

    // UTILS
    function loadthis(that, changedProperties) {
        var that_ = that;

        widgetName = changedProperties.widgetName;
        if (typeof widgetName === "undefined") {
            widgetName = that._export_settings.title.split("|")[0];
        }

        div = document.createElement('div');
        div.slot = "content_" + widgetName;

        let div0 = document.createElement('div');
        // div0.innerHTML = '<script id="DARSHAN" type="sapui5/xmlview"><mvc:View controllerName="myView.Template" xmlns:l="sap.ui.layout" xmlns:core="sap.ui.core" xmlns:mvc="sap.ui.core.mvc" xmlns="sap.m">    <Tree id="Tree" items="{' + widgetName + '}" mode="MultiSelect"><CustomTreeItem>            <FlexBox alignItems="Start" width="100%">            <items><Button icon="{ref}" press="handleButtonPress" class="sapUiSmallMarginEnd" />        <Input value="{text}"><layoutData><FlexItemData growFactor="1" /></layoutData></Input></items></FlexBox></CustomTreeItem></Tree></mvc:View></script>';
        div0.innerHTML = '<script id="oView' + widgetName + '" name="oView' + widgetName + '" type="sapui5/xmlview"><mvc:View controllerName="myView.Template" xmlns:l="sap.ui.layout" xmlns:core="sap.ui.core" xmlns:mvc="sap.ui.core.mvc" xmlns="sap.m"><Tree id="Tree" items="{' + widgetName + '>/}" mode="MultiSelect"><CustomTreeItem><FlexBox alignItems="Start" width="100%"><items><Input value="{text}"><layoutData><FlexItemData growFactor="1" /></layoutData></Input></items></FlexBox></CustomTreeItem></Tree></mvc:View></script>';
        //  div0.innerHTML = '<?xml version="1.0"?><script id="oView' + widgetName + '" name="oView' + widgetName + '" type="sapui5/xmlview"><mvc:View height="100%" xmlns="sap.m" xmlns:l="sap.ui.layout" xmlns:core="sap.ui.core" xmlns:mvc="sap.ui.core.mvc" controllerName="myView.Template"><l:VerticalLayout class="sapUiContentPadding" width="100%"><l:content><MultiInput width="100%" id="multiInput" suggestionItems="{' + widgetName + '>/}" valueHelpRequest="handleValueHelp"><core:Item key="{' + widgetName + '>partner}" text="{' + widgetName + '>partner}" /></MultiInput></l:content><Button id="buttonId" class="sapUiSmallMarginBottom" text="Get Score" width="150px" press=".onButtonPress" /></l:VerticalLayout></mvc:View></script>';
        _shadowRoot.appendChild(div0);

        let div2 = document.createElement('div');
        div2.innerHTML = '<div id="ui5_content_' + widgetName + '" name="ui5_content_' + widgetName + '"><slot name="content_' + widgetName + '"></slot></div>';
        _shadowRoot.appendChild(div2);

        that_.appendChild(div);

        var mapcanvas_divstr = _shadowRoot.getElementById('oView' + widgetName);
        console.log("[MAPCANVAS]",mapcanvas_divstr);

        Ar.push({
            'id': widgetName,
            'div': mapcanvas_divstr
        });

        sap.ui.getCore().attachInit(function () {
            "use strict";

            //### Controller ###
            sap.ui.define(['sap/ui/core/mvc/Controller', 'sap/ui/model/json/JSONModel', 'sap/m/MessageToast'],
                function (Controller, JSONModel, MessageToast) {
                    "use strict";

                    var PageController = Controller.extend("myView.Template", {
                        onInit: function () {
                            // set explored app's demo model on this sample
                            var oModel = new JSONModel([
                                {
                                    "text": "Node1",
                                    "ref": "sap-icon://attachment-audio",
                                    "nodes":
                                    [
                                        {
                                            "text": "Node1-1",
                                            "ref": "sap-icon://attachment-e-pub",
                                            "nodes":[
                                                {
                                                    "text": "Node1-1-1",
                                                    "ref": "sap-icon://attachment-html"
                                                },
                                                {
                                                    "text": "Node1-1-2",
                                                    "ref": "sap-icon://attachment-photo",
                                                    "nodes":[
                                                        {
                                                            "text": "Node1-1-2-1",
                                                            "ref": "sap-icon://attachment-text-file",
                                                            "nodes":[
                                                                {
                                                                    "text": "Node1-1-2-1-1",
                                                                    "ref": "sap-icon://attachment-video"
                                                                },
                                                                {
                                                                    "text": "Node1-1-2-1-2",
                                                                    "ref": "sap-icon://attachment-zip-file"
                                                                },
                                                                {
                                                                    "text": "Node1-1-2-1-3",
                                                                    "ref": "sap-icon://course-program"
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "text": "Node1-2",
                                            "ref": "sap-icon://create"
                                        }
                                    ]
                                },
                                {
                                    "text": "Node2",
                                    "ref": "sap-icon://customer-financial-fact-sheet"
                                }
                            ]);

                            console.log(oModel);
                            this.getView().setModel(oModel, that.widgetName);

                            sap.ui.getCore().setModel(oModel, that.widgetName);
                        },

                        handleButtonPress: function (evt) {
                            MessageToast.show("Button pressed");

                        }

                    });

                    return PageController;

                });

            console.log("widgetName Final:" + widgetName);
            var foundIndex = Ar.findIndex(x => x.id == widgetName);
            console.log("[FOUND INDEX]",foundIndex, Ar[foundIndex]);
            var divfinal = Ar[foundIndex].div;
            // console.log(divfinal);

            //     //### THE APP: place the XMLView somewhere into DOM ###
            var oView = sap.ui.xmlview({
                viewContent: jQuery(divfinal).html(),
            });

            console.log("[OVIEW]",oView);

            oView.placeAt(div);

            if (that_._designMode) {
                oView.byId("multiInput").setEnabled(false);
                oView.byId("buttonId").setEnabled(false);
            }
        });
    }
})();