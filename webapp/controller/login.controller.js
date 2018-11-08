sap.ui.define([
			"sap/ui/core/mvc/Controller",
			"sap/m/MessageToast"
		], function (Controller, MessageToast) {
			"use strict";

			return Controller.extend("inventory.Inventory.controller.login", {
				onSubmit: function (oEvent) {
					var oModel = this.getView().getModel("data").oData.empInfo;
					for (var i = 0; i < oModel.length; i++) {
						/*get the values from the input feild*/
						var oId = this.getView().byId("Id").getValue();
						var oPassword = this.getView().byId("Password").getValue();
						if (oId === "" && oPassword === "") {
							MessageToast.show("Please enter the Id and Password");
							this.getView().byId("Id").setValueState("Error");
							this.getView().byId("Password").setValueState("Error");
							break;
						} else if (oId == "SE1111" && oPassword == "admin") {
						
							var id = this.getView().byId("Id").getValue();
							var model = this.getView().getModel("data").getProperty("/empInfo");
							for (i = 0; i < model.length; i++) {
								if (id === model[i].id) {
									var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
									oRouter.navTo("AdminPage", {
										obj: i
									});
								}
							}
									this.getView().byId("Id").setValueState("None");
									this.getView().byId("Password").setValueState("None");
									this.getView().byId("Id").setValue("");
									this.getView().byId("Password").setValue("");
									break;
								}
							
								/*else if (oModel[i].id === oId && oModel[i].password === oPassword && oModel[i].phoneno === undefined) {
									
									var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
									oRouter.navTo("EmployeePage");
									break;
								}*/
								else if (oModel[i].id === oId && oModel[i].password === oPassword) {
									var id = this.getView().byId("Id").getValue();
									var model = this.getView().getModel("data").getProperty("/empInfo");
									for (i = 0; i < model.length; i++) {
										if (id === model[i].id) {
											var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
											oRouter.navTo("EmployeePage", {
												obj: i
											});
											break;
										}
									}
									this.getView().byId("Id").setValueState("None");
									this.getView().byId("Password").setValueState("None");
									this.getView().byId("Id").setValue("");
									this.getView().byId("Password").setValue("");
									break;
								}

							}
						},
						checkValidation: function (oEvent) {

						}

					});
			});