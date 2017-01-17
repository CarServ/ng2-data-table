"use strict";
var DataTable_1 = require("./DataTable");
var RowSelector_1 = require("./RowSelector");
describe("DataTable directive tests", function () {
    var datatable;
    beforeEach(function () {
        datatable = new DataTable_1.DataTable();
        datatable.inputData = [
            {
                id: 3,
                name: 'Poland'
            },
            {
                id: 1,
                name: 'Slovakia'
            },
            {
                id: 2,
                name: 'Czech'
            },
            {
                id: 5,
                name: 'Hungary'
            },
            {
                id: 4,
                name: 'Ukraine'
            }
        ];
    });
    describe("initializing", function () {
        it("data should be empty array if inputData is undefined or null", function () {
            var datatable = new DataTable_1.DataTable();
            datatable.ngDoCheck();
            expect(datatable.data).toEqual([]);
        });
        it("data should be equal to inputData", function () {
            datatable.ngDoCheck();
            expect(datatable.data).toEqual(datatable.inputData);
        });
        it("data should be 2 first items", function () {
            datatable.rowsOnPage = 2;
            datatable.ngDoCheck();
            expect(datatable.data).toEqual([{
                    id: 3,
                    name: 'Poland'
                }, {
                    id: 1,
                    name: 'Slovakia'
                }]);
        });
        it("data should be 3. and 4. items", function () {
            datatable.rowsOnPage = 2;
            datatable.activePage = 2;
            datatable.ngDoCheck();
            expect(datatable.data).toEqual([{
                    id: 2,
                    name: 'Czech'
                }, {
                    id: 5,
                    name: 'Hungary'
                }]);
        });
        it("shouldn't recalculate data when no changes", function () {
            datatable.ngDoCheck();
            var data = datatable.data;
            datatable.ngDoCheck();
            expect(datatable.data).toBe(data);
        });
    });
    describe("pagination", function () {
        beforeEach(function () {
            datatable.rowsOnPage = 2;
            datatable.ngDoCheck();
        });
        it("should return current page settings", function () {
            expect(datatable.getPage()).toEqual({
                activePage: 1,
                rowsOnPage: 2,
                dataLength: 5
            });
        });
        it("data should be 3. and 4. items when page change", function () {
            datatable.setPage(2, 2);
            datatable.ngDoCheck();
            expect(datatable.data).toEqual([{
                    id: 2,
                    name: 'Czech'
                }, {
                    id: 5,
                    name: 'Hungary'
                }]);
        });
        it("data should be three first items when page change", function () {
            datatable.setPage(1, 3);
            datatable.ngDoCheck();
            expect(datatable.data).toEqual([{
                    id: 3,
                    name: 'Poland'
                }, {
                    id: 1,
                    name: 'Slovakia'
                }, {
                    id: 2,
                    name: 'Czech'
                }]);
        });
        it("data should be two last items when page change", function () {
            datatable.setPage(2, 3);
            datatable.setPage(2, 3);
            datatable.ngDoCheck();
            expect(datatable.data).toEqual([{
                    id: 5,
                    name: 'Hungary'
                }, {
                    id: 4,
                    name: 'Ukraine'
                }]);
        });
    });
    describe("sorting", function () {
        it("id should return current sort setting", function () {
            datatable.setSort("id", "desc");
            expect(datatable.getSort()).toEqual({
                sortBy: "id",
                sortOrder: "desc"
            });
        });
        it("shouldn't refresh data when set page with same settings", function () {
            datatable.setSort("name", "asc");
            datatable.ngDoCheck();
            var data = datatable.data;
            datatable.setSort("name", "asc");
            datatable.ngDoCheck();
            expect(datatable.data).toEqual(data);
        });
        it("should sort data ascending by name", function () {
            datatable.setSort("name", "asc");
            datatable.ngDoCheck();
            expect(datatable.data).toEqual([
                {
                    id: 2,
                    name: 'Czech'
                },
                {
                    id: 5,
                    name: 'Hungary'
                },
                {
                    id: 3,
                    name: 'Poland'
                },
                {
                    id: 1,
                    name: 'Slovakia'
                },
                {
                    id: 4,
                    name: 'Ukraine'
                }
            ]);
        });
    });
    describe("row selecting", function () {
        it("selected entities should only contain entities that are selected", function () {
            var entities = datatable.inputData;
            datatable.ngDoCheck();
            var rowselectors = new Array();
            entities.forEach(function (x) {
                var rowSelector = new RowSelector_1.RowSelector(datatable);
                rowSelector.entity = x;
                rowselectors.push(rowSelector);
            });
            rowselectors[0].onChange();
            datatable.addRemoveSelectedEntity(rowselectors[0].entity);
            rowselectors[1].onChange();
            datatable.addRemoveSelectedEntity(rowselectors[1].entity);
            rowselectors[0].onChange();
            datatable.addRemoveSelectedEntity(rowselectors[0].entity);
            expect(datatable.selectedEntities.length).toEqual(1);
        });
        it("should select all entities when all rows are selected", function () {
            datatable.selectAllRows();
            expect(datatable.selectedEntities.length).toEqual(5);
        });
        it("should deselect all entities when all rows are deselected", function () {
            datatable.selectAllRows();
            datatable.deselectAllRows();
            expect(datatable.selectedEntities.length).toEqual(0);
        });
    });
    describe("adding input data", function () {
        it("should add a row of data to the table", function () {
            var newData = {
                id: 6,
                name: 'United States'
            };
            datatable.ngDoCheck();
            datatable.inputData.push(newData);
            datatable.ngDoCheck();
            expect(datatable.data).toEqual([
                {
                    id: 3,
                    name: 'Poland'
                },
                {
                    id: 1,
                    name: 'Slovakia'
                },
                {
                    id: 2,
                    name: 'Czech'
                },
                {
                    id: 5,
                    name: 'Hungary'
                },
                {
                    id: 4,
                    name: 'Ukraine'
                },
                {
                    id: 6,
                    name: 'United States'
                }
            ]);
        });
    });
    describe("removing input data", function () {
        it("should remove a row of data from the table", function () {
            datatable.ngDoCheck();
            datatable.inputData.pop();
            datatable.ngDoCheck();
            expect(datatable.data).toEqual([
                {
                    id: 3,
                    name: 'Poland'
                },
                {
                    id: 1,
                    name: 'Slovakia'
                },
                {
                    id: 2,
                    name: 'Czech'
                },
                {
                    id: 5,
                    name: 'Hungary'
                }
            ]);
        });
    });
});
//# sourceMappingURL=DataTable.spec.js.map