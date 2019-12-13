<template>
    <aside class="aside aside-fixed">
        <div class="aside-header">
            <a href="javascript://" class="aside-logo">
                <img src="@/assets/img/banner-icon-32.png" alt="aBitSuite Logo">
                <span>a</span>Bit<span>Suite</span>
            </a>

            <a href="javascript://" class="aside-menu-link">
                <i data-feather="menu"></i>
                <i data-feather="x"></i>
            </a>
        </div>

        <div class="aside-body">
            <div class="aside-loggedin">
                <div class="d-flex align-items-center justify-content-start">
                    <a href="javascript://" class="avatar"><img src="@/assets/img/img1.png" class="rounded-circle" alt=""></a>

                    <div class="aside-alert-link">
                        <a href="javascript://" class="new" data-toggle="tooltip" title="You have 2 unread messages"><i data-feather="message-square"></i></a>
                        <a href="javascript://" class="new" data-toggle="tooltip" title="You have 4 new notifications"><i data-feather="bell"></i></a>
                        <a href="javascript://" data-toggle="tooltip" title="Sign out"><i data-feather="log-out"></i></a>
                    </div>
                </div>

                <div class="aside-loggedin-user">
                    <a href="javascript://" class="d-flex align-items-center justify-content-between mg-b-2" data-toggle="collapse">
                        <h6 class="tx-semibold mg-b-0">{{fullName}}</h6>
                        <i data-feather="chevron-down"></i>
                    </a>

                    <p class="tx-color-03 tx-12 mg-b-0">{{position}}</p>
                </div>

                <div class="collapse" id="loggedinMenu">
                    <ul class="nav nav-aside mg-b-0">
                        <li class="nav-item"><a href="javascript://" class="nav-link"><i data-feather="edit"></i> <span>Edit Profile</span></a></li>
                        <li class="nav-item"><a href="javascript://" class="nav-link"><i data-feather="user"></i> <span>View Profile</span></a></li>
                        <li class="nav-item"><a href="javascript://" class="nav-link"><i data-feather="settings"></i> <span>Account Settings</span></a></li>
                        <li class="nav-item"><a href="javascript://" class="nav-link"><i data-feather="help-circle"></i> <span>Help Center</span></a></li>
                        <li class="nav-item"><a href="javascript://" class="nav-link"><i data-feather="log-out"></i> <span>Sign Out</span></a></li>
                    </ul>
                </div>
            </div><!-- aside-loggedin -->

            <ul class="nav nav-aside">
                <!-- WORKSPACES -->
                <div class="divider-text">Workspaces</div>
                <li class="nav-item"><a href="/defi360" class="nav-link"><i data-feather="globe"></i> <span>DeFi Admin <small class="ml-1">[ Management ]</small></span></a></li>
                <li class="nav-item"><a href="/defi360" class="nav-link"><i data-feather="umbrella"></i> <span>DeFi Project <small class="ml-1">[ Collaborate ]</small></span></a></li>
                <li class="nav-item active"><a href="/telr" class="nav-link"><i data-feather="speaker"></i> <span>Telr <small class="ml-1">[ ATMs | POSs ]</small></span></a></li>

                <!-- ACCOUNTING -->
                <div class="divider-text">DeFi Admin Accounting</div>
                <li class="nav-item"><a href="javascript://" class="nav-link"><i data-feather="percent"></i> <span>Invocing</span></a></li>
                <li class="nav-item"><a href="javascript://" class="nav-link"><i data-feather="dollar-sign"></i> <span>Payroll</span></a></li>

                <!-- SYSOPS -->
                <div class="divider-text">DeFi Admin SysOps</div>
                <li class="nav-item"><a href="javascript://" class="nav-link"><i data-feather="database"></i> <span>Data Manager</span></a></li>
                <li class="nav-item"><a href="javascript://" class="nav-link"><i data-feather="server"></i> <span>Server Guru</span></a></li>

                <div class="divider-text">DeFi Admin Security</div>
                <li class="nav-item"><a href="javascript://" class="nav-link"><i data-feather="shield"></i> <span>Crypto Guardian</span></a></li>
                <li class="nav-item"><a href="javascript://" class="nav-link"><i data-feather="book-open"></i> <span>Knowledge Center</span></a></li>

                <div class="divider-text">My DeFi Project</div>
                <li class="nav-item"><a href="javascript://" class="nav-link"><i data-feather="calendar"></i> <span>Calendar <small class="ml-1">[ CalDAV ]</small></span></a></li>
                <li class="nav-item"><a href="javascript://" class="nav-link"><i data-feather="users"></i> <span>Contacts <small class="ml-1">[ CalDAV ]</small></span></a></li>
                <li class="nav-item with-sub">
                    <a href="javascript://" class="nav-link"><i data-feather="sliders"></i> <span>Preferences</span></a>

                    <ul>
                        <li><a href="javascript://">Notifications</a></li>
                        <li><a href="javascript://">User Manager</a></li>
                    </ul>
                </li>

                <div class="divider-text">DeFi Project Teams</div>
                <li class="nav-item"><a href="javascript://" class="nav-link"><i data-feather="activity"></i> <span>Activity Monitor</span></a></li>
                <li class="nav-item"><a href="javascript://" class="nav-link"><i data-feather="slack"></i> <span>Chat <small class="ml-1">[ Slack ]</small></span></a></li>
                <li class="nav-item"><a href="javascript://" class="nav-link"><i data-feather="trello"></i> <span>Tasks <small class="ml-1">[ Trello ]</small></span></a></li>

                <div class="divider-text">DeFi Project Resources</div>
                <li class="nav-item"><a href="javascript://" class="nav-link"><i data-feather="github"></i> <span>Code Repositories</span></a></li>
                <li class="nav-item"><a href="javascript://" class="nav-link"><i data-feather="download-cloud"></i> <span>Downloads</span></a></li>
                <li class="nav-item"><a href="javascript://" class="nav-link"><i data-feather="book-open"></i> <span>Knowledge Centers</span></a></li>

                <div class="divider-text">Telr App</div>
                <li class="nav-item"><a href="javascript://" class="nav-link"><i data-feather="tv"></i> <span>Manage Ads</span></a></li>

                <div class="divider-text">Telr Host</div>
                <li class="nav-item"><a href="javascript://" class="nav-link"><i data-feather="list"></i> <span>Transactions</span></a></li>
                <li class="nav-item"><a href="javascript://" class="nav-link"><i data-feather="shuffle"></i> <span>Exchanges</span></a></li>
                <li class="nav-item"><a href="javascript://" class="nav-link"><i data-feather="credit-card"></i> <span>Wallets</span></a></li>
                <li class="nav-item"><a href="javascript://" class="nav-link"><i data-feather="dollar-sign"></i> <span>Payouts</span></a></li>
                <li class="nav-item"><a href="javascript://" class="nav-link"><i data-feather="award"></i> <span>Compliance</span></a></li>
                <li class="nav-item with-sub">
                    <a href="javascript://" class="nav-link"><i data-feather="sliders"></i> <span>Preferences</span></a>

                    <ul>
                        <li><a href="javascript://">Notifications</a></li>
                        <li><a href="javascript://">User Manager</a></li>
                    </ul>
                </li>

                <div class="divider-text">Telr Rewards</div>
                <li class="nav-item with-sub">
                    <a href="javascript://" class="nav-link"><i data-feather="shopping-bag"></i> <span>Shops</span></a>

                    <ul>
                        <li><a href="javascript://">Gift Cards</a></li>
                        <li><a href="javascript://">Open Bazaar</a></li>
                    </ul>
                </li>
                <li class="nav-item">
                    <a href="javascript://" class="nav-link"><i data-feather="gift"></i> <span>Community Chests</span></a>
                </li>

                <div class="divider-text">Telr Vue</div>
                <li class="nav-item with-sub">
                    <a href="javascript://" class="nav-link"><i data-feather="type"></i> <span>Localization</span></a>

                    <ul>
                        <li><a href="javascript://">Languages</a></li>
                        <li><a href="javascript://">Currencies</a></li>
                    </ul>
                </li>
                <li class="nav-item with-sub">
                    <a href="javascript://" class="nav-link"><i data-feather="edit"></i> <span>Customization</span></a>

                    <ul>
                        <li><a href="javascript://">Theme Gallery</a></li>
                    </ul>
                </li>

                <div class="divider-text">aBitSuite v19.12.13</div>
                <div class="text-center">
                    <small>
                        Brought to you by Modenero Corp
                        <br />&copy; 2020. All rights reserved.
                    </small>
                </div>
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
