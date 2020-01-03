<template>
    <div>
        <table cellpadding="0" cellspacing="0" border="0" class="dataTable table table-striped" id="main-table">
            <!-- table data goes here -->
        </table>
    </div>
</template>

<script>
export default {
    data: () => {
        return {
            // fullName: 'Katherine Pechon',
            // position: 'Senior Blockchain Dev',
        }
    },
    methods: {
        //
    },
    mounted: function () {
        console.log('Sidebar is mounted!')

        // $('#main-table').DataTable({
        //     'ajax': 'http://localhost:8088/dev/table-data',
        //     language: {
        //         searchPlaceholder: 'Search...',
        //         sSearch: '',
        //         lengthMenu: '_MENU_ items/page',
        //     }
        // })

        const columnDefs = [{
            data: 'id',
            title: "Id",
            type: "readonly"
        }, {
            data:'name',
            title: "Name"
        }, {
            data:'position',
            title: "Position"
        }, {
            data:'office',
            title: "Office"
        }, {
            data:'extension',
            title: "Extn."
        }, {
            data:'startDate',
            title: "Start date"
        }, {
            data:'salary',
            title: "Salary"
        }]

        const myTable = $('#main-table').DataTable({
            "sPaginationType": "full_numbers",
            ajax: {
                url: 'http://localhost:8088/v1/customers',
                headers: {
                    'X-Telr-Address': '0x27a9b30DBe015842098F4CD31f0301a1cEE74bfe',
                    'X-Telr-Secret': 1578026489,
                    'X-Telr-Signature': '6c2a8b62-5d3f-4304-b6c7-29ac7e9eaa9a',
                }
            },
            language: {
                searchPlaceholder: 'Search...',
                sSearch: '',
                lengthMenu: '_MENU_ items/page',
            },
            columns: columnDefs,
    	    dom: 'Bfrtip',        // Needs button container
            select: 'single',
            responsive: true,
            altEditor: true,     // Enable altEditor
            buttons: [{
                text: 'Add',
                name: 'add'        // do not change name
            }, {
                extend: 'selected', // Bind to Selected row
                text: 'Edit',
                name: 'edit'        // do not change name
            }, {
                extend: 'selected', // Bind to Selected row
                text: 'Delete',
                name: 'delete'      // do not change name
            }, {
                text: 'Refresh',
                name: 'refresh'      // do not change name
            }],
            onAddRow: function (datatable, rowdata, success, error) {
                $.ajax({
                    // a tipycal url would be / with type='POST'
                    url: 'http://localhost:8088/v1/customers',
                    headers: {
                        'X-Telr-Address': '0x27a9b30DBe015842098F4CD31f0301a1cEE74bfe',
                        'X-Telr-Secret': 'hi-there-POST',
                        'X-Telr-Signature': '6c2a8b62-5d3f-4304-b6c7-29ac7e9eaa9a',
                    },
                    type: 'POST',
                    data: rowdata,
                    success: success,
                    error: error
                })
            },
            onDeleteRow: function (datatable, rowdata, success, error) {
                $.ajax({
                    // a tipycal url would be /{id} with type='DELETE'
                    url: 'http://localhost:8088/v1/customers/3cadc761-281e-49f9-bd06-00a2e35b5e1a',
                    headers: {
                        'X-Telr-Address': '0x27a9b30DBe015842098F4CD31f0301a1cEE74bfe',
                        'X-Telr-Secret': 'hi-there-DELETE',
                        'X-Telr-Signature': '6c2a8b62-5d3f-4304-b6c7-29ac7e9eaa9a',
                    },
                    type: 'DELETE',
                    data: rowdata,
                    success: success,
                    error: error
                })
            },
            onEditRow: function (datatable, rowdata, success, error) {
                $.ajax({
                    // a tipycal url would be /{id} with type='PUT'
                    url: 'http://localhost:8088/v1/customers/3cadc761-281e-49f9-bd06-00a2e35b5e1a',
                    headers: {
                        'X-Telr-Address': '0x27a9b30DBe015842098F4CD31f0301a1cEE74bfe',
                        'X-Telr-Secret': 'hi-there-PUT',
                        'X-Telr-Signature': '6c2a8b62-5d3f-4304-b6c7-29ac7e9eaa9a',
                    },
                    type: 'PUT',
                    data: rowdata,
                    success: success,
                    error: error
                })
            }
        })

    }
}
</script>

<style scoped>
/* TODO */
</style>
