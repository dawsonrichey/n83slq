import Vue from 'vue';



import { Grid, GridToolbar } from '@progress/kendo-vue-grid';
import { process } from '@progress/kendo-data-query';

Vue.component('Grid', Grid);
Vue.component('grid-toolbar', GridToolbar);

new Vue({
    el: '#vueapp',
    data: function () {
        return {
            updatedData: [],
            editID: null,
            group: [ { field: 'UnitsInStock' } ],
            expandedItems: [],
            columns: [
                { field: 'ProductID', editable: false, title: 'ID', width: '50px' },
                { field: 'ProductName', title: 'Name' },
                { field: 'FirstOrderedOn', editor: 'date', title: 'First Ordered', format: '{0:d}' },
                { field: 'UnitsInStock', title: 'Units',  width: '150px', editor: 'numeric' },
                { field: 'Discontinued', title: 'Discontinued',  editor: 'boolean' }
            ],
            gridData: [{
                "ProductID": 1,
                "ProductName": "Chai",
                "UnitsInStock": 39,
                "Discontinued": false,
                "FirstOrderedOn": new Date(1996, 8, 20)
            },{
                "ProductID": 2,
                "ProductName": "Chang",
                "UnitsInStock": 17,
                "Discontinued": false,
                "FirstOrderedOn": new Date(1996, 7, 12)
            },{
                "ProductID": 3,
                "ProductName": "Aniseed Syrup",
                "UnitsInStock": 13,
                "Discontinued": false,
                "FirstOrderedOn": new Date(1996, 8, 26)
            },{
                "ProductID": 4,
                "ProductName": "Chef Anton's Cajun Seasoning",
                "UnitsInStock": 53,
                "Discontinued": false,
                "FirstOrderedOn": new Date(1996, 9, 19)
            }]
        };
    },
    computed: {
        getData() {
            return this.gridData.map(
                (item) => Object.assign({ inEdit: item.ProductID === this.editID}, item));
        }
    },
    methods: {
        itemChange: function (e) {
            const data = this.gridData.slice();
            const index = data.findIndex(d => d.ProductID === e.dataItem.ProductID);
            data[index] = { ...data[index], [e.field]: e.value };
            this.gridData = data;
            Vue.set(e.dataItem, e.field, e.value);
        },
        rowClick: function (e) {
            this.editID = e.dataItem.ProductID;

            Vue.set(e.dataItem, 'inEdit', true);
        },
        closeEdit(e) {
            if (e.target === e.currentTarget) {
                this.editID = null;
            }
        },
        addRecord() {
            const newRecord = { ProductID: this.gridData.length + 1 };
            const data = this.gridData.slice();
            data.unshift(newRecord);
            this.gridData = data;
            this.editID = newRecord.ProductID;
        }
    }
});
