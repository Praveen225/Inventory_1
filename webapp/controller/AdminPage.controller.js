sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/model/Filter',
	'sap/ui/model/FilterOperator'
], function (Controller,Filter,FilterOperator) {
	"use strict";
	return Controller.extend("inventory.Inventory.controller.AdminPage", {
		onInit: function () {
          var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		  oRouter.getRoute("AdminPage").attachPatternMatched(this._onObjectMatched, this);
		},
			_onObjectMatched: function (oEvent) {
              var oArg = oEvent.getParameters("arguments");
              var oView = this.getView();
              oView.setModel(this.getOwnerComponent().getModel("data"));
              oView.bindElement("/empInfo/" + oArg.arguments.obj);
     },
		equipment: function (oEvent) {
			var oView = this.getView();
			var oDialog = oView.byId("idEquipmentDialog");
			if (!oDialog) {
				oDialog = sap.ui.xmlfragment(oView.getId(), "inventory.Inventory.view.equipment", this);
				oView.addDependent(oDialog);
			}
			oDialog.open();
		},
		onEquipmentDialogClose: function () {
			this.getView().byId("idEquipmentDialog").close();
		},
		issueDetails: function (oEvent) {
			var oView = this.getView();
			var oDialog = oView.byId("idIssueDetailsDialog");
			if (!oDialog) {
				oDialog = sap.ui.xmlfragment(oView.getId(), "inventory.Inventory.view.issueDetails", this);
				oView.addDependent(oDialog);
			}
			oDialog.open();
		},
		onIssueDetailsDialogClose: function () {
			this.getView().byId("idIssueDetailsDialog").close();
		},
		onissueStatics: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("issueStatics");
		},
		notifications: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("notifications");
		},
		onEmpEquSearch: function(){
			var aFilter = [];
			var sQuery = this.getView().byId("input").getValue();
			if (sQuery) {
				aFilter.push(new Filter("id", FilterOperator.Contains, sQuery));
			}
			var oList = this.getView().byId("idEquipmentTable");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		},
		onNotifClick: function(oEvent){
				// create popover
			if (!this._oPopover) {
				this._oPopover = sap.ui.xmlfragment("inventory.Inventory.view.notifPopover", this);
				this.getView().addDependent(this._oPopover);
				this._oPopover.bindElement("data>/notifications");
			}

			this._oPopover.openBy(oEvent.getSource());
		}
	});

});