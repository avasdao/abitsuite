<template>
    <div>
        <h1>DB MANAGER GOES HERE!!!!</h1>

        <table id="example3" class="table">
                    <thead>
                      <tr>
                        <th class="wd-20p">Name</th>
                        <th class="wd-25p">Position</th>
                        <th class="wd-20p">Office</th>
                        <th class="wd-15p">Age</th>
                        <th class="wd-20p">Salary</th>
                      </tr>
                    </thead>
                  </table>
    </div>
</template>

<script>
export default {
    data: () => {
        return {
            fullName: 'Katherine Pechon',
            position: 'Senior Blockchain Dev',
        }
    },
    methods: {
        //
    },
    mounted: function () {
        console.log('Sidebar is mounted!')

        $('#example3').DataTable({
            'ajax': 'http://localhost:8080/dev/table-data',
            language: {
                searchPlaceholder: 'Search...',
                sSearch: '',
                lengthMenu: '_MENU_ items/page',
            }
        })
    },
}
</script>

<style scoped>
/* TODO */
</style>
