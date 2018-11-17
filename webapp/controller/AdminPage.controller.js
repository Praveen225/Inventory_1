sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/model/Filter',
	'sap/ui/model/FilterOperator',
	'sap/ui/model/json/JSONModel'
], function (Controller, Filter, FilterOperator, JSONModel) {
	"use strict";
	return Controller.extend("inventory.Inventory.controller.AdminPage", {
		onInit: function () {
			var oModel = new JSONModel(jQuery.sap.getModulePath("inventory.Inventory", "/data.json"));
			this.getView().setModel(oModel);
			this.getView().setModel(new JSONModel(), "jmodel");

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
			this.getView().getModel("data").setProperty("/allData/0/notifSymb", "");
			/*var alldata = this.getView().getModel("data").getProperty("/allData/");
			for (var i = 0; i <= alldata.length; i++) {
				var tNo = alldata[i].ticketNo;
				var nId = alldata[i].id;
				var status1= this.getView().getModel("data").getProperty("/status/0/"+nId);
				var issueRejDate = alldata[i].Date;
				var issueDate = issueRejDate.slice(0, 2);
				var issueDate1 = parseInt(issueDate);
				var issueMonth = issueRejDate.slice(3, 5);
				var issueMonth1 = parseInt(issueMonth);
				var todaysDate = new Date();
				var todaysDay = todaysDate.getDate();
				var month = todaysDate.getMonth() + 1;
				var preIssueDate1 = (31 - issueDate1) + todaysDay;
				if ((todaysDay - 5 > issueDate1 && issueMonth == month) || (issueMonth == month - 1 && preIssueDate1 > 6) || (issueMonth < month -
						1)) {
					alldata.splice(i, 1);
					i--;
					for (var j = 0; j < status1.length; j++) {
						if (status1[j].ticketNo === tNo) {
							this.getView().getModel("data").setProperty("/status/0/" + nId + "/" + j + "/issueTime", "Minimum issue time has Expired ");
							this.getView().getModel("data").setProperty("/status/0/" + nId + "/" + j + "/visible1", true);
						}
					}
				}
			}*/
		},
		onEmpEquSearch: function () {
			var aFilter = [];
			var sQuery = this.getView().byId("input").getValue();
			if (sQuery) {
				aFilter.push(new Filter("id", FilterOperator.Contains, sQuery));
			}
			var oList = this.getView().byId("idEquipmentTable");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		},
		onNotifClick: function (oEvent) {
			// create popover
			if (!this._oPopover) {
				this._oPopover = sap.ui.xmlfragment("inventory.Inventory.view.notifPopover", this);
				this.getView().addDependent(this._oPopover);
				this._oPopover.bindElement("data>/notifications");
			}

			this._oPopover.openBy(oEvent.getSource());
			this.getView().getModel("data").setProperty("/allData/0/notifSymb", "");
		},
		onLogout: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("login");
			this.getView().byId("bell").setVisible(false);
		},
		onSearchByTno: function () {
			var aFilter = [];
			var sQuery = this.getView().byId("input1").getValue();
			if (sQuery) {
				aFilter.push(new Filter("ticketNo", FilterOperator.Contains, sQuery));
			}
			var oList = this.getView().byId("idIssueDetailsTable");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		}
	});

});