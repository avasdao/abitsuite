<template>
    <aside class="aside aside-fixed">
        <div class="aside-header">
            <a href="https://modenero.com/coincierge" class="aside-logo">
                <img src="@/assets/img/banner-icon-32.png" alt="aBitSuite Logo">
                <span>a</span>Bit<span>Suite</span></a>
            <!-- <a href="https://modenero.com/coincierge" class="aside-logo">coin<span>cierge</span></a> -->

            <a href="dashboard-one.html" class="aside-menu-link">
                <i data-feather="menu"></i>
                <i data-feather="x"></i>
            </a>
        </div>

        <div class="aside-body">
            <div class="aside-loggedin">
                <div class="d-flex align-items-center justify-content-start">
                    <a href="dashboard-one.html" class="avatar"><img src="@/assets/img/img1.png" class="rounded-circle" alt=""></a>

                    <div class="aside-alert-link">
                        <a href="dashboard-one.html" class="new" data-toggle="tooltip" title="You have 2 unread messages"><i data-feather="message-square"></i></a>
                        <a href="dashboard-one.html" class="new" data-toggle="tooltip" title="You have 4 new notifications"><i data-feather="bell"></i></a>
                        <a href="dashboard-one.html" data-toggle="tooltip" title="Sign out"><i data-feather="log-out"></i></a>
                    </div>
                </div>

                <div class="aside-loggedin-user">
                    <a href="dashboard-one.html#loggedinMenu" class="d-flex align-items-center justify-content-between mg-b-2" data-toggle="collapse">
                        <h6 class="tx-semibold mg-b-0">{{fullName}}</h6>
                        <i data-feather="chevron-down"></i>
                    </a>

                    <p class="tx-color-03 tx-12 mg-b-0">{{position}}</p>
                </div>

                <div class="collapse" id="loggedinMenu">
                    <ul class="nav nav-aside mg-b-0">
                        <li class="nav-item"><a href="dashboard-one.html" class="nav-link"><i data-feather="edit"></i> <span>Edit Profile</span></a></li>
                        <li class="nav-item"><a href="dashboard-one.html" class="nav-link"><i data-feather="user"></i> <span>View Profile</span></a></li>
                        <li class="nav-item"><a href="dashboard-one.html" class="nav-link"><i data-feather="settings"></i> <span>Account Settings</span></a></li>
                        <li class="nav-item"><a href="dashboard-one.html" class="nav-link"><i data-feather="help-circle"></i> <span>Help Center</span></a></li>
                        <li class="nav-item"><a href="dashboard-one.html" class="nav-link"><i data-feather="log-out"></i> <span>Sign Out</span></a></li>
                    </ul>
                </div>
            </div><!-- aside-loggedin -->

            <ul class="nav nav-aside">
                <li class="nav-label">Workspaces</li>
                <li class="nav-item"><a href="/defi360" class="nav-link"><i data-feather="globe"></i> <span>DeFi Admin <small class="ml-1">[ Management ]</small></span></a></li>
                <li class="nav-item"><a href="/defi360" class="nav-link"><i data-feather="umbrella"></i> <span>DeFi Project <small class="ml-1">[ Collaborate ]</small></span></a></li>
                <li class="nav-item active"><a href="/telr" class="nav-link"><i data-feather="speaker"></i> <span>Telr <small class="ml-1">[ ATMs | POSs ]</small></span></a></li>

                <div class="bg-info mt-3">&nbsp;</div>

                <li class="nav-label mg-t-25">DeFi Admin Accounting</li>
                <li class="nav-item"><a href="app-calendar.html" class="nav-link"><i data-feather="percent"></i> <span>Invocing</span></a></li>
                <li class="nav-item"><a href="app-calendar.html" class="nav-link"><i data-feather="dollar-sign"></i> <span>Payroll</span></a></li>

                <li class="nav-label mg-t-25">DeFi Admin SysOps</li>
                <li class="nav-item"><a href="app-calendar.html" class="nav-link"><i data-feather="database"></i> <span>Data Manager</span></a></li>
                <li class="nav-item"><a href="app-calendar.html" class="nav-link"><i data-feather="server"></i> <span>Server Guru</span></a></li>

                <li class="nav-label mg-t-25">DeFi Admin Security</li>
                <li class="nav-item"><a href="app-calendar.html" class="nav-link"><i data-feather="shield"></i> <span>Crypto Guardian</span></a></li>
                <li class="nav-item"><a href="app-calendar.html" class="nav-link"><i data-feather="book-open"></i> <span>Knowledge Center</span></a></li>

                <div class="bg-info mt-3">&nbsp;</div>

                <li class="nav-label mg-t-25">My DeFi Project</li>
                <li class="nav-item"><a href="app-calendar.html" class="nav-link"><i data-feather="calendar"></i> <span>Calendar <small class="ml-1">[ CalDAV ]</small></span></a></li>
                <li class="nav-item"><a href="app-calendar.html" class="nav-link"><i data-feather="users"></i> <span>Contacts <small class="ml-1">[ CalDAV ]</small></span></a></li>
                <li class="nav-item with-sub">
                    <a href="dashboard-one.html" class="nav-link"><i data-feather="sliders"></i> <span>Preferences</span></a>

                    <ul>
                        <li><a href="page-profile-view.html">Notifications</a></li>
                        <li><a href="page-connections.html">User Manager</a></li>
                    </ul>
                </li>

                <li class="nav-label mg-t-25">DeFi Project Teams</li>
                <li class="nav-item"><a href="app-calendar.html" class="nav-link"><i data-feather="activity"></i> <span>Activity Monitor</span></a></li>
                <li class="nav-item"><a href="app-calendar.html" class="nav-link"><i data-feather="slack"></i> <span>Chat <small class="ml-1">[ Slack ]</small></span></a></li>
                <li class="nav-item"><a href="app-calendar.html" class="nav-link"><i data-feather="trello"></i> <span>Tasks <small class="ml-1">[ Trello ]</small></span></a></li>

                <li class="nav-label mg-t-25">DeFi Project Resources</li>
                <li class="nav-item"><a href="app-calendar.html" class="nav-link"><i data-feather="github"></i> <span>Code Repositories</span></a></li>
                <li class="nav-item"><a href="app-calendar.html" class="nav-link"><i data-feather="download-cloud"></i> <span>Downloads</span></a></li>
                <li class="nav-item"><a href="app-calendar.html" class="nav-link"><i data-feather="book-open"></i> <span>Knowledge Centers</span></a></li>

                <div class="bg-info mt-3">&nbsp;</div>

                <li class="nav-label mg-t-25">Telr App</li>
                <li class="nav-item"><a href="app-calendar.html" class="nav-link"><i data-feather="tv"></i> <span>Manage Ads</span></a></li>

                <li class="nav-label mg-t-25">Telr Host</li>
                <li class="nav-item"><a href="app-calendar.html" class="nav-link"><i data-feather="list"></i> <span>Transactions</span></a></li>
                <li class="nav-item"><a href="app-chat.html" class="nav-link"><i data-feather="shuffle"></i> <span>Exchanges</span></a></li>
                <li class="nav-item"><a href="app-chat.html" class="nav-link"><i data-feather="credit-card"></i> <span>Wallets</span></a></li>
                <li class="nav-item"><a href="app-chat.html" class="nav-link"><i data-feather="dollar-sign"></i> <span>Payouts</span></a></li>
                <li class="nav-item"><a href="app-contacts.html" class="nav-link"><i data-feather="award"></i> <span>Compliance</span></a></li>
                <li class="nav-item with-sub">
                    <a href="dashboard-one.html" class="nav-link"><i data-feather="sliders"></i> <span>Preferences</span></a>

                    <ul>
                        <li><a href="page-profile-view.html">Notifications</a></li>
                        <li><a href="page-connections.html">User Manager</a></li>
                    </ul>
                </li>

                <li class="nav-label mg-t-25">Telr Rewards</li>
                <li class="nav-item with-sub">
                    <a href="dashboard-one.html" class="nav-link"><i data-feather="shopping-bag"></i> <span>Shops</span></a>

                    <ul>
                        <li><a href="page-profile-view.html">Gift Cards</a></li>
                        <li><a href="page-connections.html">Open Bazaar</a></li>
                    </ul>
                </li>
                <li class="nav-item"><a href="app-calendar.html" class="nav-link"><i data-feather="gift"></i> <span>Community Chests</span></a></li>

                <li class="nav-label mg-t-25">Telr Vue</li>
                <li class="nav-item with-sub">
                    <a href="dashboard-one.html" class="nav-link"><i data-feather="type"></i> <span>Localization</span></a>

                    <ul>
                        <li><a href="page-profile-view.html">Languages</a></li>
                        <li><a href="page-connections.html">Currencies</a></li>
                    </ul>
                </li>

                <li class="nav-item with-sub">
                    <a href="dashboard-one.html" class="nav-link"><i data-feather="edit"></i> <span>Customization</span></a>

                    <ul>
                        <li><a href="page-timeline.html">Theme Gallery</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </aside>
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
    },
}
</script>

<style scoped>
/* TODO */
</style>
